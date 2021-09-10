const config = {
  siteTitle: 'גן ילדי הטבע הדמוקרטי', // Site title.
  siteTitleShort: 'גן ילדי הטבע', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'גן ילדי הטבע הדמוקרטי', // Alternative site title for SEO.
  siteLogo: '/logos/logo.png', // Logo used for SEO and manifest.
  siteUrl: 'http://www.ganyeledteva.co.il', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'A GatsbyJS starter with Advanced design in mind.', // Website description used for RSS feeds/meta description tag.
  siteRssTitle: '', // Title of the RSS feed
  siteRss: '',
  siteFBAppID: '', // FB Application ID for using app insights
  googleAnalyticsID: 'DUMMY_ID', // GA tracking ID. uses dummy id to compile
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'DD/MM/YYYY', // Date format for display.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/Vagr9K/gatsby-advanced-starter',
      iconClassName: 'fa fa-github',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/Vagr9K',
      iconClassName: 'fa fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:vagr9k@gmail.com',
      iconClassName: 'fa fa-envelope',
    },
  ],
  copyright: '© 2009 כל הזכויות שמורות לגן ילדי הטבע הדמוקרטי.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
  ganMainPageDataMdFileName: 'index', // gan's main page data is defined in "content/gan/index.md", unlike other pages' data, so this is the said file name.
  siteRoutes: [
    { name: 'דף הבית', href: '/' },
    { name: 'הגישה הדמוקרטית', href: '/democraticeducation' },
    { name: 'הגן', href: '/gan' },
    {
      name: 'חדשנות חינוכית לגיל הרך',
      href: '/democratic-center',
    },
    { name: 'העדכון השבועי', href: '/weekly-update' },
    { name: 'שאלות ותשובות', href: '/faq' },
    { name: 'מוצרים חינוכיים', href: '/products' },
    { name: 'לעבוד בגן', href: '/work-in-gan' },
    { name: 'צור קשר', href: '/contact' },
  ],
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/')
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
