import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Loader } from 'lucide-react';

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
    <div className="bg-[#EDEDED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#171717] mb-6 text-center">Contact Us</h2>
        <div className="bg-white shadow-md rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {status.success && <p className="text-green-600 text-center">{status.success}</p>}
            {status.error && <p className="text-red-600 text-center">{status.error}</p>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#444444]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DA0037] ${
                  errors.name ? 'border-red-500' : 'border-[#444444]'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#444444]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DA0037] ${
                  errors.email ? 'border-red-500' : 'border-[#444444]'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#444444]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className={`mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DA0037] ${
                  errors.message ? 'border-red-500' : 'border-[#444444]'
                }`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#DA0037] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA0037] disabled:opacity-50"
              >
                {status.loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : null}
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-[#DA0037] mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-[#171717]">Address</h3>
                <p className="text-sm text-[#444444]">123 Main Street, Colombo, Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-[#DA0037] mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-[#171717]">Email</h3>
                <p className="text-sm text-[#444444]">info@travel.lk</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-[#DA0037] mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-[#171717]">Phone</h3>
                <p className="text-sm text-[#444444]">+94 11 123 4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
