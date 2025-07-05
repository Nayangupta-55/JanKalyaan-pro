import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jankalyaan-backend.onrender.com/api/scheme/getCategories') // ✅ Updated endpoint
      .then((res) => res.json())
      .then((data) => {
        const formatted = Array.isArray(data) ? data : [data];
        setCategories(formatted);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleClick = (id) => {
    if (!user) {
      alert("⚠️ Please login to view this scheme.");
      navigate('/login');
    } else {
      navigate(`/scheme/${id}`);
    }
  };

  return (
    <section
      id="categories"
      className="py-18 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Schemes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <div
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300 hover:cursor-pointer"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <div className="text-4xl mb-4">{item.Icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.Scheme}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
