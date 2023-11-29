import React from "react";

interface selectedCategoriesProps {
  setSelectedCategory: Function;
}

const SideBar = ({ setSelectedCategory }: selectedCategoriesProps) => {
  return (
    <div className="sidebar">
      <h2> Recipes</h2>
      <button onClick={() => setSelectedCategory("All")}>
        {" "}
        <span>🍴 </span>All
      </button>
      <button onClick={() => setSelectedCategory("Breakfast")}>
        {" "}
        <span>🍳</span> Breakfast
      </button>
      <button onClick={() => setSelectedCategory("Lunch")}>
        {" "}
        <span> 🥯 </span>Lunch
      </button>
      <button onClick={() => setSelectedCategory("Dinner")}>
        {" "}
        <span>🥘</span> Dinner
      </button>
      <button onClick={() => setSelectedCategory("Dessert")}>
        {" "}
        <span>🧁</span>
        Dessert
      </button>
    </div>
  );
};
export default SideBar;
