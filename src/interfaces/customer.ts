export interface Result {
    id: string;
    name: string;
    status: boolean;
    phone_number: string;
    location: string;
    image_url: string;
    image: string;
    last_activity: string;
}


export interface Item {
    results: Result[];
    count: number;
}

export interface ResultDetails {
    id: string;
    name: string;
    status: string;
    phone_number: string;
    extra_phone: string;
    location: Result;
    medical: Result
    created_at: string;
    payment_method: Result;
    payment_type: Result;
    products: Result[];
    reactivate_data: string;
    recall_date: string;
    sector: Result;
    seller: Result;
    source: Result;
    telegram_phone: string;
    original_seller: Result;

}


export interface CustomerDetailsSeller {
    sellers: {
        id: string,
        image_url: string,
        full_name: string,
        phone: string,
    }[],
}
