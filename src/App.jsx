
import { useState, useEffect } from 'react';
import { BsSun, BsMoon, BsChatLeftDots } from 'react-icons/bs';
import { FaUpload, FaMoneyCheckAlt, FaHandshake } from 'react-icons/fa';
import { MdSecurity, MdSpeed, MdAttachMoney } from 'react-icons/md';
import { AiOutlineGlobal } from 'react-icons/ai';
import { motion } from 'framer-motion';
import ChatWidget from './components/ChatWidget.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.licenseType) errors.licenseType = 'Please select a license type';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      });
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  return (
    <div data-theme = {darkMode ? "dark" : "light"} className="min-h-screen transition-colors duration-300 ">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 bg-base-100 right-0 z-10  shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="SoftSell Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">SoftSell</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full cursor-pointer hover:bg-base-content/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon />}
            </button>
            <a href="#contact" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br  ">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Turn Unused Software into <span className="text-blue-600 ">Cash</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-8 text-base-content/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            SoftSell helps businesses sell their unused software licenses quickly and at the best possible price.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="#contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg inline-block transition-colors shadow-lg hover:shadow-xl"
            >
              Sell My Licenses
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 rounded-lg bg-base-300 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full inline-flex justify-center mb-4">
                <FaUpload className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">1. Upload License</h3>
              <p className="text-base-content/80">Submit your software license details through our secure portal.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-base-300 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full inline-flex justify-center mb-4">
                <MdAttachMoney className="text-green-600 dark:text-green-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Valuation</h3>
              <p className="text-base-content/80">Receive a competitive market valuation within 24 hours.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-base-300 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full inline-flex justify-center mb-4">
                <FaMoneyCheckAlt className="text-purple-600 dark:text-purple-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">3. Get Paid</h3>
              <p className="text-base-content/80">Accept our offer and receive payment within 5 business days.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 ">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 ">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="p-6  bg-base-300 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <MdSpeed className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Fast Process</h3>
              <p className="text-base-content/70">From submission to payment in as little as 7 days.</p>
            </motion.div>
            
            <motion.div 
              className="p-6  bg-base-300 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-green-600 dark:text-green-400 mb-4">
                <MdAttachMoney className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Best Rates</h3>
              <p className="text-base-content/70">We offer up to 70% of original license value, beating competitors.</p>
            </motion.div>
            
            <motion.div 
              className="p-6  bg-base-300 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-red-600 dark:text-red-400 mb-4">
                <MdSecurity className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Secure Transfer</h3>
              <p className="text-base-content/70">Fully compliant, legal license transfers with complete documentation.</p>
            </motion.div>
            
            <motion.div 
              className="p-6  bg-base-300 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                <AiOutlineGlobal className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Global Network</h3>
              <p className="text-base-content/70">Access to thousands of buyers worldwide for any software type.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 ">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 ">Customer Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="p-6 bg-base-content/10 rounded-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-300 mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold ">Anirudhhan Ashok</h4>
                  <p className="text-sm text-base-content/70">CTO, Acme Solutions</p>
                </div>
              </div>
              <p className="text-base-content/70 italic">
                "SoftSell helped us recover $50,000 from unused Adobe and Microsoft licenses during our downsize. The process was incredibly smooth, and their valuation was 25% higher than competitors."
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-base-content/10 rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center text-xl font-bold text-purple-700 dark:text-purple-300 mr-4">
                  SM
                </div>
                <div>
                  <h4 className="font-semibold ">Sarah Miller</h4>
                  <p className="text-sm text-base-content/70">Finance Director, TechGrow Inc.</p>
                </div>
              </div>
              <p className="text-base-content/70 italic">
                "After our merger, we had hundreds of duplicate software licenses. SoftSell turned what would have been a complete write-off into a significant recovery. Their expertise in enterprise software licensing was invaluable."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 px-4 bg-base-300">
        <div className="container mx-auto max-w-3xl bg-base-100 py-5 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 ">Get a Free Valuation</h2>
          
          <div className=" p-6 md:p-8 rounded-lg shadow-lg">
            {formSubmitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 ">Thank You!</h3>
                <p className="text-base-content/70">We've received your information and will contact you within 24 hours with a valuation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Anirudhhan Ashok"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border bg-white rounded-md focus:ring-2focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="anirudhhan@company.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1" htmlFor="company">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.company ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Acme Inc."
                    />
                    {formErrors.company && <p className="mt-1 text-sm text-red-600">{formErrors.company}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1" htmlFor="licenseType">
                      License Type *
                    </label>
                    <select
                      id="licenseType"
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.licenseType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select License Type</option>
                      <option value="Microsoft">Microsoft (Office, Windows, Server)</option>
                      <option value="Adobe">Adobe (Creative Cloud, Acrobat)</option>
                      <option value="Autodesk">Autodesk (AutoCAD, Revit)</option>
                      <option value="Oracle">Oracle Database</option>
                      <option value="VMware">VMware</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.licenseType && <p className="mt-1 text-sm text-red-600">{formErrors.licenseType}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-base-content/70 mb-1" htmlFor="message">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Tell us about your software licenses (quantity, version, purchase date, etc.)"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit for Valuation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 dark:bg-gray-950 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img src="/logo.png" alt="SoftSell Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-white">SoftSell</span>
              </div>
              <p className="text-gray-400 mt-2">© 2025 SoftSell. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-4 rounded-full shadow-lg transition-all"
          aria-label="Chat with us"
        >
          <BsChatLeftDots className="text-xl" />
        </button>
      </div>

      {/* Chat Widget */}
      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
    </div>
  );
}

export default App;