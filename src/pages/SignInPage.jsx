import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import { Mail, Lock, ArrowRight, Loader, CheckCircle, Calendar, LayoutDashboard } from 'lucide-react';
import { companyInfo } from '../constants/companyInfo';

// Test-credential UI and Google OAuth placeholder only render in local development.
const IS_DEV = import.meta.env.DEV;

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registered = searchParams.get('registered');

  useEffect(() => {
      if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleFillCredentials = (email, password) => {
    setFormData({
      email,
      password,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const data = await signin(formData.email, formData.password);
      if (data?.user?.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Access failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Sign In | Ondosoft"
        description="Sign in to your Ondosoft account to manage subscriptions, campaigns, and support tickets."
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Access your dashboard</p>
            </div>

            {/* Not a client yet? Request Demo / View Sample */}
            <div className="mb-6 p-5 bg-gray-900/80 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-bold text-orange-400 mb-1">Not a client yet?</h3>
              <p className="text-gray-400 text-sm mb-4">See what we build or request a demo to get started.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 font-medium text-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Request Demo
                </Link>
                <Link
                  to="/demo"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 font-medium text-sm transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  View Sample Dashboard
                </Link>
              </div>
            </div>

            {IS_DEV && (
              <div className="mb-6 p-5 bg-gray-900/80 border border-gray-700 rounded-xl">
                <h3 className="text-lg font-bold text-cyan-400 mb-1">Test Credentials (dev only)</h3>
                <p className="text-gray-400 text-sm mb-4">These credentials are only shown in local development builds.</p>

                <div className="mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-base font-semibold text-gray-200">Admin Account</h4>
                    <button
                      type="button"
                      onClick={() => handleFillCredentials('admin@ondosoft.com', 'admin123')}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      Fill
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-gray-200 font-medium">admin@ondosoft.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Password:</span>
                      <span className="text-gray-200 font-medium">admin123</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-base font-semibold text-gray-200">Client Account</h4>
                    <button
                      type="button"
                      onClick={() => handleFillCredentials('client@ondosoft.com', 'client123')}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      Fill
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-gray-200 font-medium">client@ondosoft.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Password:</span>
                      <span className="text-gray-200 font-medium">client123</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {registered && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Account created successfully! Please access your dashboard.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={companyInfo.placeholders.email}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Accessing Dashboard...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-orange-500 hover:text-orange-400 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-400 hover:text-white text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;

