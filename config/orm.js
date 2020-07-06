// Import MySQL connection.
const connection = require("./connection.js");

// Helper function for SQL syntax.
function printBurgerInput(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {

    // 'ob' is an object with 'burger' as property and the value is an array with individual rows, each with 'id', 'name', and 'ifEaten'
    
  let arr = [];

  console.log(ob);
  
  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {

      // 'key' is SQL syntax
      
    let value = ob[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {

      // if string with spaces, add quotations (Cheese Burger => 'Cheese Burger')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {

        value = "'" + value + "'";
      }
      // e.g. {name: 'Cheese Burger'} => ["name='Cheese Burger'"]
      // e.g. {sleepy: true} => ["sleepy=true"]

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {
  all(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printBurgerInput(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // An example of objColVals would be {name: panther, sleepy: true}
  update(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  delete(table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
