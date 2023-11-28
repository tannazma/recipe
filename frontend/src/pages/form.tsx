import { FormEvent } from "react";

const CreateForm = () => {
  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postResponse = await fetch("http://127.0.0.1:3001/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body:{

      // },
    });

    const postData = await postResponse.json();
    console.log(postData);
    console.log("We send the POST");
  };
  
  return (
    <>
      <div>
        <h1>Create Form</h1>
        <form onSubmit={handleForm}>
          <label>
            {"Recipe Name: "}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default CreateForm;
