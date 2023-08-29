import React from "react";

const compute_emoji = (gpa) => {
  gpa = Number(gpa);
  if (gpa >= 4) {
    return <small>&#128514;</small>;
  } else if (gpa >= 3.0 && gpa < 3.9) {
    return <small>&#128515;</small>;
  } else if (gpa >= 2.0 && gpa < 2.9) {
    return <small>&#128526;</small>;
  } else if (gpa <= 1.9) {
    return <small>&#128557;</small>;
  }
};

export default compute_emoji;
