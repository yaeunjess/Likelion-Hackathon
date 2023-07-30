import {React, useState, useEffect, useRef} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';
import Table from '../components/Table';
import dummy from '../data/menu.json';
import Modal from 'react-modal';
import ModalTop from '../assets/images/ModalTop.png'


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


  //menuList 관련
  const menuData = dummy; 
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedItems, setOrderedItems] = useState([]);
  //oderedItems 구하기
  const updateOrder = (menu, count) => {
    const updatedItems = [...orderedItems];
    const index = updatedItems.findIndex((item) => item.menu === menu.menu);

    if(count === 0) {
      if(index !== -1) {
        updatedItems.splice(index, 1);
      }
    } else{
      if(index !== -1) {
        updatedItems[index].count = count;
      } else {
        updatedItems.push({ ...menu, count });
      }
    }

    setOrderedItems(updatedItems);
    console.log(orderedItems);
    updateTotalPrice();
  };
  //totalPrice 구하기
  const updateTotalPrice = () => {
    let totalPrice = 0;
    orderedItems.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [orderedItems]);


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
            <Table menuList={menuData.떡볶이류} category={"떡볶이류"} updateOrder={updateOrder}/>
            <Table menuList={menuData.세트메뉴} category={"세트메뉴"} updateOrder={updateOrder}/>
          </div>
          <div className={`${FlexCol} w-1/2 mr-8 ml-2`}>
            <Table menuList={menuData.사이드류} category={"사이드류"} updateOrder={updateOrder}/> 
          </div>
        </div>
    ) : (
        <div className={`${FlexRow} w-full`}>
          <div className={`${FlexCol} w-full ml-8 mr-8`}>
            <Table menuList={menuData.떡볶이류} category={"떡볶이류"} updateOrder={updateOrder}/>
            <Table menuList={menuData.세트메뉴} category={"세트메뉴"} updateOrder={updateOrder}/>
            <Table menuList={menuData.사이드류} category={"사이드류"} updateOrder={updateOrder}/> 
          </div>
        </div>
    )}
    

    <div className={`${FlexCol} mt-4 ml-12 mr-12 pt-2 pb-4`}>
          {orderedItems.map((item, index) => (
            <div key={index} className={`${FlexRow} justify-between`}>
              <p className={`font-Jeju text-[24px]`}>
                {item.menu} - {item.price * item.count}원
              </p>
              <p className={`font-Jeju text-[24px]`}>수량: {item.count}</p>
            </div>
          ))}
    </div>
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


