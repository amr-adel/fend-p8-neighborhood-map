import React from "react";
import icons from "./images/icons.svg";

const Icon = ({ name }) => {
  return (
    <svg>
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
};

export default Icon;
