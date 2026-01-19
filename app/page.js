import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { ArrowRight, Code, Palette, BarChart3 } from "lucide-react";
import { HeroGraphic } from "@/components/hero-graphic";
import { getBlogPosts, getPortfolioProjects } from "@/lib/contentful";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default async function Home() {
  // Fetch latest content from Contentful
  const allBlogPosts = await getBlogPosts();
  const blogPosts = allBlogPosts.slice(0, 3); // Latest 3 posts
  
  const allProjects = await getPortfolioProjects();
  const portfolioProjects = allProjects.slice(0, 6); // Latest 6 projects

  return (
    <div>
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
      <section className="py-20 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading text-gradient">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From concept to launch, we handle every aspect of your digital presence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-web.png" alt="Web Development" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-heading">Web Development</h3>
              <p className="text-muted-foreground">Modern, responsive websites built with cutting-edge technologies.</p>
            </div>

            {/* Service 2 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
               <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-ui.png" alt="UI/UX Design" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-heading">UI/UX Design</h3>
              <p className="text-muted-foreground">Beautiful interfaces that users love, backed by research and testing.</p>
            </div>

            {/* Service 3 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group card-gradient-hover">
               <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                 <Image src="/images/service-marketing.png" alt="Marketing" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-heading">Marketing & Analytics</h3>
              <p className="text-muted-foreground">Data-driven strategies to grow your business and reach your audience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder slotId="home-after-services" />
      </section>

      {/* Portfolio Section */}
      {/* Portfolio Preview */}
      <section id="portfolio" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-gradient">Our Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of our recent projects and success stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioProjects.length > 0 ? (
              portfolioProjects.map((project, i) => (
                <div key={i} className="group relative bg-card border border-border rounded-xl hover:shadow-xl transition-all card-gradient-hover">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2 font-heading">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No projects available yet. Add some in Contentful!</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Link href="/portfolio">
              <Button variant="outline" className="px-8 py-4">View All Works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-gradient">Our Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, guides, and news from the tech world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.length > 0 ? (
              blogPosts.map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card border border-border rounded-xl hover:border-blue-500 transition-colors card-gradient-hover">
                  <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors font-heading">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-blue-500 mt-4">
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No blog posts available yet. Add some in Contentful!</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" className="px-8 py-4">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
