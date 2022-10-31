<template>
  <nav class="m-notification-delete">
    <div>
      <h2>Thông báo</h2>
      <span @click="closeNotificationDelete"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
      <p>Bạn có chắc chắn muốn xóa Cán bộ giáo viên đang chọn không?</p>
      <div>
        <button class="m-btn m-btn-normal-two" @click="closeNotificationDelete">
          Đóng
        </button>
        <button class="m-btn m-btn-normal-one" @click="confirmNotificationDelete">
          Đồng ý
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    
    /**
     * Tắt cửa sổ xóa  
    */
    closeNotificationDelete() {
      this.$emit("notificationDelete", false);
    },

    /**
     * Xác nhận xóa  
    */
    confirmNotificationDelete(){
      this.$emit("confirmNotificationDelete")
    }
  },
  data() {},
  updated() {},
};
</script>

<style scoped>
@import url("./NotificationDelete.css");
</style>