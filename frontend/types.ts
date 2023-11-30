export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
  img_url: string;
  rating: Comment[];
  categories: Category[];
}
export interface Category {
  id: number;
  name: string;
  img_url: string;
}
export interface Comment {
  id: number;
  recipeId: number;
  rating: number;
  name: string;
  message: string;
  created_at: string;
}

export type Categories = "All" | "Dessert" | "Dinner" | "Lunch" | "Breakfast";
