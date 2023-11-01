import { useRef, useState } from "react";
import Product from "./Product.jsx";

const App = () => {
  const [products, setProducts] = useState([
    {
      id: "Product-11",
      path: "/images/image-11.jpeg",
      order: 1,
    },
    {
      id: "Product-2",
      path: "/images/image-2.webp",
      order: 2,
    },
    {
      id: "Product-3",
      path: "/images/image-3.webp",
      order: 3,
    },
    {
      id: "Product-4",
      path: "/images/image-4.webp",
      order: 4,
    },
    {
      id: "Product-5",
      path: "/images/image-5.webp",
      order: 5,
    },
    {
      id: "Product-6",
      path: "/images/image-6.webp",
      order: 6,
    },
    {
      id: "Product-7",
      path: "/images/image-7.webp",
      order: 7,
    },
    {
      id: "Product-8",
      path: "/images/image-8.webp",
      order: 8,
    },
    {
      id: "Product-9",
      path: "/images/image-9.webp",
      order: 9,
    },
    {
      id: "Product-10",
      path: "/images/image-10.jpeg",
      order: 10,
    },

    {
      id: "Product-1",
      path: "/images/image-1.webp",
      order: 11,
    },
  ]);
  const [dragId, setDragId] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);

  //functions to handle drag and drop
  const handleDrag = (e) => {
    setDragId(e.currentTarget.id);
  };
  const handleDrop = (e) => {
    const dragBox = products.find((product) => product.id === dragId);
    const dropBox = products.find(
      (product) => product.id === e.currentTarget.id
    );

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newProductsState = products.map((product) => {
      if (product.id === dragId) {
        product.order = dropBoxOrder;
      }
      if (product.id === e.currentTarget.id) {
        product.order = dragBoxOrder;
      }
      return product;
    });

    setProducts(newProductsState);
  };

  return (
    <div className="h-screen bg-slate-200 flex justify-center items-center">
      <div className=" max-w-6xl mx-auto p-8 lg:w-[60%] ">
        <div className="bg-slate-50 rounded-lg">
          <div className=" p-5 border-b border-gray-400">
            <h3 className="font-bold">
              {!selectedProducts.length
                ? "Gallery"
                : `${selectedProducts.length + " Filed Selected"}`}
            </h3>
          </div>
          <div className="grid grid-cols-5 gap-5 p-7">
            {products
              .sort((a, b) => a.order - b.order)
              .map((product) => (
                <Product
                  key={product.id}
                  order={product.order}
                  productId={product.id}
                  path={product.path}
                  handleDrop={handleDrop}
                  handleDrag={handleDrag}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              ))}
            <div className="border-2 border-gray-300 rounded-lg bg-gray-300 flex flex-col justify-center items-center gap-5 cursor-pointer">
              <img
                 className="w-6"
                src="https://www.svgrepo.com/show/457965/img-box.svg"
                alt="img"
              />
               <p className="text-sm font-bold">Add Images</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
