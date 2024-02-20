<template>
    <div id="main-content" class="question-page top-page container-fluid">
        <div class="container">
            <div id="breadcrumb" class="pt-3">
                <ul class="list-item clearfix">
                    <li>
                        <a href="/trang_chu" title="">Trang chủ</a>
                    </li>
                    <li class="ms-1 me-1">>></li>
                    <li>
                        <a href="/cau_hoi" title="">Hỏi đáp</a>
                    </li>
                </ul>
            </div>
            <div class="head_question mt-3">
                <a href="/dat_cau_hoi" class="btn btn-success me-3">Đặt câu hỏi</a>
            </div>
            <div class="main-content-question row mt-4">
                <div class="content-left col-9">
                    <!-- Danh sách các trường học -->
                    <div class="listing">
                        <div class="item" v-for="item in questions">
                            <a :href="'/cau_hoi/'+ item.id">
                                <div class="item-inner row">
                                    <div class="sub-info left col-3 mt-2">
                                        <div class="number-view pe-4 top">
                                            <i class="fa-regular fa-clock"></i>
                                            {{ item.created_at.slice(0,10) }}, 
                                            {{ item.created_at.slice(11,16) }}
                                        </div>
                                        <div class="bottom d-flex mt-3">
                                            <div class="number-view pe-4">
                                                <i class="fas fa-reply"></i>
                                                {{ item.number_of_replies }}
                                            </div>
                                            <div class="number-reply pe-4">
                                                <i class="fa-regular fa-eye"></i>
                                                {{ item.number_of_views }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right col-9">
                                        <div class="top">
                                             <img :src="baseUrl + '/public/images/' + item.avatar" class="image me-2" alt="">
                                             <span>{{ item.user_name }}</span>
                                        </div>
                                        <h4 class="bottom mt-2 question-title mb-0 text-start">{{ item.title }}</h4>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="content-right col-3">
                <div class="content_inner">
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100091546344002&tabs=timeline&width=400&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                        width="100%" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
            </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
//import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const questions = ref([]);
        const getApi = async () => {
            try {
                const response = await axios.get(baseUrl + "/api/questions")
                if (response.data.code == 200) {
                    questions.value = response.data.questions;
                }
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            questions,
            baseUrl,
        }
    },
    methods: {
        showAddress(address) {
            return 'Địa chỉ: ' + address.replace(/\[\]/g, '<br/>- ');
        },
    }

});
</script>
<style>
.question-page {
    background-color: var(--bg-page) !important;
    box-sizing: border-box;
}

/* listing */
.question-page .listing {
    margin-top: 0px !important;
}

.question-page .item {
    padding: 15px;
    border-bottom: 1px solid #555;
}
.question-page .item:last-child{
    border-bottom: none;
}
.question-page .item-inner:hover {
    background: var(--white-color) !important;
}

.question-page .paginate i {
    font-size: 14px;
}
.main-content-question{
    min-height: 500px;
}
.question-page .paginate .item_inner {
    background: var(--main-color);
    color: var(--white-color);
    border-left: 1px solid var(--white-color);
    cursor: pointer;
}

.question-page .paginate .item_inner:last-child() {
    border-left: none;
}

.question-page .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.question-page .content-left .image{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.question-page .quest-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}
.question-page .question-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    margin-top: 10px;
    text-align: justify;
}

.question-page .sub-info {
    color: var(--grey-color);
}
.top-page .content_inner{
    position: sticky;
    top: 50px;
}
</style>