import React from "react";
import { useNavigate } from "react-router-dom";
import bstimage from "./Images/bstimage.PNG";
import linkedlistimage from "./Images/linkedlistimage.PNG";
import stackimage from "./Images/stackimage.PNG";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();

  const abre = "{";
  const fecha = "}";


  useEffect(()=>{

    for(let i = 1;i<=5;i++)
    {
      if(i === 1)
      {
        document.getElementById(`A${i}`).style.display = "block";
        document.getElementById(`_${i}`).style.color = "#254569";
      }else
      {
        document.getElementById(`A${i}`).style.display = "none";
      }

    }


    for(let i = 1;i<=5;i++)
    {
      let curr = document.getElementById(`_${i}`);
      curr.addEventListener('mouseover',()=>{
        
          curr.style.color = "#254569";
          
          for(let j = 1;j<=5;j++)
          {
            if(j !== i)
            {
              document.getElementById(`_${j}`).style.color = "#111";
              document.getElementById(`A${j}`).style.display = "none"; 
            }else
            {
              document.getElementById(`A${j}`).style.display = "block"; 
            }
          }


      })
    }

    
  },[]);

  return (
    <div className="Homepage">
      
      <div id="header">
        <div id="inner-header">
          
          <div>
            <div id = "title-top">DATA STRUCUTRES</div>
            <div id = "title-bottom">VISUALIZATION</div>
          </div>
          

          <div id="nav-bar">

<div id = "select-ds">
  Select one data structure below
</div>

<div id = "ds-list">
  <div><h1 id = "_1" className="ds-list-item">Binary Search Tree&nbsp;&nbsp;&nbsp;</h1></div>
  <div><h1 id = "_2" className="ds-list-item">Linked List&nbsp;&nbsp;&nbsp;</h1></div>
  <div><h1 id = "_3" className="ds-list-item">Stack&nbsp;&nbsp;&nbsp;</h1></div>
  <div><h1 id = "_4" className="ds-list-item">Queue&nbsp;&nbsp;&nbsp;</h1></div>
  <div><h1 id = "_5" className="ds-list-item">Heap&nbsp;&nbsp;&nbsp;</h1></div>
</div>

</div>


          <div id = "homepage-repo"><a href="https://github.com/joaogabrielferr/data-structures-visualizer" target={"_blank"}>Repository on Github</a></div>
        </div>
      </div>


      <div className="ds-section" id = "A1">
          <div className="inner-section">
            <div className="ds-info">
            <div className="ds-title"><h1>Binary Search Tree</h1></div>
                A binary search tree is a binary tree where, 
                for each node, the value stored in that node is greater than all the values in the node's left
                 subtree, and lesser than the values in its right subtree. All the operations are done maintaning 
                 this property.
              <p></p>
              <button className="ds-button" onClick={()=>navigate("/bst")}>Visualize Binary Search Tree</button>
            </div>
            <div className="ds-img">
              <img src={bstimage} alt="" />
            </div>
          </div>
      </div>

      <div className="ds-section" id = "A2">
         
          <div className="inner-section">
            <div className="ds-info">
            <div className="ds-title"><h1>Linked List</h1></div>
            A linked list is a data structure that store its items in a linear fashion, but the items are not stored
             in sequence, but rather in random memory locations, and are reached with pointers, where each 
            item holds the pointer for the next item in the sequence.
              <p></p>
              <button className="ds-button" onClick={()=>navigate("/linkedlist")}>Visualize Linked List</button>
            </div>
            <div className="ds-img">
              <img src={linkedlistimage} alt="" />
            </div>
          </div>
      </div>

      <div className="ds-section" id = "A3">
          
          <div className="inner-section">
            <div className="ds-info">
            <div className="ds-title"><h1>Stack</h1></div>
            A stack is a data structure where the elements are stored in sequence,
             but only the element at the top can be acessed or removed at any time.
              <p></p>
              <button className="ds-button" onClick={()=>navigate("/stack")}>Visualize Stack</button>
            </div>
            <div className="ds-img">
              <img src={stackimage} alt="" />
            </div>
          </div>
      </div>
      <div className="ds-section" id = "A4">
          
          <div className="inner-section">
            <div className="ds-info">
            {/* <div className="ds-title"><h1>Queue</h1></div>   */}
                
              
            </div>
            <div className="ds-img">
            <h1 style={{fontSize:"3vw"}}>In development</h1>
            </div>
          </div>
      </div>
      <div className="ds-section" id = "A5">
          {/* <div className="ds-title"><h1>Heap</h1></div> */}
          <div className="inner-section">
            <div className="ds-info">
            </div>
            <div className="ds-img">
            <h1 style={{fontSize:"3vw"}}>In development</h1>
            </div>
          </div>
      </div>

      <div id="homepage-footer">
        João Gabriel &nbsp;{" "}
        <a href="https://github.com/joaogabrielferr" target={"_blank"}>
          <i className="fab fa-github"></i>
        </a>
        &nbsp;
        <a
          href="https://www.linkedin.com/in/joaogabrielferr/"
          target={"_blank"}
        >
          <i className="fab fa-linkedin"></i>
        </a>{" "}
      </div>
  
    </div>
  );
};

export default Homepage;
