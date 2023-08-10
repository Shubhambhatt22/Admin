import React, { useState, useEffect } from "react";
import "../dashboard/dashboard.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


const initialProductData = {
  name: "",
  price: "",
  description: "",
  stock: "",
  sold: "",
  image: "",
  categoryId: "",
};

const baseUrl ="https://ecom-backend-wdkk.onrender.com";

function Dashboard() {
  const [productData, setProductData] = useState(initialProductData);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const toast = useToast();

  const getCategoryOptions = async () => {
    const { data } = await axios.get(`${baseUrl}/categories/all` );
    const { categories } = data;
    setCategoryOptions(categories);
  };

  useEffect(() => {
    getCategoryOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((productData) => ({
      ...productData,
      [name]: value,
    }));
    console.log(productData.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const img=e.target.image.value
      const response = await axios.post(`${baseUrl}/products/add`, {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        stock: productData.stock,
        sold: productData.sold,
        image: img,
        categoryId:productData.categoryId
      });
      console.log(img)
      toast({
        title: "Product added succesfully .",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      console.log(response.data);

      setProductData(initialProductData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(productData);

  return (
    <div id="Dashboard">
      <form className="add_form" onSubmit={handleSubmit}>
        <div id="add_product">
          <div className="flex1_input">
            <label htmlFor="name">Name </label>
            <input
              id="update_input"
              type="text"
              placeholder="Add Product"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex1_input">
            <label htmlFor="categoryId">Category </label>
            <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
            >
              {categoryOptions?.map(({ _id, category }) => (
                <option value={_id} key={_id}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex1_input">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter the price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex1_input">
            <label htmlFor="stock">Stock </label>
            <input
              type="number"
              name="stock"
              placeholder="Enter the stock number"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="flex1_input ">
            <label htmlFor="image">Image </label>
            <input
              type="text"
              name="image"
              placeholder="Enter Image Url"
              className="imgupload"
              value={productData.image}
              onChange={handleChange}
            />
          </div>
          <div className="flex1_input">
            <label htmlFor="sold">Sold</label>

            <input
              type="number"
              name="sold"
              placeholder="Enter number of product sold"
              value={productData.sold}
              onChange={handleChange}
            />
          </div>
          <div className="flex1_input">
            <label htmlFor="description">Description </label>
            <textarea
              name="description"
              placeholder="Add Description"
              id="description"
              cols="53"
              rows="1"
              value={productData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
