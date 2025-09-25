import { Building, Users } from "lucide-react";

const Footer = () => {
  const footerSections = {
    Solutions: [
      "AI Virtual Assistant",
      "Rapid Prototyping",
      "Predictive Analytics",
      "Custom Development",
    ],
    Company: ["About Us", "Careers", "News & Press", "Partners"],
    Support: [
      "Help Center",
      "Documentation",
      "API Reference",
      "Community",
      "Terms of Service",
    ],
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-12">
          {/* Company Info */}
          <div className="md:w-[30%]">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white text-gray-900 rounded flex items-center justify-center font-bold">
                AI
              </div>
              <span className="text-xl font-semibold">AI Solutions</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Innovating the future of digital employee experience through
              cutting-edge AI solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Building className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Users className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex-wrap sm:flex-nowrap flex gap-10 sm:gap-0 justify-between">
            {/* Footer Links */}
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title} className="">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 AI Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
