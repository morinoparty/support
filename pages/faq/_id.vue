<template>
  <div>
    <mainheader :text="'もりのパーティのサポートページです'"></mainheader>
    <div class="container">
      <card
        v-for="items of content"
        v-bind:key="items.id"
        :val="items"
        :class="items.id"
        :en="true"
      ></card>
    </div>
  </div>
</template>

<script>
import mainheader from "~/components/header.vue";
import card from "~/components/cards/faq.vue";
import axios from "axios";
export default {
  components: {
    card,
    mainheader
  },

  asyncData({ params, payload, error }) {
    return axios
      .get(
        `https://v2-api.sheety.co/a29c53938fe2070f5a71a8d9494eed15/morinoPartySupport/content?id=${params.id}`
      )
      .then(res => {
        return {
          content: res.data.content
        };
      });
  },
  data() {
    return {
      content: {},
      title: ""
    };
  },
  head() {
    return {
      title: this.content[0].titleJa + " | もりのパーティ サポート"
    };
  }
};
</script>
