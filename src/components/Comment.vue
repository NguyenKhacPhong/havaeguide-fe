<template>
    <div class="comment card">
        <div class="section">
            <div class="tab-bar" id="tab-bar-listing">
                <p class="btn-tab-bar selected">Bình luận</p>
            </div>
            <div class="user_comment">
                <textarea name="comment" id="comment-text" rows="5" :readonly="isLogin ? false : true" v-model="textComment"
                    :placeholder="!isLogin ? 'Vui lòng đăng nhập để bình luận!' + isLogin : ''"></textarea>
                <button class="btn btn-success" @click="addComment">Bình luận</button>
                <span>{{ error }}</span>
            </div>
            <hr />
            <div class="no_comment" v-if="comments.length == 0">
                Không có bình luận nào!
            </div>
            <div class="listing" v-else>
                <div class="listing-content">
                    <div class="item-listing" v-for="item in comments">
                        <div class="user_comment d-flex">
                            <div v-if="item.avatar != null" class="user_avatar me-2">
                                <img :src="baseUrl + '/public/images/' + item.avatar" alt="">
                            </div>
                            <p class="user_name">{{ item.user_name }}</p>
                            <p class="created_at">{{ item.created_at.slice(0, 19) }}</p>
                        </div>
                        <div class="content">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- End listing -->
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    props: {
        school_id: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const comments = ref([]);
        const token = $cookies.isKey('token') ? $cookies.get('token') : "";
        const config = {
            headers: {
                token: token
            }
        };
        const isLogin = ref(false);
        const error = ref("");
        const textComment = ref("");
        const route = useRoute();
        const { school_id } = toRefs(props);
        const comment = ref({
            user_id: 0,
            avatar: "",
            user_name: "",
            content: "",
            created_at: "Vừa xong"
        });
        const getApi = async () => {
            try {
                var response = await axios.get(baseUrl + "/api/comment/" + route.params.code)
                if (response.data.code == 200) {
                    comments.value = response.data.comments;
                }
                var response = await axios.get(baseUrl + '/api/user_info', config)
                if (response.data.status == 200) {
                    comment.value.user_name = response.data.info.name;
                    comment.value.avatar = response.data.info.avatar;
                    isLogin.value = true;
                }
                //console.log(token);
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            school_id,
            token,
            isLogin,
            baseUrl,
            textComment,
            comment,
            comments,
            error,
        }
    },
    methods: {
        async addComment() {
            const headers = {
                headers: {
                    'token': this.token
                }
            }
            this.comment.content = this.textComment;
            var data = {
                "school_id": this.school_id,
                "content": this.comment.content
            }
            this.comments.unshift(this.comment);
            try {
                const response = await axios.post(baseUrl + "/api/comment/add", data, headers);
                if (response.data.code == 200) {
                    // Xóa nội dung comment đã nhập
                    this.textComment = "";
                } else {
                    this.error = "Thêm bình luận thất bại!";
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
});
</script>
<style>
.user_comment {
    margin-top: 20px;
}

.user_comment #comment-text {
    width: 100%;
    margin-top: 20px;
    padding: 15px;
    border-radius: 15px;
}

.user_comment .btn {
    margin-top: 10px;
}
</style>