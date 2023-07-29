import {React, useState} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import Pulse from 'react-reveal/Pulse';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleOrderClick = () => {
      // '/order' 경로로 페이지 이동
      navigate('/order');
    };

  return (
    //bg-background에서 background는 tailwind.config.js에서 설정했습니다
    //tailwindcss에 속성을 어떻게 줄 수 있는지는 https://tailwindcss.com/docs/overflow#class-reference 이 사이트에 있습니다
    //font-Gangwon은 index.css에 정의했습니다
    //Fade 등 위에 import된 효과들은 react-reveal로 애니메이션 효과입니다
    <div className={`${FlexCol} bg-brown relative z-0 h-screen`}>
        
        <Fade>
            <button 
            className={`bg-yellow w-2/5 rounded-[45px] pt-8`}
            onClick={handleOrderClick}>
                <p className={'font-Gangwon text-[80px]'}>주문하기</p>
            </button>
        </Fade>
    </div>
  )
}
