import { useState } from "react";


export default function EditButton (commentId) {
    const [comment, setComment] = useState("");
    const token = localStorage.getItem("token");
    console.log("The comment ID is ", commentId)

        async function handleEdit (e) {
            // e.preventDefault()
            try {
                const response = await fetch (`http://localhost:3000/api/comments/${commentId.commentId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        comment
                      }),
                })
                const data = response.json();
                if (response.ok) {
                    
                    return data
                }
            } catch(error) {
                throw error
            }
        }  

        return (
            <form onSubmit={handleEdit}>
          <input
            value={comment} required
            type="text"
            name="comment_text"
            placeholder="Edit your comment..."
            onChange={(e) => setComment(e.target.value)}
          />
        

        <button type="submit">Edit Comment</button>
      </form>
        )
}