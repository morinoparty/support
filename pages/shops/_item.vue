<template>
  <div>
    <mainheader :text="'ショップ一覧です！<br>サイト内検索をうまく活用して使ってください！<br>該当数：'+ content.length"></mainheader>
    <div class="loading" v-if="loading == true">
      <div>
        <span>🤔</span>
        <br />ショップを数えています!
        <br />この処理には少し時間がかかります...
      </div>
    </div>
    <div class="container src" v-if="loading == false">
      <div class="search_box">
        <form :action="'/shops/'+search">
          <h2>検索</h2>
          <p>アイテム名を入力してください。(英語表記のみ)</p>

          <div class="search">
            <input type="search" v-model="search" />
            <button type="submit">🔍</button>
          </div>
          <nuxt-link v-for="(items,index) of keywords" v-bind:key="index" :to="'/shops/'+items.id">
            <span class="tag">{{items.name}}</span>
          </nuxt-link>
        </form>
      </div>
    </div>
    <div class="container grid" v-if="loading == false">
      <div
        class="card-shop"
        :class="'type-' + items.type"
        v-for="(items,index) of content"
        v-bind:key="index"
      >
        <div>
          <img class="icon" :src="'https://crafatar.com/avatars/' + items.uuid + '/?overlay'" />
          <p class="tag" :class="'type-' + items.type" v-if="items.type === 1">買取</p>
          <p class="tag" :class="'type-' + items.type" v-if="items.type === 0">販売</p>

          <p class="unlimited" v-if="items.admin === 1">アドミンショップ</p>
        </div>
        <div class="description">
          <p>
            <span>商品：</span>
            {{ items.item }}
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
form p {
  margin-bottom: 1rem;
}
.container.src {
  margin-right: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  color: #007907;
  .search_box {
    max-width: 500px;
  }
  .search {
    position: relative;
    box-sizing: border-box;
    border: 1px solid #007907;
    padding: 3px 5px;
    margin-bottom: 1rem;
    border-radius: 20px;
    height: 2.2em;
    width: 100%;
    overflow: hidden;
    input {
      padding-left: 10px;
      width: calc(100% - 50px);
      border: none;
      height: 1.8em;
    }
    input:focus {
      outline: 0;
    }
    button {
      cursor: pointer;
      font-family: FontAwesome;
      border: none;
      background: rgba(0, 121, 7, 0.3);
      color: #fff;
      position: absolute;
      width: 3.5em;
      height: 3em;
      right: 0px;
      top: -5px;
      outline: none;
    }
  }
  span.tag {
    border: rgba(0, 121, 6, 0.1) solid 1px;
    display: inline-block;
    padding: 0px 10px;
    background: rgba(0, 121, 7, 0.03);
    margin: 3px;
    word-break: break-word;
    line-height: 2;
    font-size: 0.8rem;
    border-radius: 20px;
  }
}
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
  word-break: break-all;
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
      loading: true,
      search: "",
      keywords: [
        {
          name: "原木",
          id: "LOG"
        },
        {
          name: "木材",
          id: "PLANKS"
        },
        {
          name: "ダイヤモンド",
          id: "DIAMOND"
        },
        {
          name: "エリトラ",
          id: "ELYTRA"
        },
        {
          name: "エンチャントされた本",
          id: "ENCHANTED_BOOK"
        },
        {
          name: "はちみつとか",
          id: "HONEY"
        },
        {
          name: "シュルカーボックス",
          id: "SHULKER_BOX"
        },
        {
          name: "羊毛",
          id: "WOOL"
        }
      ]
    };
  },
  head() {
    return {
      title: "ショップ一覧 | もりのパーティ サポート"
    };
  },
  methods: {
    fetchcontent() {
      if (this.$nuxt.$route.params.item) {
        axios
          .get(
            `https://api.morino.party/shops/item/` +
              this.$nuxt.$route.params.item
          )
          .then(res => {
            (this.content = res.data.json), (this.loading = false);
          });
      } else {
        axios.get(`https://api.morino.party/shops`).then(res => {
          (this.content = res.data.json), (this.loading = false);
        });
      }
    }
  },
  mounted() {
    this.fetchcontent();
  }
};
</script>
