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
                                <a href="/tin_tuc" title="">Tin tức</a>
                            </li>
                            <li class="me-1">>></li>
                            <li class="me-1">
                                <a :href="'/tin_tuc/'+ post.slug" title="">{{ post.title }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content row mt-5 mb-5" v-if="post != null">
                    <div class="content-left col-9">
                        <div class="content_inner">
                            <div class="section" id="detail-blog-wp">
                                <div class="section-head clearfix text-center">
                                    <h2 class="section-title">{{ post.title }}</h2>
                                    <div class="sub-info mt-3 d-flex justify-content-end">
                                        <div class="number-view pe-4">
                                            <i class="fa-regular fa-clock"></i>
                                            {{ post.created_at.slice(0, 10) }}
                                        </div>
                                        <div class="number-reply pe-4">
                                            <i class="fa-regular fa-eye"></i>
                                            {{ post.number_of_views }}
                                        </div>
                                        <div class="number-view pe-4">
                                            <i class="fa-regular fa-pen-to-square"></i>
                                            {{ post.user_name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="section-detail mt-3">
                                    <div class="content text-justify" v-html="post.content">
                                    </div>
                                </div>
                            </div>
                            <div class="section mt-3" id="social-wp">
                                <div class="section-detail">
                                    <div class="fb-like" data-href="" data-layout="button_count" data-action="like"
                                        data-size="small" data-show-faces="true" data-share="true"></div>
                                    <div class="g-plusone-wp">
                                        <div class="g-plusone" data-size="medium"></div>
                                    </div>
                                    <div class="fb-comments" id="fb-comment" data-href="" data-numposts="5"></div>
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
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const route = useRoute();
        const post = ref([]);
        const setVisible = value => {
            visible.value = value;
        };
        const getApi = () => {
            axios.get(baseUrl + '/api/post/' + route.params.slug)
                .then(function (response) {
                    if (response.status != 404) {
                        post.value = response.data.post;
                    }
                })
                .catch(function (error) {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
        };
        getApi();
        return {
            post
        }
    },
});
</script>

<style>
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

.detail-blog-post .content_inner {
    background-color: var(--white-color);
    padding: 20px;
    border-radius: 15px;
}

.content-left iframe {
    width: 100%;
}

td p,
th p {
    text-indent: unset !important;
}
th, td{
    padding: 10px;
}

table,
th,
td {
    border: 1px solid;
}

table {
    border-collapse: collapse;
}

.detail-blog-post .section-head {
    margin-bottom: 40px;
}
.sub-info{
    color: var(--grey2-color);
}
.content_inner{
    position: sticky;
    top: 0px;
}
</style>