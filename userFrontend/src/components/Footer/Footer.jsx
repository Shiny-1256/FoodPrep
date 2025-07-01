import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
  <div className="footer-content">
    <div className="footer-left">
      <img src={assets.logo} alt="" />
      <p>
       DishDive is your go-to destination for delicious meals delivered fresh to your doorstep. From local favorites to international cuisines, we partner with top restaurants to bring you quality food, fast delivery, and a seamless ordering experience.
      </p>
      <div className="footer-social-icons">
        <img src={assets.facebook_icon} alt="fb" />
        <img src={assets.twitter_icon} alt="twitter" />
        <img src={assets.linkedin_icon} alt="linkedin" />
      </div>
    </div>

    <div className="footer-center">
      <h2>Company</h2>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Courses</li>
        <li>Reviews</li>
      </ul>
    </div>

    <div className="footer-right">
      <h2>Get in touch</h2>
      <ul>
        <li>+91 12345 67890</li>
        <li>enquiry@fakemail.in</li>
      </ul>
    </div>
  </div>

  <hr />
  <p className='footer-cp'>Copyright 2025 © DishDive. All rights reserved.</p>
</div>

  )
}

export default Footer