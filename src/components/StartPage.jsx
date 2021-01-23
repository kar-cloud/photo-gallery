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
        Share your memories with the world and relive the special moments...
      </h1>
      <Link to="/home" id="getStartedLink">
        Get Started
      </Link>
      {/* <a href="/home">Get Started</a> */}
      {/* didnot used a tag because after clicking on a tag a full
      page refresh happens which does not looks good
      and altrnative for that is <Link> tag which does the 
      same work as a tag but do not refresh the page */}
    </div>
  );
}

export default StartPage;
