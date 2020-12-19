const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const test = (dice, rolls) => {
  const results = {};
  for (let i = 1; i <= rolls + 1; i += 1) {
    const result = getRandomIntInclusive(1, dice);
    results[result] = (results[result] || 0) + 1;
  }

  const resultsArray = Object.values(results);

  const max = Math.max(...resultsArray);
  const avg = resultsArray.reduce((a, b) => a + b, 0) / resultsArray.length;

  const log = Object.entries(results).reduce((acc, [key, rolls]) => {
    const devianceFromMax = (max - rolls) / max;
    const devianceFromAvg = (avg - rolls) / avg;

    return { ...acc, [+key]: { rolls, devianceFromMax, devianceFromAvg } };
  }, {});

  console.log(log);
};

test(20, 1000000000);
