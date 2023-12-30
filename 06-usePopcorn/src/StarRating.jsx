import React, { useState } from "react";
// import PropTypes from "prop-types";
const stars = {
  display: "flex",
  gap: "5px",
};
const ratingStar = {
  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  gap: "20px",
};
// StarRating.propTypes = {
//   maxRating: PropTypes.number,
//   size: PropTypes.number,
//   color: PropTypes.string,
//   className: PropTypes.string,
//   message: PropTypes.array,
//   onhandelRating: PropTypes.func,
//   defaultRating: PropTypes.number,
// };
const StarRating = ({
  maxRating = 5,
  size = 48,
  color = "black",
  className = "",
  message = [],
  onhandelRating,
  defaultRating = 0,
}) => {
  const [ratingNum, setRatingNum] = useState(defaultRating);
  const [temRatingNum, setTemRatingNum] = useState(0);

  return (
    <div style={ratingStar} className={className}>
      <div style={stars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            size={size}
            color={color}
            onRating={() => {
              setRatingNum(i + 1);
              onhandelRating && onhandelRating(i + 1);
            }}
            onMouseIn={() => setTemRatingNum(i + 1)}
            onMouseOut={() => setTemRatingNum(0)}
            key={i}
            full={temRatingNum ? i + 1 <= temRatingNum : i + 1 <= ratingNum}
          />
        ))}
      </div>
      <h3>
        {message.length === maxRating
          ? message[temRatingNum ? temRatingNum - 1 : ratingNum - 1]
          : temRatingNum || ratingNum || " "}
      </h3>
    </div>
  );
};

function Star({ onRating, onMouseIn, onMouseOut, full, size, color }) {
  const star = { height: size, width: size, cursor: "pointer" };
  return (
    <span
      style={star}
      onClick={onRating}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarRating;

/*import React, { useState } from "react";
import "./StarRating.css";
const StarRating = () => {
  const [rateNum, setRateNum] = useState(0);
  const [open, setOpen] = useState(false);
  const numOfStar = 10;
  return (
    <div className="StarContainer">
      <div className="head">
        <div className="stars">
          {Array.from({ length: numOfStar }, (_, a) => a + 1).map((num) =>
            num <= rateNum ? (
              <span
                style={{ color: "yellow" }}
                key={num}
                onClick={() => setOpen(true)}
                onMouseEnter={() => setRateNum(num)}
              >
                &#9733;
              </span>
            ) : (
              <span
                key={num}
                onClick={() => setOpen(true)}
                onMouseEnter={() => setRateNum(num)}
              >
                &#9733;
              </span>
            )
          )}
        </div>
        <p className="num">{rateNum}</p>
      </div>
      {open ? <button>+Add to List</button> : ""}
    </div>
  );
};

export default StarRating;
*/
