export interface SellerResults {
  id: number;
  phone: string;
  full_name: string;
  image: string;
  seller_coins: {
    action: string,
    coins: number,
  }[];
}

export interface SellerDetailsItem {
  address: string;
  full_name: string;
  id: number,
  image_url: string | undefined;
  location_type: string;
  page_permissions: [];
  passport_img: string | undefined;
  password: string
  percentage: number;
  personal_phone: string;
  pinfl: string;
  registered_address: string | undefined;
  status: string;
  phone: string;
}

export interface CreateItem {
  phone: string;
  password: string;
  full_name: string;
  address?: string;
  registered_address?: string;
  pinfl?: string;
  personal_phone: string;
  passport_img?: string;
  image?: string;
  page_permission?: string;
}
export interface UpdateItem {
  phone: string;
  password?: string;
  full_name: string;
  address?: string;
  registered_address?: string;
  pinfl?: string;
  personal_phone: string;
  passport_img?: string;
  image?: string;
}

export interface ItemType {
  results: SellerResults[];
  count: number;
}

export interface SellerRequestsItem {
  id: number,
  seller: {
    id: number,
    image: string,
    full_name: string
  },
  text: string,
  type: string,
  created_at: string,
  status: string
}

export interface SellerRequestsResult {
  count: number,
  next?: string | null,
  previous?: string | null,
  results?: SellerRequestsItem[]
}