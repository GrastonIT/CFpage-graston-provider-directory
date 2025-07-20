import { Link, useLocation } from "react-router";
import { HiHome } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";
import { HiUserGroup, HiStar, HiInformationCircle } from "react-icons/hi2";

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
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl h-full shadow-2xl border border-slate-700">
        <div className="flex flex-col space-y-4">
          {/* Logo/Brand */}
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <HiStar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white text-sm font-semibold opacity-90">Graston Directory</h2>
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                    : 'hover:bg-slate-700 hover:shadow-md'
                  }
                `}>
                  <Icon className={`
                    w-6 h-6 transition-colors duration-200
                    ${isActive 
                      ? 'text-white' 
                      : 'text-slate-400 group-hover:text-blue-400'
                    }
                  `} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap">
                      {link.title}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 border-l border-b border-slate-700 rotate-45"></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          
          {/* Status indicator */}
          <div className="mt-auto pt-8">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-slate-400 text-xs">System Online</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
