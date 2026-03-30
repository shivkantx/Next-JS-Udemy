import React from "react";

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:bg-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:bg-white transition"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm text-gray-600 mb-1"
            >
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              id="message"
              name="message"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:bg-white transition resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gray-900 text-white font-medium 
            hover:bg-gray-800 transition duration-200 shadow-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
