import BoardListView from "@/components/board/BoardListView.vue";
import HeaderMain from "@/components/common/HeaderMain.vue";
import MainView from "@/components/main/MainView.vue";
import MapView from "@/components/map/MapView.vue";
import SigninView from "@/components/member/SigninView.vue";
import SignupView from "@/components/member/SignupView.vue";
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
        }
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
