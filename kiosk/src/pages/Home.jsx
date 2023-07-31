import {React, useState} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide, Zoom } from 'react-reveal';
import Shake from 'react-reveal/Shake';
import Reveal from 'react-reveal/Reveal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleOrderClick = () => {
      // '/order' 경로로 페이지 이동
      navigate('/done');
    };

  return (
    //bg-background에서 background는 tailwind.config.js에서 설정했습니다
    //tailwindcss에 속성을 어떻게 줄 수 있는지는 https://tailwindcss.com/docs/overflow#class-reference 사이트에 있습니다
    //font-Gangwon은 index.css에 정의했습니다
    //Fade 등 위에 import된 효과들은 react-reveal로, 애니메이션 효과입니다
    <div className={`${FlexCol} bg-brown relative z-0 h-screen`}>
      <img src={process.env.PUBLIC_URL + '/images/bread.png'}></img>
      <Zoom>
        <div className={'font-Gmarket text-ivory flex mt-5 justify-center items-center'}>
          <h1 className={'text-[48px] text-center font-light whitespace-nowrap mr-4'}>저희 키오스크의 메뉴판으로</h1>
          <h1 className={'text-[48px] text-center font-semibold'}>쉽게 주문해보세요 !</h1>
        </div>
      </Zoom>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-5 border-ivory border-2 rounded-full mb-20'}></hr>
      </div>
      <div className={'bg-cover bg-center flex'}>
        <img className={'mt-6 ml-20 w-80 h-96 transform scale-x-[-1]'} src={process.env.PUBLIC_URL + '/images/deco.png'} alt="deco"></img>
        <img className={'absolute inset-0 mt-96 ml-96 w-2/5 h-max'} src={process.env.PUBLIC_URL + '/images/leaf.png'} alt="leaf"></img>
        <Shake>
          <img className={'mt-80 ml-36 z-10 w-36 h-max'} src={process.env.PUBLIC_URL + '/images/bell.png'} alt="bell"></img>
        </Shake>
        <img className={'mt-6 ml-48 w-80 h-96'} src={process.env.PUBLIC_URL + '/images/deco.png'} alt="deco"></img>
      </div>
      <div className={`flex justify-center mt-6 mb-96 z-10`}>
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} className={`w-3/4 max-w-full`} alt="logo"/>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto mb-8 w-3/5'} src={process.env.PUBLIC_URL + '/images/spoon.png'} alt="spoon"/>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto mb-36 w-80 ml-auto'} src={process.env.PUBLIC_URL + '/images/pizza.png'} alt="spoon"/>
      </div>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-40 border-ivory border-2 rounded-full mb-20 z-10'}></hr>
      </div>
      <div className={`${FlexRow} flex justify-center items-center`}>
        <Fade>
            <button 
            className={`mt-16 bg-yellow w-2/5 h-[200px] rounded-[30px] shadow-2xl`}
            onClick={handleOrderClick}>
                <h1 className={'font-Gangwon text-[100px] text-darkbrown mt-12'}>주문하기</h1>
            </button>
        </Fade>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto ml-auto mr-32 w-3/5'} src={process.env.PUBLIC_URL + '/images/pizza2.png'} alt="spoon"/>
      </div>
    </div>
  )
}
