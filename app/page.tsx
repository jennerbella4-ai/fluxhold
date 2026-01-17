import Link from "next/link";
import Image from "next/image";
import TradingViewTicker from "@/components/TradingViewTicker"
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  TrendingUpIcon,
  UserGroupIcon,
  LockClosedIcon,
  ArrowUpIcon,
  SparklesIcon,
  AcademicCapIcon,
  ServerIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060B14] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-[#0B1C2D]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C6FFF] to-[#0EF2C2] rounded-xl flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#4C6FFF] to-[#0EF2C2] bg-clip-text text-transparent">
                  FluxHold
                </span>
                <p className="text-xs text-[#9BA3AF]">Demo Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/login"
                className="text-[#9BA3AF] hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#4C6FFF] to-[#0EF2C2] text-[#0B1C2D] font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Free Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4C6FFF]/10 to-[#0EF2C2]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-[#0B1C2D] border border-gray-800 rounded-full px-4 py-2 mb-8">
              <SparklesIcon className="w-4 h-4 text-[#0EF2C2]" />
              <span className="text-sm text-[#0EF2C2]">
                Demo Investment Platform
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Smarter Market</span>
              <span className="block bg-gradient-to-r from-[#4C6FFF] via-white to-[#0EF2C2] bg-clip-text text-transparent">
                Insights.
              </span>
              <span className="block">Clearer Decisions.</span>
            </h1>
            <p className="text-xl text-[#9BA3AF] max-w-3xl mx-auto mb-10">
              FluxHold is a sophisticated demo platform for portfolio simulation
              and investment analytics.
              <span className="block mt-2 text-lg">
                Practice with simulated markets—no real money involved.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group bg-gradient-to-r from-[#4C6FFF] to-[#0EF2C2] text-[#0B1C2D] font-semibold py-4 px-8 rounded-lg hover:shadow-lg hover:shadow-[#4C6FFF]/25 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Free Demo</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="border border-gray-700 bg-[#0B1C2D]/50 text-white font-semibold py-4 px-8 rounded-lg hover:border-gray-600 transition-colors"
              >
                Access Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
      <TradingViewTicker />
      {/* Trust Bar */}
      {/* Client Logos Carousel */}
      <ClientLogoCarousel />

      {/* Key Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-[#9BA3AF]">Demo Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$0</div>
              <div className="text-[#9BA3AF]">Real Money Risk</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-[#9BA3AF]">Simulated Markets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-[#9BA3AF]">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose FluxHold Demo?
            </h2>
            <p className="text-xl text-[#9BA3AF] max-w-3xl mx-auto">
              Experience professional investment tools in a completely risk-free
              environment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBarIcon className="w-8 h-8" />,
                title: "Real-time Analytics",
                description:
                  "Mock portfolio tracking with live demo data visualization",
                color: "from-[#4C6FFF] to-blue-400",
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8" />,
                title: "Secure Sandbox",
                description:
                  "Practice with simulated markets, no real financial risk",
                color: "from-[#0EF2C2] to-emerald-400",
              },
              {
                icon: <TrendingUpIcon className="w-8 h-8" />,
                title: "Portfolio Simulation",
                description:
                  "Test strategies with historical and synthetic market data",
                color: "from-purple-500 to-[#4C6FFF]",
              },
              {
                icon: <AcademicCapIcon className="w-8 h-8" />,
                title: "Learning Tools",
                description:
                  "Educational resources and investment concept tutorials",
                color: "from-amber-500 to-orange-400",
              },
              {
                icon: <ServerIcon className="w-8 h-8" />,
                title: "Multi-Asset Support",
                description: "Simulate stocks, crypto, ETFs, and commodities",
                color: "from-rose-500 to-pink-400",
              },
              {
                icon: <LockClosedIcon className="w-8 h-8" />,
                title: "Data Privacy",
                description: "No real financial information required or stored",
                color: "from-violet-500 to-purple-400",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#0B1C2D] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02] group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#9BA3AF]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-[#0B1C2D] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Start in Minutes</h2>
            <p className="text-xl text-[#9BA3AF] max-w-3xl mx-auto">
              Get started with our demo platform in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Demo Account",
                desc: "Sign up with any email—no verification needed",
              },
              {
                step: "02",
                title: "Explore Dashboard",
                desc: "Access simulated portfolio with $25,000 demo balance",
              },
              {
                step: "03",
                title: "Practice Trading",
                desc: "Test strategies with historical market data",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-[#0B1C2D] border border-gray-800 rounded-2xl p-8">
                  <div className="text-5xl font-bold text-[#4C6FFF] mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#9BA3AF]">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRightIcon className="w-8 h-8 text-[#0EF2C2]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Developers Say</h2>
            <p className="text-xl text-[#9BA3AF] max-w-3xl mx-auto">
              See how FluxHold helps developers build better investment
              applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Full Stack Developer",
                quote:
                  "Perfect for testing portfolio visualization features without real financial data.",
                initials: "AC",
              },
              {
                name: "Maria Rodriguez",
                role: "FinTech Engineer",
                quote:
                  "The demo dashboard saved us weeks of development time for our investment app prototype.",
                initials: "MR",
              },
              {
                name: "James Kim",
                role: "Product Manager",
                quote:
                  "Excellent tool for demonstrating investment concepts to stakeholders and clients.",
                initials: "JK",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-[#0B1C2D] border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4C6FFF] to-[#0EF2C2] flex items-center justify-center text-[#0B1C2D] font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-[#9BA3AF]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-[#9BA3AF] italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B1C2D] to-gray-900 border border-gray-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4C6FFF]/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0EF2C2]/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative">
              <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
              <p className="text-xl text-[#9BA3AF] mb-10 max-w-2xl mx-auto">
                Start your free demo today. No credit card required, no real
                money involved—just pure learning and experimentation.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#4C6FFF] to-[#0EF2C2] text-[#0B1C2D] font-bold py-4 px-10 rounded-lg hover:shadow-2xl hover:shadow-[#4C6FFF]/30 transition-all duration-300"
              >
                <span>Start Free Demo</span>
                <ArrowUpIcon className="w-5 h-5 rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-900/20 to-transparent border border-red-800/30 rounded-2xl p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="w-8 h-8 text-red-400" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-red-300 mb-3">
                  Important Disclaimer
                </h3>
                <div className="text-red-200/80">
                  <p className="mb-3">
                    <strong>
                      FluxHold is a demonstration application for portfolio
                      purposes only.
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      All data shown is simulated and does not represent real
                      investments
                    </li>
                    <li>
                      No real money is handled or stored in this application
                    </li>
                    <li>This platform does not provide financial advice</li>
                    <li>
                      Deposit and withdrawal features are for demonstration only
                    </li>
                    <li>Do not enter real financial information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4C6FFF] to-[#0EF2C2] rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FluxHold</span>
            </div>
            <div className="text-[#9BA3AF] text-sm">
              © {new Date().getFullYear()} FluxHold Demo Platform. For portfolio
              purposes only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
