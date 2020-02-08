<template>
  <div>
    <mainheader :text="'現在開催中のオークションをチェックできます'"></mainheader>
    <div class="container grid">
      <card v-for="(item, index) in content" v-bind:key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import mainheader from "~/components/header.vue";
import card from "~/components/cards/auctions.vue";

import axios from "axios";
export default {
  components: { mainheader, card },

  data() {
    return {
      content: {},
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
      axios.get(`https://api.morino.party/auctions/`).then(res => {
        this.content = res.data;
        this.loading = false;
        console.log(res.data);
      });
    }
  },
  mounted() {
    this.fetchcontent();
  }
};
</script>
