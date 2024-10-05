
export interface CalendarListResult{
    count: number,
    next: string | null,
    previous: string | null,
    results:CalendarItem[]
}
export interface CalendarIsAvailableListResult{
    count: number,
    next: string | null,
    previous: string | null,
    results:CalendarIsAvailableItem[]
}

export interface CalendarIsAvailableItem{
    id: number,
    title: string,
    date:string
}

export interface CalendarItem{
    id: number,
    date: string,
    title: string,
    status: boolean,
    customer: {
        name: string,
        phone_number: string
    },
    seller: {
        id: number,
        image: string,
        full_name:string
    },
    is_approved: boolean,
    created_at:string
}