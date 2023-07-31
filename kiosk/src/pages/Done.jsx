import {React, useState} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import Pulse from 'react-reveal/Pulse';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleOrderClick = () => {
      // '/order' 경로로 페이지 이동
      navigate('/');
    };

  return (
    //bg-background에서 background는 tailwind.config.js에서 설정했습니다
    //tailwindcss에 속성을 어떻게 줄 수 있는지는 https://tailwindcss.com/docs/overflow#class-reference 사이트에 있습니다
    //font-Gangwon은 index.css에 정의했습니다
    //Fade 등 위에 import된 효과들은 react-reveal로, 애니메이션 효과입니다
    <div className={`${FlexCol} bg-brown relative z-0 h-screen`}>
      <img src={process.env.PUBLIC_URL + '/images/bread.png'}></img>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-28 border-ivory border-2 rounded-full mb-20'}></hr>
      </div>
      <div className={'bg-cover bg-center flex'}>
        <img className={'mt-6 ml-20 w-80 h-96 transform scale-x-[-1]'} src={process.env.PUBLIC_URL + '/images/deco.png'} alt="deco"></img>
        <img className={'absolute inset-0 mt-96 ml-96 w-2/5 h-max'} src={process.env.PUBLIC_URL + '/images/leaf.png'} alt="leaf"></img>
        <img className={'mt-6 ml-auto mr-20 w-80 h-96'} src={process.env.PUBLIC_URL + '/images/deco.png'} alt="deco"></img>
      </div>
      <div className={`${FlexRow} justify-center z-10 relative`}>
        <img className={`w-3/4 mt-10`} src={process.env.PUBLIC_URL + '/images/frame.png'} alt="frame"/>
        <p className="font-Gmarket absolute flex items-center justify-center text-black text-[40px] font-bold">대기번호</p>
        <p className="font-Gmarket absolute w-full h-full flex items-center justify-center text-black text-[250px] font-bold">186</p>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto mb-8 w-3/5'} src={process.env.PUBLIC_URL + '/images/spoon.png'} alt="spoon"/>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto mb-36 w-80 ml-auto'} src={process.env.PUBLIC_URL + '/images/pizza.png'} alt="spoon"/>
      </div>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-80 border-ivory border-2 rounded-full mb-20 z-10'}></hr>
      </div>
      <div className={`${FlexRow} justify-center`}>
        <Fade>
            <button 
            className={`mt-16 bg-yellow w-2/5 h-[200px] rounded-[30px] shadow-2xl`}
            onClick={handleOrderClick}>
                <h1 className={'font-Gangwon text-[78px] text-darkbrown'}>처음으로</h1>
                <h1 className={'font-Gangwon text-[78px] text-darkbrown'}>돌아가기</h1>
            </button>
        </Fade>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto ml-auto mr-32 w-3/5'} src={process.env.PUBLIC_URL + '/images/pizza2.png'} alt="spoon"/>
      </div>
    </div>
  )
}
