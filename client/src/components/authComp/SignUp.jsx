import { useState } from "react";
import { Eye, EyeOff, UserPlus, Mail, User, Lock, Shield, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthstore from "../../store/auth.store";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {createAccount} = useAuthstore();

  // Password strength validation
  const getPasswordStrength = (password) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    return {
      score,
      checks,
      strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;


  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAccount(name, email, password);
  };

  const isFormValid = name && email && password && confirmPassword && passwordsMatch && agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our attendance management system</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrength.strength === 'weak' ? 'text-red-600' :
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-emerald-600'
                    }`}>
                      {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength === 'weak' ? 'bg-red-500 w-1/3' :
                        passwordStrength.strength === 'medium' ? 'bg-yellow-500 w-2/3' : 'bg-emerald-500 w-full'
                      }`}
                    ></div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {Object.entries({
                      length: "At least 8 characters",
                      uppercase: "Uppercase letter",
                      lowercase: "Lowercase letter", 
                      number: "Number",
                      special: "Special character"
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center text-xs">
                        {passwordStrength.checks[key] ? (
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-2" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300 mr-2" />
                        )}
                        <span className={passwordStrength.checks[key] ? 'text-emerald-600' : 'text-gray-500'}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                    confirmPassword ? (passwordsMatch ? 'border-emerald-300 focus:ring-emerald-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-1 flex items-center text-xs">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-emerald-500 mr-1" />
                      <span className="text-emerald-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      <span className="text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1 mr-3" 
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSigningUp || !isFormValid}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Create Account
                </div>
              )}
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Already have an account? <Link to="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-medium">Sign In</Link></p>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default SignUp;