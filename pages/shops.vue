<template>
  <div>
    <mainheader :text="'ショップ一覧です！<br>サイト内検索をうまく活用して使ってください！<br>現在のショップ数：'+ content.length"></mainheader>
    <div class="container grid">
      <p v-if="loading == true">loading...</p>
      <div
        class="card-shop"
        :class="'type-' + items.type"
        v-for="items of content"
        v-bind:key="items.price"
      >
        <div>
          <img
            class="icon"
            :src="'https://crafatar.com/avatars/' + JSON.parse(items.owner).owner + '/?overlay'"
          />
          <p class="tag" :class="'type-' + items.type" v-if="items.type === 1">買取</p>
          <p class="tag" :class="'type-' + items.type" v-if="items.type === 0">販売</p>

          <p class="unlimited" v-if="items.unlimited === 1">アドミンショップ</p>
        </div>
        <div class="description">
          <p>
            <span>商品：</span>
            {{ items.itemConfig.split('\n ')[3].replace('type: ', '') }}
          </p>
          <p class="yen">
            <span>価格：</span>
            {{ items.price }}
          </p>
          <p>
            <span>場所：</span>
            {{ items.world }}
          </p>

          <p class="position">
            <span>場所：</span>
            <strong>X</strong>
            {{items.x}}
            <small>/</small>
            <strong>Y</strong>
            {{items.y}}
            <small>/</small>
            <strong>Z</strong>
            {{items.z}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.card-shop {
  position: relative;
  border-radius: 15px;
  padding: 2.2rem 1.5rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.07);
  line-height: 1.7;
  font-feature-settings: "palt" 1;
  letter-spacing: 0.15em;
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 30px;
  &.type-1 {
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
  }
  .tag {
    top: 10px;
    right: 10px;
    position: absolute;
    border-radius: 50%;
    font-weight: bold;
    opacity: 0.6;
    &.type-1 {
      color: rgba(255, 0, 0, 1);
    }
  }
  .unlimited {
    margin-top: 10px;
    font-size: 0.5rem;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    opacity: 0.6;
    color: rgba(255, 0, 0, 1);
  }
  .icon {
    width: 50px;
    border-radius: 5px;
  }
  .description {
    p {
      font-size: 1.2rem;
      &.yen::after {
        font-size: 0.8rem;
        content: "円";
      }
      &.position {
        small {
          opacity: 0.3;
        }
      }
      span {
        opacity: 0.5;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
<script>
import mainheader from "~/components/header.vue";
import card from "~/components/cards/faq.vue";

import axios from "axios";
export default {
  components: { card, mainheader },

  data() {
    return {
      content: {},
      loading: true
    };
  },
  head() {
    return {
      title: "ショップ一覧 | もりのパーティ サポート"
    };
  },
  asyncData({ params, error }) {
    return axios
      .get(
        `http://dev1.srv.morino.party:8000/api/shops?_order[itemConfig]=asc&_order[price]=asc&_order[x]=asc&`
      )
      .then(res => {
        return {
          content: res.data.json,
          loading: false
        };
      });
  }
};
</script>
