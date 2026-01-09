import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  User,
  Building,
  MessageCircle,
  X,
  Sparkles,
  Send,
  Clock,
  Globe,
  Zap,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add a slight delay for animation
    await new Promise((r) => setTimeout(r, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "hello@innovate.co",
      subtitle: "Response within 2 hours",
      color: "blue"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      subtitle: "24/7 support available",
      color: "purple"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "San Francisco, CA",
      subtitle: "Visit our HQ",
      color: "orange"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Time Zone",
      value: "PST (UTC-8)",
      subtitle: "Global team coverage",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Get in Touch
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Let's Create</span>
            <span className="text-blue-600 ml-3">Together</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your vision with us. We're here to bring your ideas to life with expertise and passion.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-500 mt-1">Quick ways to reach us</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300"
                  >
                    <div className={`p-3 rounded-lg bg-${item.color}-50`}>
                      <div className={`text-${item.color}-600`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                      <p className="font-medium text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                    <p className="text-sm text-gray-600">Client Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      <span className="text-2xl">&lt;</span>2h
                    </div>
                    <p className="text-sm text-gray-600">Avg. Response Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Team Available</p>
                    <p className="text-sm text-gray-500">Online now • 24/7 Support</p>
                  </div>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. Our team will contact you within 2 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                    >
                      Send Another Message
                    </button>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                      Track Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you promptly.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Building className="w-5 h-5" />
                        </div>
                        <input
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company Name (Optional)"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-gray-400">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <textarea
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                          placeholder="Tell us about your project, questions, or ideas..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          Your information is secure and encrypted
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors"
        >
          {showChat ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-500">Available now</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="text-xs font-medium text-blue-600">AI</div>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                  <p className="text-gray-800">Hello! How can I assist you today? 😊</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;