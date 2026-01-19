import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { getPortfolioProjects, getPortfolioCategories } from "@/lib/contentful";

export default async function Portfolio({ searchParams }) {
  const { category, q } = await searchParams;
  
  // Fetch all projects and categories from Contentful
  const allProjects = await getPortfolioProjects();
  const categories = await getPortfolioCategories();

  // Filter projects based on category and search query
  const filteredProjects = allProjects.filter(project => {
      const matchCategory = category ? project.category.toLowerCase() === category.toLowerCase() : true;
      const matchSearch = q ? (project.title.toLowerCase().includes(q.toLowerCase()) || project.description.toLowerCase().includes(q.toLowerCase())) : true;
      return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Showcasing our best work and creative solutions.
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

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((item, i) => (
            <AnimationWrapper key={i} delay={i * 0.1}>
                <div className="group relative bg-card border border-border rounded-xl hover:shadow-xl transition-all cursor-pointer h-full flex flex-col card-gradient-hover">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                    <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.category}</span>
                        <h3 className="text-xl font-bold mb-3 font-heading">{item.title}</h3>
                        <p className="text-muted-foreground text-sm flex-grow line-clamp-3">{item.description}</p>
                        {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.technologies.map((tech, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-secondary rounded-full">{tech}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </AnimationWrapper>
            ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
            <Link href="/portfolio" className="text-blue-500 hover:underline mt-4 inline-block">View All Projects</Link>
        </div>
      )}
    </div>
  );
}
