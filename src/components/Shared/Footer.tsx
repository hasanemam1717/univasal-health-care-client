import Link from "next/link";
import React from "react";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: "Services",
      links: [
        { name: "Primary Care", href: "/services/primary-care" },
        { name: "Specialty Care", href: "/services/specialty-care" },
        { name: "Emergency Care", href: "/services/emergency" },
        { name: "Telemedicine", href: "/services/telemedicine" },
        { name: "Health Checkups", href: "/services/checkups" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Health Blog", href: "/blog" },
        { name: "Patient Guides", href: "/guides" },
        { name: "FAQ", href: "/faq" },
        { name: "Support", href: "/support" },
        { name: "Medical Library", href: "/library" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "News & Events", href: "/news" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "HIPAA Compliance", href: "/hipaa" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "fab fa-facebook-f",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "fab fa-twitter",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "fab fa-instagram",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: "fab fa-linkedin-in",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: "fab fa-youtube",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">HealthCare Pro</h2>
                <p className="text-blue-200 text-sm">
                  Advanced Medical Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in healthcare. We provide comprehensive
              medical services with compassion, innovation, and excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for health tips and updates.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} HealthCare Pro. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2 text-green-400">
                <i className="fas fa-shield-alt"></i>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <i className="fas fa-stethoscope"></i>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <i className="fas fa-user-md"></i>
                <span>Certified Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-4">
            <i className="fas fa-ambulance text-white text-lg"></i>
            <span className="text-white font-semibold">
              Medical Emergency? Call 911 or visit your nearest emergency room.
            </span>
            <a
              href="tel:911"
              className="bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Call 911
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
