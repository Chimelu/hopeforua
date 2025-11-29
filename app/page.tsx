import Link from 'next/link';
import Image from 'next/image';

/**
 * Homepage with hero section matching UNITED24's clean, focused design
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.03) 10px,
            rgba(255,255,255,0.03) 20px
          )`
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative">
      {/* Hero Section - UNITED24 Style */}
      <section className="relative bg-blue-900 text-white">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] lg:min-h-[700px]">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-24 bg-blue-900">
              <div className="max-w-xl">
                <p className="text-blue-200 mb-4 text-sm uppercase tracking-wider">
                  Official Fundraising Platform
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  HopeForUA
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                  Efficiency and transparency in supporting those in need. 
                  Together, we make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/donate"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 font-bold text-lg uppercase tracking-wide transition-colors shadow-lg text-center"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/about"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors text-center"
                  >
                    Watch Video
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative min-h-[400px] lg:min-h-full bg-blue-800">
        <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80"
                alt="Community support and hope"
                fill
                className="object-cover"
          priority
        />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent lg:bg-gradient-to-l lg:from-blue-900/60 lg:to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Write-up */}
      <section className="pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-blue-100 leading-relaxed">
            HopeForUA provides fund distribution reports every week across all funding categories. 
            We believe that trust is built through transparency. Every donation is tracked, 
            every dollar is accounted for, and every impact is reported with complete visibility.
          </p>
        </div>
      </section>

      {/* Impact Reports Section - UNITED24 Style */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Title and Navigation Arrows */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              IMPACT REPORT
            </h2>
            <div className="hidden md:flex items-center gap-2">
              <button
                className="w-10 h-10 rounded-full border-2 border-blue-700 hover:border-blue-500 hover:bg-blue-800 flex items-center justify-center transition-colors"
                aria-label="Previous reports"
              >
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="w-10 h-10 rounded-full border-2 border-blue-700 hover:border-blue-500 hover:bg-blue-800 flex items-center justify-center transition-colors"
                aria-label="Next reports"
              >
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Impact Report Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Report 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                  alt="Emergency Relief Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Emergency Relief
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    EMERGENCY RELIEF IMPACT REPORT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                  alt="Medical Aid Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Medical Aid
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    MEDICAL AID IMPACT REPORT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                  alt="Community Development Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Community
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    COMMUNITY DEVELOPMENT IMPACT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 4 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
            <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                  alt="Education Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Education
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    EDUCATION & TRAINING IMPACT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Show All Reports Button */}
          <div className="text-center">
            <Link
              href="/reports/impact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Impact Reports
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Efficiency and Transparency
              </h2>
              <p className="text-lg text-blue-100 mb-4 leading-relaxed">
                People from all over the world have united in their will to help those in need. 
                HopeForUA's goal is to increase donations and ensure the efficiency and transparency 
                of their distribution.
              </p>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                We believe that trust is built through transparency. Every donation is tracked, 
                every dollar is accounted for, and every impact is reported. Our weekly reports 
                provide complete visibility into how funds are distributed across our programs.
              </p>
              <Link
                href="/about"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                More About HopeForUA
              </Link>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border-2 border-blue-700">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                alt="Community impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
