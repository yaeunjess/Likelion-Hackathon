import {React, useState} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';

export default function Order() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/');
  };

  return (
    <div className={`${FlexCol} bg-beige font-Gangwon relative z-0 h-screen`}>
      
      <img src='../public/images/logo.png'/>
      <div>
        <p className={`font-Gmarket`}>+버튼과 -버튼으로 수량을 정해보세요</p>
      </div>
      <Fade>
          <button 
          className={`bg-red w-2/5 rounded-[45px] pt-8`}
          onClick={handleOrderClick}>
              <p className={'font-Gangwon text-[80px] text-white'}>결제하기</p>
          </button>
      </Fade>
    </div>
  )
}
