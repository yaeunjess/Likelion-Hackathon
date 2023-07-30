import {React, useState, useEffect, useRef} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';
import Table from '../components/Table';
import dummy from '../data/menu.json';


export default function Order() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/');
  };

  const menuData = dummy; 
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedItems, setOrderedItems] = useState([]);

  const updateOrder = (menu, count) => {
    const updatedItems = [...orderedItems];
    const index = updatedItems.findIndex((item) => item.menu === menu.menu);

    if (count === 0) {
      if (index !== -1) {
        updatedItems.splice(index, 1);
      }
    } else {
      if (index !== -1) {
        updatedItems[index].count = count;
      } else {
        updatedItems.push({ ...menu, count });
      }
    }

    setOrderedItems(updatedItems);
    updateTotalPrice();
  };

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


  const modalOneRef = useRef();
  const modalTwoRef = useRef();
  const modalBellRef = useRef();


  return (
    <div className={`${FlexCol} bg-beige relative z-0 h-full`}>
      <Fade>
      <div className={`${FlexRow} m-10`}>
        <img src='/images/logo.png' className={`w-1/4`}/>
        <button 
        className={`w-[150px] h-[170px] justify-center flex absolute right-10 top-10`}
        onClick={()=>modalBellRef.current.showModal()}>
          <img src={Bell} className={`w-[150px] h-[170px]`}/> 
        </button>
      </div>
      
      <div className={`bg-darkbrown rounded-full text-center ml-12 mr-12 mt-16 pt-4 pb-2`}>
        <p className={`font-Gmarket text-white text-[40px]`}>+버튼과 -버튼으로 수량을 정해보세요</p>
      </div>

    <div className={`${FlexRow} w-full`}>
      <div className={`${FlexCol} w-1/2 ml-8 mr-2`}>
        <Table categoryList={menuData.떡볶이류} category={"떡볶이류"} updateOrder={updateOrder}/>
        <Table categoryList={menuData.세트메뉴} category={"세트메뉴"} updateOrder={updateOrder}/>
      </div>
      <div className={`${FlexCol} w-1/2 mr-8 ml-2`}>
        <Table categoryList={menuData.사이드류} category={"사이드류"} updateOrder={updateOrder}/> 
      </div>
    </div>


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


    <div className={`${FlexCol} sticky bottom-0 bg-beige `}>
      
      <div className={`bg-white rounded-tl-full rounded-tr-full rounded-br-full text-center mt-10 ml-12 mr-12 pt-4 pb-2`}>
        <p className={`font-Jeju text-[40px]`}>총 {totalPrice}원입니다. 결제하시겠습니까?</p>
      </div>

      <div className={`${FlexRow} justify-center mt-10 mb-10`}>
        <button 
          className={`bg-red w-2/5 h-[200px] rounded-[30px] pt-8`}
          onClick={()=>modalOneRef.current.showModal()}>
            <p className={'font-Gangwon text-[80px] text-white'}>결제하기</p>
        </button>
        <button className={`w-[150px] justify-center absolute right-12`}>
          {/* Table 구조 바꾸기 */}
          <img src={Enlarge}/>
        </button>
      </div>
    </div>
    </Fade>

    <dialog
      ref={modalOneRef}
      className="outline-none text-center text-4xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[500px]
      backdrop:bg-black backdrop:opacity-70 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
      <button
       onClick={()=>modalTwoRef.current.showModal()}
       className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">  
        포장
      </button>  
      <button
        onClick={() => modalOneRef.current.close()}  
        className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">
        뒤로가기
      </button>
    </dialog>

    <dialog
    ref={modalTwoRef}
    className="outline-none text-center text-4xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[500px]
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
      <button
       className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">  
        카드
      </button>  
      <button
        onClick={() => modalTwoRef.current.close()}  
        className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">
        뒤로가기
      </button>
    </dialog>

    
    <dialog
    ref={modalBellRef}
    className="outline-none text-center text-4xl font-Gangwon bg-whiteandgray rounded-[40px] w-[800px] h-[500px]
    backdrop:bg-black backdrop:opacity-70 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
      <button
       className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">  
        직원을 호출하였습니다.<br/>잠시만 기다려주세요.
      </button>
      <button
        onClick={() => modalBellRef.current.close()}  
        className="mx-auto px-5 py-2 w-full bg-red-400 outline-none">
        뒤로가기
      </button>
    </dialog>

    </div>
  )
}


