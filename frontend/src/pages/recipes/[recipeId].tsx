import { useEffect, useState } from "react";
import { Category, User, Comment } from "../../../types";
import { useRouter } from "next/router";
import AddComment from "../../../components/AddComment";
import NavigationBar from "../../../components/NavigationBar";
import Header from "../../../components/Header";

const RecipeDetailPage = () => {
  const router = useRouter();
  const idFromUrl = Number(router.query.recipeId);
  console.log(idFromUrl);

  const [getRecipe, setRecipe] = useState<Recipe | null>(null);

  interface Recipe {
    id: number;
    name: string;
    category: Category[];
    img_url: string;
    instructions: string;
    ingredients: string;
    prep_time: number;
    serves: number;
    user: User[];
    comment: Comment[];
  }

  useEffect(() => {
    if (isNaN(idFromUrl)) {
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

  if (isNaN(idFromUrl)) {
    return <div>recipe not found</div>;
  }

  return (
    <>
      <NavigationBar />
      <Header
        src="/recipe.png"
        alt="Background3"
        width={1920}
        height={877.28}
        className="background3"
      />
      <div>
        {getRecipe !== null ? (
          <div>
            <h1>{getRecipe.name}</h1>
            <img src={getRecipe.img_url} />
            <p>Ingredients: {getRecipe.ingredients}</p>
            <p>Instructions: {getRecipe.instructions}</p>
            <div>
              Category:
              {getRecipe.category &&
                getRecipe.category.map((category) => (
                  <p key={category.id}>{category.name}</p>
                ))}
            </div>
            <div>
              <p>Comment rating: </p>
              {getRecipe.comment &&
                getRecipe.comment.map((comment) => (
                  <span key={comment.id}>{comment.rating}</span>
                ))}
            </div>
            <div>
              <p>Comment message: </p>
              {getRecipe.comment &&
                getRecipe.comment.map((comment) => (
                  <span key={comment.id}>{comment.message}</span>
                ))}
            </div>
          </div>
        ) : (
          <div>Url not found...</div>
        )}
        <AddComment recipeId={idFromUrl} />
      </div>
    </>
  );
};
export default RecipeDetailPage;
