import { createContext ,useEffect,useState} from "react";
export const StoreContext = createContext();
import axios from 'axios';

const StoreContextProvider = ({children}) => {
  const url='http://localhost:5000'
  const [token, setToken] = useState("");
  const[cartItems,setCartItems]=useState({});
  const [food_list,setFoodList]=useState([]);
  const[discount,setDiscount]=useState(0);

  const fetchFoodList=async()=>{
    const response=await axios.get(url+'/api/food/list')
    setFoodList(response.data.data)
  } 
  useEffect(()=>{
    async function loadData(){
      await fetchFoodList()
      const storedToken = localStorage.getItem("token");
       if(storedToken){
            setToken(storedToken);
            await loadCartData(storedToken);
        }
    }
    loadData();
  },[])

  const loadCartData=async(token)=>{
    const response=await axios.get(`${url}/api/cart/get`,{headers:{token}})
    setCartItems(response.data.cartData)
  }

  const addToCart=async(itemId)=>{
    if(!cartItems[itemId])
      setCartItems({...cartItems,[itemId]:1});
    else 
      setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
    if(token){
      try {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      } catch (error) {
        console.log(error);
      }
    }
  }
  const removeFromCart=async(itemId)=>{
    setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
    if(token){
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`,{headers:{token}})
      } catch (error) {
        console.log(error);
      }
    }
  }
  const getTotalCartAmount=()=>{
    let total=0;
    for(let item in cartItems){
      if(cartItems[item]>0){
        let itemInfo=food_list.find(food=>food._id===item)
        total+=itemInfo.price*cartItems[item]
      }
    }
    return total;
  }
    const contextValues={
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken,discount,setDiscount
    }
  return (
    <StoreContext.Provider value={contextValues}>
        {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider