import React from 'react'

function DeleteModel({ view, setView, handleDeleteFunction }) {
    return (
        <div style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset", position: "fixed", top: view ? "20%" : "-50%", left: view ? "50%" : "-50%", zIndex: "1000", background: "white", transform: "translate(-50%, -50%)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "white", backgroundColor: "#ff6b6b", padding: "10px 0px" }}>
                <span style={{ color: "white", padding: "0px 20px" }}>Confirm Delete !</span>
                <span onClick={() => setView(false)} style={{ color: "white", padding: "0px 20px", cursor: "pointer" }}>X</span>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                <div>Are you sure you want to delete this post?</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => handleDeleteFunction("no")} style={{ cursor: "pointer", borderRadius: "4px", border: "1px solid lightgray", outline: "none", padding: "5px 25px" }}>No</button>
                    <button onClick={() => handleDeleteFunction("yes")} style={{ cursor: "pointer", borderRadius: "4px", border: "none", outline: "none", padding: "5px 25px", color: "white", backgroundColor: "#ff6b6b" }}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModel