import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { ArrowRight, Code, Palette, BarChart3, ExternalLink } from "lucide-react";

import { HeroGraphic } from "@/components/hero-graphic";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 z-10">
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] min-h-[1.5em]">
              <TypewriterEffect words={["Code. Build. Deploy.", "Click. Create. Done."]} />
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              We provide creative solutions for businesses—websites, branding, and digital experiences that drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="text-lg px-8 py-6 w-full sm:w-auto">Get a Free Quote</Button>
              </Link>
              <Link href="#portfolio" className="w-full sm:w-auto">
                <Button variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                  View Work
                </Button>
              </Link>
            </div>
          </div>
          <HeroGraphic />
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4 animate-pulse duration-1000" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-gradient inline-block">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solutions crafted to elevate your business. We combine technical expertise with creative design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-web.png" alt="Web Development" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" /> Web Development
              </h3>
              <p className="text-muted-foreground">Building responsive, modern websites with clean code and excellent UX.</p>
            </div>

            {/* Service 2 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
               <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-ui.png" alt="UI/UX Design" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" /> UI/UX Design
              </h3>
              <p className="text-muted-foreground">Creating visually appealing and user-friendly interfaces for your business.</p>
            </div>

            {/* Service 3 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
               <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-marketing.png" alt="Marketing" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-500" /> Marketing & Analytics
              </h3>
              <p className="text-muted-foreground">Optimizing digital marketing strategies with data-driven insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
         <AdPlaceholder slotId="home-after-services" />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4 text-gradient inline-block">Our Portfolio</h2>
            <p className="text-muted-foreground mb-6">Some of our recent projects and creative solutions.</p>
            <Link href="/portfolio" className="inline-flex items-center text-blue-500 hover:text-blue-400 font-medium">
              View All Works <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Fresh Foods Website", cat: "Web Development", image: "/images/service-web.png" },
              { title: "Restaurant Branding", cat: "Branding", image: "/images/blog-branding.png" },
              { title: "E-commerce Platform", cat: "UI/UX Design", image: "/images/service-ui.png" },
              { title: "Mobile App UI", cat: "Mobile App", image: "/images/hero-illustration.png" },
              { title: "Marketing Dashboard", cat: "Analytics", image: "/images/service-marketing.png" },
              { title: "Blog Platform", cat: "Web Design", image: "/images/blog-responsive.png" },
            ].map((item, i) => (
              <div key={i} className="group relative bg-card border border-border rounded-xl hover:shadow-xl transition-all card-gradient-hover">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                   <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                   </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-heading text-blue-500 uppercase tracking-wider">{item.cat}</span>
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-gradient inline-block">Our Blog</h2>
            <p className="text-muted-foreground">Latest insights, tips, and guides for your business growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Top 5 Tips for Responsive Web Design", 
                desc: "Learn how to make your websites fully responsive across all devices.",
                img: "/images/blog-responsive.png",
                slug: "responsive-web-design-tips"
              },
              { 
                title: "How Branding Impacts Your Business", 
                desc: "Understand the importance of branding and how it drives customer trust.",
                img: "/images/blog-branding.png",
                slug: "branding-impacts-business"
              },
              { 
                title: "SEO Strategies for Modern Websites", 
                desc: "Boost your website traffic with these proven SEO strategies.",
                img: "/images/hero-illustration.png", // Reuse hero as fallback since SEO image failed
                slug: "seo-strategies-modern-websites"
              }
            ].map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card border border-border rounded-xl hover:border-blue-500 transition-colors card-gradient-hover">
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                   <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-500">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
