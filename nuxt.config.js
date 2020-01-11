import axios from "axios";
const cheerio = require("cheerio");

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "もりのパーティ! サポート",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/sitemap"],

  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://support.morino.party",
    // generate: true,
    exclude: [""],
    routes(callback) {
      axios
        .get(
          "https://v2-api.sheety.co/a29c53938fe2070f5a71a8d9494eed15/morinoPartySupport/content"
        )
        .then(res => {
          var routes = res.data.content.map(items => {
            return {
              route: "/faq/" + items.id
            };
          });
          callback(null, routes);
        })
        .catch(callback);
    }
  },

  hooks: {
    "generate:page": page => {
      const doc = cheerio.load(page.html);
      doc(`body script`).remove();
      page.html = doc.html();
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    fallback: true
  }
};
