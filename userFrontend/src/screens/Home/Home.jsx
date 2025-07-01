import {useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Quiz from '../../components/Quiz/Quiz'
import Scroll from '../../components/Scroll/Scroll'
const Home = () => {
  const [category,setCategory]=useState('All')
  return (
    <div>
        <Header category={category} setCategory={setCategory}/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
        <Scroll />
        <Quiz category={category} setCategory={setCategory} />
    </div>
  )
}

export default Home