import React, { useEffect, useState } from 'react';
import {Filter, Calendar } from 'lucide-react';
import axios from 'axios';
import { Search, ArrowRight, Users, Award, TrendingUp, Sparkles } from 'lucide-react';

const Hero = () => {
  const [schemes, setSchemes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [errorMsg, setErrorMsg] = useState('');

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
    <section id="home" className="relative pt-16 pb-20 bg-gradient-government overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-diagonal-lines opacity-10"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full animate-float animation-delay-100 animate-morphing"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl animate-float animation-delay-300 hover-rotate"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full animate-float animation-delay-500"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-3xl animate-float animation-delay-700 animate-morphing"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 glass-morphism px-6 py-3 rounded-full text-blue-800 font-medium hover-glow">
                <Award size={20} className="animate-pulse-custom" />
                <span className="text-gradient">Trusted Government Portal</span>
                <Sparkles size={16} className="animate-text-glow" />
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block animate-text-glow">Discover</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-blue-300 to-green-300 animate-gradient-shift">
                  Government Schemes
                </span>
                <span className="block text-white/90">Made Easy</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                Find and apply for government schemes designed for your welfare. 
                Access benefits, subsidies, and opportunities - all in one place with our advanced AI-powered recommendations.
              </p>
            </div>

            {/* Advanced Search Bar */}
            <div className="card-advanced p-3 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="flex-1 flex items-center space-x-3 px-4">
                  <Search className="text-blue-600 animate-pulse-custom" size={24} />
                  <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for schemes, benefits, or categories..."
                    className="w-full py-4 outline-none text-gray-700 placeholder-gray-400 text-lg focus-ring"
                  />
                </div>
                <button className="btn-primary px-8 py-4 rounded-2xl flex items-center space-x-3 shadow-lg hover-scale">
                 <span onClick={handleSearch} className="font-semibold text-lg">Search</span>

                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center space-x-3 glass-morphism px-4 py-2 rounded-full hover-scale">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-custom"></div>
                <span className="font-medium">50+ Active Schemes</span>
              </div>
              <div className="flex items-center space-x-3 glass-morphism px-4 py-2 rounded-full hover-scale">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-custom animation-delay-200"></div>
                <span className="font-medium">10+ Beneficiaries</span>
              </div>
              <div className="flex items-center space-x-3 glass-morphism px-4 py-2 rounded-full hover-scale">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse-custom animation-delay-400"></div>
                <span className="font-medium">Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Illustration */}
          <div className="relative animate-fade-in-right animation-delay-300 perspective-1000">
            <div className="relative z-10 gpu-accelerated">
              {/* Main Dashboard Card */}
              <div className="card-advanced hover-lift preserve-3d">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gradient">Popular Schemes</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="text-green-500 animate-pulse-custom" size={24} />
                      <span className="text-sm text-green-600 font-semibold">+15% this month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover-lift animation-delay-100 hover-glow">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center animate-pulse-custom">
                        <Users className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">PM Kisan Yojana</p>
                        <p className="text-gray-600">Agricultural support scheme</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">₹6,000/year</p>
                        <p className="text-xs text-green-600 font-medium">✓ Active</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover-lift animation-delay-200 hover-glow">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center animate-pulse-custom animation-delay-200">
                        <Award className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">Ayushman Bharat</p>
                        <p className="text-gray-600">Health insurance coverage</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">₹5L coverage</p>
                        <p className="text-xs text-green-600 font-medium">✓ Active</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover-lift animation-delay-300 hover-glow">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center animate-pulse-custom animation-delay-400">
                        <TrendingUp className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">PM Mudra Yojana</p>
                        <p className="text-gray-600">Business development loans</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">Up to ₹10L</p>
                        <p className="text-xs text-green-600 font-medium">✓ Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Application Success Rate</span>
                      <span className="text-sm font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-shimmer" style={{width: '98.5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-3xl animate-float animation-delay-100 hover-rotate"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-2xl animate-float animation-delay-500 animate-morphing"></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-orange-600/30 rounded-full animate-float animation-delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;