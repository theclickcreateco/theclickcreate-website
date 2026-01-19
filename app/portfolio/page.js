

import Link from "next/link";
import Image from "next/image";
import { Users, ShoppingCart, Smartphone, BarChart3, Globe, PenTool, ExternalLink } from "lucide-react";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { SearchBar } from "@/components/search-bar";

export default async function Portfolio({ searchParams }) {
  const { q, category } = await searchParams;

  const projects = [
    { title: "Fresh Foods Website", cat: "Web Development", color: "bg-green-500/20", icon: <Globe className="w-12 h-12 opacity-50" />, image: "/images/service-web.png" },
    { title: "Restaurant Branding", cat: "Branding", color: "bg-orange-500/20", icon: <PenTool className="w-12 h-12 opacity-50" />, image: "/images/blog-branding.png" },
    { title: "E-commerce Platform", cat: "UI/UX Design", color: "bg-blue-500/20", icon: <ShoppingCart className="w-12 h-12 opacity-50" />, image: "/images/service-ui.png" },
    { title: "Mobile App UI", cat: "Mobile App", color: "bg-purple-500/20", icon: <Smartphone className="w-12 h-12 opacity-50" />, image: "/images/hero-illustration.png" },
    { title: "Marketing Dashboard", cat: "Analytics", color: "bg-indigo-500/20", icon: <BarChart3 className="w-12 h-12 opacity-50" />, image: "/images/service-marketing.png" },
    { title: "Blog Platform", cat: "Web Design", color: "bg-pink-500/20", icon: <Users className="w-12 h-12 opacity-50" />, image: "/images/blog-responsive.png" },
    // Duplicates to fill grid
    { title: "Tech Conf Landing Page", cat: "Web Development", color: "bg-cyan-500/20", icon: <Globe className="w-12 h-12 opacity-50" />, image: "/images/service-web.png" },
    { title: "Fintech App", cat: "Mobile App", color: "bg-emerald-500/20", icon: <Smartphone className="w-12 h-12 opacity-50" />, image: "/images/hero-illustration.png" },
  ];

  const filteredProjects = projects.filter(item => {
      const matchCategory = category ? item.cat.toLowerCase() === category.toLowerCase() : true;
      const matchSearch = q ? (item.title.toLowerCase().includes(q.toLowerCase()) || item.cat.toLowerCase().includes(q.toLowerCase())) : true;
      return matchCategory && matchSearch;
  });

  const categories = Array.from(new Set(projects.map(p => p.cat)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <AnimationWrapper>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
             A showcase of our recent projects. We help brands build their digital legacy.
          </p>
          <SearchBar placeholder="Search projects..." />
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Link 
                href="/portfolio" 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!category ? 'bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] text-white animate-gradient-x bg-[length:200%_auto]' : 'bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-[#2A9D8F] hover:via-[#264653] hover:to-[#F4A261] hover:text-white hover:bg-[length:200%_auto] hover:animate-gradient-x'}`}
            >
                All
            </Link>
            {categories.map(cat => (
                <Link 
                key={cat}
                href={`/portfolio?category=${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category?.toLowerCase() === cat.toLowerCase() ? 'bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] text-white animate-gradient-x bg-[length:200%_auto]' : 'bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-[#2A9D8F] hover:via-[#264653] hover:to-[#F4A261] hover:text-white hover:bg-[length:200%_auto] hover:animate-gradient-x'}`}
                >
                {cat}
                </Link>
            ))}
          </div>
        </div>
      </AnimationWrapper>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((item, i) => (
            <AnimationWrapper key={i} delay={i * 0.1}>
                <div className="group relative bg-card border border-border rounded-xl hover:shadow-xl transition-all cursor-pointer h-full flex flex-col card-gradient-hover">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                    <Image 
                        src={item.image || "/images/hero-illustration.png"} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                    </div>
                    <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-heading text-blue-500 uppercase tracking-wider">{item.cat}</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-blue-500 transition-colors">{item.title}</h3>
                        </div>
                    </div>
                    </div>
                </div>
            </AnimationWrapper>
            ))}
        </div>
      ) : (
          <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects found matching "{q}".</p>
          </div>
      )}
    </div>
  );
}
