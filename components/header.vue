<template>
  <header id="header">
    <div class="title">
      <h1>MorinoParty Support</h1>
      <p v-html="text"></p>
    </div>
  </header>
</template>
<script>
export default {
  props: ["text"]
};
</script>
