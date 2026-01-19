import Image from "next/image";
import { Users, Code, PenTool, TrendingUp, MonitorCheck } from "lucide-react";
import { AnimationWrapper } from "@/components/animation-wrapper";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Intro Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <AnimationWrapper>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Digital Solutions Built for Business Growth</h1>
          <div className="prose dark:prose-invert text-lg text-muted-foreground space-y-4">
            <p>
              <strong className="text-foreground">The Click & Create Co</strong> is a creative digital agency specializing in <strong>web development, UI/UX design, branding, and digital strategy</strong>. We help startups, entrepreneurs, and established companies build strong online presences through modern, scalable, and performance-driven digital solutions.
            </p>
            <p>
               In a fast-moving digital landscape, your website and brand are often the first impression of your business. Our mission is to ensure that impression is clear, professional, and impactful.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-bold text-2xl text-blue-500">B2B</h3>
                  <p className="text-sm">Focused Mindset</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-bold text-2xl text-purple-500">100%</h3>
                  <p className="text-sm">Growth Ready</p>
              </div>
          </div>
        </AnimationWrapper>
        <AnimationWrapper delay={0.2} className="relative h-[400px] bg-secondary/30 rounded-2xl flex items-center justify-center overflow-hidden border border-border">
            {/* Placeholder for Team/Office Image */}
             <div className="text-center text-muted-foreground p-8">
                 <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                 <p className="font-medium">Transforming Ideas into Digital Reality</p>
                 {/* <Image src="/images/about-team.png" alt="Team" fill className="object-cover" /> */}
             </div>
        </AnimationWrapper>
      </div>

      {/* What We Do */}
      <div className="mb-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We provide end-to-end digital services designed to support long-term business growth.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Web Development", desc: "High-performance, responsive websites built with clean code, modern frameworks, and SEO best practices.", icon: <Code className="w-8 h-8 text-blue-500"/> },
                { title: "UI/UX & Design", desc: "User-focused design that improves usability, engagement, and conversions.", icon: <PenTool className="w-8 h-8 text-purple-500"/> },
                { title: "Branding", desc: "Consistent, professional brand systems that build trust and recognition.", icon: <Users className="w-8 h-8 text-pink-500"/> },
                { title: "Scalable Builds", desc: "Websites structured for search engines, speed, and future expansion.", icon: <MonitorCheck className="w-8 h-8 text-green-500"/> },
            ].map((service, i) => (
                <AnimationWrapper key={i} delay={i * 0.1} className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-secondary inline-block rounded-lg mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                </AnimationWrapper>
            ))}
        </div>
      </div>

      {/* Founder's Note */}
      <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 border border-border mb-24">
          <AnimationWrapper>
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold font-heading mb-8">Founder’s Note</h2>
                <blockquote className="text-xl italic text-muted-foreground mb-8">
                    “The Click & Create Co was started with a simple belief: technology should empower businesses, not overwhelm them. I’ve seen too many projects fail because of over-engineering, unclear goals, or poor communication. This company exists to do things differently. We focus on clarity, honesty, and building digital products that actually serve a purpose.”
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">CC</div>
                    <div className="text-left">
                        <p className="font-bold">Founder</p>
                        <p className="text-xs text-muted-foreground">The Click & Create Co</p>
                    </div>
                </div>
            </div>
          </AnimationWrapper>
      </div>

       {/* Approach & Philosophy */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
                <p className="text-muted-foreground mb-6">We believe successful digital products are built with clarity, not complexity. Every project starts with understanding your business goals.</p>
                <ul className="space-y-3">
                    {["Business-oriented decision making", "Clean, maintainable code", "Usability-first design", "Performance & SEO focus"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                 <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
                 <p className="text-muted-foreground mb-6">We value <strong>simplicity, performance, and intention</strong>. Trends change, but well-built digital products endure.</p>
                 <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                     <p className="font-bold text-blue-500 mb-2">Let’s Build Something That Lasts</p>
                     <p className="text-sm text-muted-foreground">Ready to move forward with confidence?</p>
                     <p className="font-mono text-xs mt-4 uppercase tracking-widest text-foreground">Code. Build. Deploy.</p>
                 </div>
            </div>
       </div>

    </div>
  );
}
