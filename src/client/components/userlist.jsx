import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';

const UserItem = styled('div')({
  padding: '8px', // Use whatever values you prefer
  marginBottom: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function UserList() {
  const [users, setUsers] = useState();

  async function fetchUserData() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    users && (
      <div className="user-list">
        {users.map((user) => (
          <UserItem key={user.id}>
            <div>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Admin: {user.is_admin ? "Yes" : "No"}</div>
            </div>
          </UserItem>
        ))}
      </div>
    )
  );
}

export default UserList;
