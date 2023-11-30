import { useEffect, useState } from "react";
import { Category, User, Comment } from "../../../types";
import { useRouter } from "next/router";
import AddComment from "../../../components/AddComment";
import NavigationBar from "../../../components/NavigationBar";
import Header from "../../../components/Header";
import CommentComponent from "../../../components/Comment";

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
      <div className="recipe-container">
        {getRecipe !== null ? (
          <div className="recipe-wrapper">
            <div className="recipe-title-image-rating-category-rating">
              <h1 className="recipe-h1">{getRecipe.name}</h1>
              {/* <img src={getRecipe.img_url} className="recipe-image" /> */}
              <div className="recipe-category">
                {getRecipe.category &&
                  getRecipe.category.map((category) => (
                    <h2 key={category.id} className="recipe-h2">
                      {category.name}
                    </h2>
                  ))}
              </div>
              <div className="recipe-comment">
                {/* {getRecipe.comment && */}
                {/* getRecipe.comment.map((comment) => ( */}
                {/* <p key={comment.id}> */}
                <span className="star-btn2">★</span>
                <span className="star-btn2">★</span>
                <span className="star-btn2">★</span>
                <span className="star-btn2">★</span>
                {/* {comment.rating} */}
                {/* </p> */}
                {/* ))} */}
              </div>
            </div>
            <div className="recipe-details">
              <div>
                <h2>{getRecipe.name}</h2>
              </div>
              <div>
                <div>Serves {getRecipe.serves}</div>
                <div>Prep-time: {getRecipe.prep_time}</div>
              </div>
              <div>Ingredients: {getRecipe.ingredients}</div>
              <div>Instructions: {getRecipe.instructions}</div>
            </div>
            <div className="comment-wrapper">
              <AddComment recipeId={idFromUrl} />
              {getRecipe.comment &&
                getRecipe.comment.map((comment) => (
                  <CommentComponent comment={comment} />
                ))}
            </div>
          </div>
        ) : (
          <div>Url not found...</div>
        )}
      </div>
    </>
  );
};
export default RecipeDetailPage;
