import React, { useEffect, useState } from 'react';
import "./FileUpload.css";
import { FiUpload } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState({})
    const notify = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);

    // useEffect(() => {
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/get-image`)
    //         .then(response => {
    //            console.log(response);
    //         })
    //         .catch(error => console.error(error));
    
    // }, [])
    
    const handleSelect = (e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const handleUpload = async() => {
      
        if (file.name) {
            console.log(file);
            const formData = new FormData();
            formData.append("file", file)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData)
            .then(response => {
                notifySuccess("Image Uploaded Successfully!")
               console.log(response);
            })
            .catch(error => console.error(error));    
        } else {
            notify("Select File")
        }
    }


    return (
        <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" }}>
            <div className="container">
                <div className="header">
                    <FiUpload style={{ fontSize: "70px" }} />
                    <p>Browse File to upload!</p>
                </div>
                <input id="file" type="file" onChange={e => handleSelect(e)} />
                <label htmlFor="file" className="footer">
                    <FaFileAlt style={{ color: "blue", fontSize: "20px" }} />

                    <p> {file.name ? file.name : "Not selected file"}</p>
                    {/* <MdDelete style={{ color: "red", fontSize: "25px" }} onClick={() => setFile({})} /> */}
                </label>
            </div>
            <div style={{ display: "flex", gap: "100px" }}>
                <button className='file__upload' onClick={() => setFile({})}>Cancel</button>
                <button className='file__upload' onClick={handleUpload}>Upload</button>

            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default FileUpload