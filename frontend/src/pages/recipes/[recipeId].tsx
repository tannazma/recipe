import { useEffect, useState } from "react";
import { Recipe } from "../../../types";
import { useRouter } from "next/router";

const RecipeDetailPAge = () => {
  const router = useRouter();
  const idFromUrl = router.query.recipeId;
  console.log(idFromUrl);

  const [getRecipe, setRecipe] = useState<Recipe | null>(null);

  interface Recipe {
    id: number;
    name: string;
    prep_time: number;
    serves: number;
    userId: number;
  }

  useEffect(() => {
    if (idFromUrl === undefined) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/recipes/${idFromUrl}`
      );
      const data = await response.json();
      console.log(data);
      setRecipe(data);
    };
    fetchData();
  }, [idFromUrl]);
  return (
    <>
      <div>
        <h1>Here is a detail recipe page</h1>
        <p>You are in url: {idFromUrl}</p>
        {getRecipe !== null ? (
          <div>
            <h2>{getRecipe.name}</h2>
          </div>
        ) : (
          <div>Url not found...</div>
        )}
      </div>
    </>
  );
};
export default RecipeDetailPAge;
