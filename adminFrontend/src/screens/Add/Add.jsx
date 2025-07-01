import {useState} from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false);

    const [data, setData] = useState({
      name: "",
      description: "",
      price: "",
      category: "Salad"
    });

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };

    const onSubmitHandler = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);
      try{
        const response =  await axios.post(`${url}/api/food/add`,formData)
        toast(response.data.message)
        setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      }catch(error){
        console.log(error.message)
      }
      
    };
  return (
    <div className='screen'>
      <div className='container'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
            </label>
            <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input type="text" name="name" placeholder="Type here" value={data.name}
            onChange={onChangeHandler}/>
          </div>

          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea 
              value={data.description}
              onChange={onChangeHandler}
              name="description" 
              rows="3" 
              placeholder="Write content here" 
              required>
            </textarea>
          </div>

          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select name="category" value={data.category}
              onChange={onChangeHandler}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Product Price</p>
              <input type="number" name="price" placeholder="₹150" required value={data.price}
  onChange={onChangeHandler}/>
            </div>
          </div>

          <button type="submit" className="add-btn">ADD</button>

        </form>
      </div>
    </div>
  )
}

export default Add