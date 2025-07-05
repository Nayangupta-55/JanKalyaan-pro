import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

const quickLinks = [
  { name: 'PMAY – Pradhan Mantri Awas Yojana', url: 'https://pmaymis.gov.in/' },
  { name: 'PM-KISAN – Pradhan Mantri Kisan Samman Nidhi', url: 'https://pmkisan.gov.in/' },
  { name: 'Sukanya Samriddhi Yojana', url: 'https://www.india.gov.in/sukanya-samriddhi-yojana' },
  { name: 'Ujjwala Yojana', url: 'https://www.pmuy.gov.in/' },
  { name: 'Digital India Mission', url: 'https://www.digitalindia.gov.in/' },
];

const governmentLinks = [
  { name: 'Ministry of Agriculture', url: 'https://agricoop.nic.in/' },
  { name: 'Ministry of Health', url: 'https://www.mohfw.gov.in/' },
  { name: 'Ministry of Education', url: 'https://www.education.gov.in/' },
  { name: 'Ministry of Employment', url: 'https://labour.gov.in/' },
  { name: 'Digital India', url: 'https://www.digitalindia.gov.in/' },
  { name: 'MyGov Portal', url: 'https://www.mygov.in/' }
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-17">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">JK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">JanKalyaan</h3>
                <p className="text-sm text-gray-400">Government of India</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Your trusted portal for discovering and applying to government schemes.
              Empowering citizens with easy access to welfare benefits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Government Portals</h4>
            <ul className="space-y-3">
              {governmentLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Helpline</p>
                  <p className="font-semibold">1800-XXX-XXXX</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Support</p>
                  <p className="font-semibold">nayan111155@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-semibold">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 JanKalyaan - Government of India. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">RTI</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
