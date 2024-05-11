import BoardListView from "@/components/board/BoardList.vue";
import HeaderMain from "@/components/common/HeaderMain.vue";
import MainView from "@/components/main/MainView.vue";
import MapView from "@/components/map/MapView.vue";
import SigninView from "@/components/member/SigninView.vue";
import SignupView from "@/components/member/SignupView.vue";
import PlanList from "@/components/plan/PlanList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "header",
      component: HeaderMain,
      children: [
        {
          path: "",
          name: "main",
          component: MainView,
        },
        {
          path: "map",
          name: "map",
          component: MapView,
        },
        {
          path: "signup",
          name: "signup",
          component: SignupView,
        },
        {
          path: "signin",
          name: "signin",
          component: SigninView,
        },
        {
          path: "board",
          name: "board",
          component: BoardListView,
        },
        {
          path: "plan",
          name: "plan",
          redirect: { name: "plan-list" },
          children: [
            {
              path: "list",
              name: "plan-list",
              component: () => import("@/components/plan/PlanList.vue"),
            },
            {
              path: "view/:articleNo",
              name: "plan-view",
              component: () => import("@/components/plan/PlanView.vue"),
            },
          ],
        },
        {
          path: "board",
          name: "board",
          redirect: { name: "article-list" },
          children: [
            {
              path: "list",
              name: "article-list",
              component: () => import("@/components/board/BoardList.vue"),
            },
            {
              path: "write",
              name: "article-write",
              component: () => import("@/components/board/BoardWrite.vue"),
            },
            {
              path: "view/:articleNo",
              name: "article-view",
              component: () => import("@/components/board/BoardDetail.vue"),
            },
            {
              path: "modify/:articleNo",
              name: "article-modify",
              component: () => import("@/components/board/BoardModify.vue"),
            },
          ],
        },
      ],
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
