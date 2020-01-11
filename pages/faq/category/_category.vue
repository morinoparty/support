<template>
  <div>
    <mainheader :text="'もりのパーティのサポートページです'"></mainheader>
    <div class="container grid">
      <nuxt-link
        :to="'/faq/' + items.id"
        v-for="items of content"
        v-bind:key="items.id"
      >
        <card :val="items"></card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import mainheader from "~/components/header.vue";
import card from "~/components/cards/faq.vue";

import axios from "axios";
export default {
  components: { card, mainheader },

  data() {
    return {
      content: {}
    };
  },
  asyncData({ params, error }) {
    return axios
      .get(
        `https://v2-api.sheety.co/a29c53938fe2070f5a71a8d9494eed15/morinoPartySupport/content?categoryId=${params.category}`
      )
      .then(res => {
        return {
          content: res.data.content
        };
      });
  }
};
</script>
