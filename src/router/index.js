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
  
    children: [
      {
        path: '/home',//默认子路由,只能有一个
        name:'home',
        component: () => import('@/views/Home'),
        
      },
      {
        path: '/qa',
        name:'qa',
        component: () => import('@/views/Qa'),
    
      },
      {
        path: '/video',
        name:'video',
        component: () => import('@/views/Video'),
      
      },
      {
        path: '/my',
        name:'my',
        component: () => import('@/views/My'),
        
      },
    ]
  },
  {
    path: '/search',
    name:'search',
    component: () => import('@/views/Search'),
  },
  {
    path: '/article/:articleId',//动态路由
    name:'article',
    component: () => import('@/views/Article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法,开启props传参
     props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
