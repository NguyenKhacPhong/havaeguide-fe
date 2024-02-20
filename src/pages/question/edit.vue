<template>
    <div id="main-content-wp" class="clearfix container-fluid detail-blog-post">
        <div class="container">
            <div class="wp-inner">
                <div class="section pt-3" id="breadcrumb">
                    <div class="secion-detail">
                        <ul class="list-item d-flex clearfix">
                            <li class="me-1">
                                <a href="/trang_chu" title="">Trang chủ</a>
                            </li>
                            <li class="me-1">>></li>
                            <li class="me-1">
                                <a href="" title="">Câu hỏi</a>
                            </li>
                            <li class="me-1">>></li>
                            <li class="me-1">
                                <a href="" title="">Đặt câu hỏi</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content row mt-5 mb-5">
                    <div class="content-left col-9">
                        <div class="content_inner card">
                            <div class="card-header font-weight-bold">
                                Đặt câu hỏi
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="title">Tiêu đề câu hỏi</label>
                                    <input class="form-control" type="text" name="title" id="title"
                                        v-model="question.title">
                                </div>
                                <div class="form-group">
                                    <label for="content">Nội dung câu hỏi</label>
                                    <textarea name="content" class="form-control" id="content" cols="30" rows="5"
                                        v-model="question.content"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" @click="updateQuestion">Cập nhật</button>
                            </div>
                        </div>
                    </div>
                    <div class="content-right col-3">
                        <div class="content_inner">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100091546344002&tabs=timeline&width=400&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                                width="100%" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                                allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script async setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import { useToast } from 'vue-toastification';
const toast = useToast();

const question = ref({});
const token = $cookies.isKey('token') ? $cookies.get('token') : "";
const config = {
    headers: {
        token: token
    }
};
const route = useRoute();
const message = ref("");
async function updateQuestion() {
    try {
        const response = await axios.post(baseUrl + "/api/question/update/" + route.params.id, question.value, config)
        if (response.data.code == 200) {
            toast.success(response.data.message);
        }
    } catch (e) {
        toast.error(e.response.data.message);
    }
}
async function editQuestion() {
    try {
        const response = await axios.get(baseUrl + "/api/question/edit/" + route.params.id, config)
        if (response.data.code == 200) {
            question.value = response.data.question;
        }
    } catch (e) {
        router.go(-1);
        toast.error(response.data.message);
    }
}
editQuestion();
</script>
<style>
.form-group {
    margin-bottom: 20px;
}
</style>