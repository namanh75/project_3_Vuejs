<template>
  <div class="m-form-add-container">
    <div class="m-form-add">
      <div class="m-form-avt">
        <img src="../../../assets/icons/ic_image.png" alt="" />
        <p class="">Chọn ảnh</p>
        <h3>
          {{ dataSave.fullName }} <br />
          {{ dataSave.officerCode }}
        </h3>
      </div>
      <div class="m-form-content">
        <p>{{ titleForm }}</p>
        <span
          @click="btnCloseAddOnclick"
          tabindex="18"
          @keyup.enter="btnCloseAddOnclick"
          ><img src="../../../assets/icons/ic_X.png" alt=""
        /></span>
        <nav>
          <div class="m-input-container">
            <label for="">Số hiệu cán bộ<span>*</span></label>
            <div :class="{ 'm-form-add-warning': isValidateEmployeeCode }">
              <input
                tabindex="1"
                type="text"
                class="m-input-check m-focus-input"
                name="employeeCode"
                props="Số hiệu cán bộ"
                v-model="dataSave.officerCode"
                ref="focusInput"
                @blur="checkEmptyInputEmployeeCode"
                @keyup="checkEmptyInputEmployeeCode"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Họ và tên <span>*</span></label>
            <div :class="{ 'm-form-add-warning': isValidateEmployeeName }">
              <input
                tabindex="1"
                type="text"
                class="m-input-check"
                name="name"
                props="Họ và tên"
                v-model="dataSave.fullName"
                ref="employeeName"
                @blur="checkEmptyInputEmployeeName"
                @keyup="checkEmptyInputEmployeeName"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Số điện thoại</label>
            <div>
              <input
                tabindex="3"
                type="text"
                name="phoneNumber"
                props="Số điện thoại"
                ref="phoneNumber"
                v-model="dataSave.phoneNumber"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Email</label>
            <div>
              <input
                tabindex="4"
                type="text"
                v-model="dataSave.email"
                ref="email"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Tổ bộ môn</label>
            <div>
              <input tabindex="5" type="text" v-model="dataSave.groupName" />
              <span
                @click="showGroup"
                tabindex="6"
                v-on:keyup.enter="showGroup"
                @keyup.down="focusComboBox(1, true)"
                ><i class="fa-solid fa-angle-down m-input-icon-1"></i
              ></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-1"
            v-show="isShowGroup"
          >
            <p
              v-for="gr in groupData"
              :key="gr"
              @click="groupClick(gr.groupName)"
            >
              {{ gr.groupName }}
            </p>
          </div>
          <div class="m-input-container">
            <label for="">Môn dạy</label>
            <div @click="showSubject" v-on:keyup.enter="showSubject">
              <div class="m-subject" tabindex="7">
                {{ dataSave.subjectName }}
              </div>
              <span tabindex="8"
                ><i class="fa-solid fa-angle-down m-input-icon-2"></i
              ></span>
            </div>
          </div>

          <div
            class="m-input-detail-items m-input-detail-items-2"
            v-show="isShowSubject"
          >
            <div
              v-for="sb in subjectData"
              :key="sb"
              @click="subjectClick(sb.subjectName)"
            >
              <!-- <input type="checkbox" /> -->
              <p>{{ sb.subjectName }}</p>
            </div>
          </div>
          <div class="m-input-container" id="m-input-max-height">
            <label for="">QL kho, phòng</label>
            <div @click="showRoom" v-on:keyup.enter="showRoom">
              <div tabindex="9" class="m-room">
                {{ dataSave.storageRoomName }}
              </div>
              <span tabindex="10"
                ><i class="fa-solid fa-angle-down m-input-icon-3"></i
              ></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-3"
            v-show="isShowRoom"
          >
            <div
              v-for="sr in storageRoomData"
              :key="sr"
              @click="storageRoomClick(sr.storageRoomName)"
            >
              <!-- <input type="checkbox" /> -->
              <p>{{ sr.storageRoomName }}</p>
            </div>
          </div>
        </nav>
        <div id="m-form-check">
          <div
            class="m-input-container m-input-downline m-input-check-box-color"
          >
            <input
              tabindex="11"
              type="checkbox"
              class="m-input-radio-check m-input-downline"
              :checked="changeToX(dataSave.equipmentManagementTraining)"
              @click="equipmentCheck(dataSave.equipmentManagementTraining)"
              v-on:keyup.enter="
                equipmentCheck(dataSave.equipmentManagementTraining)
              "
            />
            <label>Trình độ nghiệp vụ QLTB</label>
            <input
              tabindex="12"
              type="checkbox"
              class="m-input-radio-check"
              :checked="changeToX(dataSave.workStatus)"
              @click="workStatusCheck(dataSave.workStatus)"
              v-on:keyup.enter="workStatusCheck(dataSave.workStatus)"
            />
            <label>Đang làm việc</label>
            <label for="">Ngày nghỉ việc</label>
            <div class="m-input-container m-input-container-mini">
              <input
                tabindex="13"
                type="date"
                class="m-input-ico m-input-ico-mini"
                v-model="dataSave.quitDate"
              />
              <!-- <span class="m-input-ico-right" tabindex="14"
                ><i class="fa-solid fa-calendar-days"></i
              ></span> -->
            </div>
          </div>
        </div>
        <div class="m-form-btn-close">
          <button
            class="m-btn m-btn-normal-two"
            @click="btnCloseAddOnclick"
            v-on:keyup.enter="btnCloseAddOnclick"
            tabindex="15"
          >
            Đóng
          </button>
          <button
            class="m-btn m-btn-normal-one"
            @click="submitData"
            v-on:keyup.enter="submitData"
            tabindex="16"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as CONFIG from "../../../scripts/Resource";
