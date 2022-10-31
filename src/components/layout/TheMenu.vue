<template>
  <div class="m-menu-container">
    <div class="m-menu-title">
      <div class="m-menu-title-left"></div>
      <div class="m-menu-title-center">
        <b>Thiết Bị</b>
      </div>
      <div class="m-menu-title-right">
        <i class="fa-solid fa-bars"></i>
      </div>
    </div>
    <div class="m-menu-navbar">
      <router-link to="/overview" class="m-menu-item">
        <span> <img src="../../assets/icons/ic_TongQuan.svg" alt="" ></span>
        <p>Tổng quan</p>
      </router-link>
      <router-link to="/equipment" class="m-menu-item">
        <span> <img src="../../assets/icons/ic_ThietBi.svg" alt="" ></span>
        <p>Thiết Bị</p>
      </router-link>
      <router-link to="/payment" class="m-menu-item">
        <span> <img src="../../assets/icons/ic_MuonTra.svg" alt="" ></span>
        <p>Mượn trả</p>
      </router-link>
      <router-link to="/report" class="m-menu-item">
        <span> <img src="../../assets/icons/ic_BaoCao.svg" alt="" ></span>
        <p>Báo Cáo</p>
      </router-link>
      <router-link to="/system" class="m-menu-item">
        <span> <img src="../../assets/icons/ic_HeThong.svg" alt="" ></span>
        <p>Hệ thống</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>  

<!-- scoped chỉ có tác dujg vs components hiện tại -->
<style>
@import url(../../styles/layout/menu.css);
</style>