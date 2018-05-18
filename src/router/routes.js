export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'standalone', path: 'explorer', component: () => import('pages/index') },
      { name: 'ide', path: 'eclipse', component: () => import('pages/index') },
      { path: '', redirect: 'eclipse', component: () => import('pages/index') },
      { name: 'test', path: 'test', component: () => import('pages/test') },
    ],
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
];
