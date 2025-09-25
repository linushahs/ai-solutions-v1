import React from "react";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Check,
  Building,
  Monitor,
  Heart,
  Cog,
  Users,
} from "lucide-react";
import ServicesSection from "../components/services";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router";
import CTASection from "../components/cta-section";

// Services Hero Section
const ServicesHero = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Solutions for Digital Excellence
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          Transform your digital employee experience with our cutting-edge AI
          solutions. From rapid prototyping to proactive issue resolution, we
          accelerate innovation across industries.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href={"#core-services"}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

// Detailed Service Sections
const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Virtual Assistant",
      description:
        "Our intelligent virtual assistant revolutionizes workplace communication by providing instant, contextual responses to user inquiries. Built with advanced natural language processing, it understands complex queries and delivers precise solutions.",
      points: [
        "24/7 intelligent support and query resolution",
        "Natural language processing for complex queries",
        "Integration with existing workplace tools",
      ],
    },
    {
      title: "Rapid AI Prototyping",
      description:
        "Accelerate your innovation cycle with our AI-driven prototyping platform. Transform ideas into functional prototypes in record time while maintaining cost-effectiveness and quality.",
      points: [
        "Automated design generation and optimization",
        "Cost-effective rapid iteration cycles",
        "Multi-platform compatibility testing",
      ],
    },
    {
      title: "Predictive Maintenance System",
      description:
        "Proactively monitor and enhance your digital employee experience with predictive analytics and real-time issue resolution. Our AI continuously learns and adapts to prevent disruptions.",
      points: [
        "Predictive issue identification and prevention",
        "Real-time performance monitoring",
        "Automated optimization recommendations",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50 space-y-20">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={index % 2 === 0 ? "" : "order-last"}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-4 mb-8">
                {feature.points.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Request Demo
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500">AI Assistant Interface</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// Industries We Serve Section
const IndustriesSection = () => {
  const industries = [
    { icon: <Building className="w-8 h-8" />, name: "Finance" },
    { icon: <Monitor className="w-8 h-8" />, name: "Technology" },
    { icon: <Heart className="w-8 h-8" />, name: "Healthcare" },
    { icon: <Cog className="w-8 h-8" />, name: "Manufacturing" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600">
            Our AI solutions are tailored to meet the unique challenges across
            various industries, driving innovation and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="bg-gray-100 hover:bg-gray-200 rounded-xl p-8 transition-colors">
                <div className="text-gray-700 mb-4 flex justify-center">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {industry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Services App Component
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      <ServicesSection className={"bg-white"} showMoreBtn={false} />
      <FeaturesSection />
      <IndustriesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default ServicesPage;
