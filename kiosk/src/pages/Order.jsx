import {React, useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';
import dummy_product from '../data/product.json';
import Modal from 'react-modal';
import ModalTop from '../assets/images/ModalTop.png'
import { BASEURL } from '../context/context';
import dummy_category from '../data/category.json';
import order_audio from '../assets/audio/order_audio.mp3';
import bell_audio from '../assets/audio/bell_audio.mp3';
import place_audio from '../assets/audio/place_audio.mp3';
import pay_audio from '../assets/audio/pay_audio.mp3';


Modal.setAppElement('#root');

export default function Order() {
  //페이지 전환 useNavigate()(vs Link)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  //oder_audio, 주문
  //bell_audio, 직원호출
  const [oderAudio] = useState(new Audio(order_audio));
  const [bellAudio] = useState(new Audio(bell_audio));

  useEffect(() => {
    oderAudio.play();

    return () => {
      oderAudio.pause();
    };
  }, []);

  useEffect(() => {
    if(isModalOpen) {
      oderAudio.pause();
      bellAudio.play();
    } 
  });

  //place_audio, 식사장소 선택
  //pay_audio, 지불방식 선택
  const [placeAudio] = useState(new Audio(place_audio));
  const [payAudio] = useState(new Audio(pay_audio));

  useEffect(() => {
    if (isModalFirstOpen) {
        oderAudio.pause();
        placeAudio.play();
        payAudio.currentTime = 0;
    }

    return () => {
        placeAudio.pause();
    };
  });

  useEffect(() => {
    if (isModalTwoOpen) {
        placeAudio.pause();
        payAudio.play();
        placeAudio.currentTime = 0; //placeAudio의 재생 위치 0으로 초기화
    }

    return () => {
      payAudio.pause();
    };
  });

  //Modal 상태 관리 useState()
  //useEffect() 
  // 1번째인자 -> sideeffect를 정의하는 콜백함수, 
  //콜백함수는 컴포넌트가 마운트되었을때(처음 렌더링될 때) 실행되며, 컴포넌트가 업데이트될 때마다 실행된다. 
  // 2번째인자 -> 의존성배열로서, 컴포넌트의 특정 상태나 프롭스가 변경되었을 때에만 콜백함수를 실행하도록 설정할수 있다.
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModalFirstOpen, setIsModalFirstOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  //돋보기 아이콘 상태 관리 useState()
  const [enlargeState, setEnlargeState] = useState(false);
  const handleEnlargeClick = () => {
    setEnlargeState(!enlargeState);
  };

  // 포장/매장
  const [isTakeout, setIstakeout] = useState();

  // API로 받아올 정보 배열들
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState();
  // API-GET
  useEffect(() => {
    axios
      .get(`${BASEURL}/product/`)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.error("상품 목록을 불러오는 중 오류 발생", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${BASEURL}/category/`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((error) => {
        console.error("상품 목록을 불러오는 중 오류 발생", error);
      });
  }, []);

  const [categoryNameList, setCategoryNameList] = useState({});
  const [categoryProductList, setCategoryProductList] = useState({});
  // category별 수량
  const initialItemCount = {};
  const [itemCounts, setItemCounts] = useState({});

  useEffect(()=>{
    if(categoryList && productList){
      // category.json 복사
      setCategoryNameList(categoryList.map((category)=>(category.category_name)));

      // category별 product 리스트
      setCategoryProductList(categoryList.map((category) =>
        productList.filter((product) => product.category === category.id)));

      
      categoryList.forEach((category)=>{
        const categoryProductList = productList.filter((product)=> product.category === category.id);
        const initialCategoryItemCount = categoryProductList.map(()=>0);
        initialItemCount[category.category_name] = initialCategoryItemCount;
      })
      setItemCounts(initialItemCount)
    }
  },[categoryList, productList])



  // 총가격
  const [totalPrice, setTotalPrice] = useState(0);
  // 주문메뉴
  const [orderedItems, setOrderedItems] = useState([]);
  // 주문메뉴 업데이트 함수
  const updateItemCount = (categoryProductList, categoryName, itemIndex, count, categoryItemsCountList) => {
    // 제품을 categoryProductList에서 가져옵니다.
    const product = categoryProductList[itemIndex];
  
    // 새로운 총 가격을 계산할 변수를 선언합니다.
    let newTotalPrice;
  
    // count가 양수인 경우 (버튼이 + 버튼일 때)
    if (count >= 0) {
      // itemCounts 상태를 업데이트하여 선택한 항목의 수량을 업데이트합니다.
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [categoryName]: prevCounts[categoryName].map((itemCount, index) =>
          index === itemIndex ? count : itemCount
        ),
      }));
  
      // 새로운 총 가격을 계산하여 totalPrice 상태를 업데이트합니다.
      newTotalPrice = totalPrice + (count - categoryItemsCountList[itemIndex]) * product.price;
  
      // 선택한 항목에 따라 orderedItems 상태를 업데이트합니다.
      if (count > 0) {
        setOrderedItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
          if (existingItemIndex !== -1) {
            // 항목이 이미 존재하는 경우, 수량을 업데이트합니다.
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = { ...product, count };
            return updatedItems;
          } else {
            // 항목이 새로운 경우, orderedItems에 추가합니다.
            return [...prevItems, { ...product, count }];
          }
        });
      } else {
        // 수량이 0인 경우, orderedItems에서 항목을 제거합니다.
        setOrderedItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
      }
    } else {
      // count가 음수인 경우 (버튼이 - 버튼일 때)
      // 여기서는 수량을 업데이트하지 않고, totalPrice에서 이전 수량의 가격을 빼야합니다.
      // 따라서 count에 음수 값을 취해서 이전 수량을 되돌리고, totalPrice에서는 이전 수량의 가격을 빼야합니다.
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [categoryName]: prevCounts[categoryName].map((itemCount, index) =>
          index === itemIndex ? Math.max(0, count) : itemCount
        ),
      }));
      newTotalPrice = totalPrice - (categoryItemsCountList[itemIndex] * product.price);
    }

    const updatedOrderedItems = orderedItems.filter((item) => item.id !== product.id);
    if (count > 0) {
      updatedOrderedItems.push({ id: product.id, number:count });
    }
    setOrderedItems(updatedOrderedItems);

    // totalPrice 상태를 업데이트합니다.
    setTotalPrice(newTotalPrice);
  };

  //orderItems에 따른 버튼 활성화
  const isButtonEnabled = orderedItems.length > 0;

  //대기번호
  const [waitNumber, setWaitNumber] = useState(112);
 //API-post
 const handleDoneClick = (paymentMethod) => {
  console.log({
    products : orderedItems.map(item => item.id),
    quantity : orderedItems.map(item => item.number),
    payment : paymentMethod,
    is_takeout : isTakeout,
    total_price: totalPrice,
  })
  axios.post(`${BASEURL}/order/`, {
    products : orderedItems.map(item => item.id),
    quantity : orderedItems.map(item => item.number),
    payment : paymentMethod,
    is_takeout : isTakeout,
    total_price: totalPrice,
  })
  .then((response) => {
    console.log("주문 성공", response.data.order_number);
    const newWaitNumber = response.data.order_number;
    setWaitNumber(newWaitNumber);
    console.log("주문 성공", newWaitNumber);
    navigate('/done', { state: { waitNumber: newWaitNumber } });
  })
  .catch((error) => {
    console.error("주문 에러", error);
  });
  // 여길 주석하면 됨
  //navigate('/done', { state: { waitNumber } });
}

  return (
    <div className={`${FlexCol} bg-beige relative z-0 h-full`} >
    <Fade>
      <div className={`${FlexRow} m-10`}>
        <button onClick={() => handleClick()} className={`w-[30%]`}>
          <img src='/images/logo.png' />
        </button>
        <button 
        className={`${FlexCol} w-[160px] h-[170px] justify-center flex absolute right-10 top-10  text-darkbrown text-4xl font-bold font-Gmarket items-center gap-4`}
        onClick={() => setIsModalOpen(true)}>
          <img src={Bell} className={`w-[150px] h-[170px]`}/> 
          <p>직원 호출</p>
        </button>
      </div>
      
      
      <div className={`bg-darkbrown rounded-full text-center ml-12 mr-12 mt-8 pt-4 pb-2`}>
        <p className={`font-Gmarket text-white text-[40px]`}>+버튼과 -버튼으로 수량을 정해보세요</p>
      </div>

    {enlargeState ===false ? (
        <div className={`${FlexRow} w-full`}>
          <div className={`${FlexCol} w-1/2 ml-8 mr-2`}>
          <Table
            categoryProductList={categoryProductList[0]}
            categoryName={categoryNameList[0]}
            categoryItemsCountList={itemCounts[categoryNameList[0]]} 
        
            updateItemCount={updateItemCount}
          />
          <Table
            categoryProductList={categoryProductList[2]}
            categoryName={categoryNameList[2]}
            categoryItemsCountList={itemCounts[categoryNameList[2]]} 
            updateItemCount={updateItemCount}
          />
          </div>
          <div className={`${FlexCol} w-1/2 mr-8 ml-2`}>
          <Table
              categoryProductList={categoryProductList[1]}
              categoryName={categoryNameList[1]}
              categoryItemsCountList={itemCounts[categoryNameList[1]]} 
              updateItemCount={updateItemCount}
            />
          </div>
        </div>
    ) : (
        <div className={`${FlexRow} w-full`}>
          <div className={`${FlexCol} w-full ml-8 mr-8`}>
          <Table
            categoryProductList={categoryProductList[0]}
            categoryName={categoryNameList[0]}
            categoryItemsCountList={itemCounts[categoryNameList[0]]} 
            updateItemCount={updateItemCount}
          />
          <Table
            categoryProductList={categoryProductList[2]}
            categoryName={categoryNameList[2]}
            categoryItemsCountList={itemCounts[categoryNameList[2]]}
            updateItemCount={updateItemCount}
          />
          <Table
            categoryProductList={categoryProductList[1]}
            categoryName={categoryNameList[1]}
            categoryItemsCountList={itemCounts[categoryNameList[1]]} 
            updateItemCount={updateItemCount}
          />
          </div>
        </div>
    )}
    </Fade>

    <div className={`${FlexCol} sticky bottom-0 bg-beige `}>
      
      <div className={`bg-white rounded-tl-full rounded-tr-full rounded-br-full text-center mt-10 ml-12 mr-12 pt-4 pb-2`}>
        <p className={`font-Jeju text-[40px]`}>총 {totalPrice}원입니다. 결제하시겠습니까?</p>
      </div>

      <div className={`${FlexRow} justify-center mt-10 mb-10`}>
        <button 
          className={`${isButtonEnabled ? 'bg-red' : 'bg-gray-400'} w-2/5 h-[200px] rounded-[30px] pt-8`}
          onClick={() => isButtonEnabled && setIsModalFirstOpen(true)}
          disabled={!isButtonEnabled}>
            <p className={'font-Gangwon text-[80px] text-white'}>결제하기</p>
        </button>
        <button 
        className={`${FlexCol} w-[170px] justify-center absolute right-12 text-darkbrown text-4xl font-bold font-Gmarket items-center`}
        onClick={handleEnlargeClick}>
          <img src={Enlarge}/>
          <p>{enlargeState === true ? "화면 축소":"화면 확대"}</p>
        </button>
      </div>
    </div>

    <Modal
      isOpen={isModalOpen} 
      onRequestClose={() => setIsModalOpen(false)} 
      className="outline-none flex flex-col text-center text-6xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[500px]
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          display: "grid",
          placeItems: "center",
        },
      }}>
      <div className="flex flex-col justify-center h-full items-center">
        <img src={ModalTop} className={`w-[400px] absolute -top-24`}/>
        <p>직원을 호출했습니다<br/> 잠시만 기다려주세요</p>
      </div>
    </Modal>

    
    <Modal
      isOpen={isModalFirstOpen} 
      onRequestClose={() => setIsModalFirstOpen(false)} 
      className="outline-none flex flex-col items-center text-center text-6xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[800px]
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          display: "grid",
          placeItems: "center",
        },
      }}>
      <img src={ModalTop} className={`w-[400px] absolute -top-24`}/>
      <div className="flex gap-8 justify-center h-[1000px] w-full items-center pt-16 pl-8 pr-8 ">
        <button 
          onClick={() => {setIstakeout(true); setIsModalTwoOpen(true); }}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          포장하기
        </button>
        <button 
          onClick={() => {setIstakeout(false); setIsModalTwoOpen(true); }}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          매장식사
        </button>
      </div>
      <div className="flex flex-col justify-center h-[300px] items-center h-full w-full p-8">
        <button 
          onClick={() => setIsModalFirstOpen(false)}
          className={`h-full w-full rounded-[40px] bg-white text-mint/70`}>
          뒤로가기
        </button>
      </div>
    </Modal>

    <Modal
      isOpen={isModalTwoOpen} 
      onRequestClose={() => setIsModalTwoOpen(false)} 
      className="outline-none flex flex-col items-center text-center text-6xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[800px]
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0)", 
          display: "grid",
          placeItems: "center",
        },
      }} >
      <img src={ModalTop} className={`w-[400px] absolute -top-24`}/>
      <div className="flex gap-8 justify-center h-[1000px] w-full items-center pt-16 pl-8 pr-8 ">
        <button 
          onClick={() => {setIsModalTwoOpen(false); handleDoneClick("카드"); }}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          카드
        </button>
        <button 
          onClick={() => {setIsModalTwoOpen(false); handleDoneClick("현금"); }}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          현금
        </button>
      </div>
      <div className="flex flex-col justify-center h-[300px] items-center h-full w-full p-8">
        <button 
          onClick={() => setIsModalTwoOpen(false)}
          className={`h-full w-full rounded-[40px] bg-white text-mint/70`}>
          뒤로가기
        </button>
      </div>
    </Modal>


    </div>
  
  )
}


function Table({categoryProductList, categoryName, categoryItemsCountList, updateItemCount}) {

  return(
    <div className={`${FlexCol}`}>
      <div className={`bg-darkred mt-10 mb-0 p-2 
        font-Jeju text-white text-4xl text-center`}>
        <p>{categoryName}</p>
      </div>

      {categoryItemsCountList && categoryProductList.map((item, index) => (
      <div key={index} className={`${FlexRow} font-Jeju text-4xl bg-white 
        p-4 mt-0 border-b-2 border-black border-l-4 border-r-4 items-center text-center`}>
        <div className={`w-[40%] m-0 p-0`}>
          <p>{item.product_name}</p>
          <p className={`text-2xl`}>{item.product_detail}</p>
        </div>
        <div className={`w-[30%] m-0 p-0`}>
          <p>{item.price}원</p>
        </div>
        <div className={`w-[30%] m-0 p-0 ${FlexRow} justify-center gap-2 `}>
          <button className={`${categoryItemsCountList[index]>0? 'bg-red' : 'bg-gray-400'} rounded-full w-[50px] h-[50px] text-white`}
            onClick={() => updateItemCount(categoryProductList, categoryName, index, categoryItemsCountList[index] - 1, categoryItemsCountList)}
            >
            <p className={`mt-1`}>-</p>
          </button>
          <div className={`rounded-md border-2 border-black w-[80px] h-[50px] text-center`}>
            <p className={`mt-1`}>{categoryItemsCountList[index]}</p>
          </div>
          <button className={`${categoryItemsCountList[index]>0? 'bg-red' : 'bg-gray-400'} rounded-full w-[50px] h-[50px] text-white`}
           onClick={() =>  updateItemCount(categoryProductList, categoryName, index, categoryItemsCountList[index] + 1, categoryItemsCountList)}
           >
            <p className={`mt-1`}>+</p>
          </button>
        </div>
      </div>
      ))}
    </div>
  )
}
