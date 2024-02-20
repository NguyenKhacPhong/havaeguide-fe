import { advancePositionWithMutation } from "@vue/compiler-core";

const auth = [
    {
        path: "",
        component: () => import("../layouts/auth.vue"),
        children: [
            {
                path: "/dang_nhap",
                name: "login",
                component: () => import("../pages/auth/login.vue"),
            },
            {
                path: "/dang_ky",
                name: "register",
                component: () => import("../pages/auth/register.vue"),
            }
        ]
    }
];
export default auth;
