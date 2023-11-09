export const deleteReview = async (restaurantId) => {
  try {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export async function fetchReviews(restaurantId) {
    const [reviews, setReviews] = useState([]);
  try {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`);
    if (response.ok) {
      const data = await response.json();
      console.log("Received data:", data);
      setReviews(data.reviews);
    } else {
      console.error("Failed to fetch reviews. Status:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
