<template>
  <div>
    <mainheader :text="'もりのパーティは、複数の住人の協力によって成り立っています！そんな中で協力していただいているみなさんをご紹介します！'"></mainheader>
    <div class="container small">
      <div v-for="(group,index) in perm_groups" v-bind:key="index">
        <teamcard :group="group.group" :name="group.name" :description="group.description"></teamcard>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.small {
  max-width: 700px;
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
.group {
  h2 {
    background: #fff;
    display: inline-block;
    padding: 10px 15px;
    font-size: 1.5rem;
    transform: translateX(-15px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  p {
    margin-bottom: 1rem;
    line-height: 2;
  }
}
.mcuser {
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  width: calc(100% + 30px);
  transform: translateX(-15px);
  .d-flex {
    display: flex !important;
  }
  .description {
    align-self: center;
    margin-left: 20px;
  }
  img {
    object-fit: contain;
    object-position: top;
    min-width: 50px;
    width: 10%;
    max-width: 100px;
    height: auto;
    max-height: 60px;
    transform: none;
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: none;
    background-color: inherit;
  }
}
</style>
<script>
import mainheader from "~/components/header.vue";
import teamcard from "~/components/team.vue";

import axios from "axios";
export default {
  components: { teamcard, mainheader },

  data() {
    return {
      perm_groups: [
        {
          group: "owner",
          name: "管理人",
          description: "管理人は、サーバーの維持・管理をする物好きな人です！"
        },
        {
          group: "dep",
          name: "副管理人",
          description:
            "サーバーの負荷対策・様々な管理面まで細やかな仕事ぶりで有名です"
        },
        {
          group: "dev",
          name: "開発者",
          description: "サーバーのプラグイン/技術面のサポートを行います"
        },
        {
          group: "event",
          name: "イベント担当",
          description: "サーバー内のイベントの企画・設営を行います。"
        },
        {
          group: "mlit",
          name: "国土交通省",
          description:
            "ユーザーの行き来の効率化のため、道路開発を主に行います。"
        }
      ]
    };
  },
  head() {
    return {
      title: "運営チーム | もりのパーティ サポート"
    };
  }
};
</script>
