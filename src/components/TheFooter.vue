<template>
    <div id="footer-wp" class="container-fluid">
        <div id="foot-body" class="container">
            <div class="wp-inner clearfix row">
                <div class="block col-12 col-md-6 col-lg-3" id="info-company">
                    <div class="title">
                        <img src="/src/assets/images/logo.png" alt="">
                    </div>
                    <p class="desc">Hava E-guide sẽ cung cấp cho bạn thông tin về các trường học trên toàn quốc. Giúp bạn có
                        cái nhìn tổng quan để đưa ra lựa trọn trọn học tập trong tương lai.</p>
                    <div id="payment">
                        <div class="thumb">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
                <div class="block menu-ft col-12 col-md-6 col-lg-3" id="info-shop">
                    <h3 class="title">Thông tin về Hava</h3>
                    <ul class="list-item">
                        <li>
                            <p>Nguyên Xá, Minh Khai, Bắc Từ Liêm, Hà Nội</p>
                        </li>
                        <li>
                            <p>0911634683 - 0563092451</p>
                        </li>
                        <li>
                            <p>hieukhac6869@gmail.com</p>
                        </li>
                    </ul>
                </div>
                <div class="block menu-ft policy col-12 col-md-6 col-lg-3" id="info-shop">
                    <h3 class="title">Chính sách của chúng tôi</h3>
                    <ul class="list-item">
                        <li>
                            <a href="" title="">Quy định - chính sách</a>
                        </li>
                        <li>
                            <a href="" title="">Quy tắc cộng đồng</a>
                        </li>
                        <li>
                            <a href="" title="">Chính sách hội viện</a>
                        </li>
                        <li>
                            <a href="" title="">Giúp đỡ</a>
                        </li>
                    </ul>
                </div>
                <div class="block col-12 col-md-6 col-lg-3" id="newfeed">
                    <h3 class="title">Bảng tin</h3>
                    <p class="desc">Đăng ký với chung tôi để nhận được thông tin</p>
                    <div id="form-reg">
                        <form method="POST" action="">
                            <input type="email" name="email" id="email" placeholder="Nhập email tại đây">
                            <button type="submit" id="sm-reg">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="foot-bot">
            <p id="copyright">© Bản quyền thuộc về HAVA E-GUIDE | Nguyễn Khắc Hiếu</p>
        </div>
        <div class="chatbot">
            <ChatBot/>
            <BackToTop/>
        </div>
    </div>
    <!-- <div id="btn-top"><img src="public/images/icon-to-top.png" alt="" /></div>
    <div id="fb-root"></div> -->
</template>

<script>
import ChatBot from './ChatBot.vue';
import BackToTop from './BackToTop.vue';

export default {
  name: 'App',
  components: {
    ChatBot,
    BackToTop
  },
};
</script>
<style>
#copyright{
    text-align: center;
}
</style>