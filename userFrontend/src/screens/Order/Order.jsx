import {useContext, useState,useEffect} from 'react'
import {StoreContext} from '../../context/StoreContext'
import './Order.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Order = () => {
  const navigate=useNavigate()
  const[data,setData]=useState({
    first_name:'',
    last_name:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zip_code:'',
    country:'',
    phone:''
  })
  const {getTotalCartAmount,url,food_list,cartItems,token,discount,setDiscount}=useContext(StoreContext);
  const onChangeHandler=(e)=>{
    const{name,value}=e.target
    setData({...data,[name]:value})
  }
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    let orderItem=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo={...item};
        itemInfo.quantity=cartItems[item._id];
        orderItem.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+20
    }
    try {
      let response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
      const {session_url}=response.data
      window.location.replace(session_url)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    if(!token)
      navigate('/cart')
  },[token])
  return (
    <form className='place-order' onSubmit={onSubmitHandler}>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder="First Name" name='first_name' value={data.first_name} onChange={onChangeHandler}/>
          <input required type="text" placeholder="Last Name" name='last_name' value={data.last_name} onChange={onChangeHandler}/>
        </div>
        <input required type="email" placeholder="Email address" name='email' value={data.email} onChange={onChangeHandler}/>
        <input required type="text" placeholder="Street" name='street' value={data.street} onChange={onChangeHandler}/>
        <div className="multi-fields">
          <input required type="text" placeholder="City" name='city' value={data.city} onChange={onChangeHandler}/>
          <input required type="text" placeholder="State" name='state' value={data.state} onChange={onChangeHandler}/>
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder="Zip code" name='zip_code' value={data.zip_code} onChange={onChangeHandler}/>
          <input required type="text" placeholder="Country" name='country' value={data.country} onChange={onChangeHandler}/>
        </div>
        <input required type="text" placeholder="Phone" name='phone' value={data.phone} onChange={onChangeHandler}/>

      </div>
      <div className='order-summary'>
        <h2>Order Summary</h2>
        <div className='order-items'>
          {
            food_list.map((item)=>{
              if(cartItems[item._id]>0){return(
                <div className='order-item' id={item._id}>
                  <div className='item-name'>{item.name} x {cartItems[item._id]}</div>
                  <div className='item-price'>₹{item.price * cartItems[item._id]}</div>
                </div>
              )}
            })
          }
          <hr/>
          <div className='order-item total-line'>
            <span>Subtotal</span> 
            <span>₹{getTotalCartAmount()} </span>
          </div>
          <div className='order-item total-line'>
            <span>Delivery Fee</span>
            <span>₹{!getTotalCartAmount() ? 0 : 20}</span>
          </div>
          <div className='order-item total-line'>
            {discount>0 && <span>Discount</span>}
            {discount>0 && <span>₹-{discount}</span>}
          </div>
          <hr/>
          <div className='order-item total-line grand-total'>
            <strong>Total</strong>
            <strong>₹{!getTotalCartAmount()?0: getTotalCartAmount()+ 20 - (discount > 0 ? discount : 0)}</strong>
          </div>
          <button type='submit' className='payment-button'>Proceed to Payment</button>
        </div>
      </div>    
    </form>
  )
}

export default Order