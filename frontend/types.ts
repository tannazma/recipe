export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
  img_url: string;
  instructions: string;
  ingredients: string;
  comment: Comment[];
  category: Category[];
  user: User[];
}
export interface Category {
  id: number;
  name: string;
  img_url: string;
  recipes: Recipe[];
}
export interface Comment {
  id: number;
  recipeId: number;
  rating: number;
  name: string;
  message: string;
  created_at: string;
}
export interface User {
  id: number;
  username: string;
  password: string;
  recipeId: number;
}

export type Categories = "All" | "Dessert" | "Dinner" | "Lunch" | "Breakfast";
