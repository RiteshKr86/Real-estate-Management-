import React from 'react'
import {Link} from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../assets/villa1.jpeg'
import img2 from '../../assets/apt2.webp'
import img3 from '../../assets/land1.png'

const PopularProperties = () => {
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.titles}>
                <h5>Different types of properties</h5>
                <h2>Best type of properties for you</h2>
            </div>
            <div className={classes.properties}>
                <Link to={`/properties?type=Villa&continent=0&priceRange=1`} className={classes.property}>
                  <img src={img1} />
                  <div className={classes.quantity}>3 properties</div>
                  <h5>Villa properties</h5>
                </Link>
                <Link to={`/properties?type=Apartment&continent=1&priceRange=1`} className={classes.property}>
                  <img src={img2} />
                  <div className={classes.quantity}>2 properties</div>
                  <h5>Apartment properties</h5>
                </Link>
                <Link to={`/properties?type=Land&continent=2&priceRange=1`} className={classes.property}>
                  <img src={img3} />
                  <div className={classes.quantity}>0 properties</div>
                  <h5>Land properties</h5>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PopularProperties