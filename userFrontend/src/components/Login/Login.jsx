import {useState} from 'react'
import './Login.css'
import {assets} from '../../assets/assets'
import {useContext} from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import{toast,Flip} from 'react-toastify'


const Login = ({setShowLogin}) => {
    const [curState,setCurState]=useState("Sign in")
    const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
    });

    const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    };
    const {url,token,setToken} = useContext(StoreContext)
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        let newUrl=url;
        if(curState==="Sign in")
          newUrl+='/api/user/login'
        else
          newUrl+='/api/user/register'
        try{
          const response = await axios.post(newUrl,data)
          if(curState==="Sign up"){
            toast.success('Account create successfully! Please Log in', {
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
            setCurState("Sign in")
          }else{
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
          }
        }
        catch(error){
          toast.error(error.response?.data?.message || "An error occurred", {
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
        }
    }


  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onSubmitHandler}>
            <div className='login-popup-title'>
                <h2>{curState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
            </div>
            <div className='login-popup-inputs'>
                {curState!=="Sign in"?
            <input name='name' type="text" placeholder='Your Name' required value={data.name} onChange={onChangeHandler}/> :
            <></>   
            }
            <input name ='email' type='email' placeholder='Email' required value={data.email} onChange={onChangeHandler}/>
            <input name='password' type='password' placeholder='Password' required value={data.password} onChange={onChangeHandler}/>
            </div>
            <button className='btn'>
                {curState}
            </button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>
                    By continuing, I agree to terms & privacy policy
                </p>
            </div>
            {
                curState==="Sign in"? <p> Create a new account?
                    <span onClick={()=>setCurState("Sign up")}>Sign up</span>
                </p>:
                <p> Already have an account?
                    <span onClick={()=>setCurState("Sign in")}>Login here</span>
                </p>
            }
        </form>
    </div>
  )
}

export default Login