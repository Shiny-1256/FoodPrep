import { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const images = [
  {
    src: '/header_1.png',
    category: 'Cake'
  },
  {
    src: '/header_2.png',
    category: 'Pasta'
  },
  {
    src: '/header_3.png',
    category: 'All'
  }
];

const Header = ({ category, setCategory }) => {
  const [curImgIndex, setCurImgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = images[curImgIndex];

  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${current.src})` }}
    >
      <div className="header-contents">
        <a href='#explore-menu'>
        <button onClick={() => setCategory(current.category)}>
          Order Now
        </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
