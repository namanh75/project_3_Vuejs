<template>
  <div class="m-content-container">
    <!-- nodata container-->
    <NodataContainer v-if="isNodata" />
    <!-- <NodataContainer /> -->

    <!-- main content -->
    <div class="m-content-btn" v-if="!isNodata">
      <div class="m-content-search">
        <div class="m-input-container">
          <div :class="{ 'm-filter-search': isSearchData }">
            <input
              type="text"
              placeholder="Nhập mã hoặc họ tên"
              v-model="keySearch"
              @keyup="searchData"
            />
            <span class="m-input-ico-right"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
          </div>
        </div>
      </div>
      <button class="m-btn m-btn-normal-one" @click="btnAddNewOfficer">
        Thêm
      </button>

      <button class="m-btn m-btn-normal-two" @click="exportExcelAllPage">
        Xuất khẩu
      </button>
      <!-- <div class="m-export">
        <button
          class="m-btn m-btn-normal-three"
          @click="exportExcelCurrentPage"
        >
          Trang hiện tại
        </button>
        <button class="m-btn m-btn-normal-four">Tất cả các trang</button>
      </div> -->

      <button class="m-btn-ico-mini">
        <i
          ><img
            src="../assets/icons/ic_More.png"
            alt=""
            @click="btnDeleteClick"
        /></i>
      </button>
    </div>

    <!-- Table Container -->
    <TableContainer
      v-if="!isNodata"
      @dataFromTable="dataFromTable"
      @showFormDetail="showFormDetail"
      @showNotificationDelete="showNotificationDelete"
      @totalCountFunction="totalCountFunction"
      :reloadData="reloadData"
      @DeleteMany="DeleteMany"
      :reUnCheck="reUnCheck"
      @loadingFunction="loadingFunction"
    />

    <div class="m-content-footer" v-if="!isNodata">
      <span @click="firstPageClick">
        <img src="../assets/icons/ic_MoveToFirst.png" alt="" />
      </span>
      <span @click="backPageClick">
        <img src="../assets/icons/ic_Back.png" alt="" />
      </span>
      <span>
        <input type="text" v-model="currentPage" @keyup="pagingSelect" />
      </span>
      <span @click="nextPageClick">
        <img src="../assets/icons/ic_Next.png" alt="" />
      </span>
      <span @click="lastPageClick">
        <img src="../assets/icons/ic_MoveToLast.png" alt="" />
      </span>
      <span>
        <!-- {{ CheckNullAxiosFunction(totalPage) }} -->
        {{ currentPage }}/ {{ totalPage }} trang ({{ totalCount }} giáo viên)
      </span>
    </div>
  </div>

  <!-- Form Container -->
  <FormContainer
    v-if="isShowFormDetail"
    @showFormDetail="showFormDetail"
    :dataSelected="dataSelected"
    :titleForm="titleForm"
    :flagForm="flagForm"
    @showToast="showToast"
    @resetDataForm="resetDataForm"
    @loadingFunction="loadingFunction"
  />

  <nav class="m-more-delete" v-show="isBtnDelete" @click="notificationDelete">
    <span><img src="../assets/icons/ic_delete.png" alt="" />Xóa</span>
  </nav>

  <!-- Notification Delete  -->
  <NotificationDelete
    v-show="isNotificationDelete"
    @notificationDelete="notificationDelete"
    @confirmNotificationDelete="confirmNotificationDelete"
  />

  <!-- Toast PopUp Error -->
  <ToastMessageError v-show="isShowToastError" :warningString="warningString" />

  <!-- Toast PopUp Successfully -->
  <ToastMessageSuccess
    v-show="isShowToastSuccess"
    :warningString="warningString"
  />

  <!-- Loading Page Animation -->
  <LoadingPage :isLoading="isLoading" />
</template>
<script>
import axios from "axios";
import { saveAs } from "file-saver";
import FormContainer from "../components/base/form/FormContainer.vue";
import TableContainer from "../components/base/table/TableContainer.vue";
import NotificationDelete from "../components/base/notification/NotificationDelete.vue";
import ToastMessageError from "../components/base/popup/ToastMessageError.vue";
import ToastMessageSuccess from "../components/base/popup/ToastMessageSuccess.vue";
import LoadingPage from "../components/base/filters/LoadingPage.vue";
import NodataContainer from "../components/base/references/NodataContainer.vue";

import * as MISA_RESOURCE from "../scripts/Resource";

