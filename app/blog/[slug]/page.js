import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { SocialShare } from "@/components/social-share";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/contentful";

// Rich text rendering options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
      return {
          title: 'Post Not Found',
          description: 'The requested blog post could not be found.'
      };
  }

  return {
      title: post.title,
      description: post.description,
      openGraph: {
          title: post.title,
          description: post.description,
          type: 'article',
          publishedTime: post.publishedDate,
          authors: [post.author],
          images: [
              {
                  url: post.image,
                  width: 1200,
                  height: 630,
                  alt: post.title,
              }
          ]
      }
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function BlogPostContentWrapper({ params }) {
    const { slug } = await params; 
    const post = await getBlogPostBySlug(slug);
    if (!post) return notFound();
    return <BlogPostContent post={post} slug={slug} />;
}

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
         <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        <div className="prose dark:prose-invert prose-lg max-w-none">
           {post.content && typeof post.content === 'object' ? (
             documentToReactComponents(post.content, richTextOptions)
           ) : (
             <div dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available.</p>' }} />
           )}
           
           {/* In-Content Ad */}
           <div className="my-8 not-prose">
             <AdPlaceholder slotId="blog-in-content" />
           </div>
        </div>
        
        <aside className="space-y-8">
            <div className="sticky top-24 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold mb-4">Share this post</h3>
                    <SocialShare url={`https://theclickcreate.com/blog/${slug}`} title={post.title} />
                </div>
                
                {/* Sidebar Ad */}
                <AdPlaceholder slotId="blog-sidebar" className="min-h-[600px]" />
            </div>
        </aside>
      </div>
      
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: [post.image],
            datePublished: post.publishedDate,
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

export default BlogPostContentWrapper;
