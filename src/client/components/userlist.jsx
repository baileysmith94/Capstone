import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState();
  console.log(users);

  async function FetchUserData() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUsers(result.users);
      } else {
        console.error("Failed to fetch");
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    FetchUserData();
  }, []);

  // console.log(users);
  return (
    users && (
      <>
        <div className="user-list">
          {users.map((users) => (
            <ul key={users.id}>
              <li>
                Name: {users.name} Email: {users.email}
              </li>
            </ul>
          ))}
        </div>
      </>
    )
  );
}

export default UserList;
