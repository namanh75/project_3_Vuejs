<template>
  <tbody>
    <tr
      class="m-content-column"
      v-for="employee in employees"
      :key="employee.officerID"
      
    >
      <td class="m-content-table-column-1">
        <input
          type="checkbox"
          @click="checkItem(employee)"
          ref="input"
          :checked="checkBoxAll"
        />
      </td>
      <td class="m-content-table-column-2" @dblclick="rowOnDblClick(employee)">
        {{ employee.officerCode }}
      </td>
      <td class="m-content-table-column-3" @dblclick="rowOnDblClick(employee)">
        {{ employee.fullName }}
      </td>
      <td class="m-content-table-column-4" @dblclick="rowOnDblClick(employee)">
        {{ employee.phoneNumber }}
      </td>
      <td class="m-content-table-column-5" @dblclick="rowOnDblClick(employee)">
        {{ employee.groupName }}
      </td>
      <td class="m-content-table-column-6" @dblclick="rowOnDblClick(employee)">
        {{ employee.subjectName }}
      </td>
      <td class="m-content-table-column-7" @dblclick="rowOnDblClick(employee)">
        {{ employee.storageRoomName }}
      </td>
      <td class="m-content-table-column-8" @dblclick="rowOnDblClick(employee)">
        <div
          :class="{
            'm-td-check': change(employee.equipmentManagementTraining),
          }"
        ></div>
      </td>
      <td class="m-content-table-column-9" @dblclick="rowOnDblClick(employee)">
        <div :class="{ 'm-td-check': change(employee.workStatus) }"></div>
      </td>
      <td class="m-content-table-column-10">
        <span @click="rowOnDblClick(employee)"
          ><img src="../../../assets/icons/ic_Edit.png" alt=""
        /></span>
        <span @click="showNotificationDelete(employee)"
          ><img src="../../../assets/icons/ic_delete.png" alt=""
        /></span>
      </td>
    </tr>
  </tbody>
</template>

<script>
import axios from "axios";
// import * as APIMethods from "../../../scripts/APIMethods";

export default {
  data() {
    return {
      isChecked: false, //kiểm tra check box
      employees: null, // danh sách cán bộ nhân viên
      totalCount: null, // tổ số nhân viên
      dataLength: 20, //số nhân viên có trong trang hiện tại (max 20)
      checkList: [], //check list người dùng chọn
      checkAll: false, //check box toàn bộ
      filter: "1", //bộ lọc tìm kiếm
      isTrSelected: false, //style background cho dong dc chon
    };
  },
  props: ["employee", "checkBoxAll", "reloadData"],
  methods: {
    /**
     * Emit dữ liệu từ table lên form
     */
    rowOnDblClick(employeedata) {
      this.$emit("dataFromBodyTable", employeedata);
    },

    /**
     *  xử lý check box từng dòng
     */
    checkItem(employee) {
      if (this.checkList.includes(employee.officerID)) {
        this.checkList = this.checkList.filter(function (element) {
          return element !== employee.officerID;
        });
      } else {
        this.checkList.push(employee.officerID);
      }
      if (this.checkList.length == this.dataLength) this.checkAll = true;
      else this.checkAll = false;
      this.$emit("checkItem", this.checkAll);
      this.$emit("DeleteMany", this.checkList);
      console.log(this.checkList);
      // this.backGroundCheck(employee.officerID)
    },

    /**
     *  xử lý checkbox toàn bộ
     */
    showNotificationDelete(employee) {
      this.$emit("showNotificationDelete", employee, 1);
    },

    /**
     * Thay giá trị 0,1 thành biểu tượng x trong giao diện
     */
    change(is) {
      if (is == 1) return true;
      return false;
    },

    // backGroundCheck(officerID) {
    //   console.log(this.checkList)
    //   if (this.checkList.includes(officerID)) {
    //     console.log(officerID);
    //   } else console.log("false");
    // },
  },

  /**
   * Xử lý Danh sách xóa nhiều
   */
  beforeUpdate() {
    if (this.checkBoxAll == false) {
      this.checkList = [];
      this.$emit("DeleteMany", this.checkList);
    } else {
      this.checkList = [];
      for (var i of this.employees) {
        this.checkList.push(i.officerID);
        this.$emit("DeleteMany", this.checkList);
      }
    }
  },

  /**
   * Call API gọi dữ liệu trang 1 khi lần đầu tải giao diện
   */
  mounted() {
    var me = this;
    try {
      // var res = APIMethods.GetOfficer(
      //   `http://localhost:5901/api/v1/Officers/paging?Offset=1&Limit=20&filter=${this.filter}`
      // );
      // me.employees = res.data.data;
      // me.totalCount = res.data.totalCount;
      // me.$emit("totalCountFunction", me.totalCount);
      // me.dataLength = me.employees.length;
      // me.$emit("loadingFunction", false);
      axios
        .get(
          `http://localhost:5901/api/v1/Officers/paging?Offset=1&Limit=20&filter=${this.filter}`
        )
        .then(function (res) {
          me.employees = res.data.data;
          me.totalCount = res.data.totalCount;
          me.$emit("totalCountFunction", me.totalCount);
          me.dataLength = me.employees.length;
          me.$emit("loadingFunction", false);
        });
    } catch (error) {
      console.log("lỗi");
      console.log(error);
      me.$emit("loadingFunction", false);
    }
    setTimeout(() => {
      this.$emit("loadingFunction", false);
    }, 5000);
  },
  created() {
    this.employees = this.reloadData;
  },
  watch: {
    reloadData() {
      this.employees = this.reloadData;
      this.dataLength = this.reloadData.length;
    },
  },
};
</script>

<style scoped>
@import url("./TableBody.css");
td {
  overflow: hidden;
}
</style>