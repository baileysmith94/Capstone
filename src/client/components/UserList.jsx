import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function FetchMeData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(`/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        console.error(err);
      }
    }
    FetchMeData();
  }, []);

  return users.map((users) => {
    <p>{users.name}</p>;
  });
}
