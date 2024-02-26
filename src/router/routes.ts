import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter(to, from, next) {
      // next();
      const authUser = localStorage.getItem('user');
      if (authUser === null || String(authUser).includes('null')) {
        next('/Login');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/settings',
        component: () => import('pages/Settings/Settings.vue'),
      },
    ],
  },
  {
    path: '/Login',
    component: () => import('pages/Login/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/Logout',
    component: () => import('pages/Logout/Logout.vue'),
    meta: { requiresAuth: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
