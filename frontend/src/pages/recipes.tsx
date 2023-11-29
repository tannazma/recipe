import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import NavigationBar from "../../components/NavigationBar";

const RecipesList = () => {
  const [getRecipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/recipes");
      const data = await response.json();
      console.log(data);
      setRecipes(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <NavigationBar />
      <h1>Here is all the recipes</h1>
      <ul>
        {getRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
};

export default RecipesList;
