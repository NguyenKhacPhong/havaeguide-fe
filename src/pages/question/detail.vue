<template>
    <div id="main-content-wp" class="clearfix container-fluid question-detail">
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
                        <div class="content_inner p-3">
                            <div class="info mb-2">
                                Thời gian
                                {{ formatTime(question.created_at) }}
                                <div class="number_of_views d-inline ms-2">
                                    <i class="fa-regular fa-eye"></i>
                                    {{ question.number_of_views }}
                                </div>
                                <div class="number_of_replies d-inline ms-2">
                                    <i class="fas fa-reply"></i>
                                    {{ question.number_of_replies }}
                                </div>
                            </div>
                            <div class="title">
                                <h2>{{ question.title }}</h2>
                            </div>
                            <div class="content mt-3">
                                <p>{{ question.content }}</p>
                            </div>
                            <div class="answer-content mt-4">
                                <div class="reply">
                                    <button class="btn btn-success" @click="showReply = !showReply">Đăng câu trả
                                        lời</button>
                                    <div class="user_reply" :class="{ 'is-visible': showReply }">
                                        <textarea name="message" id="reply-text" rows="5" :readonly="isLogin ? false : true"
                                            v-model="answer.message"
                                            :placeholder="!isLogin ? 'Vui lòng đăng nhập để bình luận!' : ''"></textarea>
                                        <button class="btn btn-success" @click="answerQuestion">Trả lời</button>
                                    </div>
                                </div>
                                <div class="tab-bar mt-5" id="tab-bar-listing">
                                    <span class="btn-tab-bar">
                                        {{ question.answers != null ? question.answers.length : 0 }}
                                        câu trả lời
                                    </span>
                                </div>
                                <div class="list-answer mt-3" v-if="question.answers != null">
                                    <div class="item-answer" v-for="item in question.answers">
                                        <div class="answer-top">
                                            <span v-if="item.avatar != null" class="user_avatar me-2">
                                                <img :src="baseUrl + '/public/images/' + item.avatar" alt="">
                                            </span>
                                            <span>{{ item.user_name }}</span>
                                            <span class="ms-3">{{ formatTime(item.created_at) }}</span>
                                        </div>
                                        {{ item.message }}
                                    </div>
                                </div>
                                <div class="no-answer mt-3" v-else>
                                    Chưa có câu trả lời nào!
                                </div>
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

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
const toast = useToast();
const baseUrl = window.baseUrl;
const question = ref({});
const token = $cookies.isKey('token') ? $cookies.get('token') : "";
const config = {
    headers: {
        token: token
    }
};
const route = useRoute();
const showReply = ref(false);
const userInfo = ref({
    user_name: "",
    avatar: ""

});
const answer = ref({
    message: ""
});
const isLogin = ref(false);
function formatTime(time) {
    time = String(time);
    return time.slice(0, 10) + ", " + time.slice(11, 16);
}
async function editQuestion() {
    try {
        const response = await axios.get(baseUrl + "/api/question/" + route.params.id)
        if (response.data.code == 200) {
            question.value = response.data.question;
        }
        const response1 = await axios.get(baseUrl + '/api/user_info', config)
        if (response1.data.status == 200) {
            userInfo.value.user_name = response1.data.info.name;
            userInfo.value.avatar = response1.data.info.avatar;
            isLogin.value = true;
        }
    } catch (e) {
        router.go(-1);
        toast.error(response.data.message);
    }
}
editQuestion();

async function answerQuestion() {
    if (answer.value.message != "") {
        try {
            const response = await axios.post(baseUrl + "/api/question/" + route.params.id + "/answer", answer.value, config)
            if (true) {
                toast.success("Trả lời câu hỏi thành công!");
                var answerNew = {
                    user_name: userInfo.value.user_name,
                    avatar: userInfo.value.avatar,
                    message: answer.value.message,
                    created_at: "Vừa xong"
                }

                question.value.answers.unshift(answerNew);
                question.value.number_of_replies += 1;
                answer.value.message = "";
            }
        } catch (e) {
            toast.error(e);
        }
    } else {
        toast.warning("Vui lòng nhập câu trả lời của bạn!");
        answer.value.message = "";
    }
}
</script>
<style>
.question-detail .info {
    color: var(--grey2-color);
}

.question-detail .content,
.question-detail .item-answer {
    text-align: justify;
    font-size: 18px;
}

.question-detail .btn-tab-bar {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--main-color);
    text-transform: uppercase;
    color: var(--white-color);
    font-weight: 600;
}

.question-detail .tab-bar {
    border-bottom: 1px solid var(--main-color);
}

.user_reply {
    margin-top: 20px;
    height: 0px;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.user_reply.is-visible {
    opacity: 1;
    height: auto;
    overflow: auto;
}

.user_reply #reply-text {
    width: 100%;
    margin-top: 20px;
    padding: 15px;
    border-radius: 15px;
}

.user_reply .btn {
    margin-top: 10px;
}
.item-answer{
    border-bottom: 1px solid var(--main-color);
    padding-bottom: 10px;
    margin-bottom: 30px;
}
.item-answer:first-child{
    margin-bottom: 0px;
    border-bottom: none;

}
.answer-top{
    margin-bottom: 20px;
}
.answer-top img{
    width: 25px;
    height: 25px;
    display: inline;
    border-radius: 50%;
}
</style>