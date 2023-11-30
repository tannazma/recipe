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
    console.log(event);
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
        rating: Number(ratingFromComment),
        message: reviewFromComment,
        recipeId: recipeId,
      }),
    });
    const postData = await postResponse.json();
    console.log(postData);
    console.log("we sent the post");
    window.location.reload();
  };
  return (
    <div className="comment-container">
      <h1 className="add-comment-title">Add A Comment</h1>
      <form className="add-comment" onSubmit={submitComment}>
        <div className="name-rating">
        <label className="comment-name">
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
        <label className="comment-rating">
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
        </div>
        <label className="comment-review">
          {" "}
          Review
          <textarea
            id="review"
            name="review"
            rows={5}
            onChange={() => {
              handleNameInput;
            }}
          ></textarea>
        </label>

        <button type="submit" className="comment-button">
          Save
        </button>
      </form>
      {submitted && <p>Thanks for submitted comment.</p>}
    </div>
  );
};
export default AddComment;
