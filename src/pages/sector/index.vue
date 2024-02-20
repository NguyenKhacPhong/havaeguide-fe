<template>
    <div id="main-content" class="sector-detail-page">
        <div class="container">
            <div class="wp-inner">
                <div id="breadcrumb">
                    <ul class="list-item clearfix">
                        <li>
                            <a href="/trang_chu" title="">Trang chủ</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a href="/trang_chu" title="">Nhóm ngành</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a :href="'/nhom_nganh/'+sector.id" title="">{{ sector.name }}</a>
                        </li>
                    </ul>
                </div>
                <div id="sector-info-wp" class="detail">
                    <div class="section">
                        <div class="section-detail clearfix">
                            <div class="info_object">
                                <img class="object_logo"
                                    :src="baseUrl + '/public/images/' + sector.image" />
                                <h1 class="object_name">{{ sector.name }}</h1>
                                <div class="description" v-html="sector.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Danh sách các trường học -->
                <div class="school card">
                    <div class="section">
                        <div class="tab-bar" id="tab-bar-listing">
                            <p class="btn-tab-bar selected">Các trường thuộc nhóm ngành {{ sector.name}} ({{ schools.length }})</p>
                        </div>
                        <div class="listing">
                            <div class="listing-content row">
                                <div class="item-listing col-12 col-md-6 col-lg-4"
                                    v-for="item in schools">
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
        const sector = ref([]);
        const schools = ref([]);
        const selectedTab = ref(1);
        const searchInput = ref("");
        const route = useRoute();
        const getApi = () => {
            try {
                axios.get(baseUrl + "/api/sector/" + route.params.sector_id)
                    .then((response) => {
                        if (response.data.code == 200) {
                            sector.value = response.data.sector;
                            schools.value = response.data.sector.schools;
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            sector,
            schools,
            searchInput,
            baseUrl,
            selectedTab,
        }
    },
    methods:{
        showAddress(address) {
            return 'Địa chỉ: ' + address.replace(/\[\]/g, '<br/>- ');
        },
    }
    
});
</script>
<style>
.sector-detail-page,
.sector-detail-page .listing,
.school.card{
    background-color: #fafafa !important;
    box-sizing: border-box;
}

.sector-detail-page .detail .info_object .object_logo{
    height: 150px;
    position: absolute;
    top: -100px;
    top: 100px;
    left: 50%; 
    transform: translate(-50%, -50%);
}
.sector-detail-page .detail .info_object .object_name{
    padding-top: 250px;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    text-shadow: none;
}
.sector-detail-page .detail .description{
    padding: 30px;
    padding-top: 260px;
    text-align: justify;
}
/* listing */
.sector-detail-page .item-listing{
    margin-bottom: 30px;
}
.sector-detail-page .item-listing .top-content {
    border-bottom: 1px solid #04AFAE;
}

.sector-detail-page .item-listing .top-content .img {
    height: 100px;
}

.sector-detail-page .item-listing .top-content .img img {
    height: 100px;
    max-width: 100%;
}

.sector-detail-page .item-listing .top-content .title {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 20px;
    color: #04AFAE;
}

.sector-detail-page .item-listing .top-content .address {
    height: 50px;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.sector-detail-page .item-listing .bottom-content {
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

.sector-detail-page .item-listing .bottom-content p {
    text-align: justify;
}

.sector-detail-page .item-inner:hover {
    background: #fff !important;
}

.sector-detail-page .paginate i {
    font-size: 14px;
}

.sector-detail-page .paginate .item_inner {
    padding: 5px 10px;
    background: #04AFAE;
    color: #fff;
    border-left: 1px solid #fff;
    cursor: pointer;
}

.sector-detail-page .paginate .item_inner:last-child() {
    border-left: none;
}
</style>