<template>
    <div id="main-content" class="post-detail container-fluid">
        <div class="container">
            <div id="breadcrumb" class="pt-3">
                <ul class="list-item clearfix">
                    <li>
                        <a href="/trang_chu" title="">Trang chủ</a>
                    </li>
                    <li class="ms-1 me-1">>></li>
                    <li>
                        <a href="/tin_tuc" title="">Tin tức</a>
                    </li>
                </ul>
            </div>
            <!-- Danh sách các trường học -->
            <div class="listing row">
                <div class="item col-12 col-md-6" v-for="item in posts">
                    <router-link :to="{ name: 'post', params: { slug: item.slug } }">
                        <div class="item-inner row">
                            <div class="left post_image col-4">
                                <img :src="baseUrl + '/public/images/' + item.image" alt="">
                            </div>
                            <div class="right col-8">
                                <h3 class="post-title mb-0 text-start">{{ item.title }}</h3>
                                <div class="post-content" v-html="item.content">
                                </div>
                                <div class="sub-info d-flex mt-2">
                                    <div class="number-view pe-4">
                                        <i class="fa-regular fa-clock"></i>
                                        {{ item.created_at.slice(0, 10) }}
                                    </div>
                                    <div class="number-reply pe-4">
                                        <i class="fa-regular fa-eye"></i>
                                        {{ item.number_of_views }}
                                    </div>
                                    <div class="number-view pe-4">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                        {{ item.user_name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- <div class="paginate d-flex justify-content-center" v-if="numPage > 1">
                        <div class="paginate_inner d-flex">
                            <div class="paginate_item" v-if="currentPage > 1" @click="goToPage(-1)">
                                <div class="item_inner">
                                    <i class="fa-solid fa-angles-left"></i>
                                </div>
                            </div>
                            <div class="paginate_item" v-for="page in numPage" @click="goToPage(page)">
                                <div class="item_inner">
                                    {{ page }}
                                </div>
                            </div>
                            <div class="paginate_item" v-if="currentPage < numPage" @click="goToPage(-2)">
                                <div class="item_inner">
                                    <i class="fa-solid fa-angles-right"></i>
                                </div>
                            </div>
                        </div>
                    </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const posts = ref([]);
        const getApi = async () => {
            try {
                const response = await axios.get(baseUrl + "/api/posts")
                if (response.data.code == 200) {
                    posts.value = response.data.posts;
                }
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            posts,
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
.post-detail {
    background-color: var(--bg-page) !important;
    box-sizing: border-box;
}

/* listing */
.post-detail .item-listing {
    margin-bottom: 30px;
}
.post-detail .item-inner:hover {
    background: var(--white-color) !important;
}

.post-detail .paginate i {
    font-size: 14px;
}

.post-detail .paginate .item_inner {
    background: var(--main-color);
    color: var(--white-color);
    border-left: 1px solid var(--white-color);
    cursor: pointer;
}

.post-detail .paginate .item_inner:last-child() {
    border-left: none;
}
.post-detail .right{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.post-detail .post-title{
    font-size: 25px;
    text-transform: uppercase;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}
.post-detail .post_image img {
    height: 200px;
    width: 200px;
    float: left;
}

.post-detail .post-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    margin-top: 10px;
    text-align: justify;
}

.post-detail .sub-info {
    color: var(--grey2-color);
}</style>