<template>
  <div>
    <div v-for="(item, index) in content" v-bind:key="index">
      <header class="auction" id="header">
        <div
          class="image"
          :style="'background-image: url(' + item.thumbnail + ')'"
        ></div>
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
          <p>{{ item.description }}</p>

          <figure class="alert">
            <strong>入札するには？？</strong><br />
            <code>/auction {{ item.id }} 金額</code
            >このコマンドをもりのパーティの中で行ってみましょう!
          </figure>
        </div>
        <aside>
          <ul>
            <li>
              <h3>現在の入札数</h3>
              <p v-for="(item, index) in count" v-bind:key="index">
                {{ item.count }}件
              </p>
            </li>
            <div v-for="(item, index) in highest" v-bind:key="index">
              <li>
                <h3>現在の金額</h3>
                <p>{{ item.amount }}円</p>
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
              <h3>期間</h3>
              <p>開始：{{ time_start_computed }}</p>
              <p>終了：{{ time_limit_computed }}</p>
            </li>
          </ul>
        </aside>
      </div>
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
  .background {
    z-index: 1;
    height: 300px;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    position: absolute;
    backdrop-filter: blur(5px);
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
  figure.alert {
    padding: 20px;
    margin-top: 3rem;
    background: rgba(0, 121, 7, 0.1);
    border-radius: 10px;
    strong {
      color: #007907;
      font-size: 1.3rem;
    }
    code {
      padding: 5px;
      display: inline-block;
      background-color: white;
      border-radius: 5px;
      margin-right: 10px;
      margin-top: 10px;
      font-size: 1.3rem;
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
      content: {},
      count: {},
      highest: {},
      time_start_computed: "",
      time_limit_computed: "",
      loading: true
    };
  },
  head() {
    return {
      title: "オークション | もりのパーティ サポート"
    };
  },
  methods: {
    fetchcontent() {
      axios
        .get(`https://api.morino.party/auctions/` + this.$nuxt.$route.params.id)
        .then(res => {
          this.content = res.data;
          this.loading = false;

          this.time_start_computed = dayjs(res.data[0].time_start).format(
            "M月D日 HH:mmから"
          );
          this.time_limit_computed = dayjs(res.data[0].time_limit).format(
            "M月D日 HH:mmまで"
          );
          console.log(res.data);
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
          console.log(res.data);
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
