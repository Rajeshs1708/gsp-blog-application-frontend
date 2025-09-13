import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Content.css"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteModel from '../../components/DeleteModel';
import toast, { Toaster } from 'react-hot-toast';

const Content = () => {
    const [blogs, setBlogs] = useState([]);

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [edit, setEdit] = useState(false);
    const [view, setView] = useState(false);

    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        handleAllPosts();

        return () => setBlogs([]);
    }, []);






    // Fetch all posts
    const handleAllPosts = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/get-blogs`)
            .then(response => {
                setBlogs(response.data.data)
                console.log(response.data);
            })
            .catch(error => {
                console.error(error.response.data.message)
                notifyError(`${error.response.data.message}`)
            });
    }


    // Handle create post
    const handleCreateSubmit = async () => {
        const newPost = {
            title: title,
            description: description,
            image: image,
        }
        if (title !== "" && description !== "" && image !== "") {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/add-blog`, newPost)
                .then(response => {
                    console.log(response.data.data);
                    setBlogs((preBlogs) => [response.data.data, ...preBlogs])
                    notify("Blog successfully posted!")
                    setTitle('');
                    setDescription('');
                    setImage('');

                })
                .catch(error => {
                    console.error(error.response.data.message)
                    notifyError(`${error.response.data.message}`)
                });

        } else {
            notifyError("Empty fields!")
        }

    };

    // Handle edit post
    const handleEdit = async (post) => {
        console.log(post);

        setId(post._id)
        setTitle(post.title)
        setDescription(post.description)
        setImage(post.image)
        setEdit(true);
    };

    // Handle cancel post
    const handleCancel = async () => {
        setId("")
        setTitle("")
        setDescription("")
        setImage("")
        setEdit(false);
    };

    //handle edit submit
    const handleEditSubmit = async () => {
        const editPost = {
            title: title,
            description: description,
            image: image,
        }
        console.log(editPost);

        await axios.put(`${process.env.REACT_APP_BASE_URL}/edit-blog/${id}`, editPost)
            .then(response => {
                if (response.data.data) {
                    console.log(response.data.data)
                    // handleAllPosts();
                    // Update the posts state locally
                    setBlogs((prevPosts) =>
                        prevPosts.map((post) => (post._id === id ? { ...post, ...response.data.data } : post))
                    );
                    notify("Blog Successfully Updated!");
                    setEdit(false);
                    setTitle('');
                    setDescription('');
                    setImage('');
                }
            })
            .catch(error => {
                console.error(error.response.data.message)
                notifyError(`${error.response.data.message}`)
            });

    }

    // Handle delete post
    const handleDelete = (id) => {
        setView(true)
        setId(id)
    };

    const handleDeleteFunction = (type) => {
        if (type === "no") {
            setView(false)
        } else {
            setView(false)
            axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-blog/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setBlogs((prevPosts) => prevPosts.filter((post) => post._id !== id));
                    notify("Blog Successfully Deleted!")
                })
                .catch(error => {
                    console.error(error.response.data.message)
                    notifyError(`${error.response.data.message}`)
                });
        }
    }



    const handleDate = (dateString) => {
        // Convert to Date object
        const date = new Date(dateString);

        // Format the date using toLocaleDateString
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short', // "Aug"
            day: '2-digit', // "08"
            year: 'numeric' // "2024"
        });
        return formattedDate
    }


    return (
        <div className="content-page" >
            <h2>Blog Posts</h2>

            <div style={{ display: "flex", width: "100%" }}>
                {/* Create New Post */}
                <div className="new-post">
                    <h3>Create New Blog</h3>
                    <input
                        type="text"
                        id='title'
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <div className='post_button_grp'>
                        <button className='cancel_button' onClick={handleCancel} >Cancel</button>

                        {
                            edit ? <button className='update_button' onClick={handleEditSubmit}>Update</button> : <button className='create_button' onClick={handleCreateSubmit}>Create</button>
                        }
                    </div>

                </div>

                {/* Display Posts */}
                <div className="posts">
                    <h3>All Blogs</h3>
                    {blogs.length > 0 ?
                        blogs.map(post => (
                            <div key={post._id} className="post">
                                <div className='post_header'>
                                    <h3 className='post_title'>{post.title}</h3>
                                    <div className='post_icon_container'>
                                        <MdEdit className='post_edit_icon' onClick={() => handleEdit(post)} />
                                        <MdDelete className='post_delete_icon' onClick={() => handleDelete(post._id)} />
                                    </div>
                                </div>
                                <div className='post_img_container'>
                                    <img className='post_img' src={post.image} alt={post.title} />
                                </div>
                                <p className='post_date'>{handleDate(post.date)}</p>
                                <p className='post_description'>{post.description}</p>

                            </div>
                        ))
                        :
                        <div>No Blogs!</div>
                    }
                </div>

            </div>

            {/* Delete Model */}
            <DeleteModel view={view} setView={setView} handleDeleteFunction={handleDeleteFunction} />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Content;
