import {React, useState} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';

export default function Order() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/');
  };

  return (
    <div className={`${FlexCol} bg-beige font-Gangwon relative z-0 h-screen`}>
      
      <img src='/images/logo.png' className={`w-1/4 ml-12 mt-10`}/>
      <button className={`w-[150px] justify-center flex absolute right-12 top-10`}>
        <img src={Bell}/>
      </button>

      <span className={`h-[80px]`}></span>

      <div className={`bg-darkbrown rounded-full text-center ml-12 mr-12 pt-4 pb-2`}>
        <p className={`font-Gmarket text-white text-[40px]`}>+버튼과 -버튼으로 수량을 정해보세요</p>
      </div>


      <div className={`bg-white rounded-tl-full rounded-tr-full rounded-br-full text-center mt-12 ml-12 mr-12 pt-4 pb-2`}>
        <p className={`font-Jeju text-[40px]`}>총 16700원입니다. 결제하시겠습니까?</p>
      </div>

      <div className={`${FlexRow} justify-center mt-20`}>
        <button 
          className={`bg-red w-2/5 h-[200px] rounded-[30px] pt-8`}
          onClick={handleOrderClick}>
            <p className={'font-Gangwon text-[80px] text-white'}>결제하기</p>
        </button>
        <button className={`w-[150px] justify-center absolute right-12`}>
          <img src={Enlarge}/>
        </button>
      </div>
      
    </div>
  )
}
