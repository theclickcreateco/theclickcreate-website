import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { SocialShare } from "@/components/social-share";
import { AdPlaceholder } from "@/components/ad-placeholder";

// Mock Data (In real app, fetch from CMS/DB)
const POSTS = {
  "responsive-web-design-tips": {
    title: "Top 5 Tips for Responsive Web Design",
    date: "Jan 15, 2026",
    author: "Alex Dev",
    category: "Design",
    img: "/images/blog-responsive.png",
    content: (
      <>
        <p>Responsive design is non-negotiable in 2026. With mobile traffic surpassing desktop, your site must adapt seamlessly.</p>
        <h3>1. Use Flexible Grids</h3>
        <p>Gone are the days of fixed-width layouts. CSS Grid and Flexbox are your best friends.</p>
        <AdPlaceholder slotId="in-content-1" className="my-8" />
        <h3>2. Media Queries</h3>
        <p>Breakpoints should be based on content, not specific devices.</p>
        <h3>3. Optimized Images</h3>
        <p>Use Next.js Image component to automatically serve WebP/AVIF formats.</p>
        <p>...</p>
      </>
    )
  },
  "branding-impacts-business": {
    title: "How Branding Impacts Your Business",
    date: "Jan 10, 2026",
    author: "Sarah Design",
    category: "Branding",
    img: "/images/blog-branding.png",
    content: (
      <>
        <p>Branding is more than just a logo. It's the entire experience your customer has with your company.</p>
        <AdPlaceholder slotId="in-content-1" className="my-8" />
        <h3>Consistency is Key</h3>
        <p>Ensure your colors, fonts, and voice are consistent across all channels.</p>
      </>
    )
  },
   "seo-strategies-modern-websites": {
    title: "SEO Strategies for Modern Websites",
    date: "Jan 05, 2026",
    author: "Mike SEO",
    category: "Marketing",
    img: "/images/hero-illustration.png",
    content: (
      <>
        <p>SEO is constantly evolving. Core Web Vitals are now a major ranking factor.</p>
        <AdPlaceholder slotId="in-content-1" className="my-8" />
        <h3>Technical SEO</h3>
        <p>Ensure your site is fast, secure (HTTPS), and mobile-friendly.</p>
      </>
    )
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS[slug];
  
  if (!post) {
      return {
          title: 'Post Not Found',
          description: 'The requested blog post could not be found.'
      };
  }

  return {
      title: post.title,
      description: `Read about ${post.title} on The Click & Create Co blog.`,
      openGraph: {
          title: post.title,
          description: `Read about ${post.title}.`,
          type: 'article',
          publishedTime: post.date, // Should be ISO format in real app
          authors: [post.author],
          images: [
              {
                  url: post.img,
                  width: 1200,
                  height: 630,
                  alt: post.title,
              }
          ]
      }
  };
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

// Redundant component removed. Using wrapper below.

// Wrapper to handle async params if needed, or just standard component 
// Note: In Next.js 15, params is a Promise. Let's make the main component async.

async function BlogPostContentWrapper({ params }) {
    const { slug } = await params; 
    const post = POSTS[slug];
    if (!post) return notFound();
    return <BlogPostContent post={post} slug={slug} />;
}

// Actual Content Component
function BlogPostContent({ post, slug }) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-blue-500 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>
      
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold uppercase tracking-wider mb-4">
            {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
            </div>
             <div className="flex items-center gap-2">
                <User className="w-4 h-4" /> {post.author}
            </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden bg-secondary">
         <Image src={post.img} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        <div className="prose dark:prose-invert prose-lg max-w-none">
           {post.content}
        </div>
        
        <aside className="space-y-8">
            <div className="sticky top-24">
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                    <h3 className="font-bold mb-4">Share this post</h3>
                    <SocialShare url={`https://theclickcreate.com/blog/${slug}`} title={post.title} />
                </div>
                 <AdPlaceholder slotId="sidebar-ad" className="min-h-[300px]" />
            </div>
        </aside>
      </div>
      
      <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
          {/* Reuse listing grid logic or simplified version */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mock related items */}
                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <h4 className="font-bold text-lg mb-2">More in {post.category}</h4>
                    <p className="text-muted-foreground">Check out other articles in this category.</p>
                </div>
           </div>
      </div>
      
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: [post.img], // Needs full URL in production
            datePublished: "2026-01-01", // Placeholder, need ISO date
            author: [{
                "@type": "Person",
                name: post.author,
            }]
          })
        }}
      />
    </article>
  );
}

// Export the wrapper as default to handle async params correctly in Next 15
export { BlogPostContentWrapper as default };
