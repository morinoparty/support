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
      <card
        v-for="items of content"
        v-bind:key="items.title"
        :val="items"
      ></card>
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
      "https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1W5zD7PO3myloJJpuy-0Ir70TnMK8afuh2nQH-7EIiS0&range=content!A2:C100"
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
.card {
  border-radius: 15px;
  padding: 2rem 1.5rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.07);
  line-height: 1.7;
  font-feature-settings: "palt" 1;
  letter-spacing: 0.11em;
  h1 {
    position: relative;
    font-weight: normal;
    font-size: 1.2rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    padding-left: 1.5rem;
    &::after {
      position: absolute;
      content: "Q";
      color: #007907;
      top: 0;
      left: 0;
    }
  }
  p {
    position: relative;
    padding-left: 1.5rem;
    &:after {
      position: absolute;
      content: "A";
      color: #007907;
      top: 0;
      left: 0;
      opacity: 0.5;
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
