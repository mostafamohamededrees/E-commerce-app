import React from "react";

const truncateText = (str: string) => {
  return str.length > 25 ? str.substring(0, 25) + "..." : str;
};

export default truncateText;
