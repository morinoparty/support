<template>
  <div class="group">
    <h2>
      <span>{{prefix}}</span>
      {{name}}
    </h2>
    <p>{{description}}</p>
    <div class="mcuser" v-for="(user, index) in content.users" v-bind:key="index">
      <div class="d-flex">
        <img :src="'https://crafatar.com/renders/head/' + user.uuid + '?size=64&amp;overlay'" alt />
        <div class="description">
          <h3>{{user.username}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["group", "name", "description", "prefix"],
  data() {
    return {
      content: {},
      loading: true
    };
  },
  methods: {
    fetchcontent() {
      axios
        .get(`https://api.morino.party/users/perm/` + this.group)
        .then(res => {
          (this.content = res.data), (this.loading = false);
          console.log(res.data);
        });
    }
  },
  mounted() {
    this.fetchcontent();
  }
};
</script>