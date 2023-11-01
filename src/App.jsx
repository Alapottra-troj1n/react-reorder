import { useRef, useState } from "react";
import Product from "./Product.jsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const App = () => {
  const [animationParent] = useAutoAnimate();
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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dragId, setDragId] = useState();

  console.log(products);

  // Filter out the products that have an id that is not in the selectedProducts state
  const handleRemoveSelected = () => {
    const updatedProducts = products.filter(
      (product) => !selectedProducts.includes(product.id)
    );

    setProducts(updatedProducts);

    setSelectedProducts([]);
  };

  //functions to handle drag and drop
  const handleDrag = (e) => {
    setDragId(e.currentTarget.id);
  };
  const handleDrop = (e) => {
    const dragProduct = products.find((product) => product.id === dragId);
    const dropProduct = products.find(
      (product) => product.id === e.currentTarget.id
    );

    const dragProductOrder = dragProduct.order;
    const dropProductOrder = dropProduct.order;

    const newProductsState = products.map((product) => {
      if (product.id === dragId) {
        product.order = dropProductOrder;
      }
      if (product.id === e.currentTarget.id) {
        product.order = dragProductOrder;
      }
      return product;
    });

    setProducts(newProductsState);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const newProduct = {
        id: `Product-${products.length + 1}`,
        path: URL.createObjectURL(file),
        order: products.length + 1,
      };

      setProducts([...products, newProduct]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className=" max-w-6xl mx-auto p-8 lg:w-[60%]   ">
        <div className="bg-slate-50 rounded-lg ">
          <div className=" p-5 border-b border-gray-400 flex justify-between items-center">
            <h3 className="font-bold">
              {!selectedProducts.length
                ? "Gallery"
                : `${selectedProducts.length + " Filed Selected"}`}
            </h3>

            {selectedProducts.length ? (
              <button
                onClick={handleRemoveSelected}
                className="text-red-400 text-sm font-bold"
              >
                Delete File
              </button>
            ) : (
              ""
            )}
          </div>
          <div
            ref={animationParent}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-7 "
          >
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 flex flex-col justify-center items-center gap-5 cursor-pointer min-h-[150px]">
              <label htmlFor="file-input" className="cursor-pointer flex flex-col justify-center items-center gap-3">
                <img
                  className="w-6"
                  src="https://www.svgrepo.com/show/457965/img-box.svg"
                  alt="img"
                />
                <p className="text-sm font-bold">Add Images</p>
              </label>
              <input
                type="file"
                id="file-input"
                className="hidden"
                name="file-handle"
                onChange={handleFile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
