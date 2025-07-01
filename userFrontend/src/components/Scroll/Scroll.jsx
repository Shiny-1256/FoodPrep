import { useState } from 'react';
import './Scroll.css';

const Scroll = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <div className="scroll-toggle" onClick={() => setOpen(!open)}>
        📜
      </div>
      {open && (
        <div className="scroll">
          <div className="scroll-header">
            <strong>What's New✨</strong>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <ul className="scroll-body">
            <li>🍕Integrated a Quiz feature to capture and respond to users cravings</li>
            <li>🍕Implemented a slider-style header with category buttons for quick navigation</li>
            <li>🍕Enabled promo code functionality (e.g., FOOD10 for ₹10 off)</li>
            <li>🍕Added a Reorder feature, allowing users to easily place previous orders again</li>
            <li>🍕Made the entire page responsive across key breakpoints: 470px, 750px, and 1000px.</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Scroll;
