import { memo } from "react";

const logos = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
];

const ClientLogos = () => {
  return (
    <section data-testid="client-logos-section" className="py-12 border-t border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium tracking-widest text-gray-500 uppercase mb-8">
          Built with the technologies that power the world's best products
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              data-testid={`logo-${logo.name.toLowerCase().replace(/[\s.]/g, '-')}`}
              className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.icon}
                alt={logo.name}
                className="h-10 w-10 grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                width="40"
                height="40"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ClientLogos);
