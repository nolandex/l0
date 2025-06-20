/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bisnovo.my.id", // GANTI DARI landingpage.weijunext.com
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
