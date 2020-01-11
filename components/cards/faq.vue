<template>
  <div class="card">
    <h1 class="ja">
      {{ val.titleJa }}
    </h1>
    <h1 class="en">
      {{ val.titleEn }}
    </h1>
    <p class="ja">
      {{ val.bodyJa }}
    </p>
    <p class="en" v-if="en">
      {{ val.bodyEn }}
    </p>
    <nuxt-link :to="'/faq/category/' + val.categoryId">
      <div class="badge">{{ val.category }}</div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["val", "en"]
};
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: inherit;
  height: fit-content;
}
.card {
  position: relative;
  border-radius: 15px;
  padding: 2.2rem 1.5rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.07);
  line-height: 1.7;
  font-feature-settings: "palt" 1;
  letter-spacing: 0.15em;
  h1 {
    position: relative;
    font-weight: normal;
    font-size: 1.2rem;
    padding-left: 1.5rem;
    padding-bottom: 0.7rem;
    &.ja {
      font-weight: bold;
      &::after {
        position: absolute;
        content: "Q";
        color: #007907;
        top: 0;
        left: 0;
      }
    }
    &.en {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 1.5rem;
      position: relative;
      &:after {
        position: absolute;
        content: " ";
        display: block;
        border-bottom: solid 1px white;
        bottom: -1px;
        left: 0px;
        width: 1.5rem;
      }
    }
  }
  p {
    position: relative;
    padding-left: 1.5rem;
    padding-bottom: 0.7rem;
    &.ja {
      &:after {
        position: absolute;
        content: "A";
        color: #007907;
        top: 0;
        left: 0;
        opacity: 0.5;
      }
    }
    &.en {
    }
  }
  .en {
    letter-spacing: 0.01em;
    opacity: 0.3;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    border: solid 1px #007907;
    color: #007907;
    font-size: 0.7rem;
    font-weight: bold;
    opacity: 0.5;
  }
}
</style>
