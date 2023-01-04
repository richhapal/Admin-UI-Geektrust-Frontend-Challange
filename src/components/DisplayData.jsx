import React,{useEffect, useRef, useState} from 'react';
import { IconContext } from "react-icons";  
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete} from 'react-icons/ai';
import './displaydata.css'

function DisplayData(props){

    const {isHeadding,name,email,role,action=false,id="heading"}=props;
    const [filterlist,setFilterlist]=useState(false);
    const [allSelected,setAllSelected]=useState(false);
    const [isEditing,setEditing]=useState(false);
    let headingClass="displaydata";

    if(isHeadding){
        headingClass+=" heading";
    }



    // Update Main User List When I Delete Users From List
    useEffect(()=>{

        {(isHeadding==false && filterlist) &&  props.updateE(filterlist);}

    },[filterlist,props.list])


    // Update Admin UI select when selected all 
    useEffect(()=>{
        if(allSelected && isHeadding){
            props.setAllSelected(allSelected)
        }
        if(!allSelected && isHeadding){
            props.setAllSelected(false)
        }
    },[allSelected])






    useEffect(()=>{
        if(props.allSelected && !isHeadding){   // all true but not heading
            props.setSelectedList((old)=>[...old,props.id])
            console.log("----------calling again----------------")
        }
        else if(!props.allSelected && !isHeadding){
            let filterSelectdList=props.selectedList.filter((value)=>value!=props.id)
            props.setSelectedList(filterSelectdList)
            
        }
       else if(!props.allSelected && isHeadding){
            setAllSelected(false);
            document.getElementById("checked").checked=false;
            props.setAllSelected(false)
            props.setSelectedList([])
        }else if(props.allSelected && isHeadding){
            document.getElementById("checked").checked=true;
        }   

    },[props.allSelected])
    

    const handleSelect=(e)=>{
        e.stopPropagation();
        let grandParentId=e.target.parentNode.parentNode.id;
        let ele=document.getElementById(grandParentId);

        // Select particular one row and update into selectedList array 
        if(e.target.checked && grandParentId!=="heading"){
            props.setSelectedList((oldValue)=>[...oldValue,grandParentId]);
  
        } 
       

        // Diselect particular one row and remove id from selectedList array
        if(!e.target.checked && grandParentId!=="heading"){
            ele.classList.remove("selected_background");
            let filterSelectdList=props.selectedList.filter((value)=>value!=grandParentId);
            props.setSelectedList(filterSelectdList)
            setAllSelected(false)
        }
      

        //Updating AllChecked to true
        if(grandParentId=="heading" && e.target.checked){
            setAllSelected(true);

        }
        //Updating AllChecked to false
        if(grandParentId=="heading" && !e.target.checked){
            setAllSelected(false);
            console.log("-----------PROPS-----",props.selectedList)
            
                for(let i=0;i<props.selectedList.length;i++){
                    let elem=document.getElementById(props.selectedList[i]);
                    elem.classList.remove("selected_background");
                    elem.children[0].children[0].checked=false;
                }
                 props.setSelectedList([]);
            
            
        }
    }




    function deleteEmployeeData(e){
        e.stopPropagation();
        let id=e.target.parentNode.parentNode.id;
        let list=props.list.filter((item)=>item.id!=id);
        setFilterlist(list)
        if(list.length==0){
            props.updateE(list);
        }
    }

    const handleEdit=(e)=>{
        e.stopPropagation();
        let id=e.target.parentNode.parentNode.id;
        let name=document.getElementById(`name-${id}`).textContent;
        let email=document.getElementById(`email-${id}`).textContent;
        let role=document.getElementById(`role-${id}`).textContent;
        props.setISEditing({id:`${id}`,name:`${name}`,email:`${email}`,role:`${role}`})
      
    }



    return (
        <div className={headingClass} key={id} id={id}>

            <p  className='flex-items' > <input type={"checkbox"} id="checked" onChange={handleSelect}/></p>
            <p className='flex-items' id={`name-${id}`}>{name}</p>
            <p className='flex-items' id={`email-${id}`}>{email}</p>
            <p className='flex-items' id={`role-${id}`}>{role[0].toUpperCase()+role.slice(1)}</p>  
            {
                action 
                ? <p className='flex-items'>{action}</p>
                : 
                        <p className='flex-items' > 
                                {/* <FiEdit  onClick={handleEdit}  style={{strokeWidth: "3"}}/> */}
                                {/* <AiFillDelete onClick={deleteEmployeeData}  style={{color:"red",strokeWidth: "5", height:"1rem"}}/> */}
                            <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                            <i className="fa-sharp fa-solid fa-trash" onClick={deleteEmployeeData}></i>    
                        </p>
                        
            } 
            
        </div>
    )


}

export default DisplayData;