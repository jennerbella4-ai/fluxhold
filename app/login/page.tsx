"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Bitcoin,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Attempt login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          throw new Error("Invalid email or password");
        }
        throw error;
      }

      if (data.user) {
        setSuccess("Login successful! Redirecting...");
        
        // Set session persistence if remember me is checked
        if (rememberMe) {
          await supabase.auth.setSession({
            access_token: data.session?.access_token || "",
            refresh_token: data.session?.refresh_token || "",
          });
        }

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Demo account credentials
      const demoEmail = "demo@fluxhold.com";
      const demoPassword = "demo123456";
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (error) {
        // If demo account doesn't exist, create it
        if (error.message === "Invalid login credentials") {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: demoEmail,
            password: demoPassword,
            options: {
              data: {
                full_name: "Demo User",
                avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
              },
            },
          });

          if (signUpError) throw signUpError;

          // Create profile for demo user
          if (signUpData.user) {
            await supabase.from("profiles").insert([
              {
                id: signUpData.user.id,
                full_name: "Demo User",
                demo_balance: 100000.00,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ]);

            // Create some sample transactions
            await supabase.from("transactions").insert([
              {
                user_id: signUpData.user.id,
                type: "deposit",
                amount: 50000,
                description: "Initial Deposit",
                status: "completed",
                sender: "Bank Transfer",
                created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
              },
              {
                user_id: signUpData.user.id,
                type: "investment",
                amount: -15000,
                description: "Green Energy Solar Fund",
                status: "completed",
                created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
              },
              {
                user_id: signUpData.user.id,
                type: "investment",
                amount: -25000,
                description: "AI Technology Fund",
                status: "completed",
                created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
              },
              {
                user_id: signUpData.user.id,
                type: "deposit",
                amount: 10000,
                description: "BTC Deposit",
                status: "pending",
                metadata: { btc_amount: "0.25" },
                created_at: new Date().toISOString(),
              },
            ]);
          }
        } else {
          throw error;
        }
      }

      setSuccess("Demo login successful! Redirecting...");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    } catch (error: any) {
      console.error("Demo login error:", error);
      setError("Failed to login with demo account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess("Password reset link sent to your email!");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(error.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col lg:flex-row">
      {/* Left Side - Branding & Features */}
      <div className="lg:flex-1 bg-gradient-to-br from-[#F7931A]/20 via-[#4C6FFF]/10 to-[#0EF2C2]/5 p-8 lg:p-12 flex flex-col relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7931A]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0EF2C2]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4C6FFF]/5 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-r from-[#F7931A] to-[#F7931A]/80 rounded-xl flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Fluxhold</span>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Invest Smarter with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#F7931A]/80">
                AI-Powered
              </span>{" "}
              Insights
            </h1>
            
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of investors who are growing their wealth with Fluxhold's 
              advanced investment platform and real-time market analytics.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#F7931A]/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#F7931A]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">AI Predictions</h3>
                  <p className="text-gray-500 text-xs">93% accuracy rate</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#4C6FFF]/10 rounded-lg">
                  <Shield className="w-5 h-5 text-[#4C6FFF]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Bank-Grade Security</h3>
                  <p className="text-gray-500 text-xs">256-bit encryption</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#0EF2C2]/10 rounded-lg">
                  <Users className="w-5 h-5 text-[#0EF2C2]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Joint Investments</h3>
                  <p className="text-gray-500 text-xs">Co-invest with others</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#F7931A]/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-[#F7931A]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Real-time Analytics</h3>
                  <p className="text-gray-500 text-xs">Live market data</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-4 max-w-md">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#0B1C2D] bg-gradient-to-r from-[#F7931A] to-[#F7931A]/80 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-300">
                "Fluxhold's AI insights helped me increase my portfolio returns by 32% in just 6 months. The joint investment feature is a game-changer."
              </p>
              <p className="text-xs text-gray-500 mt-2">— Sarah Chen, Verified Investor</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-xs text-gray-600">
            © 2026 Fluxhold. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">
              Sign in to access your investment dashboard
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-slide-in">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-slide-in">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-500 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#0F2438] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F7931A] focus:ring-1 focus:ring-[#F7931A] transition-colors"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-[#0F2438] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F7931A] focus:ring-1 focus:ring-[#F7931A] transition-colors"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 bg-[#0F2438] border-gray-800 rounded text-[#F7931A] focus:ring-[#F7931A] focus:ring-offset-0 focus:ring-1"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#F7931A] hover:text-[#F7931A]/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#F7931A] to-[#F7931A]/80 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0A0F1E] text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="mt-6 w-full py-3 px-4 bg-[#0F2438] border border-gray-800 text-white font-medium rounded-xl hover:border-[#F7931A] hover:bg-[#0F2438]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2 text-[#F7931A]" />
              Try Demo Account
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#F7931A] hover:text-[#F7931A]/80 font-medium transition-colors"
            >
              Create free account
            </Link>
          </p>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-[#0F2438]/50 rounded-xl border border-gray-800">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#0EF2C2] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">
                  <span className="text-white font-medium">Bank-grade security</span> — 
                  All credentials are encrypted using 256-bit AES encryption. We never store your password in plain text.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Credentials Hint */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setEmail("demo@fluxhold.com");
                setPassword("demo123456");
              }}
              className="text-xs text-gray-600 hover:text-gray-500 transition-colors"
            >
              ℹ️ Demo credentials: demo@fluxhold.com / demo123456
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}