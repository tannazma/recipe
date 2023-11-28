export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  serves: number;
  userId: number;
}
export type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";
