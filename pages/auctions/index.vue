<template>
  <div>
    <mainheader :text="'現在開催中のオークションをチェックできます'"></mainheader>
    <div class="loading" v-if="this.content.length == 0">
      <div>
        <span>🤔</span>
        <br />現在開催中のオークションはありません...!
      </div>
    </div>
    <div class="container grid" v-else>
      <card v-for="(item, index) in content" v-bind:key="index" :item="item" />
    </div>
  </div>
</template>
<style lang="scss">
.loading {
  text-align: center;
  font-size: 1.5rem;
  height: calc(100vh - 300px);
  color: white;
  background: #0079068a;
  font-feature-settings: "palt" 1;
  letter-spacing: 0.15em;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 4rem;
  }
}
</style>

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
