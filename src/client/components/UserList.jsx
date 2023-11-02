import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function FetchUserData() {
      try {
        const response = await fetch(`/api/users`);
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        console.error(err);
      }
    }
    FetchUserData();
    console.log(users);
  }, []);

  //   return (
  //     <>
  //       {users.map((users) => {
  //         <ul key={users.id}>
  //           <li>Rating: {users.name}</li>
  //         </ul>;
  //       })}
  //     </>
  //   );
}
