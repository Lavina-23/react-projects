import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentId: number) {
    setRating(getCurrentId);
  }
  function handleMouseEnter(getCurrentId: number) {
    setHover(getCurrentId);
  }
  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center max-h-full min-h-[100vh] pt-[20px]">
      <h1 className="text-5xl font-bold text-black">Star Rating</h1>
      <div className="flex flex-row gap-4">
        {[...Array(noOfStars)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
              className={
                index <= (hover || rating) ? "text-yellow-400" : "text-black"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
