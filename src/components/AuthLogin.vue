<template>
  <div id="login">
    <div id="content" class="d-flex justify-content-center align-items-center">
      <div class="box">
        <h1>Đăng nhập</h1>

        <div class="in">
          <label for="name">Nhập địa chỉ email</label>
          <div>
            <input type="email" name="name" v-model="datalogin.email" placeholder="Nhập email của bạn" />
            <img v-if="checkEmailFormat(datalogin.email)" src="../assets/images/ok.png" alt="">
          </div>

          <!-- <div class="button_action">
              <button v-on:click="username = ' @gmail.com'">@gmail.com</button> <button
                v-on:click="username = '@yahoo.com'">@yahoo.com</button> <button
                v-on:click="username = '@outlook.com'">@outlook.com</button> <button
                v-on:click="username = '@aol.com'">@aol.com</button>
            </div> -->
        </div>

        <div class="in">
          <label for="password">Nhập mật khẩu</label>
          <div>
            <input name="password" v-model="datalogin.password" type="password" placeholder="Tối thiểu 8 ký tự"
              required /><img v-if="datalogin.password.length >= 8" src="../assets/images/ok.png" alt="">
          </div>
        </div>

        <div class="password_bar">
          <div :class="{ 'bar': true, 'green': (datalogin.password.length > 1) }"></div>
          <div :class="{ 'bar': true, 'green': (datalogin.password.length > 3) }"></div>
          <div :class="{ 'bar': true, 'green': (datalogin.password.length > 5) }"></div>
          <div :class="{ 'bar': true, 'green': (datalogin.password.length > 7) }"></div>
        </div>

        <div class="check_bar">
          <div> <input type="checkbox" name="remenber" id="remenber">
            <label for="remenber">Ghi nhớ đăng nhập</label>
          </div>

          <a href="">Quên mật khẩu?</a>

        </div>
        <div class="error alert alert-danger " v-if="error != ''">
          {{ error }}
        </div>

        <button class="log" @click="login">
          Đăng nhập
        </button>

        <span>Bạn chưa có tài khoản? <a href="/dang_ky">Đăng ký</a> </span>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import router from '../router/index.js'
export default {
  name: 'AuthLogin',
  data() {
    return {
      datalogin: {
        email: "",
        password: ""
      },
      error: "",
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };
  },
  methods: {
    checkEmailFormat(email) {
      return this.emailRegex.test(email);
    },
    async login() {
      try{
        var response = await axios.post(baseUrl + '/api/login', this.datalogin);
            
            if (response.data.code == 200) {
              this.$cookies.set('token', response.data.data.token);
              router.push('/');
            }
      }catch(e){
        this.error = e.response.data.error;
      }
    }
  }
};
</script>
<style>
#login {
  background: linear-gradient(180deg, #04AFAE, #03a3a3);
  width: 100vw;
  height: 100vh;
}

#content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.box {
  margin-top: -50px;
  height: auto;
}
</style>
  
  
  
  