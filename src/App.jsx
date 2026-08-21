import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import NavigationLoader from "./components/NavigationLoader";
import SchemaMarkup from "./components/SchemaMarkup";
import PerformanceMonitor from "./components/PerformanceMonitor";
import ScriptOptimizer from "./components/ScriptOptimizer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/LoadingSpinner";
import { AuthProvider } from "./contexts/AuthContext";
import { initPerformanceOptimizations } from "./utils/performance.js";
import analyticsTracker from "./utils/analytics.js";
import UnifiedChatWidget from "./components/UnifiedChatWidget";
import InstallPrompt from "./components/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator";

// Lazy load page components for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NDAPage = lazy(() => import("./pages/NDAPage"));
const LicensingPage = lazy(() => import("./pages/LicensingPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const CapabilitiesDeckPage = lazy(() => import("./pages/CapabilitiesDeckPage"));
const DemoPage = lazy(() => import("./pages/DemoPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const PortalLayout = lazy(() => import("./pages/portal/PortalLayout"));
const PortalDashboard = lazy(() => import("./pages/portal/PortalDashboard"));
const SubscriptionsPage = lazy(() => import("./pages/portal/SubscriptionsPage"));
const CampaignsPage = lazy(() => import("./pages/portal/CampaignsPage"));
const AssetsPage = lazy(() => import("./pages/portal/AssetsPage"));
const InvoicesPage = lazy(() => import("./pages/portal/InvoicesPage"));
const TicketsPage = lazy(() => import("./pages/portal/TicketsPage"));
const NotificationsPage = lazy(() => import("./pages/portal/NotificationsPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const ClientsPage = lazy(() => import("./pages/admin/ClientsPage"));
const AdminCampaignsPage = lazy(() => import("./pages/admin/CampaignsPage"));
const AdminAssetsPage = lazy(() => import("./pages/admin/AssetsPage"));
const AdminTicketsPage = lazy(() => import("./pages/admin/TicketsPage"));
const AdminInvoicesPage = lazy(() => import("./pages/admin/InvoicesPage"));
const AdminNotificationsPage = lazy(() => import("./pages/admin/NotificationsPage"));
const ConsultationLeadsPage = lazy(() => import("./pages/admin/ConsultationLeadsPage"));
const AIConversationsPage = lazy(() => import("./pages/admin/AIConversationsPage"));
const EmailTemplatesPage = lazy(() => import("./pages/admin/EmailTemplatesPage"));

// Scroll to top component for route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      analyticsTracker.trackNavigation(prevPathnameRef.current, pathname, 'programmatic');
      analyticsTracker.trackPageView(pathname);
      prevPathnameRef.current = pathname;
    }

    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  
  // Initialize performance optimizations + analytics on idle, and tear both
  // down (analytics listeners, pending timers, load handler) on unmount so the
  // app can be remounted (React Strict Mode, tests) without leaking.
  useEffect(() => {
    initPerformanceOptimizations();

    const initAnalytics = () => analyticsTracker.init();
    let idleHandle = null;
    let fallbackTimeout = null;
    let loadHandler = null;

    if ('requestIdleCallback' in window) {
      idleHandle = requestIdleCallback(initAnalytics, { timeout: 3000 });
    } else if (document.readyState === 'complete') {
      fallbackTimeout = setTimeout(initAnalytics, 100);
    } else {
      loadHandler = () => {
        fallbackTimeout = setTimeout(initAnalytics, 100);
      };
      window.addEventListener('load', loadHandler);
    }

    return () => {
      if (idleHandle && 'cancelIdleCallback' in window) cancelIdleCallback(idleHandle);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (loadHandler) window.removeEventListener('load', loadHandler);
      analyticsTracker.cleanup();
    };
  }, []);

  // Prefetch public route chunks on idle so navigation feels instant, but keep
  // the timeout IDs so we can cancel them if the app unmounts before they fire.
  useEffect(() => {
    if (!('requestIdleCallback' in window)) return undefined;

    const timeoutIds = [];
    const idleHandle = requestIdleCallback(() => {
      const commonRoutes = [
        () => import('./pages/ServicesPage'),
        () => import('./pages/ContactPage'),
        () => import('./pages/AboutPage'),
        () => import('./pages/PricingPage'),
        () => import('./pages/PortfolioPage'),
        () => import('./pages/BlogPage'),
        () => import('./pages/FAQPage'),
      ];
      commonRoutes.forEach((prefetchFn, index) => {
        const id = setTimeout(() => prefetchFn().catch(() => {}), index * 80);
        timeoutIds.push(id);
      });
    }, { timeout: 2000 });

    return () => {
      if ('cancelIdleCallback' in window) cancelIdleCallback(idleHandle);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  // Reset the route-level ErrorBoundary whenever the route changes so a page
  // crash on one route doesn't blank subsequent navigations.
  const routeKey = location.pathname;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-orange-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <PerformanceMonitor />
        <ScriptOptimizer />
        <SchemaMarkup />
        <Navbar />
        <NavigationLoader />
        <ScrollToTop />
        <main id="main-content" tabIndex={-1}>
          <ErrorBoundary key={routeKey}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blogs/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                <Route path="/nda" element={<NDAPage />} />
                <Route path="/licensing" element={<LicensingPage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                <Route path="/capabilities-deck" element={<CapabilitiesDeckPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/sitemap" element={<SitemapPage />} />

                {/* Auth Routes */}
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/auth/signin" element={<SignInPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <PortalLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<PortalDashboard />} />
                  <Route path="subscriptions" element={<SubscriptionsPage />} />
                  <Route path="campaigns" element={<CampaignsPage />} />
                  <Route path="assets" element={<AssetsPage />} />
                  <Route path="invoices" element={<InvoicesPage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="clients" element={<ClientsPage />} />
                  <Route path="campaigns" element={<AdminCampaignsPage />} />
                  <Route path="assets" element={<AdminAssetsPage />} />
                  <Route path="tickets" element={<AdminTicketsPage />} />
                  <Route path="invoices" element={<AdminInvoicesPage />} />
                  <Route path="notifications" element={<AdminNotificationsPage />} />
                  <Route path="consultation-leads" element={<ConsultationLeadsPage />} />
                  <Route path="ai-conversations" element={<AIConversationsPage />} />
                  <Route path="email-templates" element={<EmailTemplatesPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <UnifiedChatWidget />
        <InstallPrompt />
        <OfflineIndicator />
      </div>
    </ErrorBoundary>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
