import { useContext,useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
    discount,
    setDiscount
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const hasItems = food_list.some((food) => cartItems[food._id] > 0);
  const [promoCode,setPromoCode]=useState('');
  const [promoApply,setPromoApply]=useState(false);
  const handlePromo = () =>{
    if(promoCode.trim().toUpperCase()==='FOOD10'){
      setDiscount(10);
      setPromoApply(true);
    }else{
      setDiscount(0)
      setPromoApply(false);
    }
  }
  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <br />
      <hr />

      {hasItems ? (
        <>
          {food_list.map((food) => {
            if (cartItems[food._id] > 0) {
              return (
                <div className="cart-items-item" key={food._id}>
                  <img src={`${url}/image/${food.image}`} alt="food-img" />
                  <p>{food.name}</p>
                  <p>₹{food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>₹{cartItems[food._id] * food.price}</p>
                  <div className="food-item-counter cart-counter">
                    <img
                      onClick={() => removeFromCart(food._id)}
                      src={assets.remove_icon_red}
                      alt="minus"
                    />
                    <p>{cartItems[food._id]}</p>
                    <img
                      onClick={() => addToCart(food._id)}
                      src={assets.add_icon_green}
                      alt="add"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{!getTotalCartAmount() ? 0 : 20}</p>
              </div>
              <hr />
              {discount>0 && (
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>-₹{discount}</p>
                </div>
              )}
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{!getTotalCartAmount() ? 0 : getTotalCartAmount() + 20-discount}</p>
              </div>
              <button onClick={() => navigate("/order")}>
                Proceed to Checkout
              </button>
            </div>

            <div className="cart-promocode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter promo code" value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} disabled={promoApply}/>
                <button type="button" onClick={handlePromo} disabled={promoApply}>{promoApply ? "Applied" : "Apply"}</button>
                
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <Link to="/" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
