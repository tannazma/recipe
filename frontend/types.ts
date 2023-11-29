export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
}
export interface Category{
  id: number;
  name: string;
  img_url: string;
}
