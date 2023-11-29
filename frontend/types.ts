export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
  categories: Category[]
}
export interface Category {
  id: number;
  name: string;
  img_url: string;
}

export type Categories = "All" | "Dessert" | "Dinner" | "Lunch" | "Breakfast";
