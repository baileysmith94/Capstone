
import { useState, useEffect } from "react";

export default function DeleteButton (commentId, userData, userId) {
    const token = localStorage.getItem("token");
    // console.log("user ID:",userData.id, "comment's user id:", userId)
     async function handleDelete (e) {
        try {
            
            const response = await fetch(`http://localhost:3000/api/comments/${commentId.commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },            
        })
        const data = await response.json();
        if (response.ok) {
            return data
        }} catch(error) {
            throw error
        }
     }

        return(
             
            <form onSubmit={handleDelete}>
                <button type="submit" >Delete</button>
            </form>
                
            
);
}
