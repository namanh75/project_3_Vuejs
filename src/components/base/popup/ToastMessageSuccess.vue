<template>
  <div class="toast-box">
    <div class="toast-item toast-item--success">
      <div class="toast-icon toast-icon--success">
        <img src="../../../assets/icons/ic_ToastMessage_Success.png" alt="" />
      </div>
      <div class="toast-text">Thành công</div>
      <span>{{ warningString }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["warningString"],
};
</script>

<style scoped>
@import url("./ToastMessage.css");
</style>