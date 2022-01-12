import React from "react";
import { useNavigate } from "react-router-dom";
import bstimage from "./Images/bstimage.PNG";
import linkedlistimage from "./Images/linkedlistimage.PNG";
import stackimage from "./Images/stackimage.PNG";

const Homepage = () => {
  const navigate = useNavigate();

  const abre = "{";
  const fecha = "}";

  return (
    <div className="Homepage">
      <div id="header">
        <div id="inner-header">
          <div>
            <h1>Data Structures Visualization</h1>
          </div>
          <div>
            <a
              href="https://github.com/joaogabrielferr/data-structures-visualizer"
              target={"_blank"}
            >
              Repository on Github
            </a>
          </div>
        </div>
      </div>
      <div>
        Visualize the operations of the main data structures. Animations were
        made with Scalable Vector Graphics(SVG) and CSS.
      </div>

      <div className="container">
        <div className="inner-c">
          <div className="section">
            <div className="text">
              <h1 className="title">Binary Search Tree</h1>A binary search tree
              is a binary tree where, for each node, the value stored in that
              node is greater than all the values in the node's left subtree,
              and lesser than the values in its right subtree. All the
              operations are done maintaning this property.
              <p></p>
              <button className="view-button" onClick={()=>navigate("/bst")}>
                Visualize Binary Search Tree
              </button>
            </div>

            <div className="img">

              <img src={bstimage} alt="" />

            </div>
          </div>




          <div className="section">
            <div className="text">
              <h1 className="title">Linked List</h1>A linked list is a data structure
               that store its items in a linear fashion, but the items are not stored in sequence, but rather
                in random memory locations, and are reached with pointers, where each item holds the pointer
                 for the next item in the sequence.
              <p></p>
              <button className="view-button" onClick={()=>navigate("/linkedlist")} >
                Visualize Linked List
              </button>
            </div>

            <div className="img">

              <img src={linkedlistimage} alt="" />

            </div>
          </div>          

         
          
          <div className="section">
            <div className="text">
              <h1 className="title">Stack</h1>A stack is a data structure where the elements are stored in sequence, but only the element at the top can be acessed or removed at any time.
              <p></p>
              <button className="view-button" onClick={()=>navigate("/stack")}>
                Visualize Stack
              </button>
            </div>

            <div className="img">

              <img src={stackimage} alt="" />

            </div>
          </div>      


          <div className="section">
            <div className="text">
              <h1 className="title">Queue</h1>
              <p></p>
              In development
            </div>

            <div className="img">
            </div>
          </div>    

          <div className="section">
            <div className="text">
              <h1 className="title">Heap</h1>
              <p></p>
              In development
            </div>

            <div className="img">
            </div>
          </div>            

        </div>
      </div>
      
      <p> </p>
      <p> </p>
      <div id="footer">
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
