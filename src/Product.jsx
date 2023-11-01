const Product = ({
  path,
  productId,
  order,
  handleDrop,
  handleDrag,
  selectedProducts,
  setSelectedProducts,
}) => {


  const isProductSelected = selectedProducts.includes(productId); //to check if product is already selected

  const handleToggle = () => {

    if (selectedProducts.includes(productId)) {
      setSelectedProducts(
        selectedProducts.filter((product) => productId !== product)
      );
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`${
        order === 1 && "col-span-2 row-span-2  " //different size for featured image
      } cursor-pointer  rounded-xl border-2 border-gray-300 overflow-hidden hover:filter  transition-all
      ${isProductSelected ? "filter brightness-50" : "hover:brightness-75"}
      relative group`}
      draggable={true}
      id={productId}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="checkbox"
        name="checkebox"
        className={`absolute top-2 left-2 w-6 h-6 opacity-0 ${
          isProductSelected ? "opacity-100" : " group-hover:opacity-100"
        }`}
        checked={isProductSelected}
      />
      <img className="w-full" src={path} alt="product" />
    </div>
  );
};

export default Product;
