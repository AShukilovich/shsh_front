import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

// middleware
import middlewarePipeline from './middlewarePipeline';
import auth from '@/middleware/auth';
import guest from '@/middleware/guest';
import accountRoutes from "@/routes/account";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '',
            name: 'home',
            redirect: { name: 'rent' },
        },
        {
            path: '/rent',
            name: 'rent',
            component: () => import('../pages/Rent/Index'),
            redirect: { name: 'rent.categories' },
            children: [
                {
                    path: '',
                    name: 'rent.categories',
                    component: () => import('../pages/Rent/RentCategories'),
                },
                {
                    path: ':categoryId',
                    name: 'rent.category',
                    component: () => import('../pages/Rent/Category/Index'),
                    redirect: { name: 'rent.category.products' },
                    children: [
                        {
                            path: '',
                            name: 'rent.category.products',
                            component: () => import('../pages/Rent/Category/RentCategory'),
                        },
                        {
                            path: ':productId',
                            name: 'rent.category.product',
                            component: () => import('../pages/Rent/Category/RentProduct'),
                        },
                    ],
                },
            ],
        },
        {
            path: '/signin',
            name: 'signin',
            component: () => import('../pages/Signin'),
            meta: {
                middleware: [guest]
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../pages/Signup'),
            meta: {
                middleware: [guest]
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../pages/Cart'),
            meta: {
                middleware: [auth]
            }
        },
        {
            path: '/events',
            name: 'events',
            component: () => import('../pages/Events'),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('../pages/Order'),
        },
        {
            path: '/qrcode-scan',
            name: 'qrcode-scan',
            component: () => import('../pages/QrcodeScan'),
        },
        accountRoutes,
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware;
    const context = {to, from, next, store};
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });
})

export default router;