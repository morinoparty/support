<template>
  <div>
    <header class="auction" id="header">
      <div class="image" :style="'background-image: url(' + item.thumbnail + ')'"></div>
      <div class="background"></div>
      <div class="title">
        <h1>オークション</h1>
        <p>{{ item.title }}</p>
      </div>
    </header>
    <div class="container auction">
      <div class="body">
        <img :src="item.thumbnail" class="thumb" />
        <h1>{{ item.title }}</h1>
        <p v-html="item.description"></p>
        <small>※もりもとにチェストが集中してしまいますと、負荷等の観点から問題になりますので、倉庫などへの利用はお控えいただきますと幸いです。</small>

        <figure class="alert">
          <h2>座標</h2>
          <div class="position">
            <span>X:</span>
            {{item.position_x}}
          </div>
          <div class="position">
            <span>Y:</span>
            {{item.position_y}}
          </div>
          <div class="position">
            <span>Z:</span>
            {{item.position_z}}
          </div>
        </figure>
        <figure class="alert">
          <h2>入札するには？？</h2>
          <code>/auction bid {{ item.id }} 金額</code>このコマンドをもりのパーティの中で行ってみましょう!
          <br />
          <small>※入札するには、入札する金額を持っていることが必要です</small>
        </figure>
      </div>
      <aside>
        <ul>
          <li>
            <h3>現在の入札数</h3>
            <p v-for="(item, index) in count" v-bind:key="index">{{ item.count }}件</p>
          </li>
          <div v-for="(item, index) in highest" v-bind:key="index">
            <li>
              <h3>現在の金額</h3>
              <p>{{ item.amount }}円</p>
            </li>
            <li>
              <h3>最新入札時間</h3>
              <p>{{ time_now_bid }}</p>
            </li>
            <li>
              <h3>現在の最高入札者</h3>
              <div class="flex">
                <img
                  class="head"
                  :src="
                      'https://crafatar.com/renders/head/' +
                        item.mc_uuid +
                        '?size=64&overlay'
                    "
                />
                <p>{{ item.mc_id }}</p>
              </div>
            </li>
          </div>

          <li>
            <h3>開始価格</h3>
            <p>{{ item.now }}円</p>
          </li>
          <li>
            <h3>期間</h3>
            <p>開始：{{ time_start_computed }}</p>
            <p>終了：{{ time_limit_computed }}</p>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
<style lang="scss">
header.auction {
  z-index: 1;
  position: relative;
  .image {
    z-index: -1;
    width: 100%;
    height: 300px;
    position: absolute;
    background-size: cover;
    background-position: center;
  }
  .title {
    color: white;
    text-align: center;
    text-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    h1 {
      font-size: 1rem;
    }
    p {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  .background {
    z-index: 1;
    height: 300px;
    width: 100%;
    position: absolute;
    backdrop-filter: blur(3px);
  }
  .title,
  .background {
    z-index: 1;
  }
}
.container.auction {
  grid-template-columns: 1fr 200px;
  grid-gap: 50px;
  grid-template-rows: auto;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
}
.body {
  p {
    line-height: 2;
    font-feature-settings: "palt" 1;
    letter-spacing: 0.05em;
  }
  img.thumb {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 1px solid #dddddd;
    border-radius: 10px;
  }
  h1 {
    margin-bottom: 1rem;
  }
  small {
    display: inline-block;
    opacity: 0.7;
    line-height: 2;
    padding-top: 20px;
    padding-left: 20px;
  }
  figure.alert {
    padding: 20px;
    margin-top: 3rem;
    background: rgba(0, 121, 7, 0.1);
    border-radius: 10px;
    h2 {
      color: #007907;
      font-size: 1.3rem;
    }
    code {
      padding: 5px;
      display: inline-block;
      background-color: white;
      font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        Noto Sans JP, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI;
      border-radius: 5px;
      margin-right: 10px;
      margin-top: 10px;
      font-size: 1rem;
    }
    .position {
      display: inline-block;
      width: 32%;
      text-align: center;
      padding-right: 5px;
      span {
        font-weight: bold;
        color: #007907;
        padding-right: 5px;
        font-size: 1.2rem;
      }
    }
    small {
      display: block;
      margin-top: 10px;
      opacity: 0.7;
    }
  }
}
aside {
  margin-top: 2rem;
  h3 {
    transform: translateX(-10px);
    color: #007907;
    margin-bottom: 1rem;
    padding-bottom: 5px;
    border-bottom: solid 2px;
    display: inline-block;
    @media (max-width: 768px) {
      transform: translateX(0px);
    }
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    margin-bottom: 2rem;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  img.head {
    width: 50px;
    margin-right: 20px;
  }
}
</style>
<script>
import mainheader from "~/components/header.vue";
import card from "~/components/cards/auctions.vue";

import dayjs from "dayjs";
import axios from "axios";
export default {
  components: { mainheader, card },

  data() {
    return {
      item: {},
      count: {},
      highest: {},
      time_start_computed: "",
      time_limit_computed: "",
      time_now_bid: "",
      title: "",
      loading: true
    };
  },
  head() {
    return {
      title: this.title + " | もりのパーティ サポート",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        },
        {
          property: "og:title",
          content: this.title
        },
        {
          property: "og:description",
          content: this.description
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:site_name",
          content: "もりのパーティ! オークション"
        },
        {
          property: "og:url",
          content:
            "https://support.morino.party/auctions/" +
            this.$nuxt.$route.params.id
        },
        {
          property: "og:image",
          content: this.thumbnail
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:site",
          content: "morinoparty"
        }
      ]
    };
  },
  methods: {
    fetchcontent() {
      axios
        .get(
          `https://api.morino.party/auctions/content/` +
            this.$nuxt.$route.params.id
        )
        .then(res => {
          this.item = res.data;
          this.title = res.data.title;
          this.description = res.data.description;
          this.thumbnail = res.data.thumbnail;
          this.loading = false;

          this.time_start_computed = dayjs(res.data.time_start).format(
            "M月D日 HH:mmから"
          );
          this.time_limit_computed = dayjs(res.data.time_limit).format(
            "M月D日 HH:mmまで"
          );
          console.log(res.data);
        })
        .catch(e => {
          error({ statusCode: 404, message: "ページが見つかりません" });
        });
    },
    fetchcount() {
      axios
        .get(
          `https://api.morino.party/auctions/count/` +
            this.$nuxt.$route.params.id
        )
        .then(res => {
          this.count = res.data;
          console.log(res.data);
        })
        .catch(e => {
          error({ statusCode: 404, message: "ページが見つかりません" });
        });
    },
    fetchhighest() {
      axios
        .get(
          `https://api.morino.party/auctions/highest/` +
            this.$nuxt.$route.params.id
        )
        .then(res => {
          this.highest = res.data;
          this.time_now_bid = dayjs(res.data.created_time).format(
            "M月D日 HH:mm"
          );
          console.log(res.data);
        })
        .catch(e => {
          error({ statusCode: 404, message: "ページが見つかりません" });
        });
    }
  },
  mounted() {
    this.fetchcontent();
    this.fetchcount();
    this.fetchhighest();
  }
};
</script>
