<template>
    <div id="main-content" class="area-page">
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
                    </ul>
                </div>
                <div id="area-list-wp" class="detail">
                    <div class="section">
                        <div class="section-detail clearfix">
                            <div class="list-item row" >
                                <div class="item col-3" v-for="item in areas">
                                    <div class="item_inner">
                                        <a :href="'/khu_vuc/'+item.codename">
                                            {{ item.name }}({{ item.count }})
                                        </a>
                                    </div>
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
export default defineComponent({
    setup() {
        const areas = ref([]);
        const route = useRoute();
        const getApi = () => {
            try {
                axios.get(baseUrl + "/api/areas")
                    .then((response) => {
                        if (response.data.code == 200) {
                            areas.value = response.data.areas;
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            areas,
            baseUrl,
        }
    }
});
</script>
<style>
#area-list-wp .item{
    margin-bottom: 20px;
    font-size: 20px;
}
#area-list-wp .item a{
    color: #0499AA;
}
#area-list-wp .item a:hover{
    text-decoration: underline;
}
</style>