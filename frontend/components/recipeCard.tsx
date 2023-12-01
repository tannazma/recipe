import React from "react";
import { Recipe } from "../types";

interface RecipeProp {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeProp) => {
  return (
    <div key={recipe.id} className="recipe-card">
      <img src={recipe.img_url || 'https://placehold.co/310x320/'} className="recipe-image" />
      <div className="recipe-name">{recipe.name}</div>
      <div className="rating">rating</div>
    </div>
  );
};
export default RecipeCard;
