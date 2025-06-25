import { useState, useEffect } from 'react';
import {
  Clock,
  Users,
  Shield,
  BarChart3,
  Calendar,
  ArrowRight,
  Star,
  Smartphone,
  Target,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Moon,
  Sun
} from 'lucide-react';

import useAuthstore from '../store/auth.store';
import Logout from "./authComp/Logout"

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const {authStatus} = useAuthstore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const features = [
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor attendance in real-time with precise clock-in and clock-out timestamps"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Efficiently manage multiple teams and departments from a single dashboard"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Generate comprehensive reports and gain insights into attendance patterns"
    },
    {
      icon: Calendar,
      title: "Schedule Management",
      description: "Create and manage work schedules, shifts, and time-off requests seamlessly"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Access attendance features on-the-go with our mobile application"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with compliance to industry standards"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "50+", label: "Countries" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Manager",
      company: "TechCorp Inc.",
      content: "This platform transformed how we manage attendance. The analytics are incredible!"
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "Global Solutions",
      content: "Easy to use, reliable, and the customer support is outstanding. Highly recommend!"
    },
    {
      name: "Emily Rodriguez",
      role: "Team Lead",
      company: "Innovation Labs",
      content: "The mobile app makes it so convenient for our remote team to track their hours."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <a href="/">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">AttandanceFlow</h1>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a href="#features" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm lg:text-base">Features</a>
              <a href="#pricing" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm lg:text-base">Pricing</a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              {!authStatus && <a href="/auth/login" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm lg:text-base">Sign In</a>}
              {authStatus && <Logout className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm lg:text-base"/>}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-28">
          <div className="text-center">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              New: Mobile app now available
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2">
              Attendance Management
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Made Simple
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Streamline your workforce management with our intelligent attendance tracking platform.
              Real-time monitoring, advanced analytics, and seamless integration - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
              <a
                href="/auth/signup"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 transition-all duration-200 flex items-center justify-center group transform hover:scale-105 text-sm sm:text-base"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 animate-bounce">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-200 dark:bg-emerald-800 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 animate-pulse">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-teal-200 dark:bg-teal-800 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-16 sm:bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-300 dark:bg-emerald-700 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Everything you need to manage attendance
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto px-4">
              Powerful features designed to simplify workforce management and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">How it works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 px-4">Get started in minutes, not hours</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: "1", title: "Sign Up", description: "Create your account and set up your organization profile", icon: Target },
              { step: "2", title: "Add Team", description: "Invite team members and configure attendance policies", icon: Users },
              { step: "3", title: "Track & Analyze", description: "Start tracking attendance and gain valuable insights", icon: TrendingUp }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 dark:bg-emerald-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 sm:top-8 left-full w-full">
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 dark:text-emerald-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">Trusted by teams worldwide</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 px-4">See what our customers have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-600">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
            Ready to transform your attendance management?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 dark:text-emerald-200 mb-6 sm:mb-8 px-4">
            Join thousands of organizations already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="/auth/signup"
              className="w-full sm:w-auto bg-white text-emerald-600 dark:bg-gray-100 dark:text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group text-sm sm:text-base"
            >
              Start Free Trial
              <Award className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:scale-110 transition-transform" />
            </a>
            <button className="w-full sm:w-auto border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-white hover:text-emerald-600 dark:hover:bg-gray-100 dark:hover:text-emerald-700 transition-all duration-200 text-sm sm:text-base">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="ml-3 text-lg sm:text-xl font-bold">AttendanceFlow</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">
                The most comprehensive attendance management solution for modern workplaces.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500">
            <p className="text-sm sm:text-base">&copy; 2025 AttendanceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .dark .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}

export default Home;