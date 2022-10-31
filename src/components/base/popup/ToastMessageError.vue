<template>
  <div class="toast-box" >
    <div class="toast-item toast-item--error">
      <div class="toast-icon toast-icon--error">
        <img src="../../../assets/icons/ic_ToastMessage_Fail.png" alt="" />
      </div>
      <div class="toast-text">Lỗi</div>
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