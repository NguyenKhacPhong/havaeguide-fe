<template>
    <div id="main-content" class="area-detail-page">
        <div class="container">
            <div class="wp-inner">
                <div id="breadcrumb">
                    <ul class="list-item clearfix">
                        <li>
                            <a href="/trang_chu" title="">Trang chủ</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a href="/khu_vuc" title="">Khu vực</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a :href="'/khuvuc/' + area.codename" title="">{{ area.name }}</a>
                        </li>
                    </ul>
                </div>
                <div id="area-info-wp" class="detail">
                    <div class="section">
                        <div class="section-detail clearfix">
                            <div class="info_object">
                                <h1 class="object_name">{{ area.name }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Danh sách các trường học -->
                <div class="school card">
                    <div class="section">
                        <div class="tab-bar" id="tab-bar-listing">
                            <p class="btn-tab-bar selected">Các trường thuộc khu vực {{ area.name }} ({{ area.count
                            }})</p>
                        </div>
                        <div class="listing">
                            <div class="listing-content row">
                                <div class="item-listing col-12 col-md-6 col-lg-4" v-for="item in schools">
                                    <router-link :to="{ name: 'school_detail', params: { code: item.school_code } }">
                                        <div class="item-inner">
                                            <div class="top-content d-flex align-items-end row">
                                                <div class="img col-4">
                                                    <img :src="baseUrl + '/public/images/' + item.school_logo" />
                                                </div>
                                                <h3 class="title mb-0 text-start col-8">{{ item.school_name }}</h3>
                                                <div class="address col-12 text-start mt-2 font-italic"
                                                    v-html="showAddress(item.school_address)">
                                                </div>
                                            </div>
                                            <div class="bottom-content" v-html="item.school_description">
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!-- End listing -->
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
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const area = ref([]);
        const schools = ref([]);
        const selectedTab = ref(1);
        const searchInput = ref("");
        const route = useRoute();
        const getApi = async () => {
            try {
                const response = await axios.get(baseUrl + "/api/area/" + route.params.codename)
                if (response.data.code == 200) {
                    area.value = response.data.area;
                    schools.value = response.data.area.schools;
                }
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            area,
            schools,
            searchInput,
            baseUrl,
            selectedTab,
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
.area-detail-page,
.area-detail-page .listing,
.school.card {
    background-color: #fafafa !important;
    box-sizing: border-box;
}

#area-info-wp {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
}
#area-info-wp .object_name{
    position: static;
    color: #04AFAE;
    text-shadow: none;
}
/* listing */
.area-detail-page .item-listing {
    margin-bottom: 30px;
}

.area-detail-page .item-listing .top-content {
    border-bottom: 1px solid #04AFAE;
}

.area-detail-page .item-listing .top-content .img {
    height: 100px;
}

.area-detail-page .item-listing .top-content .img img {
    height: 100px;
    max-width: 100%;
}

.area-detail-page .item-listing .top-content .title {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 20px;
    color: #04AFAE;
}

.area-detail-page .item-listing .top-content .address {
    height: 50px;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.area-detail-page .item-listing .bottom-content {
    height: 240px;
    margin-top: 20px;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.area-detail-page .item-listing .bottom-content p {
    text-align: justify;
}

.area-detail-page .item-inner:hover {
    background: #fff !important;
}

.area-detail-page .paginate i {
    font-size: 14px;
}

.area-detail-page .paginate .item_inner {
    padding: 5px 10px;
    background: #04AFAE;
    color: #fff;
    border-left: 1px solid #fff;
    cursor: pointer;
}

.area-detail-page .paginate .item_inner:last-child() {
    border-left: none;
}</style>