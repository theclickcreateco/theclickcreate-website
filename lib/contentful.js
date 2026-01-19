import { createClient } from 'contentful';

// Validate environment variables
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  console.error('Missing Contentful environment variables!');
  console.error('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID ? 'Set' : 'Missing');
  console.error('CONTENTFUL_ACCESS_TOKEN:', process.env.CONTENTFUL_ACCESS_TOKEN ? 'Set' : 'Missing');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Fetch all blog posts
export async function getBlogPosts(limit = 100) {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
      limit,
    });

    return response.items.map((item) => {
      const publishedDate = item.fields.publishedDate;
      let formattedDate = 'Jan 1, 2026'; // Default fallback
      
      if (publishedDate) {
        try {
          const dateObj = new Date(publishedDate);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          }
        } catch (e) {
          console.error('Error parsing date:', e);
        }
      }

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        content: item.fields.content,
        image: item.fields.featuredImage?.fields?.file?.url 
          ? `https:${item.fields.featuredImage.fields.file.url}` 
          : '/images/hero-illustration.png',
        category: item.fields.category,
        author: item.fields.author,
        date: formattedDate,
        publishedDate: publishedDate,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug) {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    const publishedDate = item.fields.publishedDate;
    let formattedDate = 'Jan 1, 2026'; // Default fallback
    
    if (publishedDate) {
      try {
        const dateObj = new Date(publishedDate);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        }
      } catch (e) {
        console.error('Error parsing date:', e);
      }
    }

    return {
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
      image: item.fields.featuredImage?.fields?.file?.url 
        ? `https:${item.fields.featuredImage.fields.file.url}` 
        : '/images/hero-illustration.png',
      category: item.fields.category,
      author: item.fields.author,
      date: formattedDate,
      publishedDate: publishedDate,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all portfolio projects
export async function getPortfolioProjects(limit = 100) {
  try {
    const response = await client.getEntries({
      content_type: 'portfolioProject',
      order: '-sys.createdAt',
      limit,
    });

    return response.items.map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      image: item.fields.image?.fields?.file?.url 
        ? `https:${item.fields.image.fields.file.url}` 
        : '/images/hero-illustration.png',
      category: item.fields.category,
      technologies: item.fields.technologies || [],
      liveUrl: item.fields.liveUrl || null,
    }));
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}

// Get all unique categories from blog posts
export async function getBlogCategories() {
  const posts = await getBlogPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  return categories.filter(Boolean);
}

// Get all unique categories from portfolio projects
export async function getPortfolioCategories() {
  const projects = await getPortfolioProjects();
  const categories = [...new Set(projects.map(project => project.category))];
  return categories.filter(Boolean);
}
