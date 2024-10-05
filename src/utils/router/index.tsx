// import Dashboard from "@/pages/dashboard";
import { PrivateRouter } from './private-router';
import { urls } from './urls';


const privateRoutes: any = [
    {
        path: urls.INDEX,
        element: <Dashboard />,
    },
    {
        path: urls.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: urls.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: urls.DRIVERS,
        element: <Drivers />,
    },

    {
        path: urls.ORDERSDRIVERS,
        element: <OrdersDrivers />,
    },
    {
        path: urls.TRAFFICS,
        element: <Traffics />,
    },
    {
        path: urls.SETTINGS,
        element: <Settings />,
    },
    {
        path: urls.CREATE_DRIVER,
        element: <CreateDriver />,
    },
    {
        path: urls.CLIENTS,
        element: <Clients />,
    },
    {
        path: urls.CREATE_ORDER,
        element: <CreateOrder />,
    },
    {
        path: urls.EDIT_DRIVER,
        element: <EditDriver />,
    },
    {
        path: urls.DETAIL_DRIVER,
        element: <DriverDetail />,
    },
    {
        path: "*",
        element: <NotFound />,
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
                    <Login />
                </PrivateRouter>
            ),
        },
    ],
    ...privateRoutes,
];
