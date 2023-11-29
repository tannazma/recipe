export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
  img_url: string;
  rating: comment[];
  categories: Category[];
}
export interface Category {
  id: number;
  name: string;
  img_url: string;
}
export interface comment {
  rating: number;
}

export type Categories = "All" | "Dessert" | "Dinner" | "Lunch" | "Breakfast";
