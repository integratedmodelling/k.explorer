export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '/explorer', component: () => import('pages/index') },
      { path: '/viewer', component: () => import('pages/index') },
      { path: '/', redirect: '/viewer' }, // , component: () => import('pages/index')
      /* { name: 'test', path: 'test', component: () => import('pages/test') }, */
    ],
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
];
