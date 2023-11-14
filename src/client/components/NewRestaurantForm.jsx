import React, { useState } from "react";

function NewRestaurantForm ({restaurants, setRestaurants}) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [type, setType] = useState("");
    const [image_url, setImage_url] = useState("");
    const [error, setError] = useState(null);

    const createRestaurant = async (name, address, phone_number, type, image_url) => {
        try {
            const response = await fetch("/api/restaurants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    address,
                    phone_number,
                    type,
                    image_url,
                }),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await createRestaurant(name, address, phone_number, type, image_url);
        if (data.success) {
            console.log("New Restaurant: ", data);

            const newRestaurantList = [...restaurantsRouter, data];
            setRestaurants(newRestaurantList);

            setName("");
            setAddress("");
            setPhone_number("");
            setType("");
            setImage_url("");
        } else {
            setError(data.error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <h3>Enter a new Restaurant:</h3>
            <input
            value={name}
            type="text"
            name="name"
            placeholder="restaurant name"
            onChange={(e) => setName(e.target.value)}
            />
            <input
            value={address}
            type="text"
            name="address"
            placeholder="restaurant address"
            onChange={(e) => setAddress(e.target.value)}
            />
            <input
            value={phone_number}
            type="text"
            name="phone_number"
            placeholder="restaurant phone number"
            onChange={(e) => setPhone_number(e.target.value)}
            />
            <input
            value={type}
            type="text"
            name="type"
            placeholder="restaurant type"
            onChange={(e) => setType(e.target.value)}
            />
            <input
            value={image_url}
            type="text"
            name="image_url"
            placeholder="restaurant image url"
            onChange={(e) => setImage_url(e.target.value)}
            />
        </form>
    );

}

export default NewRestaurantForm;