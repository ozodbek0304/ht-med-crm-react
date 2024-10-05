export interface SellerDashboardCounts {
    id: number;
    active_customers_count: number;
    in_base_customers_count: number;
    in_progress_customers_count: number;
}



export interface SellerDashboardItem {
    id: number;
    date: string;
    title: string;
    sttaus: string;
    customer: {
        name: string,
        phone_number:string
    };
    seller: {
        id: number;
        full_name: string;
        image: string;
    };
    is_approved: boolean;
    created_at: string;
}

export interface SellerDashboardCalendar {
    results: SellerDashboardItem[];
    count: number;
}