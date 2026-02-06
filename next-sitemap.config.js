/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://apnasirhalwelfare.vercel.app/', // Replace with your domain
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/dashboard', '/add-expenses', '/add-funds'],
        allow: '/',
      },
    ],
  },
  sitemapSize: 5000,
};
