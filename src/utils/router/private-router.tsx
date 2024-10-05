import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urls } from "./urls";
import { useAuth } from "@/store";

interface AppProps {
    children: React.ReactNode
}

export function PrivateRouter({ children }: AppProps) {
    const location = useLocation();
    const { user } = useAuth()


    useEffect(() => {
        if (!user?.access && location.pathname !== urls.LOGIN) {
            window.location.replace('/login')
        }
        else if (user?.access && (location.pathname === urls.LOGIN || location.pathname === '/')) {
            window.location.replace('/dashboard')
        }
    }, [location.pathname, user?.access]);

    return <>{children}</>;
}