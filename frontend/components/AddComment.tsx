import React, { ChangeEvent, FormEvent, useState } from "react";

interface recipeIdProp {
  recipeId: number;
}
export const AddComment = ({ recipeId }: recipeIdProp) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    setSubmitted(true);

    const nameFromComment = event.currentTarget.nameField.value;
    const ratingFromComment = event.currentTarget.rating.value;
    const reviewFromComment = event.currentTarget.review.value;

    const postResponse = await fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromComment,
        rating: ratingFromComment,
        review: reviewFromComment,
        recipeId: recipeId,
      }),
    });
    const postData = await postResponse.json();
    console.log(postData);
    console.log("we sent the post");
  };
  return (
    <div>
      <form
        className="add-comment"
        onSubmit={() => {
          submitComment;
        }}
      >
        <h1>Add Comment</h1>
        <label>
          {" "}
          Name
          <input
            id="nameField"
            type="text"
            name="name"
            onChange={() => {
              handleNameInput;
            }}
          ></input>
        </label>
        <label>
          {" "}
          Review
          <input
            id="review"
            type="text"
            name="review"
            onChange={() => {
              handleNameInput;
            }}
          ></input>
        </label>
        <label>
          {" "}
          Rating
          <input
            id="rating"
            type="text"
            name="rating"
            onChange={() => {
              handleNameInput;
            }}
          ></input>
        </label>
        <button type="submit">Save</button>
      </form>
      {submitted && <p>Thanks for submitted comment.</p>}
    </div>
  );
};
export default AddComment;
