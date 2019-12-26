<template>
  <div class="card">
    <h1>{{ val.title }}</h1>
    <p>{{ val.body }}</p>
  </div>
</template>
<script>
export default {
  props: ["val"]
};
</script>
