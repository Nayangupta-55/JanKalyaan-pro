import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Hash,
  FileText,
  Info,
  Globe,
  Share2,
} from 'lucide-react';

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch scheme details from API
  useEffect(() => {
    const fetchScheme = async () => {
      try {
        setLoading(true);
        const res = await axios.post('https://jankalyaan-backend.onrender.com/api/schemes/idReqGetScheme', { id });
        setSchemes(res.data);
        console.log('full data',res.data);
        
      } catch (err) {
        console.error('Error fetching scheme:', err);
        setError('Failed to load scheme details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  // Save scheme to localStorage
  const handleSaveScheme = (scheme) => {
    const existingSchemes = JSON.parse(localStorage.getItem("savedSchemes")) || [];

    const alreadySaved = existingSchemes.some((s) => s.id === scheme._id);
    if (alreadySaved) {
      alert("Scheme already saved!");
      return;
    }

    const schemeData = {
      id: scheme._id,
      title: scheme.Description,
      description: scheme.Description2,
      benefit: scheme.benefit || "N/A",
      beneficiaries: scheme.beneficiaries || "N/A",
      deadline: scheme.deadline || "N/A",
      location: scheme.location || "Pan India",
    };

    const updatedSchemes = [...existingSchemes, schemeData];
    localStorage.setItem("savedSchemes", JSON.stringify(updatedSchemes));
    alert("Scheme saved successfully!");

    // Optional: navigate to saved schemes page
    // navigate('/saved-schemes');
  };

  // UI states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 text-xl mb-4">⚠</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-gray-400 text-xl mb-4">📄</div>
          <p className="text-gray-700">No scheme found with ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            Back to Schemes
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Hash size={16} />
            <span>Scheme ID: {id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {schemes.map((scheme, index) => (
            <div
              key={scheme._id || index}
              className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <h1 className="text-3xl font-bold mb-2 leading-tight">
                  {scheme.Description}
                </h1>
                <div className="flex items-center gap-4 text-indigo-100">
                  <div className="flex items-center gap-1">
                    <Hash size={16} />
                    <span className="text-sm">ID: {scheme.ID}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {new Date(scheme.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Overview */}
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Info className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Quick Overview</h3>
                      <p className="text-blue-800 leading-relaxed">{scheme.Description2}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-400">
                  <div className="flex items-start gap-3">
                    <FileText className="text-gray-600 mt-1" size={20} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-3">Detailed Information</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {scheme.Description3}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                  {scheme.Link && (
                    <a
                      href={scheme.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Globe size={18} />
                      Visit Official Website
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={() => handleSaveScheme(scheme)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FileText size={18} />
                    Save Scheme
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      const shareText = `${scheme.Description}\n${scheme.Description2}\n${scheme.Link || window.location.href}`;
                      if (navigator.share) {
                        navigator.share({
                          title: scheme.Description,
                          text: scheme.Description2,
                          url: scheme.Link || window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        alert('Scheme details copied to clipboard!');
                      }
                    }}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                  >
                    <Share2 size={18} />
                    Share Scheme
                  </button>
                </div>

                {/* Footer Info */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Scheme ID:</span> {scheme.ID}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {new Date(scheme.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
