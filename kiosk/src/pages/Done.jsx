import {React, useState, useEffect} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow, PaddingY } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import Pulse from 'react-reveal/Pulse';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../context/context';

export default function Home() {
    const navigate = useNavigate();
    const handleOrderClick = () => {
      navigate('/');
    };

    const [waitNumber, setWaitNumber] = useState(0);

    // useEffect를 사용하여 API에서 대기번호 가져옴
    useEffect(() => {
      const fetchWaitNumber = async () => {
        try {
          const response = await axios.get(`${BASEURL}/waitNumber`); // 실제 api 주소 넣어야함
          setWaitNumber(response.data.waitNumber); // 응답에 'waitNumber' 필드 넣기
        } catch (error) {
          console.error('대기번호를 가져오는 중 오류가 발생하였습니다:', error);
        }
      };

      fetchWaitNumber();
    }, []); // 빈 의존성 배열([])은 useEffect가 컴포넌트가 마운트될 때 한 번만 실행됨 의미

  return (
    //bg-background에서 background는 tailwind.config.js에서 설정했습니다
    //tailwindcss에 속성을 어떻게 줄 수 있는지는 https://tailwindcss.com/docs/overflow#class-reference 사이트에 있습니다
    //font-Gangwon은 index.css에 정의했습니다
    //Fade 등 위에 import된 효과들은 react-reveal로, 애니메이션 효과입니다
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
          <p className={'font-Gmarket absolute mt-16 text-gray text-[44px] font-light'}>대기번호</p>
          <p className={'font-Gmarket absolute mt-20 text-black text-[250px] font-bold'}>{waitNumber}</p>
          <p className={'font-Gmarket absolute mt-96 text-gray text-[52px] font-semibold'}>주문이 완료되었습니다!</p>
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
                <h1 className={'font-Gangwon text-[100px] text-darkbrown mt-12'}>처음으로</h1>
            </button>
        </Fade>
      </div>
      <div>
        <img className={'absolute inset-0 mt-auto ml-auto mr-32 w-3/5 -z-50'} src={'/images/pizza2.png'} alt="spoon"/>
      </div>
    </div>
  )
}