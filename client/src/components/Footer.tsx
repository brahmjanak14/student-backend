import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-white">Canada Study Visa</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for Canada study visa eligibility assessment and guidance.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-home">
                  Home
                </a>
              </li>
              <li>
                <a href="/eligibility" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-eligibility">
                  Check Eligibility
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:info@canadastudyvisa.com" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-email">
                  info@canadastudyvisa.com
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-phone">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-gray-400" data-testid="text-footer-address">
                  Toronto, Ontario, Canada
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex gap-3 justify-center md:justify-start">
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p data-testid="text-footer-copyright">
              © {new Date().getFullYear()} Canada Study Visa. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors" data-testid="link-footer-privacy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors" data-testid="link-footer-terms">
                Terms of Service
              </a>
              <a href="/admin/login" className="hover:text-white transition-colors" data-testid="link-footer-admin">
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
