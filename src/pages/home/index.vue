<template>
  <div id="main-content" class="home-page .container-fluid">
    <div class="container">
      <div class="wp-inner">
        <div id="slider" class="mb-4">
          <Carousel :autoplay="false" :wrap-around="true">
            <Slide v-for="slide in sliders" style="height: auto;">
              <div class="carousel__item"><img class="w-100" :src="baseUrl + '/public/images/' + slide.url" alt="">
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!-- Danh các các nhóm ngành -->
        <div class="section card" id="sector">
          <div class="tab-bar" id="tab-bar-listing" v-if="sectors">
            <p class="btn-tab-bar selected" data="1">Nhóm ngành bạn muốn học</p>
          </div>
          <div class="listing">
            <div class="listing-content row">
              <div class="item-listing col-6 col-md-4 col-lg-3 mb-3" v-for="item in sectors">
                <div class="item-inner">
                  <router-link :to="{ name: 'sector', params: { sector_id: item.id } }">
                    <img :src="baseUrl + '/public/images/' + item.image" class="img-sector" :alt="item.name">
                    <p class="title-sector">{{ item.name }}</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- End listing -->
        </div>
        <!-- Danh sách một số trường đại học nổi bật -->
        <div class="oustanding_school card">
          <div class="section">
            <div class="tab-bar" id="tab-bar-listing">
              <a href="/truong_hoc">
                <p class="btn-tab-bar selected" data="1">Các trường nổi bật</p>
              </a>
            </div>
            <div class="listing">
              <div class="listing-content row">
                <div class="item-listing col-6 col-md-4 col-lg-3" v-for="item in ouSchools">
                  <router-link :to="{ name: 'school_detail', params: { code: item.school_code } }">
                    <div class="item-inner">
                      <div class="top-content">
                        <div class="img">
                          <img :src="baseUrl + '/public/images/' + item.school_logo" />
                        </div>
                        <!-- <div class="btn">
                          <i class="fa-solid fa-basket-shopping"></i>
                          <i class="fa-solid fa-eye"></i>
                          <i class="fa-solid fa-heart"></i>
                          <i class="fa-solid fa-right-left"></i>
                        </div> -->
                      </div>
                      <div class="bottom-content">
                        <p class="title">{{ item.school_name }}</p>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- End listing -->
          </div>
        </div>

        <!-- Một số địa điểm học nổi bật -->
        <div class="area_center card">
          <div class="section">
            <div class="tab-bar" id="tab-bar-listing">
              <a href="/khu_vuc">
                <p class="btn-tab-bar selected" data="1">Nơi bạn muốn học</p>
              </a>
            </div>
            <div class="listing">
              <div class="listing-content row">
                <div class="item-listing col-6 col-md-4 col-lg-3" v-for="item in areaCenters">
                  <router-link :to="{ name: 'area', params: { codename: item.codename } }">
                    <div class="item-inner">
                      <div class="top-content">
                        <div class="img">
                          <img :src="'src/assets/images/' + item.image" />
                        </div>
                      </div>
                      <div class="bottom-content">
                        <p class="title">{{ item.name }}</p>
                        <div class="description">{{ item.description }}</div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- End listing -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 4,
        snapAlign: 'start',
      },
    },
  }),
  components: {
    Carousel,
    Pagination,
    Slide,
  },
  setup() {
    const sliders = ref([]);
    const sectors = ref([]);
    const ouSchools = ref([]);
    const areaCenters = ref([]);
    const visible = ref(false);
    const setVisible = value => {
      visible.value = value;
    };
    const getApi = async () => {
      try {
        const response = await axios.get(baseUrl + '/api/home')
        if (response.data.status == 200) {
          sliders.value = response.data.sliders;
          sectors.value = response.data.sectors;
          ouSchools.value = response.data.outstanding_schools;
          areaCenters.value = response.data.area_centers;
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      }
      catch (error) {
        // xử trí khi bị lỗi
        console.log(error);
      }
    };
    getApi();
    return {
      sliders,
      sectors,
      ouSchools,
      baseUrl,
      visible,
      areaCenters,
      setVisible,
      VND
    }
  }

});

</script>

<style>
#slider {
  position: relative;
}

#slider .carousel__pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}

.ant-image {
  width: 100%;
}
</style>
