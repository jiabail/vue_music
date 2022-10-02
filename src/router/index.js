import Vue from "vue";
import VueRouter from 'vue-router';




Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/Login'),
    //配置路由懒加载,@/view/index.vue
  },
  {
    path: '/',
    name: 'layoutIndex',
    redirect: '/home',
    component:()=>import('@/views/Layout'),
    //配置路由懒加载,@/view/index.vue
    children: [
      {
        path: '/home',//默认子路由,只能有一个
        name:'home',
        component: () => import('@/views/Home'),
        //配置路由懒加载,@/view/index.vue
      },
      {
        path: '/qa',
        name:'qa',
        component: () => import('@/views/Qa'),
        //配置路由懒加载,@/view/index.vue
      },
      {
        path: '/video',
        name:'video',
        component: () => import('@/views/Video'),
        //配置路由懒加载,@/view/index.vue
      },
      {
        path: '/my',
        name:'my',
        component: () => import('@/views/My'),
        //配置路由懒加载,@/view/index.vue
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
