<!-- <div>
    <label for="">Ho va ten</label>
    <button class="button" @click="btnOnClick">Click</button>
    <input type="text" class="input" :value="fullName" />
    <input type="text" class="input" v-bind:value="fullName" />
    <input type="text" class="input" v-model="fullName" />
    <p v-if="isShow" :class="{'label-required':isRedLabel}">{{ fullName }}</p>
    <p v-if="isShow" :class="{'label-required':(fullName == 'Nam Anh')}">{{ fullName }}</p>
    <div
      v-for="(item, index) in employees"
      :key="item.employeeCode"
      @click="itemOnClick(item)"
    >
      {{ index }} {{ item.EmployeeCode }} {{ item.fullName }}
    </div>
  </div> -->
<template>
  <div class="layout">
    <Menu />
    <div class="m-content-container">
      <Header />
      <Main />
    </div>
  </div>

</template>

<script>
import Menu from "./components/layout/TheMenu.vue";
import Header from "./components/layout/TheHeader.vue";
import Main from "./components/layout/TheMain.vue";
export default {
  name: "App",
  components: {
    Menu,
    Header,
    Main,
  },
  methods: {
    test() {
      console.log("hello");
    },
    btnOnClick() {
      this.isShow = !this.isShow;
    },
    itemOnClick(item) {
      console.log(item);
    },
  },
  data() {
    return {
      fullName: "Nam Anh Tran",
      age: 22,
      isShow: false,
      employees: [
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
        { EmployeeCode: "NV001", fullName: "Nam Anh Tran" },
      ],
      isRedLabel: true,
    };
  },
};
</script>

<!-- .label-required{
  color: red;
} -->
<style>
@import url(styles/app.css);

</style>
