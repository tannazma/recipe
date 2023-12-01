import { useEffect, useState } from "react";
import { Recipe } from "../../types";

const Dashboard = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      // Retrieve the JWT token from localStorage and set it in the component's state
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return;
      } else {
        console.log(storedToken);
        const response = await fetch(`http://localhost:3001/recipes/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        ))}
    </div>
  );
};
export default Dashboard;
