<template>
  <div id="login">
    <div id="content" class="d-flex justify-content-center align-items-center">
      <div class="box">
        <h1>Đăng ký</h1>

        <div class="in">
          <label for="name">Họ và tên</label>
          <div>
            <input type="text" v-model="data.name" placeholder="Nhập họ và tên của bạn" />
            <img v-if="data.name.length >= 5" src="../assets/images/ok.png" alt="">
          </div>

          <label for="email">Địa chỉ email</label>
          <div>
            <input id="email" name="email" type="text" v-model="data.email" placeholder="Nhập địa chỉ email" />
            <img v-if="checkEmailFormat(data.email)" src="../assets/images/ok.png" alt="">
          </div>
          <label for="gender">Giới tính</label>
          <div class="gender">
            <input type="radio" name="gender" value="nam" checked v-model="data.gender" id="male"><label for="male"
              class="me-4">Nam</label>
            <input type="radio" name="gender" value="nữ" v-model="data.gender" id="female"><label for="female">Nữ</label>
          </div>

          <label for="name">Số điện thoại</label>
          <div>
            <input type="text" v-model="data.phone" placeholder="Nhập số điện thoại" />
            <img v-if="checkPhoneFormat(data.phone)" src="../assets/images/ok.png" alt="">
          </div>
        </div>
        <div class="in">
          <label for="name">Mật khẩu</label>
          <div>
            <input v-model="data.password" type="password" placeholder="Nhập tối thiểu 8 ký tự" required />
            <img v-if="data.password.length >= 8" src="../assets/images/ok.png" alt="">
          </div>
          <div class="password_bar">
            <div :class="{ 'bar': true, 'green': (data.password.length > 1) }"></div>
            <div :class="{ 'bar': true, 'green': (data.password.length > 3) }"></div>
            <div :class="{ 'bar': true, 'green': (data.password.length > 5) }"></div>
            <div :class="{ 'bar': true, 'green': (data.password.length > 7) }"></div>
          </div>
          <label for="name">Xác nhận mật khẩu</label>
          <div>
            <input v-model="password_confirmation" type="password" placeholder="Xác nhận lại mật khẩu ..." required />
            <img v-if="!(data.password == password_confirmation) && password_confirmation" src="../assets/images/x.png"
              alt="">
            <img v-if="data.password === password_confirmation && password_confirmation" src="../assets/images/ok.png"
              alt="">
          </div>
          <div class="text-danger mt-2" v-if="errorRegister">
            {{ errorRegister }}
          </div>
        </div>
        <button class="log" @click="register">
          Đăng ký
        </button>
        <span>Bạn đã có tài khoản? <a href="/dang_nhap">Đăng nhập</a> </span>
      </div>
    </div>
  </div>
</template>
    
<script>
import router from '../router/index.js';
export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        gender: "nam",
        phone: "",
        password: "",
      },
      errorRegister: "",
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phoneRegex: /^0\d{9}$/,
      password_confirmation: null,
    };

  },
  methods: {
    checkEmailFormat(email) {
      return this.emailRegex.test(email);
    },
    checkPhoneFormat(phone) {
      return this.phoneRegex.test(phone);
    },
    async register() {
      await axios.post(baseUrl + '/api/register', this.data)
        .then((response) => {
          if(response.data.code == 201){
            router.push('/dang_nhap');
          }else{
            this.errorRegister = "Lỗi";
          }
        })
    }
  }
};

</script>
<style>
#content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.box {
  margin-top: 100px;
  height: auto;
}

.gender input {
  width: auto !important;
}

.in label {
  margin-top: 10px !important;
}</style>