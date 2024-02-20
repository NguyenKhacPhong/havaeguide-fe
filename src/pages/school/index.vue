<template>
    <div id="main-content" class="school-page">
        <div class="container">
            <div class="section pt-3" id="breadcrumb">
                <div class="secion-detail">
                    <ul class="list-item clearfix">
                        <li>
                            <a href="" title="">Trang chủ</a>
                        </li>
                        <li>>></li>
                        <li>
                            <a href="" title="">Trường học</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="wp-inner row">
                <div class="section card col-12 col-sm-3" id="filter-school">
                    <div class="secion-detail filter_inner">
                        <div class="filter_title">
                            Tìm trường bạn muốn học
                        </div>
                        <div class="filter_content">
                            <form method="get" ref="filter" enctype="multipart/form-data">
                                <select name="nhom_nganh" class="select-box" v-on:change="filteredSchools"
                                    v-model="sectorSelected">
                                    <option value="0">Chon nhóm ngành</option>
                                    <option v-for="item in sectors" :value="item.id"
                                        v-bind:selected="filterSelect.nhom_nganh == item.id" v-on:change="filteredSchools">
                                        {{ item.name }}
                                    </option>
                                </select>
                                <select name="nganh_hoc" class="select-box" v-model="majorSelected"
                                    v-on:change="filteredSchools">
                                    <option value="0">Chọn ngành</option>
                                    <option v-for="item in majorFilter" :value="item.id"
                                        v-bind:selected="filterSelect.nganh_hoc == item.id">{{ item.major_name }}
                                    </option>
                                </select>
                                <select name="dia_diem" class="select-box" v-on:change="filteredSchools"
                                    v-model="areaSelected">
                                    <option value="0">Nơi bạn muốn học</option>
                                    <option v-for="item in areas" :value="item.code"
                                        v-bind:selected="filterSelect.dia_diem == item.code">
                                        {{ item.name }}
                                    </option>
                                </select>
                                <select name="trinh_do" class="select-box" v-on:change="filteredSchools"
                                    v-model="typeSelected">
                                    <option value="0">Hệ đào tạo</option>
                                    <option v-for="item in schoolTypes" :value="item.id"
                                        v-bind:selected="filterSelect.trinh_do == item.id">
                                        {{ item.type_name }}
                                    </option>
                                </select>
                                <select name="sap_xep" class="select-box" v-on:change="filteredSchools"
                                    v-model="sortSelected">
                                    <option value="">Sắp xếp</option>
                                    <option v-for="item in filter_sap_xep" :value="item.value"
                                        v-bind:selected="filterSelect.sap_xep == item.value">
                                        {{ item.title }}
                                    </option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Danh sách các trường học -->
                <div class="school card col-12 col-sm-9">
                    <div class="section">
                        <div class="tab-bar" id="tab-bar-listing">
                        </div>
                        <div class="listing">
                            <div class="listing-content row">
                                <div class="item-listing col-12 col-md-6"
                                    v-for="item in schoolFilter.slice(currentPage * 10 - 10, currentPage * 10)">
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
                    <div class="paginate d-flex justify-content-center" v-if="numPage > 1">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
    setup() {
        const sectors = ref([]);
        const schools = ref([]);
        const majors = ref([]);
        const areas = ref([]);
        const schoolTypes = ref([]);
        const schoolFilter = ref([]);
        const majorFilter = ref([]);
        const numPage = ref();
        const filter_sap_xep = [
            { value: 'a-z', title: 'Từ A đến Z' },
            { value: 'z-a', title: 'Từ Z đến A' },
            { value: 'top', title: 'Đánh giá cao' },
        ];

        const route = useRoute();
        const filterSelect = {
            page: route.query.page,
            nhom_nganh: route.query.nhom_nganh,
            nganh_hoc: route.query.nganh_hoc,
            dia_diem: route.query.dia_diem,
            trinh_do: route.query.trinh_do,
        };
        const currentPage = ref(1);
        route.query.page = currentPage;
        let filterUrl = '';
        let areaSelected = 0;
        let sectorSelected = 0;
        let majorSelected = 0;
        let typeSelected = 0;
        let sortSelected = '';
        const getApi = () => {
            let s = route.query.s ?? "";
            console.log(s);
            axios.get(baseUrl + '/api/schools?s='+ s)
                .then((response) => {
                    sectors.value = response.data.sectors;
                    majors.value = response.data.majors;
                    areas.value = response.data.areas;
                    schoolTypes.value = response.data.school_types;
                    schools.value = response.data.schools;
                    schoolFilter.value = schools.value.slice();
                    numPage.value = Math.ceil(schoolFilter.value.length / 10);

                })
                .catch((error) => {
                    console.log(error);
                });
        };
        console.log();
        getApi();
        schoolFilter.value = schoolFilter.value.slice(0, 10);
        return {
            sectors,
            majors,
            areas,
            areaSelected,
            sectorSelected,
            majorSelected,
            typeSelected,
            sortSelected,
            schoolTypes,
            majorFilter,
            filter_sap_xep,
            filterSelect,
            schoolFilter,
            numPage,
            currentPage,
            schools,
            baseUrl,
        };
    },
    methods: {
        showAddress(address) {
            return 'Địa chỉ: ' + address.replace(/\[\]/g, '<br/>- ');
        },
        filterObjects(objects, selectedId, property) {
            let objectsCopy = objects.slice();
            if (selectedId != 0) {
                return objectsCopy.filter(object => object[property] === selectedId);
            } else {
                return objectsCopy;
            }
        },
        filteredSchools() {
            this.majorFilter = this.filterObjects(this.majors, this.sectorSelected, 'sector_id');
            let schoolCopy = this.schools.slice();
            this.schoolFilter = schoolCopy.filter(school => {
                let major = school.school_majors;
                if (major !== null && major !== undefined) {
                    major = major.replace(/[^\d,]/g, '').split(',').map(Number);
                    if (this.majorSelected != 0) {
                        return major.includes(this.majorSelected);
                    } else {
                        return major.some(element => this.majorFilter.some(item => element === item.id));
                    }
                } else {
                    return false;
                }
            });
            this.schoolFilter = this.schoolFilter.filter(school => {
                let types = school.types;
                if (types !== null && types !== undefined) {
                    types = types.replace(/[^\d,]/g, '').split(',').map(Number);
                    if (this.typeSelected != 0) {
                        return types.includes(this.typeSelected);
                    }
                    return true;
                } else {
                    return false;
                }
            });
            this.schoolFilter = this.filterObjects(this.schoolFilter, this.areaSelected, 'area_id');
            if (this.sortSelected != '') {
                if (this.sortSelected == 'a-z') {
                    this.schoolFilter = this.schoolFilter.sort((a, b) => {
                        return a.school_code.localeCompare(b.school_code);
                    });
                } else if (this.sortSelected == 'z-a') {
                    this.schoolFilter = this.schoolFilter.sort((a, b) => {
                        return b.school_code.localeCompare(a.school_code);
                    });
                }
            }
            this.currentPage = 1;
            this.numPage = Math.ceil(this.schoolFilter.length / 10);
        },
        goToPage(page) {
            if(page == -1){
                this.currentPage--;
            }else if(page == -2){
                this.currentPage++;
            }else{
                this.currentPage = page;
            }
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },

    }
});

