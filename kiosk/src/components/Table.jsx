import {React, useState,useMemo} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';

export default function Table() {
  const category = "떡볶이류";
  const menuList = [
    {menu:"진짜떡볶이", price: 3000, count: 0},
    {menu:"치즈떡볶이", price: 3500, count: 0},
  ]

  const [menuCounts, setMenuCounts] = useState(menuList.map(() => 0));

  const incrementCount = (index) => {
    const updatedCounts = [...menuCounts];
    updatedCounts[index]++;
    setMenuCounts(updatedCounts);
  };

  const decrementCount = (index) => {
    const updatedCounts = [...menuCounts];
    if (updatedCounts[index] > 0) {
      updatedCounts[index]--;
      setMenuCounts(updatedCounts);
    }
  };


  return (
    <div className={`${FlexCol}`}>

       <div className={`bg-darkred mt-10 mb-0 p-2 
       font-Jeju text-white text-4xl  text-center`}>
          <p>{category}</p>
       </div>

    
      {menuList.map((item, index) => (
        <div key={index} className={`${FlexRow} font-Jeju text-4xl bg-white 
        p-4 mt-0 h-[76px] border-b-2 border-black items-center text-center`}>
          <div className={`w-1/3 m-0 p-0`}>
            <p>{item.menu}</p>
          </div>
          <div className={`w-1/3 m-0 p-0`}>
            <p>{item.price}원</p>
          </div>
          <div className={`w-1/3 m-0 p-0 ${FlexRow} justify-center gap-2`}>
            <button className={`${menuCounts[index]>0? 'bg-red' : 'bg-gray-500'} rounded-full w-[50px] h-[50px] text-white`}
            onClick = {()=>decrementCount(index)}>
              <p className={`mt-1`}>-</p>
            </button>
            <div className={`rounded-md border-2 border-black w-[80px] h-[50px] text-center`}>
              <p className={`mt-1`}>{menuCounts[index]}</p>
            </div>
            <button className={`${menuCounts[index]>0? 'bg-red' : 'bg-gray-500'} rounded-full w-[50px] h-[50px] text-white`}
             onClick={() => incrementCount(index)}>
              <p className={`mt-1`}>+</p>
            </button>
          </div>
        </div>
      ))}
       
    </div>
  )
}

