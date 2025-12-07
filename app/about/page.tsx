/**
 * About page - Clean, readable text-focused design with detailed content
 * Enhanced with mature background styles and appealing typography
 */
import Image from 'next/image';

export default function AboutPage() {
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Title - Large and Bold */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            About HopeForUA
          </h1>
          <div className="w-24 h-1 bg-yellow-400"></div>
        </div>

        {/* Video Section - First to play */}
        <div className="mb-20">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-700/50 bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
              controls
            >
              <source src="/donationvid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Image Gallery Section - 5 pictures arranged nicely */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Impact in Action
            </h2>
            <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          
          {/* Responsive Grid: 3 columns on large, 2 on medium, 1 on small */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large featured image - spans 2 columns on large screens */}
            <div className="md:col-span-2 lg:col-span-2 relative h-[400px] rounded-xl overflow-hidden shadow-xl border-2 border-blue-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/donation1.jpg"
                alt="HopeForUA Impact"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Two smaller images stacked */}
            <div className="space-y-6">
              <div className="relative h-[190px] rounded-xl overflow-hidden shadow-xl border-2 border-blue-700/50 group hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/donation2.jpg"
                  alt="HopeForUA Impact"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative h-[190px] rounded-xl overflow-hidden shadow-xl border-2 border-blue-700/50 group hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/donation3.jpg"
                  alt="HopeForUA Impact"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Two more images in a row */}
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl border-2 border-blue-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/donation4.jpg"
                alt="HopeForUA Impact"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl border-2 border-blue-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/donation5.jpg"
                alt="HopeForUA Impact"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Large Quote Section - Small accent with light blue */}
        <div className="mb-20 bg-blue-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-700/50 shadow-xl">
          <p className="text-3xl md:text-4xl font-light text-blue-100 leading-relaxed italic text-center">
            "Creating a world where no one has to face difficult times alone."
          </p>
        </div>

        {/* Two Column Layout for Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left Column */}
          <div className="space-y-10">
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Our Foundation
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                HopeForUA was founded with a simple yet powerful vision: to create a world where no one has to face difficult times alone. Since our inception, we have been committed to providing essential support, resources, and hope to individuals and communities in need. Our journey began when a group of dedicated individuals recognized the growing need for comprehensive assistance programs that go beyond temporary relief, focusing instead on sustainable solutions that empower people to rebuild their lives.
              </p>
            </div>

            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Our Mission
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                To provide comprehensive support, resources, and assistance to individuals and communities facing challenges, fostering hope and creating pathways to a better future through compassionate action and sustainable solutions. We believe that every person deserves dignity, respect, and the opportunity to thrive, regardless of their circumstances. Our mission drives us to work tirelessly every day, bridging gaps in services and ensuring that no one is left behind.
              </p>
            </div>

            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Our Vision
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                A world where every person has access to the support they need, where communities are strengthened through mutual aid, and where hope and opportunity are available to all, regardless of their circumstances. We envision a future where communities are resilient, self-sufficient, and equipped with the resources necessary to overcome challenges. Through our collective efforts, we strive to build a network of support that spans across borders and boundaries.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                What We Do
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                Every day, we work tirelessly to bridge gaps, provide assistance, and build stronger, more resilient communities. Our work is made possible by the generous support of donors, volunteers, and partners who share our vision. We operate across multiple program areas including emergency relief, medical aid, community development, education and training, and infrastructure rebuilding. Each program is designed with careful consideration of the unique needs of the communities we serve, ensuring that our interventions are both effective and sustainable.
              </p>
            </div>

            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Our Approach
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                We believe in the power of community, compassion, and collective action to create lasting positive change. Our approach is rooted in understanding, collaboration, and respect for the dignity of every individual we serve. We work closely with local organizations, community leaders, and beneficiaries to ensure that our programs are culturally sensitive, contextually appropriate, and truly meet the needs of those we aim to help. This collaborative model allows us to create solutions that are both immediate and long-term in their impact.
              </p>
            </div>

            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Transparency & Accountability
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                We maintain the highest standards of transparency and accountability in all our operations. Every donation is tracked, every dollar is accounted for, and every impact is reported with complete visibility. We provide weekly fund distribution reports across all our program areas, ensuring that our supporters can see exactly how their contributions are making a difference. Our commitment to transparency builds trust and demonstrates our dedication to responsible stewardship of the resources entrusted to us.
              </p>
            </div>
          </div>
        </div>

        {/* Large Text Section - Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Our Values
            </h2>
            <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Compassion</h3>
              <p className="text-blue-100 leading-relaxed">
                We approach every situation with empathy and understanding, recognizing the dignity and worth of every individual we serve. Our team is trained to listen, to understand, and to respond with genuine care and concern for the well-being of those seeking assistance.
              </p>
            </div>
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Integrity</h3>
              <p className="text-blue-100 leading-relaxed">
                We maintain the highest standards of transparency, accountability, and ethical conduct in all our operations and relationships. Every decision we make is guided by our commitment to doing what is right, even when no one is watching.
              </p>
            </div>
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Impact</h3>
              <p className="text-blue-100 leading-relaxed">
                We focus on creating meaningful, measurable outcomes that make a real difference in the lives of those we support. Our programs are designed with clear objectives and rigorous evaluation methods to ensure that we are truly making a positive impact.
              </p>
            </div>
          </div>
        </div>

        {/* Large Closing Statement */}
        <div className="bg-blue-800/40 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-blue-700/50 shadow-xl">
          <p className="text-2xl md:text-3xl font-light text-blue-100 leading-relaxed text-center">
            HopeForUA represents more than an organization—it represents a movement of people who believe in the power of collective action to create positive change. We are grateful for the trust placed in us by our supporters, beneficiaries, and partners, and we remain committed to fulfilling our mission with dedication, integrity, and compassion.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-white mt-8 text-center">
            Together, we can build a future where hope, opportunity, and support are accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
}