</script>
<style>
/* Thay đổi background */
.school-page {
    background-color: var(--bg-page);
    box-sizing: border-box;
}

.school-page .section {
    background-color: var(--bg-page);
}

.school-page .item-listing {
    background-color: var(--bg-page);
    padding: 15px;
}

.school-page .school {
    background: var(--bg-page);
}

.school-page .listing-content {
    background: var(--bg-page);
}

.school-page .listing {
    margin-top: 0px !important;
}

.school-page select {
    display: block;
    width: 100%;
    border-radius: 5px;
    font-size: 18px;
}
.school-page #filter-school .filter_inner {
    position: sticky;
    top: 60px;
    background-color: #fff;
    height: auto;
    padding: 5px;
}

.school-page #filter-school .filter_title {
    width: 100%;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    font-size: 25px;
    font-weight: 400;
    border-bottom: 1px solid #ccc;
}

.school-page #filter-school .filter_content {
    margin-top: 20px;

}

.school-page #filter-school .btn-search {
    background-color: #04AFAE;
    width: 100%;
    color: #fff;
    font-size: 20px;
}

.school-page #filter-school .select-box {
    padding: 10px;
    margin-bottom: 15px;
}

/* listing */
.school-page .item-listing .top-content {
    border-bottom: 1px solid #04AFAE;
}

.school-page .item-listing .top-content .img {
    height: 100px;
}

.school-page .item-listing .top-content .img img {
    height: 100px;
    max-width: 100%;
}

.school-page .item-listing .top-content .title {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 20px;
    color: #04AFAE;
}

.school-page .item-listing .top-content .address {
    height: 50px;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.school-page .item-listing .bottom-content {
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

.school-page .item-listing .bottom-content p {
    text-align: justify;
}

.school-page .item-inner:hover {
    background: #fff !important;
}

.paginate i {
    font-size: 14px;
}

.paginate .item_inner {
    padding: 5px 10px;
    background: #04AFAE;
    color: #fff;
    border-left: 1px solid #fff;
    cursor: pointer;
}

.paginate .item_inner:last-child() {
    border-left: none;
}
</style>