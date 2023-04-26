const User = require('../models/User');
const fs = require('fs');

exports.postUserUpload = async (req, res) => {
  try {
    const data = fs.readFileSync('sample_data.json', 'utf-8');
    const userData = JSON.parse(data);
    userData.forEach((user) => {
      user.income = user.income.replace(/\$/g, '');
    });
    await User.create(userData);
    return res.json({
      message: 'data uploaded sucessfully',
    });
  } catch (error) {
    console.log(error);
    res.json('Data upload failed');
  }
};

//Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.

exports.getUserWithCar = async (req, res) => {
  try {
    const data = await User.find({
      income: { $lt: 5 },
      car: { $in: ['BMW', 'Mercedes-Benz'] },
    });
    return res.json({
      message: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: 'data not fetched',
    });
  }
};

// Male Users which have phone price greater than 10,000.

exports.getMaleUserPrice = async (req, res) => {
  try {
    const data = await User.find({
      gender: 'Male',
      phone_price: { $gt: '10000' },
    });
    return res.json({
      message: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: 'data not fetched',
    });
  }
};

//3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.

exports.getMQ = async (req, res) => {
  try {
    const data = await User.find({
      last_name: { $regex: /^M/ },
      $expr: {
        $gt: [
          { $strLenCP: '$email' },
          { $add: [{ $strLenCP: '$last_name' }, 2] },
        ],
      },
    });
    return res.json({
      message: data,
    });
  } catch (error) {
    // console.log(error);
    return res.json({
      message: 'data not fetched',
    });
  }
};

//4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.

exports.getCarAndEmail = async (req, res) => {
  console.log(User);
  try {
    const data = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $not: { $regex: /\d/ } },
    });
    return res.json({
      message: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Data not fetched',
    });
  }
};

//5. Show the data of top 10 cities which have the highest number of users and their average income.

exports.getCities = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 },
          income: { $avg: '$income' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    return res.json({
      message: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: 'Data not fetched',
    });
  }
};

// const fs = require('fs');

// // Read the file contents into a variable
// const fileContents = fs.readFileSync('users.json');

// // Parse the JSON data into a JavaScript object
// const users = JSON.parse(fileContents);

// // Modify the income field in each user object
// users.forEach(user => {
//   user.income = user.income.replace(/\$/g, '');
// });

// Write the modified object back to the file
