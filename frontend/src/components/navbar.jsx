import { useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { ChevronDown } from "lucide-react";

const navMenus = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/#projects" },
  {
    name: "Events",
    path: "/#events",
    dropdown: [
      { name: "Upcoming Events", path: "/#events" },
      { name: "Gallery", path: "/#gallery" },
    ],
  },
  { name: "Reviews & Rating", path: "/reviews" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const handleDropdownItemClick = (path) => {
    // Navigate to the hash section
    window.location = path;

    // Scroll to the element
    setTimeout(() => {
      const element = document.querySelector(
        path.split("#")[1] ? `#${path.split("#")[1]}` : path
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center font-bold">
              AI
            </div>
            <span className="text-xl font-semibold text-gray-800">
              AI Solutions
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navMenus.map((menu, index) => {
              if (menu.dropdown) {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none">
                      <span>{menu.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={10}
                      className="w-48"
                    >
                      {menu.dropdown.map((item, itemIndex) => (
                        <DropdownMenuItem
                          key={itemIndex}
                          onClick={() => handleDropdownItemClick(item.path)}
                          className="cursor-pointer text-base text-gray-600 hover:text-gray-800"
                        >
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              // Render regular NavLink
              return (
                <NavLink
                  key={index}
                  to={menu.path}
                  className={({ isActive }) =>
                    !isActive || menu.path.includes("#")
                      ? "text-gray-600 hover:text-gray-800 transition-colors"
                      : "text-gray-800 font-medium"
                  }
                  end={menu.path === "/"}
                >
                  {menu.name}
                </NavLink>
              );
            })}
          </nav>

          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
