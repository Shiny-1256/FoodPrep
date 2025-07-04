import {React} from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react'

const List = ({url}) => {
  const [list,setList] = useState([])
  const fetchList = async () => {
    try{
      const response = await axios.get(`${url}/api/food/list`)
     
      setList(response.data.data)
    }catch(error){
      console.log(error.message);
    }
  }
  
  useEffect(()=>{
    fetchList()
  },[list])
  
  const removeFood = async(id)=>{
    try{
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`)
      toast.success(response.data.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              });
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className='list flex-col'>
      <p className='list-title'>Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>

        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/image/${item.image}`} alt="food-img" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default List