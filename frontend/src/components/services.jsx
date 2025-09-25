import { ArrowRight, BarChart3, Bot, Zap } from "lucide-react";
import { twMerge } from "tailwind-merge";

const ServicesSection = ({ className, showMoreBtn }) => {
  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Virtual Assistant",
      description:
        "An intelligent assistant that handles customer inquiries and provides real-time support for enhanced productivity.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Prototyping",
      description:
        "Fast-track your innovation with workflows that accelerate design and engineering processes for faster innovation.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Predictive Analytics",
      description:
        "Real-impact digital employee experience that drives better business decisions and outcomes.",
    },
  ];

  return (
    <section
      id="core-services"
      className={twMerge("py-20 bg-gray-50", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our AI-Powered Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive AI solutions designed to transform your digital
            workplace experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-800 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {showMoreBtn && (
          <div className="text-center mt-12">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              See All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
