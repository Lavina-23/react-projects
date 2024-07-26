import React, { useCallback, useEffect, useState } from "react";

interface ProdProps {
  id: number;
  thumbnail: string;
  title: string;
}

const LoadMore: React.FC = () => {
  const [products, setProducts] = useState<ProdProps[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);

        console.log(result.products);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchProducts();
  }, [count, fetchProducts]);

  if (loading) {
    return <div>Loading data !</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-[20px] p-20">
      <h1 className="text-5xl font-bold text-black">Load More</h1>
      <div className="grid grid-cols-4 justify-items-center gap-[10px]">
        {products && products.length
          ? products.map((prod) => (
              <div
                key={prod.id}
                className="border p-[20px] flex flex-col gap-[10px] w-full"
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-[200px] h-[200px]"
                />
                <p>{prod.title}</p>
              </div>
            ))
          : null}
      </div>
      <div>
        <button onClick={() => setCount(count + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default LoadMore;
