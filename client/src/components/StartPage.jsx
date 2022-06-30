import React from "react";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div id="startPage">
      <h1 id="startPageTop">
        “ Memories are timeless treasures of the Heart ”
      </h1>
      <hr />
      <h1 id="startPageHeading">
        Share your memories and relive the special moments...
      </h1>
      <Link to="/login" id="getStartedLink">
        Get Started
      </Link>
    </div>
  );
}

export default StartPage;
