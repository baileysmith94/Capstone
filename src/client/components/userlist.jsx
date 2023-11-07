import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function FetchUserData() {
      try {
        const response = await fetch(`/api/users`);
        if (response.ok) {
          const result = await response.json();
          setUsers(result.users);
        } else {
          console.error("Failed to fetch");
        }
      } catch (err) {
        console.error(err);
      }
    }

    FetchUserData();
  }, []);
  console.log(users);
  return (
    <>
      <div className="user-list">
        {users.map((users) => (
          <ul key={users.id}>
            <li>Rating: {users.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
}
