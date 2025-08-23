import React from "react";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";

const SingleCours = ({ id, title, slug, description, thumbnail }) => {
  return (
    <Link
      to={`/course/${slug}`}
      key={id}
      className="course-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative overflow-hidden">
        <img
          src={"http://localhost:5000/uploads/" + thumbnail.split("\\")[1]}
          alt={title}
          className="course-img w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold truncate text-md mb-2 text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <span className="text-gray-600 text-sm ml-2">4.7 (2,345)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">lessons: 25</span>

          <span className="text-sm text-gray-500">
            <i className="far fa-clock mr-1"></i> 32 hours
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleCours;
