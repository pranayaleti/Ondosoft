import { useState, useRef, lazy, Suspense, useEffect, useMemo } from 'react';
import SEOHead from '../components/SEOHead';
import { getCanonicalUrl, companyInfo } from '../constants/companyInfo';

// Lazy load heavy components
const CalendlyModal = lazy(() => import('../components/CalendlyModal'));
const Footer = lazy(() => import('../components/Footer'));
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import PMT from '../assets/PMT_optimized.webm';
import { checklistItems } from '../constants/data';
import { caseStudies } from '../constants/caseStudies';

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Lazy load video when it comes into viewport
  useEffect(() => {
    if (!videoContainerRef.current) return undefined;

    let loadTimeoutId = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoInView(true);
          loadTimeoutId = setTimeout(() => {
            setShouldLoadVideo(true);
            loadTimeoutId = null;
          }, 500);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
      if (loadTimeoutId) clearTimeout(loadTimeoutId);
    };
  }, []);

  // Auto-play video when it's loaded and in view
  useEffect(() => {
    if (shouldLoadVideo && videoRef.current && isVideoInView) {
      videoRef.current.play().catch(() => {
        // Auto-play failed (user preference), that's okay
      });
    }
  }, [shouldLoadVideo, isVideoInView]);

  const toggleFullScreen = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen(); // Firefox
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen(); // Chrome, Safari
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen(); // IE/Edge
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const portfolioProjects = caseStudies;

  const currentProject = portfolioProjects[selectedProject];

  const nextProject = () => {
    setSelectedProject((prev) => (prev + 1) % portfolioProjects.length);
  };

  const prevProject = () => {
    setSelectedProject((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const canonical = getCanonicalUrl('/portfolio');
  const structuredData = useMemo(() => {
    const itemListElement = portfolioProjects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": project.title,
      "description": project.challenge,
      "url": `${canonical}#project-${project.id}`
    }));

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#collection`,
          "name": "Ondosoft Portfolio",
          "url": canonical,
          "description": "Software development portfolio showcasing SaaS, web, mobile, and analytics projects delivered by Ondosoft."
        },
        {
          "@type": "ItemList",
          "@id": `${canonical}#projects`,
          "name": "Ondosoft Portfolio Projects",
          "itemListOrder": "Descending",
          "itemListElement": itemListElement
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": companyInfo.urls.website
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Portfolio",
              "item": canonical
            }
          ]
        }
      ]
    };
  }, [canonical, portfolioProjects]);

  return (
    <>
      <SEOHead
        title="Portfolio | Ondosoft Software Development Projects & Success Stories"
        description="Explore our portfolio of successful software development projects. See how we've helped businesses scale with custom web applications, SaaS platforms, and mobile solutions. Real projects, real results."
        keywords="portfolio, software development projects, web application portfolio, SaaS development examples, mobile app portfolio, client projects, development showcase, project results"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      
      <div>
        {/* Hero Section */}
        <section className="py-20 border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our <span className="text-orange-500">Portfolio</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Real projects, real results. See how we've helped businesses transform their operations 
                with custom software solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                See Our Work in <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">Action</span>
              </h2>
              <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-4 py-2">
                Real projects delivered for real businesses
              </span>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
              <div ref={videoContainerRef} className="p-2 w-full lg:w-1/2">
                {shouldLoadVideo ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onClick={toggleFullScreen}
                    className="rounded-lg w-full border border-orange-700 shadow-sm shadow-orange-400 mx-auto cursor-pointer"
                    onLoadedData={() => {
                      // Video loaded, can now play
                      if (videoRef.current && isVideoInView) {
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                  >
                    <source src={PMT} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <button
                    type="button"
                    className="rounded-lg w-full border border-orange-700 shadow-sm shadow-orange-400 mx-auto cursor-pointer bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center"
                    style={{ aspectRatio: '16/9', minHeight: '300px' }}
                    onClick={() => setShouldLoadVideo(true)}
                    aria-label="Play portfolio video"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold mb-2">Click to play video</p>
                      <p className="text-neutral-400 text-sm">See our work in action</p>
                    </div>
                  </button>
                )}
              </div>
              <div className="pt-12 w-full lg:w-1/2">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex mb-12">
                    <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                      <CheckCircle />
                    </div>
                    <div>
                      <h3 className="mt-1 mb-2 text-xl text-white">{item.title}</h3>
                      <p className="text-md text-neutral-400 mb-4">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Navigation */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Previous project"
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <span className="text-gray-300">
                  {selectedProject + 1} of {portfolioProjects.length}
                </span>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Next project"
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(index)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                    selectedProject === index
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 hover:border-orange-300 bg-gray-800'
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{project.client} • {project.industry}</p>
                    <p className="text-gray-400 text-xs">
                      Built with {project.technologies.length > 2
                        ? project.technologies.slice(0, -1).join(', ') + ' & ' + project.technologies[project.technologies.length - 1]
                        : project.technologies.join(' & ')}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <div className="font-semibold text-white">{project.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Team:</span>
                      <div className="font-semibold text-white">{project.team}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Project Detail */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Details */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">{currentProject.title}</h2>
                  <div className="flex items-center space-x-6 text-gray-300 mb-6">
                    <span>{currentProject.client}</span>
                    <span>•</span>
                    <span>{currentProject.industry}</span>
                    <span>•</span>
                    <span>{currentProject.duration}</span>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">The Challenge</h3>
                    <p className="text-gray-300 leading-relaxed">{currentProject.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Our Solution</h3>
                    <p className="text-gray-300 leading-relaxed">{currentProject.solution}</p>
                  </div>

                  {currentProject.screenshots?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Project Screenshots</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentProject.screenshots.map((src, index) => (
                          <img
                            key={`${currentProject.id}-${index}`}
                            src={src}
                            alt={`${currentProject.title} screenshot ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-700"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Results & Testimonial */}
              <div>
                {/* Results */}
                <div className="bg-gray-800/50 rounded-2xl p-8 text-white mb-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-6">Results</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(currentProject.results).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-3xl font-bold mb-2">{value}</div>
                        <div className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">Before vs After</h3>
                  <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div>
                      <h4 className="font-semibold text-red-400 mb-4 text-center">Before</h4>
                      <div className="space-y-3">
                        {Object.entries(currentProject.beforeAfter.before).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="font-semibold text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-4 text-center">After</h4>
                      <div className="space-y-3">
                        {Object.entries(currentProject.beforeAfter.after).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="font-semibold text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-300 italic mb-6">
                    "{currentProject.testimonial}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-white">{currentProject.author}</div>
                    <div className="text-gray-400">{currentProject.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-gray-700/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Your <span className="text-orange-500">Success Story?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's discuss your project and see how we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="min-h-[48px] bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center border border-gray-600"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="min-h-[48px] border-2 border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-colors flex items-center justify-center"
              >
                Schedule a meeting
              </button>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-32" />}>
          <Footer />
        </Suspense>
        {isModalOpen && (
          <Suspense fallback={null}>
            <CalendlyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default PortfolioPage;
