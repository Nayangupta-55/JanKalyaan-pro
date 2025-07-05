import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import axios from 'axios';

const SearchSection = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // ✅ Added back

  const filters = [
    { id: 'all', label: 'All Schemes', count: '50+' },
    { id: 'agriculture', label: 'Agriculture', count: '12+' },
    { id: 'health', label: 'Health', count: '8+' },
    { id: 'education', label: 'Education', count: '9+' },
    { id: 'employment', label: 'Employment', count: '10+' },
    { id: 'women', label: 'Women', count: '11+' }
  ];

  useEffect(() => {
    axios.get('https://jankalyaan-backend.onrender.com/api/scheme/getData')
      .then(res => setSchemes(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setErrorMsg('Please enter a scheme name.');
      return;
    }

    const matchedScheme = schemes.find(scheme =>
      scheme.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedScheme) {
      setErrorMsg('');
      window.location.href = matchedScheme.Link;
    } else {
      setErrorMsg('Scheme not found.');
    }
  };

  return (
    <section id="schemes" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-blue-600">Government Scheme</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our advanced search and filters to discover schemes tailored to your needs
          </p>
        </div>

        {/* Search Bar Block */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search schemes by name, keyword, or benefit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Empty space for symmetry */}
            <div className="hidden lg:block" />

            {/* Search Button */}
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center justify-center space-x-2"
              onClick={handleSearch}
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-sm border border-gray-200'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === filter.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {errorMsg && <p className="text-red-600 mt-4 font-medium text-center">{errorMsg}</p>}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Advanced Filters */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Filter className="text-blue-600 group-hover:text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Filters</h3>
                <p className="text-gray-600 text-sm">Filter by eligibility, benefits, application deadline, and more</p>
              </div>
            </div>
          </div>

          {/* Application Tracker */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <Calendar className="text-green-600 group-hover:text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Application Tracker</h3>
                <p className="text-gray-600 text-sm">Track your application status and get real-time updates</p>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Search className="text-orange-600 group-hover:text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Recommendations</h3>
                <p className="text-gray-600 text-sm">Get scheme suggestions based on your profile and needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
