import { Link, useLocation } from "wouter";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [location] = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Check Eligibility", path: "/eligibility" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile: Centered Logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <Link href="/" className="flex items-center hover-elevate rounded-lg px-2 py-1" data-testid="link-home">
              <img 
                src="/src/assets/images/pratham-international.png" 
                alt="Pratham International" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop: Logo on left */}
          <div className="hidden md:block">
            <Link href="/" className="flex items-center hover-elevate rounded-lg px-2 py-1" data-testid="link-home">
              <img 
                src="/src/assets/images/pratham-international.png" 
                alt="Pratham International" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop only */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary hover-elevate rounded-lg px-3 py-2 ${
                  location === item.path 
                    ? "text-primary font-semibold" 
                    : "text-gray-600"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop only */}
          <div className="hidden md:block">
            <Link 
              href="/eligibility" 
              className="bg-primary text-primary-foreground hover-elevate active-elevate-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md"
              data-testid="button-start-assessment"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}