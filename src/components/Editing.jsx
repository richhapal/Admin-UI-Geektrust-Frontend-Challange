import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './editing.css'

const Editing=(props)=>{
    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");



    useEffect(()=>{
        const {id,name,email,role}=props.isEditing;
        setId(id);
        setName(name);
        setEmail(email);
        setRole(role);
    },[])


    const handleSubmit=(e)=>{
        e.preventDefault();
        let editedList=props.list;
     
            editedList[id-1].name=name;
            editedList[id-1].email=email;
            editedList[id-1].role=role;
            props.updateE(editedList);
            props.setISEditing(false);
       
    }

    return(

    <div className="editModalBack">
        <div className="editingModal">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" required id="exampleInputName" value={name} onChange={(e)=>{setName(e.target.value)}} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" required onChange={(e)=>{setEmail(e.target.value)}} value={email} id="exampleInputEmail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputRole" className="form-label">Role</label>
                    <input type="text" className="form-control" placeholder="Enter Role" required onChange={(e)=>{setRole(e.target.value)}} value={role} id="exampleInputRole" />
                </div>

                <button type="submit" className="btn btn-primary mx-2">Submit</button> 
                <button onClick={(e)=>{props.setISEditing(false)}} className="btn btn-danger">Cancel</button>
            </form>

        </div>
    </div>
    )


}


export default Editing;