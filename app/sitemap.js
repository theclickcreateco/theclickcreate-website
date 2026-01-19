export default function sitemap() {
  const baseUrl = 'https://theclickcreate.com'; // Replace with actual domain

  // Mock blog posts slugs from blog/page.js or shared source
  // In a real app, fetch these from DB/CMS
  const blogPosts = [
    'high-performance-website-2026',
    'responsive-web-design-tips',
    'branding-impacts-business',
    'seo-strategies-modern-websites',
  ];

  const posts = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/pricing',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...posts];
}
