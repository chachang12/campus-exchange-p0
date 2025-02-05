const Footer = () => {
    return (
      <footer className="bg-[#1F1F1F] text-white p-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <p className="text-sm">Copyright © 2025 CampusExchange. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;