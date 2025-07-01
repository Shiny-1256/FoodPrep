import {useState} from 'react'
import './Order.css'
import axios from 'axios'
import { useEffect } from 'react'
import {assets} from '../../assets/assets'

const Orders = ({url}) => {
  const [orders,setOrders]=useState([])
  const fetchAllOrder = async()=>{
    try {
      const response=await axios.get(`${url}/api/order/list`)
      setOrders(response.data.data)
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    fetchAllOrder()
  },[])

  const statusHandler = async(e,orderId)=>{
    try {
      const response = await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
      await fetchAllOrder()
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
              <h3 className='order-title'>Orders</h3>
      <div className='screen order'>

        <div className='order-list'>
          {orders.map((order,index)=>{
            return(
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt='parcel-icon'/>
                <div>
                  <p className='order-item-food'>{
                    order.items.map((item,itemIndex)=>{
                      if(itemIndex===order.items.length-1){
                        return item.name+" x "+item.quantity
                      }else{
                        return item.name+" x "+item.quantity+", "
                      }
                    })
                    }</p>
                    <p className='order-item-name'>{
                      order.address.first_name+" "+order.address.last_name
                      }</p>
                    <div className='order-item-address'>
                      <p>{order.address.street},</p>
                      <p>{order.address.city+", "+order.address.state+", "+order.address.zip_code
                        +", "+order.address.country}
                      </p>
                      <p>{order.address.phone}</p>
                    </div>
                    <p>Items: {order.items.length}</p>
                    <p>₹{order.amount}</p>
                    <select className="order-item-select" onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                      <option selected value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders