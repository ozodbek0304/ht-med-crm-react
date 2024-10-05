
export interface NotificationSellerType {
    phone: string,
    full_name: string,
    image: string | null,
    created_at: string
}

export interface NotificationItem {
    title: string;
    text: string;
    seller: NotificationSellerType,
    is_read: boolean,
    link: string
}

export interface NotificationsResult {
    count: 1,
    next: number | null,
    previous: number | null,
    results: NotificationItem[]
}
