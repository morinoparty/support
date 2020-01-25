<template>
  <div>
    <mainheader :text="'もりのパーティのサポートページです'"></mainheader>
    <div class="container normal-text">
      <h1>なにかお困りですか？</h1>
      <p>困ったこと、わからないことがあった場合は、こちらから正しい対処法を探すことができます。</p>
      <hr />
      <nuxt-link to="/faq">FAQ</nuxt-link>
      <br />
      <nuxt-link to="/shops">ショップ一覧</nuxt-link>
      <br />
      <nuxt-link to="/team">運営チーム</nuxt-link>
    </div>
  </div>
</template>
<style lang="scss">
hr {
  margin-top: 50px;
  margin-bottom: 50px;
  opacity: 0.3;
}
.normal-text {
  text-align: center;
  color: #007907;
  p {
    padding-top: 10px;
  }
}
</style>
<script>
import mainheader from "~/components/header.vue";

import axios from "axios";
export default {
  components: { mainheader }
};
</script>
