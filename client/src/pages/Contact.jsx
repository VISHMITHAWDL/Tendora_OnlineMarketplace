import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Loader, Clock, ArrowRight } from 'lucide-react';
import contactImage from '../assets/Contact_Assets/woman-paying-clothes-store.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errs.email = 'Invalid email format.';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ loading: true, success: '', error: '' });
    try {
      await axios.post('/api/contact', formData);
      setStatus({ loading: false, success: 'Message sent successfully!', error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: 'Failed to send. Please try again later.' });
    }
  };

  return (
    <div className="bg-[#171717] min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={contactImage} 
          alt="Customer at clothing store" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 to-[#171717]/60 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#EDEDED] mb-4">Contact Us</h1>
            <p className="text-lg text-[#EDEDED]/90 max-w-xl">
              We're here to help with any questions about our products or services.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-[#181818] border border-[#444444] rounded-xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-semibold text-[#EDEDED] mb-6">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[#DA0037] p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#EDEDED]">Our Location</h3>
                    <p className="text-sm text-[#EDEDED]/70 mt-1">123 Main Street, Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#DA0037] p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#EDEDED]">Email Us</h3>
                    <p className="text-sm text-[#EDEDED]/70 mt-1">hello@tendora.com</p>
                    <p className="text-sm text-[#EDEDED]/70">support@tendora.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#DA0037] p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#EDEDED]">Call Us</h3>
                    <p className="text-sm text-[#EDEDED]/70 mt-1">+94 11 123 4567</p>
                    <p className="text-sm text-[#EDEDED]/70">+94 77 890 1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#DA0037] p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#EDEDED]">Business Hours</h3>
                    <p className="text-sm text-[#EDEDED]/70 mt-1">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-sm text-[#EDEDED]/70">Saturday: 10AM - 4PM</p>
                    <p className="text-sm text-[#EDEDED]/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#181818] border border-[#444444] rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#EDEDED] mb-6">Send Us a Message</h2>
              
              {status.success && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                  <p className="text-green-400 font-medium">{status.success}</p>
                </div>
              )}
              
              {status.error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 font-medium">{status.error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#EDEDED]/80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`block w-full border rounded-lg px-4 py-3 bg-[#171717] text-[#EDEDED] placeholder-[#EDEDED]/50 focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-[#444444]'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#EDEDED]/80 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`block w-full border rounded-lg px-4 py-3 bg-[#171717] text-[#EDEDED] placeholder-[#EDEDED]/50 focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-[#444444]'
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#EDEDED]/80 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={`block w-full border rounded-lg px-4 py-3 bg-[#171717] text-[#EDEDED] placeholder-[#EDEDED]/50 focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition-all duration-300 ${
                      errors.message ? 'border-red-500' : 'border-[#444444]'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="inline-flex items-center justify-center py-3 px-8 rounded-lg text-white bg-[#DA0037] hover:bg-[#b8002e] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA0037] shadow-lg hover:shadow-xl disabled:opacity-50 font-medium"
                  >
                    {status.loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
