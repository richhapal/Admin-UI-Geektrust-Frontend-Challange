import React,{useEffect, useState,useRef} from 'react';
import './pagination.css';



function Pagination(props){
    const fetchData=useRef(false);
    const [totalPage,updateTotalPage]=useState([]);
    const [currentPage,updateCurrentPage]=useState(1);


// updating list based on current page and higlighting current pages

    useEffect(()=>{
        function loadData(){
        
            let len=Math.ceil(props.list.length/10);
            let arr=[]
            for(let i=1;i<=(len);i++){
                arr.push(i)
            }
            updateTotalPage([...arr]);
            props.updateDisplayEmployee(props.list.slice(0,10));
            // highlighting current active  page 
            const showEmp=props.list.slice(currentPage*10-10,currentPage*10);   
            props.updateDisplayEmployee(showEmp); 

            let elem=document.getElementsByClassName("pageButtons");
            for(let i=0;i<elem.length;i++){
                if(currentPage-1==i){
                    elem[i].classList.add('highlight');
                }else{
                    elem[i].classList.remove('highlight');
                }
            }

            // Update page to previous when delete all data from current page
            if(showEmp.length==0){
                if(currentPage!==1){
                    updateCurrentPage((oldValue)=>oldValue-=1);
                }  else{
                    updateCurrentPage(1);
                }
            }
            
        }
        loadData();
        props.setAllSelected(false)
        props.setSelectedList([])
        props.setCurrentPage(currentPage)


        if(totalPage.length!=0){
            const elemLeft=document.getElementsByClassName('leftButton');
            const elemRight=document.getElementsByClassName('rightButton');
            const len=totalPage.length;
            if(currentPage==totalPage[0]){
                elemLeft[0].style.pointerEvents="none";
                elemLeft[1].style.pointerEvents="none";

            }
                else{
                    elemLeft[0].style.pointerEvents="initial";
                    elemLeft[1].style.pointerEvents="initial";
            }

            if(currentPage==totalPage[len-1]){
                elemRight[0].style.pointerEvents="none";
                elemRight[1].style.pointerEvents="none";
            }else{
                elemRight[0].style.pointerEvents="initial";
                elemRight[1].style.pointerEvents="initial";
                }   
        }

        
        
    },[currentPage,props.list]);

    // handling page increment or decrement

   function pageIncrement(e){  
     e.stopPropagation();
            if(currentPage==5){
                alert("Your are on page 5 cant increment")
                return;
            }
            updateCurrentPage((old)=>old+=1);
           
    }
    
    function pageDecrement(e){
        e.stopPropagation();
        if(currentPage==1){
            alert("Your are on page 1 cant decrment");
            return;
        }
        updateCurrentPage((old)=>old-=1);
        
    }



    
    
    return (

        <div className='footerButtons'>

            

            <div className='footerButtons-items leftButton'  onClick={(e)=>{updateCurrentPage(totalPage[0])}}><i className="fa-solid fa-angles-left"></i></div>
            <div className='footerButtons-items leftButton'  onClick={pageDecrement}> <i className="fa-solid fa-solid fa-angle-left"></i></div>


            {
                totalPage.map((item,index)=> {
                    if(index==0){return <div className='footerButtons-items pageButtons highlight' onClick={(e)=>{updateCurrentPage(e.target.id)}} key={item} id={item}>{item}</div>}
                    else{
                        return <div className='footerButtons-items pageButtons ' onClick={(e)=>{updateCurrentPage(e.target.id)}} key={item} id={item}>{item}</div>
                    }
                })
            }

           
            <div className='footerButtons-items rightButton' onClick={pageIncrement}> <i className="fa-solid fa-solid fa-angle-right"></i></div>
            <div className='footerButtons-items rightButton' onClick={(e)=>{updateCurrentPage(totalPage[totalPage.length-1])}}><i className="fa-solid fa-angles-right"></i></div>
           
        </div>
    )


}

export default Pagination;