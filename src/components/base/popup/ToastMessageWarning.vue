<template>
  <div class="toast-box" hidden>
        <div class="toast-item toast-item--warning" >
            <div class="toast-icon toast-icon--warning "><img src="../../assets/icon/ic_ToastMessage_Warning.png" alt=""></div>
            <div class="toast-text">Cảnh báo</div>
            <span>Warning Message</span>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("./ToastMessage.css");

/* toast warning */
.m-toast-container-error .fa-triangle-exclamation {
  background-color: #d73838;
  color: white;
}
.m-toast-container-error .fa-xmark-cancel {
  cursor: pointer;
  font-size: 24px;
  color: #d73838;
}
.fa-circle-exclamation {
  background-color: #e4ad2a;
  color: white;
}
.fa-xmark-warn {
  cursor: pointer;
  font-size: 24px;
  color: #e4ad2a;
}
</style>