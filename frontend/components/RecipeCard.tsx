import React from "react";
import Image from "next/image";
import { Recipe } from "../types";

interface RecipeProp {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeProp) => {
  return (
    <div>
      <div key={recipe.id}>
        Name: {recipe.name}
        <div>Prep time: {recipe.prep_time}</div>
        {/* <div>Category: {selectedCategory}</div> */}
      </div>
    </div>
  );
};
export default RecipeCard;
