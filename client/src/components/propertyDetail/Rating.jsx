import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import classes from './Rating.module.css';

const Rating = ({ onRate }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <label key={value}>
            <input
              type="radio"
              name="rating"
              value={value}
              onClick={() => handleClick(value)}
            />
            <FaStar
              className={classes.star}
              color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
