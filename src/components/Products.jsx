import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const result = await response.json();
      setData(result.products);
      setFilter(result.products);
      setLoading(false);
    };
    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  const Loading = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <div className="col-md-4 mb-4" key={i}>
          <Skeleton height={400} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-4">
        <button className="btn btn-outline-dark m-2" onClick={() => setFilter(data)}>
          All
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            className="btn btn-outline-dark m-2"
            onClick={() => filterProduct(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filter.map((product) => (
        <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
          <div className="card h-100 text-center">
            <img
              className="card-img-top p-3"
              src={product.thumbnail}
              alt={product.title}
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title.substring(0, 20)}...</h5>
              <p className="card-text">{product.description.substring(0, 90)}...</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <h2 className="text-center display-5">Latest Products</h2>
      <hr />
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
