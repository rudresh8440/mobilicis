import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      // Filter users based on criteria
      const filteredUsers = data.filter((user) => {
        if (
          user.income < 5 &&
          (user.car.brand === 'BMW' || user.car.brand === 'Mercedes')
        ) {
          return true;
        } else if (user.gender === 'male' && user.phone.price > 10000) {
          return true;
        } else if (
          user.lastName.startsWith('M') &&
          user.quote.length > 15 &&
          user.email.includes(user.lastName)
        ) {
          return true;
        } else if (
          ['BMW', 'Mercedes', 'Audi'].includes(user.car.brand) &&
          !/\d/.test(user.email)
        ) {
          return true;
        }
        return false;
      });
      setUsers(filteredUsers);
    }
    fetchData();
  }, []);

  // Group users by city and calculate average income
  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.city]) {
      acc[user.city] = {
        count: 1,
        totalIncome: user.income,
      };
    } else {
      acc[user.city].count += 1;
      acc[user.city].totalIncome += user.income;
    }
    return acc;
  }, {});

  // Convert groupedUsers object to array and sort by number of users
  const sortedCities = Object.entries(groupedUsers)
    .map(([city, { count, totalIncome }]) => ({
      city,
      count,
      averageIncome: totalIncome / count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div>
      <h1>Users Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Income</th>
            <th>Car Brand</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.gender}</td>
              <td>{user.income}</td>
              <td>{user.car.brand}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Top 10 Cities by User Count</h1>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>User Count</th>
            <th>Average Income</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map(({ city, count, averageIncome }) => (
            <tr key={city}>
              <td>{city}</td>
              <td>{count}</td>
              <td>{averageIncome.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
