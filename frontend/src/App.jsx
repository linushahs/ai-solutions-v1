import { ArrowRight, Clock, MapPin } from "lucide-react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ServicesSection from "./components/services";
import { Link } from "react-router";
import { UpcomingEventsSection } from "./events";

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Innovating the Future of Digital Employee Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AI Solutions leverages cutting-edge AI to assist industries with
              software solutions that proactively address digital workplace
              challenges.
            </p>
            <div className="flex space-x-4">
              <Link
                to={"/services"}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center overflow-hidden justify-center">
            <img
              src="https://au.insight.com/content/dam/insight-web/sitesections/solutions/images/digital-eye-ai-concept.jpg"
              alt="Explore Solutions"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Trusted By Section Component
const TrustedBySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-gray-600 mb-12">
          Companies worldwide rely on AI Solutions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {new Array(4).fill(0).map((company, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg py-0 px-4 flex items-center justify-center"
            >
              <img
                src={`/logo_${index + 1}.png`}
                className="w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Projects Component
const FeaturedProjects = () => {
  const projects = [
    {
      title: "Enterprise AI Dashboard",
      description:
        "A comprehensive analytics platform for Fortune 500 company.",
      status: "Completed 2024",
      image: "/project1.jpg",
    },
    {
      title: "Smart Workflow Optimizer",
      description:
        "Streamlined operations reducing 80% of manufacturing overhead.",
      status: "Completed 2024",
      image: "/project2.png",
    },
    {
      title: "Predictive Maintenance System",
      description:
        "IoT-powered predictive analytics for industrial equipment monitoring.",
      status: "Completed 2025",
      image: "/project3.webp",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600">
            Showcasing our successful AI implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="rounded-lg h-48 mb-6 flex items-center overflow-hidden justify-center">
                <img
                  src={project.image}
                  alt="Project"
                  className="object-cover size-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const galleryItems = [
    "/gallery-1.jpeg",
    "/gallery-2.jpeg",
    "/gallery-3.jpeg",
    "/gallery-4.jpeg",
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">
            Behind the scenes at AI Solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg h-48 flex items-center justify-center overflow-hidden"
            >
              <img
                src={item}
                alt="Gallery"
                className="object-cover size-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <FeaturedProjects />
      <UpcomingEventsSection className={"bg-gray-50"}/>
      <Gallery />
      <Footer />
    </div>
  );
};

export default App;
