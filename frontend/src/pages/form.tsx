import { FormEvent, useEffect, useState } from "react";
import { Category } from "../../types";
import Header from "../../components/header";
import NavigationBar from "../../components/navigation";

const Form = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [preptime, setPreptime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [serves, setServes] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/categories");
      const data = await response.json();
      console.log(data);
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    if (selectedCategories.some((category) => category.id === categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category.id !== categoryId)
      );
    } else {
      const category = categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const resetForm = () => {
    setSelectedCategories([]);
    setRecipeName("");
    setPreptime("");
    setInstructions("");
    setIngredients("");
    setServes("");
    setImageUrl("");
  };

  const handleCancel = () => {
    setSelectedCategories([]);
    resetForm();
  };

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    const nameFromForm = event.currentTarget.recipeName.value;
    const instructionFromForm = event.currentTarget.instructions.value;
    const preptimeFromForm = event.currentTarget.prep_time.value;
    const ingredientsFromForm = event.currentTarget.ingredients.value;
    const servesFromForm = event.currentTarget.serves.value;
    const imageUrlFromForm = event.currentTarget.img_url.value;

    const postResponse = await fetch("http://127.0.0.1:3001/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromForm,
        instructions: instructionFromForm,
        prep_time: Number(preptimeFromForm),
        serves: Number(servesFromForm),
        img_url: imageUrlFromForm,
        ingredients: ingredientsFromForm,
        categories: selectedCategories,
      }),
    });

    const postData = await postResponse.json();
    console.log(postData);
    console.log("We send the POST");
    resetForm();
  };

  return (
    <>
      <div className="navigation">
        <NavigationBar />
      </div>
      <Header />
      <div className="form-container">
        <h1 className="newRecipeTitle">Add New Recipe</h1>
        <form className="my-form" onSubmit={handleForm}>
          <label>
            {"Recipe Name "}
            <input
              id="recipeName"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setRecipeName(e.target.value)}
              value={recipeName}
            />
          </label>
          <label>
            {"Instructions "}
            <input
              type="text"
              id="instructions"
              name="instructions"
              onChange={(e) => setInstructions(e.target.value)}
              value={instructions}
            />
          </label>
          <label>
            {"Ingredients"}
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              onChange={(e) => setIngredients(e.target.value)}
              value={ingredients}
            />
          </label>
          <div className="preptime-serves">
            <label>
              {"Prep time "}
              <input
                type="number"
                id="prep_time"
                name="prep time"
                onChange={(e) => setPreptime(e.target.value)}
                value={preptime}
              />
            </label>
            <label>
              {"Serves"}
              <input
                type="number"
                id="serves"
                name="serves"
                onChange={(e) => setServes(e.target.value)}
                value={serves}
              />
            </label>
          </div>
          <label>
            {"Image Url"}
            <input
              type="file"
              id="img_url"
              name="image url"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </label>
          <label className="category">Categories:</label>
          <div className="categoriesLable">
            {categories.map((category: Category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  value={category.id}
                  onChange={handleCategoryChange}
                />
                {category.name}
              </label>
            ))}
          </div>
          <div className="botton-container">
            <button type="submit" className="save">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="cancel">
              Cancel
            </button>
          </div>
        </form>
        {submitted && <p>Thanks for submitting!</p>}
      </div>
    </>
  );
};
export default Form;
