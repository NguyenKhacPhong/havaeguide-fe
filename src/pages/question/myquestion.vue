<template>
    <div id="main-content-wp" class="clearfix container-fluid my-question">
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
                                <a href="" title="">Quản lý câu hỏi</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content row mt-5 mb-5">
                    <div class="content-left col-9">
                        <div class="head_question mb-3">
                            <a href="/dat_cau_hoi" class="btn btn-success me-3">Đặt câu hỏi</a>
                        </div>
                        <div class="content_inner">
                            <div class="card">
                                <div class="card-header font-weight-bold d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Danh sách câu hỏi</h5>
                                    <div class="form-search form-inline ">
                                    </div>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped table-checkall">
                                        <thead>
                                            <tr>
                                                <th scope="col">Câu hỏi</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="" v-for="item in questions" v-if="questions.length > 0">
                                                <td class="title" style="width:60%; overflow:hidden;">
                                                    {{ item.title }}
                                                </td>
                                                <td style="width:15%; overflow:hidden;"
                                                    :class="item.status ? 'text-success' : 'text-danger'">
                                                    {{ item.status ? 'Đã phê duyệt' : 'Chờ phê duyệt' }}
                                                </td>
                                                <td style="width:12%; overflow:hidden;">{{
                                                    item.created_at.slice(0, 10) }}</td>
                                                <td>
                                                <td>
                                                    <button class="btn btn-sm rounded-0 text-white btn-success me-2"
                                                        type="button" data-toggle="tooltip" data-placement="top"
                                                        title="Chỉnh sửa" @click="editQuestion(item.id)">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm rounded-0 text-white" type="button"
                                                        data-toggle="tooltip" data-placement="top" title="Xóa vĩnh viễn"
                                                        @click="deleteQuestion(item.id)">
                                                        <i class="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="9">Không tìm thấy bản ghi nào</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-right col-3">
                        <div class="content_inner">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100091546344002&tabs=timeline&width=340&height=499&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" width="340" height="499" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import router from '../../router/index.js';
import { useToast } from 'vue-toastification';
const toast = useToast();

const questions = ref([]);
const token = $cookies.isKey('token') && $cookies.get('token');
const config = {
    headers: {
        token
    }
};
var message = ref("");
var success = true;
function editQuestion(id) {
    router.push("chinh_sua_cau_hoi/" + id);
}
function deleteQuestionById(id) {
    const Index = questions.value.findIndex(question => question.id === id);
    if (Index !== -1) {
        questions.value.splice(Index, 1);
    }
}
async function deleteQuestion(id) {
    var result = confirm('Bạn có chắc chắn muốn xóa vĩnh viễn trường này không?');
    if (result) {
        try {
            const response = await axios.delete(baseUrl + '/api/question/delete/' + id, config);
            if (response.data.code == 200) {
                deleteQuestionById(id);
                toast.success(response.data.message);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }
}
async function getApi() {
    try {
        const response = await axios.get(baseUrl + '/api/myquestion', config);
        if (response.data.code === 200) {
            questions.value = response.data.questions;
        }
    } catch (e) {
        console.log(e);
    }
}
getApi();

</script>

<style scoped>
.content li {
    list-style: decimal;
}

.content p,
.content li {
    text-align: justify;
    text-justify: inter-word;
    text-indent: 2em;
    margin-bottom: 0.7em;
}

#app {
    background-color: var(--bg-page);
}

.my-question .content_inner {
    background-color: var(--white-color);
    border-radius: 15px;
}

.content-right iframe {
    width: 100%;
}

.content-left p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

td p,
th p {
    text-indent: unset !important;
}

th,
td {
    padding: 10px;
}

table {
    border-collapse: collapse;
}

.my-question .section-head {
    margin-bottom: 40px;
}

.content_inner {
    position: sticky;
    top: 0px;
}
</style>