import React, { useEffect, useState } from "react";
import { Recipe } from "../types";

interface RecipeProp {
  recipe: Recipe;
}

const RecipeCardTwo = ({ recipe }: RecipeProp) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:3001/comments?recipeId=${recipe.id}`
      );
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [recipe.id]);

  let averageRating = 0;

  if (comments && Array.isArray(comments) && comments.length > 0) {
    let totalRating = 0;
    for (let i = 0; i < comments.length; i++) {
      totalRating += comments[i].rating;
    }
    averageRating = totalRating / comments.length;
  }

  return (
    <div key={recipe.id} className="recipe-card">
      <img
        src={
          recipe.img_url ||
          "https://joyfoodsunshine.com/wp-content/uploads/2022/06/chicken-kebabs-recipe-1.jpg"
        }
        className="recipe-image"
      />
      <div className="recipe-name">{recipe.name}</div>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((num) => (
          <span key={num} className="star-btn">
            {num <= averageRating ? "★" : "☆"}
          </span>
        ))}
      </div>
    </div>
  );
};
export default RecipeCardTwo;
