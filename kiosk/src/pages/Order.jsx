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
