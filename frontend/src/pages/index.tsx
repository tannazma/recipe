import { useEffect, useState } from "react";
import { Categories, Recipe } from "../../types";

const RecipesList = () => {
  const [getRecipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Categories>("All");

  const filteredRecipes = getRecipes.filter((recipe) => {
    return (
      selectedCategory === "All" ||
      recipe.categories?.some((category) => {
        // console.log(category.name, selectedCategory);
        return category.name === selectedCategory;
      })
    );
  });

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
      <h1>Here is all the recipes</h1>
      {filteredRecipes.map((recipe) => (
        <li key={recipe.id}>
          Name: {recipe.name}
          <div>Prep time: {recipe.prep_time}</div>
          <div>Category: {selectedCategory}</div>
        </li>
      ))}
      <button onClick={() => setSelectedCategory("All")}>All</button>
      <button onClick={() => setSelectedCategory("Breakfast")}>
        Breakfast
      </button>
      <button onClick={() => setSelectedCategory("Lunch")}>Lunch</button>
      <button onClick={() => setSelectedCategory("Dinner")}>Dinner</button>
      <button onClick={() => setSelectedCategory("Dessert")}>Dessert</button>
    </>
  );
};

export default RecipesList;
