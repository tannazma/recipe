import { useEffect, useState } from "react";
import { Categories, Recipe } from "../../types";
import NavigationBar from "../../components/NavigationBar";
import Header from "../../components/Header";
import RecipeCardTwo from "../../components/RecipeCardTwo";
import SideBar from "../../components/SideBar";
import Link from "next/link";

const RecipesList = () => {
  const [getRecipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Categories>("All");

  const filteredRecipes = getRecipes.filter((recipe) => {
    return (
      selectedCategory === "All" ||
      recipe.category?.some((category) => {
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
        <div className="sidebar-container">
          <SideBar setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="recipe-list">
          {filteredRecipes.reverse().map((recipe) => (
            <Link href={`/recipes/${recipe.id}`}>
              <RecipeCardTwo key={recipe.id} recipe={recipe} />
            </Link>
          ))}
        </div>
        <Link href="/recipes">
          <div className="add-new-recipe">
            <Header
              src="/new-recipe.png"
              alt="Background5"
              width={1920}
              height={877.28}
              className="background5"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default RecipesList;
