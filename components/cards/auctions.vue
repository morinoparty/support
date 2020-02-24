<template>
  <nuxt-link :to="'/auctions/' + item.id" :class="'card-auction '+type">
    <div class="data top">
      <p class="left">#{{ item.id }}</p>
      <p
        class="right price"
        v-for="(highest, index) in highest"
        v-bind:key="index"
      >{{ highest.amount }}円</p>
    </div>
    <div class="image" :style="'background-image: url(' + item.thumbnail + ')'"></div>
    <div class="info">
      <h1>{{ item.title }}</h1>
      <p>{{ item.description.slice(0,70)+"..." }}</p>
    </div>
    <div class="data bottom">
      <p class="left" v-if="type == 'coming'">{{ time_limit_computed }}</p>
      <p class="left" v-else>{{ time_limit_computed }}</p>
    </div>
  </nuxt-link>
</template>
<style lang="scss">
.card-auction {
  position: relative;
  overflow: hidden;
  border: 1px solid #dddddd;
  border-radius: 20px;
  text-decoration: none;
  height: fit-content;
  &.coming {
    .info h1 {
      color: #d46c00;
    }
    .data {
      &.bottom {
        background-color: rgba(255, 201, 49, 0.15);
      }
      .left {
        background-color: #e87600;
      }
    }
  }

  .image {
    overflow: hidden;
    z-index: 0;
    height: 250px;
    background-size: cover;
    background-position: center;
  }
  .info {
    padding: 15px;
    h1 {
      color: #007907;
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
    p {
      color: #949494;
      font-size: 0.8rem;
    }
  }
  .data {
    z-index: 1;
    display: flex;
    &.top {
      position: absolute;
      top: 0;
      width: 100%;
    }
    &.bottom {
      background-color: rgba(0, 121, 7, 0.1);
    }
    .left,
    .right {
      height: fit-content;
      font-size: 0.8rem;
      padding: 5px 15px;
      border-radius: 20px 20px 0;
    }
    .left {
      display: inline-block;
      background-color: #4c7b57;
      color: white;
      border-radius: 0 20px 20px 0;
    }
    .right {
      color: #007907;
      margin-left: auto;
    }
    .price {
      background-color: #e3ff31;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>
<script>
import dayjs from "dayjs";
import axios from "axios";
export default {
  props: ["item", "type"],
  data() {
    return {
      content: [],
      highest: [],
      time: ""
    };
  },
  computed: {
    time_limit_computed: function() {
      return dayjs(this.item.time_limit).format("M月D日 HH:mmまで");
    },
    time_limit_computed: function() {
      return dayjs(this.item.time_start).format("M月D日 HH:mmから開始");
    }
  },
  methods: {
    fetchhighest() {
      axios
        .get(`https://api.morino.party/auctions/highest/` + this.item.id)
        .then(res => {
          this.highest = res.data;
          console.log(res.data);
        });
    }
  },
  mounted() {
    this.fetchhighest();
  }
};
</script>
