import auth from "@/middleware/auth";

const accountRoutes = {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account/Index'),
    redirect: { name: 'account.settings' },
    meta: {
        middleware: [auth]
    },
    children: [
        {
            path: '',
            name: 'account.settings',
            component: () => import('../pages/Account/Settings'),
            meta: {
                title: 'Настройки',
                forRoles: ['ROLE_CLIENT', 'ROLE_DISTRIBUTOR']
            }
        },
        {
            path: 'points',
            name: 'account.points',
            component: () => import('../pages/Account/Points/PointsIndex'),
            meta: {
                title: 'Точки аренды',
                forRoles: ['ROLE_DISTRIBUTOR']
            },
            redirect: { name: 'account.points.list' },
            children: [
                {
                    path: '',
                    name: 'account.points.list',
                    component: () => import('../pages/Account/Points/PointsList'),
                },
                {
                    path: 'detail',
                    name: 'account.points.detail',
                    component: () => import('../pages/Account/Points/PointsDetail'),
                }
            ]
        }
    ],
};

export default accountRoutes;