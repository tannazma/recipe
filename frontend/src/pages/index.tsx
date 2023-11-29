import { useEffect, useState } from "react";
import { Categories, Recipe } from "../../types";
import NavigationBar from "../../components/NavigationBar";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";

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
      <NavigationBar />
      <Header
        src="/bg-1.png"
        alt="Background1"
        width={1920}
        height={877.28}
        className="background1"
      />
      <div className="main">
        <h1 className="home">Home Chef Recipes</h1>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Breakfast")}>
          Breakfast
        </button>
        <button onClick={() => setSelectedCategory("Lunch")}>Lunch</button>
        <button onClick={() => setSelectedCategory("Dinner")}>Dinner</button>
        <button onClick={() => setSelectedCategory("Dessert")}>Dessert</button>
      </div>
    </>
  );
};

export default RecipesList;
