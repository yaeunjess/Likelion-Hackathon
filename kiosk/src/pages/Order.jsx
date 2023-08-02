import {React, useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';
import dummy_product from '../data/product.json';
import Modal from 'react-modal';
import ModalTop from '../assets/images/ModalTop.png'
import { BASEURL } from '../context/context';
import dummy_category from '../data/category.json';


export default function Order() {
  //페이지 전환 useNavigate()(vs Link)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const handleDoneClick = () => {
    navigate('/done');
  }

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

  //돋보기 아이콘 useState()
  const [enlargeState, setEnlargeState] = useState(false);
  const handleEnlargeClick = () => {
    setEnlargeState(!enlargeState);
  };


  //API category 받아오기
  // useEffect(() => {
  //   axios
  //     .get(`${BASEURL}/product`)
  //     .then((res) => console.log(res));
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get(`${BASEURL}/category`)
  //     .then((res) => console.log(res));
  // }, []);

  
  const categoryList = dummy_category;
  const productList = dummy_product; 
  // category.json 복사
  const categoryNameList = categoryList.map((category)=>(category.category_name))

  // category별 product 리스트
  const categoryProductList = categoryList.map((category) =>
    productList.filter((product) => product.category === category.id)
  );

  // category별 수량
  const initialItemCount = {};
  categoryList.forEach((category)=>{
    const categoryProductList = productList.filter((product)=> product.category === category.id);
    const initialCategoryItemCount = categoryProductList.map(()=>0);
    initialItemCount[category.category_name] = initialCategoryItemCount;
  })
  const [itemCounts, setItemCounts] = useState(initialItemCount);
  
  // 총가격
  const [totalPrice, setTotalPrice] = useState(0);
  // 주문메뉴
  const [orderedItems, setOrderedItems] = useState([]);

  
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
  
    // totalPrice 상태를 업데이트합니다.
    setTotalPrice(newTotalPrice);
  };

  //orderItems에 따른 버튼 활성화
  const isButtonEnabled = orderedItems.length > 0;

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
    

    {/* <div className={`${FlexCol} mt-4 ml-12 mr-12 pt-2 pb-4`}>
      <p className={'font-Jeju text-red text-[30px]'}>신경안쓰셔도 돼요 확인용입니다</p>
          {orderedItems.map((item, index) => (
            <div key={index} className={`${FlexRow} justify-between`}>
              <p className={`font-Jeju text-[24px]`}>
                {item.product_name}{item.product_detail} - {item.price * item.count}원
              </p>
              <p className={`font-Jeju text-[24px]`}>수량: {item.count}</p>
            </div>
          ))}
    </div> */}
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
          onClick={() => setIsModalTwoOpen(true)}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          포장하기
        </button>
        <button 
          onClick={() => setIsModalTwoOpen(true)}
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
          //onClick={() => handleDoneClick()}
          className={`h-full w-full rounded-[40px] bg-mint/70`}>
          카드
        </button>
        <button 
          //onClick={() => handleDoneClick()}
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

      {categoryProductList.map((item, index) => (
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
