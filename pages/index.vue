<template>
  <div>
    <nav>
      <ul>
        <li class="img">
          <nuxt-link to="/"
            ><img
              height="38px"
              width="38px"
              src="https://morino.party/assets/server-icon.png"
          /></nuxt-link>
        </li>
        <li>Support</li>
      </ul>
    </nav>
    <header id="header">
      <div class="title">
        <h1>MorinoParty Support</h1>
        <p>よくある質問一覧です。</p>
      </div>
    </header>
    <div class="container">
      <card v-for="items of content" v-bind:key="items.id" :val="items"></card>
    </div>
  </div>
</template>

<script>
import card from "~/components/cards/faq.vue";

import axios from "axios";
export default {
  components: { card },
  async asyncData({ app, params }) {
    const { data } = await axios.get(
      "https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1W5zD7PO3myloJJpuy-0Ir70TnMK8afuh2nQH-7EIiS0&range=content!A2:G100"
    );
    return { content: data };
  }
};
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
    Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
    メイリオ, Meiryo, sans-serif;
}
nav {
  position: fixed;
  z-index: 999;
  color: #007907;
  ul {
    height: 38px;
    display: flex;
    padding: 0;
    li {
      display: inline-block;
      padding: 10px;
      font-weight: bold;
      &.img {
        padding: 0;
      }
    }
  }
}

header#header {
  position: relative;
  text-align: left;
  height: 300px;
  color: #007907;
  background: rgba(0, 121, 7, 0.03);
  margin-bottom: 30px;
  .title {
    max-width: 1000px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    padding-right: 20px;
    padding-left: 20px;
    p {
      padding-top: 10px;
    }
  }
}
.container {
  max-width: 1000px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
  grid-template-columns: calc(50% - 20px) calc(50% - 20px);
  grid-gap: 30px;
  grid-template-rows: auto;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    padding-left: 10px;
    padding-right: 10px;
    grid-gap: 10px;
    padding-bottom: 50px;
  }
}
</style>
