import React from "react";
import "./SelectAreaButton.style.css";
const SelectAreaButton = ({areas,setSelectByArea}) => {
  return (
  <div>
    {areas.map((item)=>{
      return(
        <button className="area-btn m-3" onClick={()=>{return setSelectByArea(item)}}>{item}</button>
      )
    })}
   
  </div>
  )
};

export default SelectAreaButton;
