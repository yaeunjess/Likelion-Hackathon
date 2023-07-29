import {React, useState, useMemo} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Bell from '../assets/images/Bell.png';
import Enlarge from '../assets/images/Enlarge.png';
import Table from '../components/Table';


export default function Order() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/');
  };


  return (
    <div className={`${FlexCol} bg-beige relative z-0 h-screen`}>
      <Fade>
      <div className={`${FlexRow} m-10`}>
        <img src='/images/logo.png' className={`w-1/4`}/>
        <button className={`w-[150px] h-[170px] justify-center flex absolute right-10 top-10`}>
          {/* 직원 호출하면 dialog 띄우기 */}
          <img src={Bell} className={`w-[150px] h-[170px]`}/> 
        </button>
      </div>
      
      <div className={`bg-darkbrown rounded-full text-center ml-12 mr-12 mt-16 pt-4 pb-2`}>
        <p className={`font-Gmarket text-white text-[40px]`}>+버튼과 -버튼으로 수량을 정해보세요</p>
      </div>

    <div className={`${FlexRow} w-full`}>
      <div className={`${FlexCol} w-1/2 ml-8 mr-2`}>
        <Table/>
        <Table />
      </div>
      <div className={`${FlexCol} w-1/2 mr-8 ml-2`}>
        <Table /> 
      </div>
    </div>

      <div className={`bg-white rounded-tl-full rounded-tr-full rounded-br-full text-center mt-12 ml-12 mr-12 pt-4 pb-2`}>
        {/* 가격 비동기적으로 변하게 하기 */}
        <p className={`font-Jeju text-[40px]`}>총 16700원입니다. 결제하시겠습니까?</p>
      </div>

      <div className={`${FlexRow} justify-center mt-20`}>
        <button 
          className={`bg-red w-2/5 h-[200px] rounded-[30px] pt-8`}
          onClick={handleOrderClick}>
            {/* 팝업창 띄우기 */}
            <p className={'font-Gangwon text-[80px] text-white'}>결제하기</p>
        </button>
        <button className={`w-[150px] justify-center absolute right-12`}>
          <img src={Enlarge}/>
        </button>
      </div>

    </Fade>
    </div>
  )
}


