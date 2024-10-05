// import Dashboard from "@/pages/dashboard";
import Dashboard from '@/pages/dashboard/page';
import { PrivateRouter } from './private-router';
import { urls } from './urls';
import SellerPage from '@/pages/seller/page';
import Customers from '@/pages/customers/page';
import MyRequests from '@/pages/my-requests/page';
import CalendarPage from '@/pages/calendar/page';
import MapPage from '@/pages/map/page';
import CustomerInformation from '@/pages/customer-details/page';
import SellerPageDetails from '@/pages/seller-details/page';
import SettingsPage from '@/pages/settings/page';
import ErrorPage from '@/pages/error-page/404/page';
import Notfications from '@/pages/notifications/page';
import AddCustomer from '@/pages/add-customer/page';
import LoginPage from '@/pages/auth/page';


const privateRoutes: any = [
    {
        path: urls.INDEX,
        element: <Dashboard />,
    },
    {
        path: urls.LOGIN,
        element: <LoginPage />,
    },
    {
        path: urls.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: urls.SELLER,
        element: <SellerPage />,
    },
    {
        path: urls.CUSTOMERS,
        element: <Customers />,
    },
    {
        path: urls.REQUSET,
        element: <MyRequests />,
    },
    {
        path: urls.MY_REQUESTS,
        element: <MyRequests />,
    },
    {
        path: urls.CALENDAR,
        element: <CalendarPage />,
    },
    {
        path: urls.MAP,
        element: <MapPage />,
    },
    {
        path: urls.CUSTOMER_DETAILS,
        element: <CustomerInformation />,
    },
    {
        path: urls.SELLER_DETAILS,
        element: <SellerPageDetails />,
    },
    {
        path: urls.SETTINGS,
        element: <SettingsPage />,
    },
    {
        path: urls.NOTIFICATIONS,
        element: <Notfications />,
    },
    {
        path: urls.ADD_CUSTOMER,
        element: <AddCustomer />,
    },

    {
        path: "*",
        element: <ErrorPage />,
    },

].map((item) => ({
    path: item.path,
    element: <PrivateRouter>{item.element} </PrivateRouter>,
}));

export const router: any = [
    ...[
        {
            path: urls.LOGIN,
            element: (
                <PrivateRouter>
                    <LoginPage />
                </PrivateRouter>
            ),
        },
    ],
    ...privateRoutes,
];
