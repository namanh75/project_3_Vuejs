<template>
  <div class="m-content-nav">
    <span>Cán bộ, giáo viên</span>
    <span><i class="fa-solid fa-question"></i></span>
    <span><img src="../../assets/icons/ic_Notification_32.png" alt="" /></span>
    <span> Admin <i class="fa-solid fa-angle-down"></i></span>
    <span><img src="../../assets/icons/ic_Avatar_36.png" alt="" /></span>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>  

<!-- scoped chỉ có tác dung vs components hiện tại -->
<style scoped>

.m-content-container .m-content-nav {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  height: 45px;
  padding-top: 12px;
  padding-left: 12px;
  position: relative;
}

.m-content-container .m-content-nav span:nth-child(1) {
  margin-right: 12px;
  font-size: 18px;
}

.m-content-container .m-content-nav span:nth-child(2) {
  width: 25px;
}

.m-content-container .m-content-nav span:nth-child(3) {
  vertical-align: middle;
  position: absolute;
  right: 145px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 8px;
  cursor: pointer;
}

.m-content-container .m-content-nav span:nth-child(4) {
  line-height: 100%;
  position: absolute;
  top: 20px;
  right: 70px;
  cursor: pointer;
}

.m-content-container .m-content-nav span:nth-child(5) {
  vertical-align: middle;
  position: absolute;
  border-radius: 50%;
  right: 20px;
  cursor: pointer;
}

</style>