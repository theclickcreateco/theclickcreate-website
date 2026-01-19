import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { SearchBar } from "@/components/search-bar";

const BLOG_POSTS = [
  { 
    title: "Top 5 Tips for Responsive Web Design", 
    desc: "Learn how to make your websites fully responsive across all devices in 2026. Mobile-first approaches and modern CSS techniques.",
    img: "/images/blog-responsive.png",
    slug: "responsive-web-design-tips",
    date: "Jan 15, 2026",
    category: "Design"
  },
  // ... (rest of posts are same, just confirming structure)
  { 
    title: "How Branding Impacts Your Business", 
    desc: "Understand the importance of branding and how it drives customer trust. A deep dive into color psychology and consistency.",
    img: "/images/blog-branding.png",
    slug: "branding-impacts-business",
    date: "Jan 10, 2026",
    category: "Branding"
  },
  { 
    title: "SEO Strategies for Modern Websites", 
    desc: "Boost your website traffic with these proven SEO strategies. From technical SEO to content optimization.",
    img: "/images/hero-illustration.png", // Fallback
    slug: "seo-strategies-modern-websites",
    date: "Jan 05, 2026",
    category: "Marketing"
  },
  // Add more mock posts if needed
];

export default async function BlogListing({ searchParams }) {
  const { category, q } = await searchParams;
  
  const categories = Array.from(new Set(BLOG_POSTS.map(p => p.category)));

  const filteredPosts = BLOG_POSTS.filter(post => {
      const matchCategory = category ? post.category.toLowerCase() === category.toLowerCase() : true;
      const matchSearch = q ? (post.title.toLowerCase().includes(q.toLowerCase()) || post.desc.toLowerCase().includes(q.toLowerCase())) : true;
      return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Insights, guides, and news from the tech world.
        </p>
        
        <SearchBar placeholder="Search articles..." />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Link 
            href="/blog" 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!category ? 'bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] text-white animate-gradient-x bg-[length:200%_auto]' : 'bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-[#2A9D8F] hover:via-[#264653] hover:to-[#F4A261] hover:text-white hover:bg-[length:200%_auto] hover:animate-gradient-x'}`}
          >
            All
          </Link>
          {categories.map(cat => (
            <Link 
              key={cat}
              href={`/blog?category=${cat.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category?.toLowerCase() === cat.toLowerCase() ? 'bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] text-white animate-gradient-x bg-[length:200%_auto]' : 'bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-[#2A9D8F] hover:via-[#264653] hover:to-[#F4A261] hover:text-white hover:bg-[length:200%_auto] hover:animate-gradient-x'}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {category && (
            <div className="mt-8">
                 <p className="text-sm text-muted-foreground mb-2">Showing posts for:</p>
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full font-bold">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <Link href="/blog" className="hover:text-red-500 transition-colors ml-2" title="Clear Filter">
                        ✕
                    </Link>
                 </div>
            </div>
        )}
      </div>

      <div className="mb-16">
         <AdPlaceholder slotId="blog-top" />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, i) => (
            <div key={i} className="group relative flex flex-col bg-card border border-border rounded-xl hover:shadow-lg hover:border-blue-500 transition-all card-gradient-hover">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0">
                <span className="sr-only">View {post.title}</span>
                </Link>
                <div className="relative w-full h-56 overflow-hidden pointer-events-none rounded-t-xl">
                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Link href={`/blog?category=${post.category.toLowerCase()}`} className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-500 uppercase hover:bg-blue-500 hover:text-white transition-colors z-10 pointer-events-auto">
                        {post.category}
                    </Link>
                </div>
                <div className="p-6 flex-grow flex flex-col pointer-events-none">
                <div className="text-xs text-muted-foreground mb-3">{post.date}</div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.desc}</p>
                <div className="flex items-center text-sm font-medium text-blue-500 mt-auto">
                    Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
          <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No posts found matching your criteria.</p>
              <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">View All Posts</Link>
          </div>
      )}
      
      <div className="mt-16">
         <AdPlaceholder slotId="blog-bottom" />
      </div>
    </div>
  );
}
