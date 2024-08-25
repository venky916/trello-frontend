import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-b-black text-white p-6 text-center font-manrope">
      <p>&copy; 2024 Your Task Management App</p>
      <div className="mt-4 space-y-2">
        <p className="text-t-white">Venkatesh Maliga</p>
        <p className="text-t-white">Email: <a href="mailto:venkateshsmsv1999@gmail.com" className="text-light-orange hover:text-orange transition duration-300">venkateshsmsv1999@gmail.com</a></p>
        <p className="text-t-white">LinkedIn: <a href="[Your LinkedIn URL]" className="text-light-orange hover:text-orange transition duration-300">LinkedIn Profile</a></p>
        <p className="text-t-white">GitHub: <a href="[Your GitHub URL]" className="text-light-orange hover:text-orange transition duration-300">GitHub Profile</a></p>
      </div>
    </footer>
  );
};

export default Footer;
