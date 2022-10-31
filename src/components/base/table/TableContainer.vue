<template>
  <div class="m-content-table">
    <table>
      <thead>
        <tr class="m-content-column">
          <td class="m-content-table-column-1">
            <input
              type="checkbox"
              id="check-all"
              props="test"
              :checked="checkAll"
              @click="checkBoxAll"
            />
          </td>
          <td class="m-content-table-column-2">Số hiệu cán bộ</td>
          <td class="m-content-table-column-3">Họ tên</td>
          <td class="m-content-table-column-4">Số điện thoại</td>
          <td class="m-content-table-column-5">Tổ chuyên môn</td>
          <td class="m-content-table-column-6">QL theo môn</td>
          <td class="m-content-table-column-7">QL kho, phòng</td>
          <td class="m-content-table-column-8">Đào tạo QLTB</td>
          <td class="m-content-table-column-9">Đang làm việc</td>
          <td class="m-content-table-column-10"></td>
        </tr>
      </thead>
      <TableBody
        @dataFromBodyTable="dataFromBodyTable"
        @checkItem="checkItem"
        :checkBoxAll="checkAllChild"
        @showNotificationDelete="showNotificationDelete"
        @totalCountFunction="totalCountFunction"
        :reloadData="reloadData"
        @DeleteMany="DeleteMany"
        @loadingFunction="loadingFunction"
      />
    </table>
  </div>
</template>

<script>
import TableBody from "./TableBody.vue";
export default {
  data() {
    return {
      checkAll: false,
      checkAllChild: false,
      reDataLength: 0,
    };
  },
  components: {
    TableBody,
  },
  props: ["employee", "reloadData", "reUnCheck"],
  watch: {
    reUnCheck() {
      this.checkAllChild = false;
      this.checkAll = false;
    },
  },
  methods: {

    /**
     * Lấy dữ liệu từ body
     */
    dataFromBodyTable(employee) {
      console.log(employee);
      this.$emit("dataFromTable", employee);
      this.$emit("showFormDetail", true);
    },

    /**
     * xử lý check box từng dòng
     */
    checkItem(checkAll) {
      this.checkAll = checkAll;
    },

    /**
     * xử lý check box toàn bộ
     */
    checkBoxAll() {
      this.checkAll = !this.checkAll;
      this.checkAllChild = this.checkAll;
    },

    /**
     * Hiển thị thông báo xóa
     */
    showNotificationDelete(employee, flag) {
      this.$emit("showNotificationDelete", employee, flag);
    },

    /**
     * xử lý emit tổng số toàn bộ nhân viên
     */
    totalCountFunction(data) {
      this.$emit("totalCountFunction", data);
    },

    /**
     * xử lý emit danh sách xóa hiện tại đang chọn
     */
    DeleteMany(checkList) {
      this.$emit("DeleteMany", checkList);
    },

    /**
     * hiệu ứng loading 
     */
    loadingFunction(isLoading){
      this.$emit("loadingFunction", isLoading);
    }
  },
};
</script>

<style scoped>
@import url("./TableContainer.css");
</style>