import React from "react";

const GithubProfile = ({ commit }) => (
  <div className="user v-container v-centered centered">
    <h3>{commit.author}</h3>
    <a href={commit.user_html_url}>
      <img className="avatar" src={commit.author_avatar} />
    </a>
  </div>
);

export default GithubProfile;
