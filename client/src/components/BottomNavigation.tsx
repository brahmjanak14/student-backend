import { Link, useLocation } from "wouter";
import { Home, FileText, Info, Phone } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { 
      label: "Home", 
      path: "/", 
      icon: Home 
    },
    { 
      label: "Assessment", 
      path: "/eligibility", 
      icon: FileText 
    },
    { 
      label: "About", 
      path: "/about", 
      icon: Info 
    },
    { 
      label: "Contact", 
      path: "/contact", 
      icon: Phone 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors ${
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
              data-testid={`bottom-nav-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}