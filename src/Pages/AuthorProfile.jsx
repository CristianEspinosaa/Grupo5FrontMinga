import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/Rectangle10.png";
import fondo1 from "../assets/Rectangle606.png";
import location from "../assets/location-marker.png";
import icon1 from "../assets/icon.png";
import port from "../assets/portadamanga.png"

const AuthorProfile = () => {
    const token = localStorage.getItem("token");
    const [authorData, setAuthorData] = useState({
        name: "",
        last_name: "",
        city: "",
        country: "",
        formattedDate: "",
        photo: ""
    });
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const convertToDateFormat = (date) => {
        return date.split("/").reverse().join("-");
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/validateToken", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.response;
                localStorage.setItem("userId", user._id);
                return user;
            } catch (error) {
                console.error("Error validating the token:", error);
                toast.error("Invalid token, please log in again.");
                return null;
            }
        };

        const fetchAuthor = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("User ID not found in localStorage.");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`http://localhost:8080/api/authors/byUser/${userId}`, config);
                const authorData = response.data.response[0];
                if (authorData) {
                    const formattedDate = formatDate(authorData.date);
                    setAuthorData({ ...authorData, formattedDate });
                } else {
                    toast.error("No author found for the user.");
                }
            } catch (err) {
                console.error("Error fetching author:", err);
            }

        };

        if (token) {
            validateToken().then(fetchAuthor);
        } else {
            toast.error("Token not found. Please log in.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: authorData.name,
            last_name: authorData.last_name,
            city: authorData.city,
            country: authorData.country,
            date: convertToDateFormat(authorData.formattedDate),
            photo: authorData.photo,
        };

        try {
            if (authorData._id) {
                const response = await axios.put(
                    `http://localhost:8080/api/authors/update/${authorData._id}`,
                    updatedData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success(response.data.message || "Author details updated successfully.");
            } else {
                const userId = localStorage.getItem("userId");
                const newAuthorData = { ...updatedData, user_id: userId };
                const response = await axios.post(
                    `http://localhost:8080/api/authors/create`,
                    newAuthorData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success(response.data.message || "Author created successfully.");
                setAuthorData({ ...response.data.response, formattedDate: formatDate(response.data.response.date) });
            }
        } catch (error) {
            console.error("Error saving author:", error);
            toast.error("Failed to save author details.");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://localhost:8080/api/authors/delete/${authorData._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(response.data.message || "Account deleted successfully.");
            window.location.href = "/";
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again later.");
        }
    };

    return (
        <div className="relative">
            <div className="hidden sm:block h-[60vh] bg-cover relative px-8" style={{ backgroundImage: `url(${fondo1})`, backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Author Profile</h1>
                </div>
            </div>
            <div className="relative bg-white backdrop-blur-sm flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-around lg:-mt-10 lg:my-10 lg:rounded-3xl bottom-0 left-1/2 transform -translate-x-1/2 w-screen h-screen lg:w-[80%] lg:h-[60vh] shadow-lg z-10">
                <div className="p-6">
                    <img
                        src={authorData.photo || img1}
                        alt="User Profile"
                        className="w-36 h-36 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-semibold">{authorData.name} {authorData.last_name}</h2>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                        <img src={location} alt="Location Icon" className="w-5 h-5 mr-2" />
                        <span>{authorData.city} {authorData.country}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                        <img src={icon1} alt="Calendar Icon" className="w-5 h-5 mr-2" />
                        <span>{authorData.formattedDate}</span>
                    </div>
                </div>
                <div className="mt-4 w-full max-w-lg h-64 sm:h-auto sm:overflow-y-visible overflow-y-auto grid grid-cols-2 gap-4 p-4  rounded-lg">
                    {[
                        {
                            title: 'Komi san Cant Communicate',
                            image: 'https://via.placeholder.com/150',
                        },
                        { title: 'Boruto', image: 'https://via.placeholder.com/150' },
                        { title: 'Evangelion', image: 'https://via.placeholder.com/150' },
                        { title: 'Kaguya-sama: Love is war', image: 'https://via.placeholder.com/150' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className=" p-4 rounded-lg flex flex-col w-48 h-48"
                        >
                            <img
                                src={port}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <h3 className="mt-2 text-center text-sm font-semibold">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>

                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>

        
    );
};

export default AuthorProfile;
