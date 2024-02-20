import { advancePositionWithMutation } from "@vue/compiler-core";

const client = [
    {
        path: "",
        component: () => import("../layouts/client.vue"),
        children: [
            //Module home
            {
                path: "",
                name: "index",
                component: () => import("../pages/home/index.vue")
            },
            {
                path: "/trang_chu",
                name: "home",
                component: () => import("../pages/home/index.vue")
            },
            
            //Module product
            {
                path: "/nhom_nganh",
                name: "sectors",
                component: () => import("../pages/sector/index.vue"),
            },
            {
                path: "/nhom_nganh/:sector_id",
                name: "sector",
                component: () => import("../pages/sector/index.vue"),
            },
            {
                path: "/truong_hoc",
                name: "school",
                component: () => import("../pages/school/index.vue")
            },
            {
                path: "/truong_hoc/:code",
                name: "school_detail",
                component: () => import("../pages/school/detail.vue")
            },
            //Module area
            {
                path: "/khu_vuc",
                name: "areas",
                component: () => import("../pages/area/index.vue"),
            },
            {
                path: "/khu_vuc/:codename",
                name: "area",
                component: () => import("../pages/area/detail.vue"),
            },

            //Module post
            {
                path: "/tin_tuc",
                name: "posts",
                component: () => import("../pages/post/index.vue"),
            },
            {
                path: "/tin_tuc/:slug",
                name: "post",
                component: () => import("../pages/post/detail.vue"),
            },
            // Trang tĩnh
            {
                path: "/gioi_thieu",
                name: "about",
                component: () => import("../pages/page/about.vue"),
            },
            {
                path: "/lien_he",
                name: "contace",
                component: () => import("../pages/page/contact.vue"),
            },

            //Question
            {
                path: "/cau_hoi",
                name: "questions",
                component: () => import("../pages/question/index.vue"),
            },
            {
                path: "/chinh_sua_cau_hoi/:id",
                name: "edit_question",
                component: () => import("../pages/question/edit.vue"),
            },
            {
                path: "/cau_hoi/:id",
                name: "question_detail",
                component: () => import("../pages/question/detail.vue"),
            },
            {
                path: "/dat_cau_hoi",
                name: "ask",
                component: () => import("../pages/question/create.vue"),
            },
            {
                path: "/quan_ly_cau_hoi",
                name: "question",
                component: () => import("../pages/question/myquestion.vue"),
            },
            //Nhúng baichat
            {
                path: "/chatbot-ai",
                name: "chatbot",
                component: () => import("../pages/chatbot/index.vue"),
            },
            //Thông tin tài khoản
            {
                path: "/thong_tin_tai_khoan",
                name: "userInfo",
                component: () => import("../pages/user/userInfo.vue"),
            },
        ]
    }
];
export default client;
