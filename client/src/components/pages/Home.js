import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div
          class="row"
          style={{
            paddingTop: "40vh",

            margin: "auto",
          }}
        >
          <div class="input-field col s6 ">
            <label
              class="active"
              style={{ fontSize: "1.5rem" }}
              htmlFor="search"
            >
              search for a job
            </label>
            <input value="" id="first_name2" type="text" class="validate " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
