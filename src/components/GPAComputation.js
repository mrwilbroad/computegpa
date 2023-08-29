const GPAComputation = (score, weight) => {
  var point = Number(0);
  switch (Grade(score)) {
    case "A":
      point = 0.02 * Number(score) + 3;
      break;
    case "B+":
      point = 0.04 * Number(score) + 1.6;
      break;
    case "B":
      point = 0.1 * Number(score) - 2;
      break;
    case "C":
      point = 0.1 * Number(score) - 2;
      break;
    case "D":
      point = 0.2 * Number(score) - 6;
      break;
    case "E":
      point = (1 / 35) * Number(score);
      break;
    default:
      point = 0;
  }
  point = point * Number(weight);
  return point;
};

const Grade = (score) => {
  try {
    score = Number(score);
    if (score >= 70 && score <= 100) {
      return "A";
    } else if (score >= 60 && score <= 69.9) {
      return "B+";
    } else if (score >= 50 && score <= 59.9) {
      return "B";
    } else if (score >= 40 && score <= 49.9) {
      return "C";
    } else if (score >= 35 && score <= 39.9) {
      return "D";
    } else if (score >= 0 && score <= 34.9) {
      return "E";
    } else {
      return "E";
    }
  } catch (error) {
    return "E";
  }
};

export default GPAComputation;
