import {useContext, useState} from 'react'
import './FoodCard.css'
import { StoreContext } from '../../context/StoreContext'
import {assets} from '../../assets/assets'

const FoodCard = ({id,name,price,image,description}) => {
  const {cartItems,setCartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className='food-item-image-container'>
            <img  alt='food-img' className='food-item-image' src={`${url}/image/${image}`}/>
            {
              !cartItems[id]? <img onClick={()=>addToCart(id)} src={assets.add_icon_white} className='add' alt='add'/>
              :
              <div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt='minus'/>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt='add'/>
              </div>
            }
        </div>
        <div className='food-item-info'>
            <p className='food-item-name'>{name}</p>
            <p className='food-item-desc'>{description}</p>
            <div className='food-item-price-rating'>
                <p className='food-item-price'>₹{price}</p>
                <img src={assets.rating_stars} alt='star'/>
            </div>
        </div>
    </div>
  )
}

export default FoodCard