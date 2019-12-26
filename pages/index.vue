<template>
  <div>
    <header id="header">
      <div class="title">
        <h1>MorinoParty Support</h1>
        <p>よくある質問一覧です。</p>
      </div>
    </header>
    <div class="container">
      <div class="card" v-for="items of content" v-bind:key="items.title">
        <h1>{{ items.title }}</h1>
        <p>{{ items.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
  background: rgb(238, 238, 238);
}
header#header {
  position: relative;
  text-align: left;
  height: 300px;
  background: #00790649;
  color: #007907;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
.card {
  padding: 1rem;
  background: white;
  h1 {
    font-weight: normal;
    font-size: 1.2rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
.container {
  display: grid;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
  grid-template-columns: calc(33.33% - 20px) calc(33.33% - 20px) calc(
      33.33% - 20px
    );
  grid-gap: 30px;
  grid-template-rows: auto;
}
</style>
