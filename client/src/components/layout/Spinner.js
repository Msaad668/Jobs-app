import React from "react";

const Spinner = () => {
  return (
    <div class="text-center my-4">
      <div
        class="spinner-border"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
