<template>
  <div>
    <header id="header">
      <div class="title">
        <h1>MorinoParty Support</h1>
        <p>よくある質問一覧です。</p>
      </div>
    </header>
    <div class="container">
      <card
        v-for="items of content"
        v-bind:key="items.id"
        :val="items"
        :class="items.id"
      ></card>
    </div>
  </div>
</template>

<script>
import card from "~/components/cards/faq_content.vue";
import axios from "axios";
export default {
  components: {
    card
  },
  data() {
    return {
      content: {}
    };
  },
  async asyncData({ params, error }) {
    return axios
      .get(
        `https://v2-api.sheety.co/a29c53938fe2070f5a71a8d9494eed15/morinoPartySupport/content?id=${params.id}`
      )
      .then(res => {
        console.log(res.data);
        return {
          content: res.data.content
        };
      });
  }
};
</script>
