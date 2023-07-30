import {React, useState,useMemo} from 'react'
import { FlexCol, PaddingX, Padding, FlexRow } from '../constants/style'
import { Fade, Slide } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import dummy from '../data/menu.json'

export default function Table(props) {
  const menuList = props.categoryList;
  const [menuCounts, setMenuCounts] = useState(menuList.map(() => 0));

  const incrementCount = (index) => {
    const updatedCounts = [...menuCounts];
    updatedCounts[index]++;
    setMenuCounts(updatedCounts);
    props.updateOrder(menuList[index], updatedCounts[index]);
  };

  const decrementCount = (index) => {
    const updatedCounts = [...menuCounts];
      if (updatedCounts[index] > 0) {
        updatedCounts[index]--;
        setMenuCounts(updatedCounts);
        props.updateOrder(menuList[index], updatedCounts[index]);
      }
  };


  return (
    <div className={`${FlexCol}`}>

       <div className={`bg-darkred mt-10 mb-0 p-2 
       font-Jeju text-white text-4xl  text-center`}>
          <p>{props.category}</p>
       </div>

    
      {menuList.map((item, index) => (
        <div key={index} className={`${FlexRow} font-Jeju text-4xl bg-white 
        p-4 mt-0 border-b-2 border-black border-l-4 border-r-4 items-center text-center`}>
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

