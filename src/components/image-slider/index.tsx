import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

interface Props {
  url: string;
  limit: number;
  page: number;
}

interface ImageProps {
  id: string;
  download_url: string;
}

const ImageSlider: React.FC<Props> = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(
    async (getUrl: string) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${getUrl}?https://picsum.photos/v2/list?page=${page}&limit=${limit}`
        );
        const data = await response.json();

        if (data) {
          setImages(data);
          setLoading(false);
        }
      } catch (e) {
        if (e instanceof Error) {
          setErrorMsg(e.message);
          setLoading(false);
        } else {
          setErrorMsg("An unknown error occurred");
        }
      }
    },
    [limit, page]
  );

  function handlePrev() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url, fetchImages]);

  console.log(images);

  if (loading) {
    return <div>Loading data ! Please wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error occured ! {errorMsg}</div>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-[600px] h-[450px] gap-5 pt-20 mb-32">
      <h1 className="text-5xl font-bold text-black">Image Slider</h1>
      <BsArrowLeftCircleFill
        className="absolute w-[2rem] h-[2rem] text-white left-[1rem]"
        onClick={handlePrev}
      />
      {images && images.length
        ? images.map((img, i) => (
            <img
              className={
                currentSlide === i ? "rounded-sm w-full h-full" : "hidden"
              }
              key={img.id}
              src={img.download_url}
              alt={img.download_url}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        className="absolute w-[2rem] h-[2rem] text-white right-[1rem]"
        onClick={handleNext}
      />
      <span className="flex absolute bottom-[1rem]">
        {images && images.length
          ? images.map((_, i) => (
              <button
                className={
                  currentSlide === i
                    ? "bg-white h-4 w-4 rounded-full border-none outline-none mx-[0.2rem] cursor-pointer"
                    : "bg-gray-500 h-4 w-4 rounded-full border-none outline-none mx-[0.2rem] cursor-pointer"
                }
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
              />
            ))
          : null}
      </span>
    </div>
  );
};

export default ImageSlider;
