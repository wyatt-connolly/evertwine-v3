"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Users,
  Shield,
  Zap,
  Clock,
  Target,
  BarChart,
  PieChart,
  Lightbulb,
} from "lucide-react";
import LegalNavbar from "@/components/layout/LegalNavbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  // Refs for scroll animations
  const problemRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);

  const problemInView = useInView(problemRef, { once: true, amount: 0.3 });
  const marketInView = useInView(marketRef, { once: true, amount: 0.3 });
  const futureInView = useInView(futureRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <LegalNavbar scrolled={scrolled} />

      {/* Problem Statement Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={problemRef}
              initial={{ opacity: 0, y: 30 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sora">
                The <span className="text-blue-400">Problem</span> We&apos;re
                Solving
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                In today&apos;s digital world, genuine human connection has
                become increasingly rare. Despite being more
                &quot;connected&quot; than ever through social media, many
                people report feeling isolated and lonely.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={problemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 font-sora">
                  Digital Disconnect
                </h3>
                <p className="text-gray-300">
                  Studies show that despite spending an average of{" "}
                  <span className="text-blue-400 font-semibold">
                    7+ hours daily
                  </span>{" "}
                  on digital devices,{" "}
                  <span className="text-blue-400 font-semibold">61%</span> of
                  young adults report feeling &quot;very lonely&quot; on a
                  regular basis. Traditional social media often creates shallow
                  connections rather than meaningful relationships.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={problemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 font-sora">
                  Safety Concerns
                </h3>
                <p className="text-gray-300">
                  Meeting new people in-person comes with legitimate safety
                  concerns.{" "}
                  <span className="text-purple-400 font-semibold">48%</span> of
                  adults say they avoid meeting new people due to safety
                  worries, and{" "}
                  <span className="text-purple-400 font-semibold">73%</span> of
                  women report having safety concerns when considering attending
                  events with strangers.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-semibold mb-4 font-sora">
                Our Solution
              </h3>
              <p className="text-gray-200 mb-4">
                <span className="text-white font-semibold">Evertwine</span>{" "}
                bridges the gap between digital convenience and authentic human
                connection. We&apos;ve created a platform that facilitates
                real-world meetups while prioritizing safety, verification, and
                community building.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    ID verification and safety features built into every
                    interaction
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Location-based meetups with like-minded individuals
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Community-driven events and interest groups
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Privacy-first approach to social networking
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section
        ref={marketRef}
        className="py-20 relative overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={marketInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sora">
              The <span className="text-blue-400">Opportunity</span>
            </h2>
            <p className="text-xl text-gray-300">
              We&apos;re addressing a significant and growing need in
              today&apos;s increasingly digital society.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={marketInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 font-sora flex items-center">
                <Target className="h-7 w-7 text-blue-400 mr-3" />
                Market Size
              </h3>

              <div className="space-y-6">
                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={marketInView ? { width: "78%" } : {}}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-400">Social Networking</span>
                    <div>
                      <span className="text-gray-400">Today: </span>
                      <span className="text-blue-400 font-medium text-base">
                        $142B
                      </span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="text-gray-400">2030: </span>
                      <span className="text-blue-400 font-bold text-lg">
                        $223B
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={marketInView ? { width: "65%" } : {}}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-400">Event Discovery</span>
                    <div>
                      <span className="text-gray-400">Today: </span>
                      <span className="text-blue-400 font-medium text-base">
                        $52B
                      </span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="text-gray-400">2030: </span>
                      <span className="text-blue-400 font-bold text-lg">
                        $87B
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={marketInView ? { width: "45%" } : {}}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-400">Safety Tech</span>
                    <div>
                      <span className="text-gray-400">Today: </span>
                      <span className="text-blue-400 font-medium text-base">
                        $27B
                      </span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="text-gray-400">2030: </span>
                      <span className="text-blue-400 font-bold text-lg">
                        $54B
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-300">
                Our platform sits at the intersection of these growing markets,
                with a unique focus on authentic connections and safety.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={marketInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 font-sora flex items-center">
                <Lightbulb className="h-7 w-7 text-purple-400 mr-3" />
                Key Insights
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <BarChart className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      Growing Loneliness Epidemic
                    </h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-blue-400 font-semibold">36%</span>{" "}
                      of Americans report feeling &quot;serious
                      loneliness,&quot; with rates highest among young adults (
                      <span className="text-blue-400 font-semibold">61%</span>)
                      and mothers with young children (
                      <span className="text-blue-400 font-semibold">51%</span>).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <PieChart className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      Digital Fatigue
                    </h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-purple-400 font-semibold">73%</span>{" "}
                      of <span className="text-white font-medium">Gen Z</span>{" "}
                      and{" "}
                      <span className="text-white font-medium">
                        Millennials
                      </span>{" "}
                      report experiencing &quot;digital fatigue&quot; and
                      express desire for more in-person interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      Safety Concerns
                    </h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-semibold">82%</span>{" "}
                      of women and{" "}
                      <span className="text-green-400 font-semibold">52%</span>{" "}
                      of men consider safety features &quot;extremely
                      important&quot; when using platforms to meet new people.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-300">
                  These insights drive our product development, focusing on
                  creating safe, meaningful connections in a digital age.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={marketInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16 max-w-3xl mx-auto text-center"
          >
            <p className="text-xl text-gray-300 italic">
              &quot;We&apos;re building{" "}
              <span className="text-white font-semibold">Evertwine</span> to be
              the bridge between digital convenience and authentic human
              connection.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Future Features Section */}
      <section ref={futureRef} className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
          <div className="absolute bottom-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={futureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sora">
              The <span className="text-blue-400">Future</span> of Evertwine
            </h2>
            <p className="text-xl text-gray-300">
              We&apos;re constantly evolving to create the best platform for
              authentic connections. Here&apos;s what&apos;s coming next:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Exclusive Local Promotions - Q3 2025 (First) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={futureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="h-8 w-8 text-orange-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12V12.01M8 12V12.01M16 12V12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-sora">
                Exclusive Local Promotions
              </h3>
              <p className="text-gray-300 mb-4">
                Unlock special deals at your favorite local spots—coffee shops,
                restaurants, and venues—just for being active on Evertwine. The
                more you show up, the more perks you get.
              </p>
              <p className="text-orange-400 flex items-center font-medium">
                Coming <span className="font-bold">Q3 2025</span>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </motion.div>

            {/* Enhanced Safety Features - Q4 2025 (Second/Third) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={futureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-sora">
                Enhanced Safety Features
              </h3>
              <p className="text-gray-300 mb-4">
                We&apos;re developing advanced AI-powered safety features,
                including behavior analysis and enhanced verification systems to
                ensure all meetups remain secure.
              </p>
              <p className="text-blue-400 flex items-center font-medium">
                Coming <span className="font-bold">Q4 2025</span>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </motion.div>

            {/* Interest-Based Communities - Q4 2025 (Second/Third) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={futureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-sora">
                Interest-Based Communities
              </h3>
              <p className="text-gray-300 mb-4">
                We&apos;re expanding our platform to include dedicated
                interest-based communities, allowing users to connect over
                shared passions and organize regular meetups.
              </p>
              <p className="text-purple-400 flex items-center font-medium">
                Coming <span className="font-bold">Q4 2025</span>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </motion.div>

            {/* Event Planning Tools - Q2 2026 (Last) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={futureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-sora">
                Event Planning Tools
              </h3>
              <p className="text-gray-300 mb-4">
                Advanced event planning tools will make organizing meetups
                easier than ever, with integrated scheduling, venue
                recommendations, and attendance management.
              </p>
              <p className="text-green-400 flex items-center font-medium">
                Coming <span className="font-bold">Q1 2026</span>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={futureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-20 text-center"
          >
            <a
              href="https://apps.apple.com/us/app/evertwine/id6479545288"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Download the App <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer - without isHomepage prop */}
      <Footer />
    </main>
  );
}
