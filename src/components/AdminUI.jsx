import {React,useCallback,useEffect,useRef,useState} from 'react';
import './admin.css'
import DisplayData from './DisplayData';
import Pagination from './Pagination';
import Search from './Search';
import Editing from './Editing';

function AdminUI (){
    const fetchData=useRef(false);
    const [filterEmployeeList,setFilterEmployeeList]=useState([]);
    const [employeeList,updateEmployeeList]=useState([]);
    const [displayEmployee,updateDisplayEmployee]=useState([]);
    const [allSelected,setAllSelected]=useState(false);
    const [selectedList,setSelectedList]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [isEditing,setISEditing]=useState(false);
    

    // fetching data from API
    async function getAPI(){
        try{
            let url=`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
            let response= await fetch(url);
            let result= await response.json();
            updateEmployeeList(result);
            setFilterEmployeeList([...result])
            return result;
        }
        catch(e){
            console.log(e.message)
        }
       
    }

    useEffect(()=>{
        if(fetchData.current) return;
            fetchData.current=true;
            async function getData(){
                let users=await getAPI();
            }
            getData();
      },[]);


      // Updating filerlist when some data deleted from main list
      useEffect(()=>{
        setFilterEmployeeList(employeeList);
      },[employeeList])



      useEffect(()=>{
            if(selectedList.length!=0){
                for(let i=0;i<selectedList.length;i++){
                    let elem=document.getElementById(selectedList[i]);
                    elem.classList.add("selected_background");
                    elem.children[0].children[0].checked=true;
                }
               
            }

            
      },[selectedList])



      useEffect(()=>{
        if(selectedList.length==0){
            document.getElementById('heading').children[0].children[0].checked=false;
        }
      },[currentPage])

      useEffect(()=>{
        console.log("ALL SELECTED ON ADMIN PAGE",allSelected,selectedList,"currentpage",currentPage);
        let heading=document.getElementById('heading').children[0].children[0];
        let lengthToPrintOnPage=employeeList.slice(currentPage*10-10,currentPage*10).length;
        if(selectedList.length>0 && selectedList.length<10){
            heading.checked=false;
        }
        if(selectedList.length===lengthToPrintOnPage && selectedList.length!=0 ){
            heading.checked=true;
            // setAllSelected(true)
        }
        
    },[displayEmployee,employeeList,filterEmployeeList,allSelected,selectedList]);




      const handleDeleteSelected=(e)=>{
        e.stopPropagation();
        let deletedList;
        let heading=document.getElementById('heading').children[0].children[0].checked;
        if(selectedList.length==0 && !allSelected){
            alert("Please Select to delete")
        }
        if(allSelected && heading){
            deletedList=employeeList.splice(currentPage*10-10,10);
            let emplist=[...employeeList]
            updateEmployeeList(emplist);
            setAllSelected(false)
            setSelectedList([])
            document.getElementById('heading').children[0].children[0].checked=false;
        }
        
        if(selectedList.length!==0){
            let hashMap=new Map();
            for(let i=0;i<selectedList.length;i++){
                hashMap.set(selectedList[i],i)
            }
             deletedList= employeeList.filter((item)=>!(hashMap.has(item.id)))
             updateEmployeeList(deletedList);
             setSelectedList([])
            document.getElementById('heading').children[0].children[0].checked=false;
        }
        
      }





  

    return (
        <>
        <Search list={employeeList} setFilterEmployeeList={setFilterEmployeeList} />
        <DisplayData isHeadding={true} name={"Name"} email={"Email"} role={"Role"} action={"Actions"} allSelected={allSelected} setSelectedList={setSelectedList} selectedList={selectedList} setAllSelected={setAllSelected} />
        {
            displayEmployee.map((item)=><DisplayData {...item} isHeadding={false} setISEditing={setISEditing} list={employeeList} updateE={updateEmployeeList} allSelected={allSelected} selectedList={selectedList} setSelectedList={setSelectedList} />)
        }
        {
           <div className='footer'>
            <div className='flex-item' onClick={handleDeleteSelected}><button>Deleted Selected</button></div>
            <div className='flex-item'><Pagination updateDisplayEmployee={updateDisplayEmployee} setCurrentPage={setCurrentPage} setAllSelected={setAllSelected} list={filterEmployeeList} selectedList={selectedList} setSelectedList={setSelectedList}/></div>
           </div>
        }
        {
            isEditing && <Editing isEditing={isEditing} setISEditing={setISEditing} list={employeeList} updateE={updateEmployeeList}/>
        }
        </>
    )
}

export default AdminUI;