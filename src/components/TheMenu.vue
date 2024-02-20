<template>
    <div id="menu" class="container-fluid shadow">
        <div class="container">
            <div class="d-flex align-items-center menu-inner">
                <div class="fs-6">
                    <div id="main-menu-wp" class="d-flex align-items-center justify-content-end">
                        <ul id="main-menu" class="clearfix p-2">
                            <li>
                                <a href="/trang_chu" title="">Trang chủ</a>
                            </li>
                            <li>
                                <a href="/truong_hoc" title="">Trường học</a>
                            </li>
                            <li>
                                <a href="/cau_hoi" title="">Hỏi đáp</a>
                            </li>
                            <li>
                                <a href="/tin_tuc" title="">Tin tức</a>
                            </li>
                            <li>
                                <a href="/chatbot-ai" title="">Bai chat</a>
                            </li>
                            <li>
                                <a href="/gioi_thieu" title="">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="/lien_he" title="">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
#menu{
    position: sticky;
    top: -1px;
    z-index: 1;
    background-color: #fff;
}
#menu #main-menu {
    display: flex;
    margin: 0;
}

#menu #main-menu li {
    list-style: none;
}

#menu #main-menu li a {
    display: block;
    color: #000;
    padding: 5px 15px;
    border-right: 1px solid black;
    font-size: 20px;
}

#menu #main-menu li:last-child a {
    border-right: none;
}
#menu #main-menu .shadow{
    box-shadow: 0 .5rem 1rem rgba(var(--grey2-color),.15)!important;
}
#menu .menu-inner {
    position: relative;
}
@media (max-width: 576px){
    #menu a{
    font-size: 14px !important;
    }
}
</style>