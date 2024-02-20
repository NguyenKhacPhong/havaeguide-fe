<template>
    <div class="container-fluid" id="header" style="background-color: var(--top-header); color: #fff;">
        <div class="container">
            <div class="row text-white text-while p-2" id="head-body">
                <div class="col-6 d-flex justify-content-start">
                    <a class="pe-3"><i class="fa-solid fa-location-dot"></i></a>
                    <a class="pe-3"><i class="fa-regular fa-envelope"></i></a>
                    <a class="pe-3"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="/dang_nhap" v-if="name == ''">Đăng nhập</a>
                    <a href="/dang_ky" v-if="name == ''" class="ms-2">Đăng ký</a>
                    <a class="info d-flex align-items-center" v-if="name != ''">
                        <img v-if="avatar != null" class="avatar d-none d-sm-block" :src="baseUrl + '/public/images/' + avatar" alt="avatar">
                        <span>{{ name }}</span>
                        <div class="dropdown">
                            <a @click="logout">Đăng xuất</a>
                            <a href="thong_tin_tai_khoan">Thông tin tài khoản</a>
                            <a href="/quan_ly_cau_hoi">Quản lý câu hỏi</a>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid" style="background-color: #04AFAE;">
        <div class="container">
            <div class="row text-while f-flex justify-content-center" id="head-body" style="padding: 1rem 0">
                <div class="col-12 col-sm-3 d-flex align-items-center justify-content-sm-start justify-content-center">
                    <router-link :to="{ name: 'home' }">
                        <img src="../assets/images/logo.png" alt="logo" height="100" />
                    </router-link>
                </div>
                <div class="col-9 col-sm-6 d-flex align-items-center justify-content-center">
                    <form method="GET" action="/truong_hoc">
                        <div id="search-wp">
                            <input type="text" name="s" id="s" @keyup.enter="handleSubmit" placeholder="Nhập tên trường bạn muốn tìm kiếm!">
                            <button type="submit" id="sm-s">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-3 col-sm-3 d-sm-flex align-items-center justify-content-end d-none" id="action-wp">
                    <div id="advisory-wp" class="d-none d-sm-block">
                        <span class="title fs-4">Tư vấn</span>
                        <span class="phone fw-bold">0911.634.683</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({
    setup() {
        const $cookies = inject('$cookies');
        const name = ref("");
        const avatar = ref("");
        const token = $cookies.isKey('token') ? $cookies.get('token') : "";
        const config = { headers: { token: token } };
        const getApi = () => {
            axios.get(baseUrl + '/api/user_info', config)
                .then(function (response) {
                    if (response.data.status == 200) {
                        name.value = response.data.info.name;
                        avatar.value = response.data.info.avatar;
                    }
                })
                .catch(function (error) {
                    // Xử lý khi bị lỗi
                    console.log(error);
                })
        };
        if (token != "") {
            getApi();
        }
        const logout = () => {
            axios.get(baseUrl + '/api/logout', config)
                .then(function (response) {
                    if (response.data.code == 200) {
                        name.value = "";
                        avatar.value = "";
                        $cookies.remove("token");
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    // Xử lý khi bị lỗi
                    console.log(error);
                })
        };
        const handleSubmit = ()=> {
            // Do something with the search term, e.g. redirect to search results page
            this.$router.push(`/truong_hoc?s=${this.searchTerm}`);
        };
        return {
            name,
            avatar,
            handleSubmit,
            logout,
            baseUrl,
        }
    },
});
</script>
<style>
#header a {
    color: #fff;
}

#header .info .avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-right: 6px;

}

#header .info:hover .dropdown {
    display: block;
    z-index: 100;
}

#header .info {
    position: relative;
    padding: 5px;
}

#header .info .dropdown {
    display: none;
    position: absolute;
    top: 100%;
    background-color: #fff;
    width: 170px;
    border-radius: 5px;
    overflow: hidden;
}

#header .dropdown a {
    padding: 10px;
    color: #000;
    margin-bottom: 0;
}

#header .dropdown a:hover {
    background-color: #ccc;
}

.btn-login {
    cursor: pointer;
}
</style>