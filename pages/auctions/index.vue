<template>
  <div>
    <mainheader :text="'現在開催中のオークションをチェックできます'"></mainheader>
    <div class="loading" v-if="this.content.length == 0">
      <div>
        <span>🤔</span>
        <br />現在開催中のオークションはありません...!
      </div>
    </div>
    <div v-else>
      <div class="container no-padding auction-list">
        <h2>現在開催中のオークション</h2>
      </div>
      <div class="container grid auction-list">
        <card v-for="(item, index) in content" v-bind:key="index" :item="item" />
      </div>
      <div class="container no-padding auction-list">
        <h2 class="orange">開催予定のオークション</h2>
      </div>
      <div class="container grid auction-list">
        <card v-for="(item, index) in coming" v-bind:key="index" :item="item" :type="'coming'" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.container.no-padding {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  h2 {
    color: #007907;
  }
  h2.orange {
    color: #d46c00;
  }
}
.container.auction-list {
  max-width: 1200px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
}
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
      coming: {},
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
    },
    fetchcomingcontent() {
      axios.get(`https://api.morino.party/auctions/coming`).then(res => {
        this.coming = res.data;
        console.log(res.data);
      });
    }
  },
  mounted() {
    this.fetchcontent();
    this.fetchcomingcontent();
  }
};
</script>
