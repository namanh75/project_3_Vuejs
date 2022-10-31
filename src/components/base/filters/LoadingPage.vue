<template>
  <div class="m-loading m-loading-container" v-show="loadingFilter">
    <div class="m-icon-loading"></div>
    <p></p>
  </div>
</template>
<script>
export default {
  props: ["isLoading"],
  watch: {
    isLoading() {
      if (this.isLoading == true) this.loadingFilter = this.isLoading;
      else {
        setTimeout(() => {
          this.loadingFilter = this.isLoading;
        }, 500);
      }
    },
  },
  data() {
    return {
      loadingFilter: true,
    };
  },
};
</script>
<style scoped>
@import url("./LoadingPage.css");
</style>