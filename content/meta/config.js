const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "jackson bell -- composer/producer", // <title>
  shortSiteTitle: "jackson bell", // <title> ending for posts and pages
  siteDescription: "Personal portfolio for composer/producer/musician Jackson Bell",
  siteUrl: "https://gatsby-starter-personal-blog.greglobinski.com",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "en",
  // author
  authorName: "jackson bell",
  authorTwitterAccount: "trappity",
  // info
  infoTitle: "jackson bell",
  infoTitleNote: "composer/producer",
  // manifest.json
  manifestName: "jackson bell -- composer/producer",
  manifestShortName: "jackson bell", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "john@doe.com",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/greglobinski" },
    { name: "twitter", url: "https://twitter.com/greglobinski" },
    { name: "facebook", url: "https://facebook.com/greglobinski" }
  ]
};
