import React, { useEffect, useRef, useState } from 'react';
import './search.css';




function Search(props){


    const [serachFilter,setSearchFilter]=useState([]);
    const fetch=useRef(false);

    useEffect(()=>{
        // console.log("props---list",props.list);
    },[props.list])

    useEffect(()=>{
        props.setFilterEmployeeList(serachFilter)
        // console.log("---upadting search filer in search.jsx")
    },[serachFilter])

    function handleSearch(e){
        e.stopPropagation()
        if(e.target.value.length==0){setSearchFilter(props.list);}
        let result=props.list.filter((items)=>{
            for(let keys in items){
                if(items[keys].includes(e.target.value)){
                    return true;
                }
            }
        })
        
        setSearchFilter(result)

    }

    return (
        <>
        <div className='search'>
            <div className="input-group mb-3">
                <input type={"text"} className={"form-control"} placeholder={"Search By Name,Email,Role."} onChange={handleSearch} aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
        </div>
        </>
    )



}

export default Search;