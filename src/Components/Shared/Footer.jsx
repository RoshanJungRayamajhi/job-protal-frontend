import React from 'react'

const Footer = () => {
  const socialLinks = [
    {
      icon: "fab fa-facebook",
      url: "https://facebook.com"
    },
    {
      icon: "fab fa-linkedin",
      url: "https://linkedin.com"
    },
    {
      icon: "fab fa-instagram", 
      url: "https://instagram.com"
    }
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <i className={`${link.icon} text-2xl`}></i>
            </a>
          ))}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
  return (
    <div>
      
    </div>
  )
}

export default Footer