import * as VALIDATE from "../../../scripts/ValidateResources";

export default {
  name: "FormContainer",
  props: ["dataSelected", "titleForm", "flagForm"],
  watch: {
    dataSelected() {
      this.dataSave = this.dataSelected;
      console.log("dataselect thay đổi");
    },
  },
  methods: {
    /**
     * Format ngày giờ
     */
    formatDate(date) {
      console.log(date);
      if (date) this.dataSave.quitDate = date.slice(0, 10);
    },

    /**
     *  Đóng form
     */
    btnCloseAddOnclick() {
      try {
        this.$emit("showFormDetail", false);
        if (this.flagForm == 2) {
          this.$emit("resetDataForm");
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * validate SHCB có trống không
     */
    checkEmptyInputEmployeeCode() {
      var val = this.$refs.focusInput.value;
      if (val == "") {
        this.isValidateEmployeeCode = true;
      } else {
        this.isValidateEmployeeCode = false;
      }
    },

    /**
     * validate họ tên nhân viên có trống không
     */
    checkEmptyInputEmployeeName() {
      var val = this.$refs.employeeName.value;
      if (val == "") {
        this.isValidateEmployeeName = true;
        this.dataSelect = val;
      } else {
        this.isValidateEmployeeName = false;
        this.dataSelect = val;
      }
    },

    /**
     * hiển thị combo box tổ bộ môn
     */
    showGroup() {
      this.isShowSubject = false;
      this.isShowRoom = false;
      this.isShowGroup = !this.isShowGroup;
    },

    /**
     * Hiển thị combo box môn học
     */
    showSubject() {
      this.isShowGroup = false;
      this.isShowRoom = false;
      this.isShowSubject = !this.isShowSubject;
    },

    /**
     * Hiển thị combo box kho phòng
     */
    showRoom() {
      this.isShowSubject = false;
      this.isShowGroup = false;
      this.isShowRoom = !this.isShowRoom;
    },

    /**
     * Xử lý lựa chọn tổ bộ môn
     */
    groupClick(gr) {
      this.groupSelected = gr;
      this.dataSave.groupName = gr;
      this.isShowGroup = false;
    },

    /**
     * Xử lý lựa chọn môn học
     */
    subjectClick(sb) {
      this.dataSave.subjectName = sb;
      this.isShowSubject = false;
    },

    /**
     * Xử lý lựa chọn kho phòng
     */
    storageRoomClick(sr) {
      this.dataSave.storageRoomName = sr;
      this.isShowRoom = false;
    },

    /**
     *  Xử lý sự kiện submit dữ liệu
     */
    async submitData() {
      var me = this;
      try {
        this.warningString = "Không được để trống:";
        var codeVal = this.$refs.focusInput.value;
        var nameVal = this.$refs.employeeName.value;
        var phoneVal = this.$refs.phoneNumber.value;
        // var emailVal = this.$refs.email.value;
        if (phoneVal == "") this.dataSave.phoneNumber = "0000000000";
        // if (emailVal == "") this.dataSave.email = "user@gmail.com";
        this.isShowToastSuccess = true;
        if (nameVal == "") {
          this.isShowToastSuccess = false;
          this.warningString += " Họ và tên;";
        }
        if (codeVal == "") {
          this.isShowToastSuccess = false;
          this.warningString += " Mã nhân viên;";
        }
        if (this.isShowToastSuccess) {
          if (this.flagForm == CONFIG.FORM.ADD.FLAG) {
            this.dataSave.groupID = null;
            this.dataSave.subjectID = null;
            this.dataSave.storageRoomID = null;
            this.dataSave.identifyNumber = "chưa có";

            axios
              .post("http://localhost:5901/api/v1/Officers", this.dataSave)
              .then((response) => {
                console.log(response.data.errors);
                me.warningString = "Thêm mới nhân viên thành công";
                me.$emit("loadingFunction", false);
                me.$emit("showToast", true, me.warningString);
              })
              .catch((e) => {
                me.warningString = "";
                var error = e.response.data.userMsg.error;
                if (error.includes("EmptyCode")) {
                  me.warningString += VALIDATE.ERROR_EMPTY_CODE;
                  me.isShowToastSuccess = false;
                } else if (error.includes("DuplicateCode")) {
                  me.warningString += VALIDATE.ERROR_DUPLICATE_CODE;
                  me.isShowToastSuccess = false;
                } else if (error.includes("OfficerName")) {
                  me.warningString += VALIDATE.ERROR_OFFICER_NAME;
                  me.isShowToastSuccess = false;
                } else if (error.includes("PhoneNumber")) {
                  me.warningString += VALIDATE.ERROR_PHONE_NUMBER;
                  me.isShowToastSuccess = false;
                } else if (error.includes("Email")) {
                  me.warningString += VALIDATE.ERROR_EMAIL;
                  me.isShowToastSuccess = false;
                } else if (error.includes("Date")) {
                  me.warningString += VALIDATE.ERROR_DATE;
                  me.isShowToastSuccess = false;
                } else {
                  me.warningString += VALIDATE.ERROR_GENERAL;
                  me.isShowToastSuccess = false;
                }
                this.$emit("showToast", me.isShowToastSuccess, me.warningString);
              });
            
          }
          if (this.flagForm == CONFIG.FORM.EDIT.FLAG) {
            axios
              .put(
                `http://localhost:5901/api/v1/Officers/${this.dataSelected.officerID}`,
                this.dataSave
              )
              .then((res) => {
                console.log(res);
                me.warningString = "Chỉnh sửa nhân viên thành công";
                me.$emit("showToast", true, this.warningString);
              })
              .catch((e) => {
                me.warningString = "";
                var error = e.response.data.userMsg.error;
                if (error.includes("EmptyCode")) {
                  me.warningString += VALIDATE.ERROR_EMPTY_CODE;
                  me.isShowToastSuccess = false;
                } else if (error.includes("DuplicateCode")) {
                  me.warningString += VALIDATE.ERROR_DUPLICATE_CODE;
                  me.isShowToastSuccess = false;
                } else if (error.includes("OfficerName")) {
                  me.warningString += VALIDATE.ERROR_OFFICER_NAME;
                  me.isShowToastSuccess = false;
                } else if (error.includes("PhoneNumber")) {
                  me.warningString += VALIDATE.ERROR_PHONE_NUMBER;
                  me.isShowToastSuccess = false;
                } else if (error.includes("Email")) {
                  me.warningString += VALIDATE.ERROR_EMAIL;
                  me.isShowToastSuccess = false;
                } else if (error.includes("Date")) {
                  me.warningString += VALIDATE.ERROR_DATE;
                  me.isShowToastSuccess = false;
                } else {
                  me.warningString += VALIDATE.ERROR_GENERAL;
                  me.isShowToastSuccess = false;
                }
                this.$emit("showToast", me.isShowToastSuccess, me.warningString);
              });
            
          }
        } else {
          this.$emit("showToast", this.isShowToastSuccess, this.warningString);
        }
      } catch (e) {
        this.isShowToastSuccess = false;
        this.warningString = "Có lỗi xảy ra ở server";
        this.$emit("showToast", this.isShowToastSuccess, this.warningString);
      }
      console.log(this.dataSave);
    },

    /**
     * Thay đổi kiểu dữ liệu int sang boolean
     */
    changeToX(value) {
      if (value == 1) return true;
      else return false;
    },

    /**
     * xử lý check tình trạng làm việc
     */
    workStatusCheck(workStatus) {
      if (workStatus == 1) return (this.dataSave.workStatus = 0);
      else return (this.dataSave.workStatus = 1);
    },

    /** xử lý check QLTB
     *
     */
    equipmentCheck(equipmentManagement) {
      if (equipmentManagement == 1)
        return (this.dataSave.equipmentManagementTraining = 0);
      else return (this.dataSave.equipmentManagementTraining = 1);
    },
    /**
     * Xử lý tab index
     */
    // focusComboBox(flag, reset) {
    //   console.log(flag);
    //   console.log(reset);
    //   // console.log(this.groupData.length)
    //   // if(reset==true) this.currentBox=0;
    //   console.log(this.currentBox);
    //   console.log(this.groupData[this.currentBox]);
    //   // if(this.currentBox<this.groupData.length){
    //   //   this.currentBox=0
    //   // }
    //   this.dataSave.groupName = this.groupData[this.currentBox].groupName;
    //   this.currentBox += 1;
    // },
  },
  data() {
    return {
      isValidateEmployeeCode: null, // validate SHCB
      isValidateEmployeeName: null, // validate họ tên
      dataSelect: null, //dữ liệu nhận được từ bảng
      dataSave: null, //dữ liệu khi submit form
      warningString: "", // thông báo toast mesage
      isShowToastWarning: false, // hiển thị thông báo lỗi
      isShowToastSuccess: false, // hiển thị thông báo thành công
      isShowSubject: false, //show combo box môn học
      isShowGroup: false, //show combo box tổ bộ môn
      isShowRoom: false, //show combo box kho phòng
      groupSelected: null,
      groupData: [], // danh sách tổ bộ môn
      subjectData: [], //danh sách môn học
      storageRoomData: [], // danh sách kho phòng
      currentBox: 0,
    };
  },
  created() {
    this.dataSave = this.dataSelected;
    this.formatDate(this.dataSave.quitDate);
  },
  mounted() {
    this.$refs.focusInput.focus();
    try {
      var me = this;
      axios.get("http://localhost:5901/api/v1/Groups").then(function (resp) {
        me.groupData = resp.data;
      });
      axios
        .get("http://localhost:5901/api/v1/StorageRooms")
        .then(function (respo) {
          me.storageRoomData = respo.data;
        });
      axios
        .get("http://localhost:5901/api/v1/Subjects")
        .then(function (response) {
          me.subjectData = response.data;
        });
      // .catch((error) => {
      //   console.log(error);
      //   me.warningString = "Sai định dạng email";
      //   me.isShowToastSuccess = false;
      //   me.$emit("showToast", me.isShowToastSuccess, me.warningString);
      // });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
@import url("./FormContainer.css");
</style>