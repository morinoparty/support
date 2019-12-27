import axios from "axios";

export default {
  mode: "universal",
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
          "https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1W5zD7PO3myloJJpuy-0Ir70TnMK8afuh2nQH-7EIiS0&range=content!A2:G100"
        )
        .then(res => {
          var routes = res.data.map(items => {
            return {
              route: "/faq/" + items.id
            };
          });
          callback(null, routes);
        })
        .catch(callback);
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
    routes() {
      // 使用するAPIから情報を取得
      return axios
        .get(
          "https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1W5zD7PO3myloJJpuy-0Ir70TnMK8afuh2nQH-7EIiS0&range=content!A2:G100"
        )
        .then(res => {
          return res.data.map(items => {
            return {
              route: "/faq/" + items.id
            };
          });
        });
    }
  }
};
