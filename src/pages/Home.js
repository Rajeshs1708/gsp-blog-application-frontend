import React from 'react';
import "./Home.css"


const Home = () => {
    return (
        <div className="home">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7863y5DnpmL2kozb7RT-HbnGobvHDkVr6tw&s' alt='Blog_Image'/>
            <h1>Welcome to My Blog App</h1>
            <p>
                This is a simple blog app where you can create, read, edit, and delete blog posts.
                Built using the MERN stack, this app helps you manage your content efficiently.
            </p>
        </div>
    );
};

export default Home;