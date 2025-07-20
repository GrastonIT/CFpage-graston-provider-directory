import { HiHome } from "react-icons/hi";
import { HiInformationCircle, HiMapPin, HiStar } from "react-icons/hi2";
import { Link, useLocation } from "react-router";

export default function Aside() {
  const location = useLocation();

  const links = [
    {
      icon: HiHome,
      title: "Home",
      to: "/home",
    },
    {
      icon: HiMapPin,
      title: "Provider Map",
      to: "/providers",
    },
    {
      icon: HiStar,
      title: "Enhanced Directory",
      to: "/providers-enhanced",
    },
    {
      icon: HiInformationCircle,
      title: "About Graston",
      to: "/about",
    },
  ];

  return (
    <aside className="p-4 h-svh">
      <div className="bg-gradient-to-b from-[var(--graston-dark)] to-[var(--graston-gray)] p-6 rounded-2xl h-full shadow-2xl border border-[var(--graston-slate)]">
        <div className="flex flex-col space-y-4">
          {/* Logo/Brand */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
              <img
                src="https://grastontechnique.com/wp-content/uploads/2021/11/Graston-Technique-Official-Logo-1.png"
                alt="Graston Technique"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback to initials if logo fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-12 h-12 hidden items-center justify-center text-white font-bold text-lg">
                GT
              </div>
            </div>
            <h2 className="text-white text-sm font-semibold opacity-90">Graston Technique</h2>
            <p className="text-[var(--graston-light-blue)] text-xs opacity-75">Provider Directory</p>
          </div>

          {links.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;

            return (
              <Link
                key={`aside-link-${link.to}`}
                to={link.to}
                className="group relative"
                title={link.title}
              >
                <div className={`
                  relative p-4 rounded-xl transition-all duration-200 
                  ${isActive
                    ? 'bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] shadow-lg'
                    : 'hover:bg-[var(--graston-slate)] hover:shadow-md'
                  }
                `}>
                  <Icon className={`
                    w-6 h-6 transition-colors duration-200
                    ${isActive
                      ? 'text-white'
                      : 'text-[var(--graston-light-blue)] group-hover:text-[var(--graston-coral)]'
                    }
                  `} />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-[var(--graston-dark)] text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-[var(--graston-slate)] whitespace-nowrap">
                      {link.title}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[var(--graston-dark)] border-l border-b border-[var(--graston-slate)] rotate-45"></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Status indicator */}
          <div className="mt-auto pt-8">
            <div className="text-center">
              <div className="w-3 h-3 bg-[var(--graston-coral)] rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-[var(--graston-light-blue)] text-xs">System Online</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
