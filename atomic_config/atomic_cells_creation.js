// Import the console.log function
const log = console.log;

// Define an array of principal quantum numbers (n values)
let n_values = [1, 2, 3, 4, 5, 6, 7];

// Define an array of sublevel names
let sublevel_names = ["s", "p", "d", "f"];

// Create an array to store cells data
let cells = [];

// Function to generate spin information for a given ml_number
let generate_spin = (ml_number) => {
  let spins = {};

  // Function to generate a range of ml numbers with spin values
  const ml_index = () => {
    function generate_number_range(number) {
      const result = [];
      for (let i = -number; i <= number; i++) {
        result.push([i, [-0.5, 0.5]]);
      }
      return result;
    }

    return generate_number_range(ml_number);
  };

  // Loop to generate spin information for ml_index
  for (let i = 0; i < 8; i++) {
    if (i > ml_number) {
      continue;
    }
    Object.assign(spins, { ml_index: ml_index() });
  }

  return spins;
};

// Loop through n values
for (let i = 0; i < n_values.length; i++) {
  let qn_n = n_values[i];
  for (let qn_s = 0; qn_s < Math.min(4, qn_n); qn_s++) {
    // Create a cell object with sublevel information
    let cell = {
      sublevel_id: cells.length + 1,
      qn_n: qn_n,
      qn_s: qn_s,
      qn_s_name: sublevel_names[qn_s],
      ml_number: 2 * qn_s + 1,
      spins: generate_spin(2 * qn_s + 1),
    };
    cells.push(cell);
  }
}

// Sort cells based on sublevel_id
let cells_ordered = cells.sort((a, b) => a.sublevel_id - b.sublevel_id);

// Create a formatted data object
let formattedData = {
  n_values: n_values,
  sublevel_names: sublevel_names,
  cells_ordered: cells_ordered,
};

// Log the formatted data with 2-space indentation
// log(JSON.stringify(formattedData, null, 2));

const fs = require("node:fs");

const dataa = JSON.stringify(formattedData, null, 2);

// fs.writeFileSync("./f.json", dataa);
