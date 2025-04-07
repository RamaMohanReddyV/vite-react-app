import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>"Why wait in line when your favorite meals can find their way to your door? Delicious flavors, quick delivery, and pure satisfaction—because great food should always be just a tap away. Let your cravings guide you, we’ll handle the rest! Explore our wide menu packed with irresistible dishes crafted to suit every taste and mood."</p>
    <div className="explore-menu-list">
      {menu_list.map((item, index)=>{
    return(
         <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All" : item.menu_name)}  key={index} className='explore-menu-list-item'>
        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
        <p>{item.menu_name}</p>
         </div>
    )
})}
    </div>
    <hr />
    </div>
  )
}

export default ExploreMenu
