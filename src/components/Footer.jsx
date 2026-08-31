import { Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { Github, Linkedin } from "lucide-react";
import { companyInfo } from "../constants/companyInfo";

const Footer = ({ hideFeedbackCta = false }) => {
  const extraLinks = useMemo(() => ([
    { label: "FAQ", href: "/faq" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Feedback", href: "/feedback" },
    { label: "Capabilities Deck", href: "/capabilities-deck" },
    { label: "Sample Dashboard", href: "/demo" },
  ]), []);

  return (
    <footer className="text-gray-200 mt-12 md:mt-16 pt-8 md:pt-12 pb-4" role="contentinfo">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6">
        <div className="pr-8">
          <h3 className="text-xl font-bold mb-3">Ondosoft</h3>
          <p className="text-sm leading-relaxed">
            Build, scale, and modernize software with an engineering team that operates like your own. Ondosoft is a US-based product studio in Lehi, Utah.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href={companyInfo.urls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-700 text-gray-300 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
              aria-label="Ondosoft on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={companyInfo.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-700 text-gray-300 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
              aria-label="Ondosoft on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/solutions" className="hover:underline">Solutions</Link>
            </li>
            <li>
              <Link to="/industries" className="hover:underline">Industries</Link>
            </li>
            <li>
              <Link to="/case-studies" className="hover:underline">Case Studies</Link>
            </li>
            <li>
              <Link to="/insights" className="hover:underline">Insights</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">Services</Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:underline">Portfolio</Link>
            </li>
            {extraLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/solutions/product-engineering" className="hover:underline">Product Engineering</Link></li>
            <li><Link to="/solutions/dedicated-teams" className="hover:underline">Dedicated Teams</Link></li>
            <li><Link to="/solutions/ai" className="hover:underline">AI &amp; GenAI</Link></li>
            <li><Link to="/solutions/legacy-modernization" className="hover:underline">Legacy Modernization</Link></li>
            <li><Link to="/solutions/cloud-devops" className="hover:underline">Cloud &amp; DevOps</Link></li>
            <li><Link to="/solutions/web-mobile" className="hover:underline">Web &amp; Mobile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2" aria-hidden="true">📍</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${companyInfo.address.streetAddress}, ${companyInfo.address.addressLocality}, ${companyInfo.address.addressRegion} ${companyInfo.address.postalCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {`${companyInfo.address.streetAddress}, ${companyInfo.address.addressLocality}, ${companyInfo.address.addressRegion} ${companyInfo.address.postalCode}`}
              </a>
            </li>
            <li className="flex items-start">
              <span className="mr-2" aria-hidden="true">📧</span>
              <a href={`mailto:${companyInfo.email}`} className="hover:underline">{companyInfo.email}</a>
            </li>
            <li className="flex items-start">
              <span className="mr-2" aria-hidden="true">📞</span>
              <a href={`tel:${companyInfo.phoneE164}`} className="hover:underline">{companyInfo.phoneDisplay}</a>
            </li>
          </ul>
          {!hideFeedbackCta && (
            <div className="mt-4 p-4 rounded-lg border border-orange-500/30 bg-neutral-800/60">
              <p className="text-orange-400 font-semibold text-sm">Got ideas? We&apos;re listening!</p>
              <p className="text-gray-200 text-xs mt-1 mb-2">We&apos;d love to hear your feedback and questions.</p>
              <Link
                to="/feedback"
                className="inline-block text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-2 rounded-md hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                Share your ideas
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 pb-4">
        <div className="flex flex-col items-center gap-2 text-xs text-gray-300 px-4 md:hidden">
          <div className="text-center">© {new Date().getFullYear()} Ondosoft. All rights reserved. Software Development &amp; SaaS Platforms</div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <Link to="/legal" className="hover:text-orange-500 hover:underline whitespace-nowrap">Legal</Link>
            <Link to="/nda" className="hover:text-orange-500 hover:underline whitespace-nowrap">NDA</Link>
            <Link to="/privacy-policy" className="hover:text-orange-500 hover:underline whitespace-nowrap">Privacy Policy</Link>
            <Link to="/licensing" className="hover:text-orange-500 hover:underline whitespace-nowrap">Licensing</Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <Link to="/terms-of-use" className="hover:text-orange-500 hover:underline whitespace-nowrap">Terms of Use</Link>
            <Link to="/accessibility" className="hover:text-orange-500 hover:underline whitespace-nowrap">Accessibility</Link>
            <Link to="/sitemap" className="hover:text-orange-500 hover:underline whitespace-nowrap">Site Map</Link>
          </div>
        </div>

        <div className="hidden md:flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300 px-4">
          <span className="whitespace-nowrap">© {new Date().getFullYear()} Ondosoft. All rights reserved. Software Development &amp; SaaS Platforms</span>
          <span aria-hidden="true">|</span>
          <Link to="/legal" className="hover:text-orange-500 hover:underline whitespace-nowrap">Legal</Link>
          <Link to="/nda" className="hover:text-orange-500 hover:underline whitespace-nowrap">NDA</Link>
          <Link to="/privacy-policy" className="hover:text-orange-500 hover:underline whitespace-nowrap">Privacy Policy</Link>
          <Link to="/licensing" className="hover:text-orange-500 hover:underline whitespace-nowrap">Licensing</Link>
          <Link to="/terms-of-use" className="hover:text-orange-500 hover:underline whitespace-nowrap">Terms of Use</Link>
          <Link to="/accessibility" className="hover:text-orange-500 hover:underline whitespace-nowrap">Accessibility</Link>
          <Link to="/sitemap" className="hover:text-orange-500 hover:underline whitespace-nowrap">Site Map</Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
