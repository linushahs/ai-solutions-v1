import { Building, Clock, MapPin, Users } from "lucide-react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { EventService } from "../api";
import { formatEventDate } from "../utils";

// Events Hero Section
const EventsHero = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Events & Workshops
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join us at industry-leading conferences, workshops, and networking
          events. Connect with AI experts, learn about cutting-edge
          technologies, and transform your digital workplace experience.
        </p>
      </div>
    </section>
  );
};

// Event Card Component for Upcoming Events
const UpcomingEventCard = ({ event }) => {
  const { month, day, year, event_time } = formatEventDate(
    event.event_date,
    event.end_date
  );

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="p-8">
        <div className="flex items-start space-x-6">
          {/* Date Badge */}
          <div className="bg-gray-800 text-white rounded-lg p-4 text-center min-w-[80px] flex-shrink-0">
            <div className="text-xs font-medium opacity-75 uppercase">
              {month}
            </div>
            <div className="text-2xl font-bold">{day}</div>
            <div className="text-xs opacity-75">{year}</div>
          </div>

          {/* Event Details */}
          <div className="flex-1">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 capitalize bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-3">
                {event.event_type}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event_time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event.attendees}+ attendees</span>
              </div>
              {event.extra_information && (
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{event.extra_information}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Event Card Component for Past Events with Photos
const PastEventCard = ({ event }) => {
  const { month, day, year, event_time } = formatEventDate(
    event.event_date,
    event.end_date
  );

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-8">
        <div className="flex items-start space-x-6 mb-6">
          {/* Date Badge */}
          <div className="bg-gray-800 text-white rounded-lg p-4 text-center min-w-[80px] flex-shrink-0">
            <div className="text-xs font-medium opacity-75 uppercase">
              {month}
            </div>
            <div className="text-2xl font-bold">{day}</div>
            <div className="text-xs opacity-75">{year}</div>
          </div>

          {/* Event Details */}
          <div className="flex-1">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 capitalize bg-gray-200 text-gray-600 text-xs font-semibold rounded-full mb-3">
                {event.event_type}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event_time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{event.attendees}+ attendees</span>
              </div>
              {event.extra_information && (
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{event.extra_information}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Photos Gallery */}
        {event.images && event.images.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Event Photos
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {event.images.map((event, index) => (
                <div key={index} className="rounded-lg h-32 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.caption || `Event photo ${index + 1}`}
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Upcoming Events Section
export const UpcomingEventsSection = ({ className }) => {
  const upcomingEventsStatic = [
    {
      event_date: "2025-11-15T09:00:00Z",
      end_date: "2025-11-15T18:00:00Z",
      title: "AI Innovation Summit 2025",
      event_type: "Conference",
      description:
        "Explore the future of AI in digital workplace. Join industry leaders and innovators for a day of insights, demonstrations, and networking opportunities.",
      location: "London, UK",
      time: "9:00 AM - 6:00 PM",
      attendees: "500+",
      extra_information: "Keynote by Dr. Sarah Chen",
    },
    {
      event_date: "2025-11-22T14:00:00Z",
      end_date: "2025-11-22T20:00:00Z",
      title: "Tech Startup Showcase",
      event_type: "Networking",
      description:
        "Networking event showcasing promising startups and their innovative AI solutions. Connect with founders, investors, and technology enthusiasts.",
      location: "Manchester, UK",
      time: "2:00 PM - 8:00 PM",
      attendees: "300+",
      extra_information: "Panel Discussion",
    },
    {
      event_date: "2025-12-05T10:00:00Z",
      end_date: "2025-12-05T16:00:00Z",
      title: "AI-Powered Analytics Workshop",
      event_type: "Workshop",
      description:
        "Hands-on workshop diving deep into predictive analytics and machine learning. Learn practical skills to implement AI in your organization.",
      location: "Birmingham, UK",
      time: "10:00 AM - 4:00 PM",
      attendees: "150+",
      extra_information: "Workshop by AI Solutions Team",
    },
  ];

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await EventService.getUpcomingEvents();
      setUpcomingEvents(response || upcomingEventsStatic);
    })();
  }, []);

  return (
    <section id="upcoming" className={twMerge("py-20 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600">
            Join us at industry conferences and workshops
          </p>
        </div>

        <div className="space-y-6">
          {upcomingEvents?.map((event, index) => (
            <UpcomingEventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Past Events Section
const PastEventsSection = () => {
  const pastEventsStatic = [
    {
      event_date: "2025-03-15T09:00:00Z",
      end_date: "2025-03-15T17:00:00Z",
      title: "Enterprise AI Implementation Summit",
      event_type: "Conference",
      description:
        "Two-day conference focused on enterprise-scale AI deployment strategies. Featured case studies from Fortune 500 companies and hands-on sessions.",
      location: "Edinburgh, UK",
      time: "9:00 AM - 5:00 PM",
      attendees: "600+",
      extra_information: "Multiple Industry Speakers",
      images: [{ image: "/gallery-3.jpeg" }, { image: "/gallery-4.jpeg" }],
    },
    {
      event_date: "2024-12-05T10:00:00Z",
      end_date: "2024-12-05T18:00:00Z",
      title: "Machine Learning Masterclass",
      event_type: "Workshop",
      description:
        "Intensive workshop covering advanced machine learning techniques and real-world applications. Participants built and deployed ML models.",
      location: "Bristol, UK",
      time: "10:00 AM - 6:00 PM",
      attendees: "120+",
      extra_information: "Led by Prof. James Mitchell",
      images: [{ image: "/gallery-1.jpeg" }, { image: "/gallery-2.jpeg" }],
    },
    {
      event_date: "2024-11-10T08:30:00Z",
      end_date: "2024-11-10T16:00:00Z",
      title: "AI in Healthcare Symposium",
      event_type: "Conference",
      description:
        "Exploring AI applications in healthcare and medical diagnostics. Featured presentations from leading healthcare AI researchers and practitioners.",
      location: "Cambridge, UK",
      time: "8:30 AM - 4:00 PM",
      attendees: "400+",
      extra_information: "Healthcare Industry Leaders",
      images: [
        { image: "/gallery-2.jpeg" },
        { image: "/gallery-3.jpeg" },
        { image: "/gallery-4.jpeg" },
      ],
    },
  ];

  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await EventService.getPastEvents();
      setPastEvents(response || pastEventsStatic);
    })();
  }, []);

  return (
    <section id="past" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Past Events</h2>
          <p className="text-xl text-gray-600">
            Check out our previous events and success stories
          </p>
        </div>

        <div className="space-y-6">
          {pastEvents?.map((event, index) => (
            <PastEventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EventsHero />
      <UpcomingEventsSection />
      <PastEventsSection />
      <Footer />
    </div>
  );
};

export default EventsPage;
