import {React, useState, useEffect} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow, PaddingY } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import Pulse from 'react-reveal/Pulse';
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../context/context';
import done_audio from '../assets/audio/done_audio.mp3';

export default function Done() {
    const navigate = useNavigate();
    const handleOrderClick = () => {
      navigate('/');
    };

    useEffect(() => {
      const audio = new Audio(done_audio);
      audio.play();
  
      return () => {
        audio.pause();
      };
    }, []);

    const location = useLocation();
    const waitNumber = location.state && location.state.waitNumber;

    useEffect(() => {
      console.log(waitNumber); 
    }, [waitNumber]);

  return (
    <div className={`${FlexCol} bg-brown relative z-0 h-screen`}>
      <img src={'/images/bread.png'}></img>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-28 border-ivory border-2 rounded-full mb-20'}></hr>
      </div>
      <div className={'bg-cover bg-center flex'}>
        <img className={'mt-6 ml-20 w-80 h-96 transform scale-x-[-1]'} src={'/images/deco.png'} alt="deco"></img>
        <img className={'absolute inset-0 mt-96 ml-96 w-2/5 h-max'} src={'/images/leaf.png'} alt="leaf"></img>
        <img className={'mt-6 ml-auto mr-20 w-80 h-96'} src={'/images/deco.png'} alt="deco"></img>
      </div>
      <Pulse>
        <div className={`${FlexRow} justify-center z-10 relative mt-10`}>
          <img className={`w-3/4`} src={'/images/frame.png'} alt="frame"/>
          <p className={'font-Gmarket absolute mt-16 text-grayy text-[44px] font-light'}>대기번호</p>
          <p className={'font-Gmarket absolute mt-20 text-black text-[250px] font-bold'}>{waitNumber}</p>
          <p className={'font-Gmarket absolute mt-96 text-grayy text-[52px] font-semibold'}>주문이 완료되었습니다!</p>
        </div>
      </Pulse>
      <div>
        <img className={'absolute inset-0 mt-auto mb-8 w-3/5'} src={'/images/spoon.png'} alt="spoon"/>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto mb-36 w-80 ml-auto -z-50'} src={'/images/pizza.png'} alt="spoon"/>
      </div>
      <div className={'flex justify-center'}>
        <hr className={'w-4/5 mt-80 border-ivory border-2 rounded-full mb-20 z-10'}></hr>
      </div>
      <div className={`${FlexRow} justify-center`}>
        <Fade>
            <button 
            className={`mt-16 bg-yellow w-2/5 h-[200px] rounded-[30px] shadow-2xl items-center`}
            onClick={() => handleOrderClick()}>
                <h1 className={'font-Gangwon text-[100px] text-white mt-12'}>처음으로</h1>
            </button>
        </Fade>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto ml-auto mr-32 w-3/5 -z-50'} src={'/images/pizza2.png'} alt="spoon"/>
      </div>
    </div>
  )
}