export default {
  name: "OverView",
  components: {
    FormContainer,
    TableContainer,
    NotificationDelete,
    ToastMessageError,
    ToastMessageSuccess,
    LoadingPage,
    NodataContainer,
  },
  props: ["employee"],
  data() {
    return {
      isShowFormDetail: false, //hiển thị form thêm mới/chỉnh sửa
      titleForm: MISA_RESOURCE.FORM.ADD.TITLE, // tiêu đề form
      dataSelected: {}, //data nhận được từ tableBody
      isBtnDelete: false, // show nút xóa toàn bộ
      isNotificationDelete: false, // hiển thị thông báo xóa
      isShowToastSuccess: false, // hiển thị toast message thành công
      isShowToastError: false, // hiển thị toast message thất bại
      warningString: "", // nội dung toast message
      employeeDeleteSelect: null, // nhân viên hiện tại đang được chọn
      flagForm: null, //1 - form thêm mới, 2 - form chỉnh sửa
      reloadData: null, // cập nhật dữ liệu khi thêm mới, chỉnh sửa hoặc chuyển trang
      totalCount: null, // tổng số nhân viên hiện tại
      totalPage: null, // tổ số phân trang
      currentPage: 1, // trang hiện tại
      filter: "1", // bộ lọc tìm kiếm
      keySearch: "", // từ khóa tìm kiếm
      isSearchData: false, // kiểm tra dữ liệu trong ô tìm kiếm
      deleteArrayData: null, // danh sách các cán bộ nhân viên xóa (xóa nhiều)
      flagDelete: null, // 1 - Xóa 1 người, 2 - Xóa nhiều
      reUnCheck: false, //bỏ check box khi chuyển trang
      isNodata: false, // kiểm tra dữ liệu trả về nếu trống thì hiển thị giao diện không dữ liệu
      isLoading: true,
      timeWait: 500,
    };
  },
  methods: {
    /**
     * Hiển thị form thêm mới + tiêu đề form
     */
    btnAddNewOfficer() {
      try {
        this.showFormDetail(true);
        this.dataSelected = {};
        axios
          .get("http://localhost:5901/api/v1/Officers/new-code")
          .then((res) => {
            this.dataSelected.officerCode = res.data;
          });

        this.flagForm = MISA_RESOURCE.FORM.ADD.FLAG;
        this.titleForm = MISA_RESOURCE.FORM.ADD.TITLE;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     *  Hiển thị Form thêm mới
     */
    showFormDetail(isShow) {
      try {
        this.isShowFormDetail = isShow;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Đẩy dữ liệu từ table vào form
     */
    dataFromTable(employee) {
      this.dataSelected = employee;
      this.flagForm = MISA_RESOURCE.FORM.EDIT.FLAG;
      this.titleForm = MISA_RESOURCE.FORM.EDIT.TITLE;
    },
    /**
     * Hiển thi biểu tượng xóa toàn bộ
     */
    btnDeleteClick() {
      this.isBtnDelete = !this.isBtnDelete;
      setTimeout(() => {
        this.isBtnDelete = false;
      }, 5 * 1000);
      this.flagDelete = 2;
    },
    /**
     * Hiển thị cửa sổ thông báo xóa
     */
    notificationDelete(e) {
      this.isBtnDelete = false;
      this.isNotificationDelete = e;
    },
    /**
     * Thông báo Toast message
     */
    showToast(isShowToastSuccess, warningString) {
      var me = this;
      me.warningString = warningString;
      if (isShowToastSuccess == true) {
        this.isShowToastError = false;
        this.isShowToastSuccess = true;
        setTimeout(() => {
          this.isShowToastSuccess = false;
        }, 3000);
        this.isShowFormDetail = false;
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/paging?Offset=${
              (me.currentPage - 1) * 20 + 1
            }&Limit=20&filter=${this.filter}`
          )
          .then((res) => {
            me.reloadData = res.data.data;
            me.totalCount = res.data.totalCount;
            me.totalCountFunction(me.totalCount);
          });
      }
      if (isShowToastSuccess == false) {
        this.isShowToastSuccess = false;
        this.warningString = warningString;
        this.isShowToastError = true;
        setTimeout(() => {
          this.isShowToastError = false;
        }, 3000);
      }
    },
    /**
     * Xử lý logic phân trang
     */
    totalCountFunction(data) {
      this.totalCount = data;
      this.totalPage = data / 20;
      this.totalPage = Math.ceil(this.totalPage);
    },
    /**
     * chuyển trang đầu
     */
    firstPageClick() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Chuyển trang trước
     */
    backPageClick() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Chuyển trang tiếp theo
     */
    nextPageClick() {
      if (this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Chuyển trang cuối
     */
    lastPageClick() {
      if (this.currentPage != this.totalPage) {
        this.currentPage = this.totalPage;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Cập nhật dữ liệu bảng khi chuyển trang
     */
    pagingSelect() {
      var me = this;
      if (this.currentPage >= 1 && this.currentPage <= this.totalPage) {
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else if (this.currentPage == "") {
        console.log("vui lòng nhập số");
      } else if (this.currentPage < 1) {
        this.currentPage = 1;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else {
        this.currentPage = 1;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Hiện thông báo xóa thi ấn nút xóa
     */
    showNotificationDelete(employee, flag) {
      this.employeeDeleteSelect = employee;
      console.log(this.employeeDeleteSelect);
      this.isNotificationDelete = true;
      this.flagDelete = flag;
      console.log(employee);
    },
    /**
     * Xác nhận xóa
     */
    confirmNotificationDelete() {
      try {
        var me = this;
        //call APi Xóa
        if (this.flagDelete == 1) {
          axios
            .delete(
              `http://localhost:5901/api/v1/Officers/${this.employeeDeleteSelect.officerID}`
            )
            .then((response) => {
              console.log(response);
              axios
                .get(
                  `http://localhost:5901/api/v1/Officers/paging?Offset=${
                    (me.currentPage - 1) * 20 + 1
                  }&Limit=20&filter=${this.filter}`
                )
                .then((res) => {
                  me.reloadData = res.data.data;
                  me.totalCount = res.data.totalCount;
                  me.totalCountFunction(me.totalCount);
                });
              //tắt thông Báo
              this.isNotificationDelete = false;
              //thông báo xóa thành công hay thất bại
              this.isShowToastSuccess = true;
              this.warningString="Đã xóa nhân viên"
              setTimeout(() => {
                this.isShowToastSuccess = false;
              }, 3000);
            });
        }
        if (this.flagDelete == 2) {
          var arraySend = [];
          for (var i = 0; i < me.deleteArrayData.length; i++) {
            arraySend.push(me.deleteArrayData[i]);
          }
          console.log(arraySend);
          if (arraySend.length == 0) {
            me.isNotificationDelete = false;
            //thông báo xóa thành công hay thất bại
            me.isShowToastError = true;
            me.warningString = "Chưa có cán bộ nào được chọn";
            setTimeout(() => {
              me.isShowToastError = false;
            }, 3000);
          } else {
            axios
              .post(
                `http://localhost:5901/api/v1/Officers/ManyDelete?size=${me.deleteArrayData.length}`,
                arraySend
              )
              .then((response) => {
                console.log(response);
                me.warningString="Đã xóa nhân viên"
                axios
                  .get(
                    `http://localhost:5901/api/v1/Officers/paging?Offset=${
                      (me.currentPage - 1) * 20 + 1
                    }&Limit=20&filter=${this.filter}`
                  )
                  .then((res) => {
                    me.reloadData = res.data.data;
                    me.totalCount = res.data.totalCount;
                    me.totalCountFunction(me.totalCount);
                    me.reUnCheck = true;
                    //tắt thông Báo
                    me.isNotificationDelete = false;
                    //thông báo xóa thành công hay thất bại
                    
                    me.isShowToastSuccess = true;
                    
                    setTimeout(() => {
                      me.isShowToastSuccess = false;
                    }, 3000);
                    
                  });
              })
              .catch((e) => {
                console.log(e);
                me.isNotificationDelete = false;
                //thông báo xóa thành công hay thất bại
                me.isShowToastError = true;
                me.warningString = "Lỗi sever";
                setTimeout(() => {
                  me.isShowToastError = false;
                }, 3000);
              });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Tìm kiếm qua ô input nhập (theo SHCB và họ tên)
     */
    searchData() {
      var me = this;
      me.reUnCheck = !me.reUnCheck;
      if (me.keySearch == "") {
        me.filter = "1";
        me.isSearchData = false;
      } else {
        me.filter = me.keySearch.replace("", "%");
        me.isSearchData = true;
      }
      try {
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/paging?Offset=${
              (me.currentPage - 1) * 20 + 1
            }&Limit=20&filter=${me.filter}`
          )
          .then(function (res) {
            me.reloadData = res.data.data;
            me.totalCount = res.data.totalCount;
            me.totalCountFunction(me.totalCount);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * cập nhật danh sách xóa nhiều
     */
    DeleteMany(checkList) {
      this.deleteArrayData = checkList;
    },

    /**
     * Xuất file excel theo paging
     */
    exportExcelCurrentPage() {},

    /**
     * Xuất toàn bộ Database theo bộ lọc tìm kiếm
     */
    exportExcelAllPage() {
      var me = this;
      try {
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/export?Offset=1&Limit=${me.totalCount}&filter=${me.filter}`,
            { responseType: "blob" }
          )
          .then(function (res) {
            saveAs(res.data, "Danh sách cán bộ nhân viên.xlsx");
          });
      } catch (e) {
        console.log(e);
      }
    },
    /**
     *   Cập nhật dữ liệu từ form
     */
    resetDataForm() {
      console.log("hủy bỏ")
      var me = this;
      axios
        .get(
          `http://localhost:5901/api/v1/Officers/paging?Offset=${
            (me.currentPage - 1) * 20 + 1
          }&Limit=20&filter=${this.filter}`
        )
        .then((res) => {
          me.reloadData = res.data.data;
          me.totalCount = res.data.totalCount;
          me.totalCountFunction(me.totalCount);
        });
    },

    /**
     * hiệu ứng loading
     */
    loadingFunction(isLoading) {
      console.log(isLoading);
      this.isLoading = isLoading;
    },
  },
};
</script>
<style scoped>
@import url(../styles/layout/overviewpage.css);
</style>