<template>
    <div id="main-content-wp" class="clearfix container-fluid detail-blog-page">
        <div class="container">
            <div class="wp-inner">
                <div class="section" id="breadcrumb">
                    <div class="secion-detail">
                        <ul class="list-item d-flex clearfix">
                            <li>
                                <a href="/trang_chu" title="">Trang chủ</a>
                            </li>
                            <li class="me-1 ms-1">>></li>
                            <li>
                                <a href="" title="">{{ page.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content row mt-5 mb-5" v-if="page != null">
                    <div class="content-left col-9">
                        <div class="content_inner">
                            <div class="section" id="detail-blog-wp">
                                <div class="section-head clearfix text-center">
                                    <h2 class="section-title">{{ page.name }}</h2>
                                </div>
                                <div class="section-detail mt-3">
                                    <div class="content text-justify" v-html="page.content">
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
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100091546344002&tabs=timeline&width=400&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId" width="100%" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const page = ref([]);
        const setVisible = value => {
            visible.value = value;
        };
        const getApi = () => {
            axios.get(baseUrl + '/api/page/about')
                .then(function (response) {
                    if (response.status != 404) {
                        page.value = response.data.page;
                    }
                })
                .catch(function (error) {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
        };
        getApi();
        return {
            page
        }
    }

});
</script>

<style>
.content li {
    list-style:decimal;   
}
.content li p{
    text-indent:0px !important;
}
.content p, .content li{
    text-align: justify;
    text-justify: inter-word;
    text-indent: 2em;
    margin-bottom: 0.7em;
}
#app{
    background-color: #f8f8f8;
}
.detail-blog-page .content_inner{
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
}
.detail-blog-page .content_inner{
    position: sticky;
    top: 50px;
}
</style>