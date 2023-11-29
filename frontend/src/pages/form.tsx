import { FormEvent, useState } from "react";

const Form = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

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
      }),
    });

    const postData = await postResponse.json();
    console.log(postData);
    console.log("We send the POST");
  };

  return (
    <>
      <div>
        <h1>Add New Recipe</h1>
        <form className="my-form" onSubmit={handleForm}>
          <label>
            {"Recipe Name "}
            <input
              id="recipeName"
              name="name"
              placeholder="Enter your name"
            />
          </label>
          <label>
            {"Instructions "}
            <input type="text" id="instructions" name="instructions" />
          </label>
          <label>
            {"Ingredients"}
            <input type="text" id="ingredients" name="ingredients" />
          </label>
          <label>
            {"Prep time "}
            <input type="number" id="prep_time" name="prep time" />
          </label>
          <label>
            {"Serves"}
            <input type="number" id="serves" name="serves" />
          </label>
          <label>
            {"Image Url"}
            <input type="file" id="img_url" name="image url" />
          </label>
          <button type="submit">Submit</button>
        </form>
        {submitted && <p>Thanks for submitting!</p>}
      </div>
    </>
  );
};
export default Form;