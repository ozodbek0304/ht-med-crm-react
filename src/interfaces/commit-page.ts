export interface CommentType {
  id: number;
  text: string;
  audio: string;
  video: string;
  seller: {
    id: number;
    image: string;
    full_name: string;
  };
  customer: {
    id: number;
    name: string;
    location:string
  };
  created_at: string;
}

export interface CreateItemComment {
  text: string;
  id: number;
}

export interface ItemComment {
  count: number;
  next: string;
  previous: string;
  results: CommentType[];
}
