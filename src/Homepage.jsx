import React from "react";
import { useNavigate } from "react-router-dom";
import bstimage from "./Images/bstimage.PNG";
import linkedlistimage from "./Images/linkedlistimage.PNG";
import stackimage from "./Images/stackimage.PNG";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="Homepage">
      <div id="homepage-header">
        <div id="inner-homepage-header">
          <p><a href="https://github.com/joaogabrielferr/data-structures-visualizer" target="_blank">Repository on Github</a></p>
          <div>
          <p>
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
            </a>
          </p>
        </div>
        </div>
      </div>

      <div id="title-home">
        <p></p>
        <h1>
          Data Structures Visualization
        </h1>
        <p>Visualize the operations of main data structures with animations. Built with ReactJs. Animations done with CSS and Scalable Vector Graphics(SVG).</p>

      </div>

      <div className="ds-container">
        <div className="ds-info">
          <h1 id="title-bst">I. Binary Search Tree</h1>
          <p>
            A binary search tree is a binary tree where, for each node, the
            value stored in that node is greater than all the values in the
            node's left subtree, and lesser than the values in its right
            subtree. All the operations are done maintaning this property.
          </p>
          <p></p>
          <button className="ds-button" onClick={() => navigate("/bst")}>
            Visualize Binary Search Tree
          </button>
        </div>
        <div className="ds-img">
          <div className="ds-img-container">
            <img src={bstimage} alt="" />
          </div>
        </div>
      </div>

      <div className="ds-container">

      <div className="ds-info">
          <h1 id="title-bst">II. Linked List</h1>
          <p>
            A linked list is a data structure that store its items in a linear
            fashion, but the items are not stored in sequence, but rather in
            random memory locations, and are reached with pointers, where each
            item holds the pointer for the next item in the sequence.
          </p>
          <p></p>
          <button className="ds-button" onClick={() => navigate("/linkedlist")}>
            Visualize Linked List
          </button>
        </div>


        <div className="ds-img">
          <div className="ds-img-container">
            <img src={linkedlistimage} alt="" />
          </div>
        </div>
      </div>

      <div className="ds-container">
        <div className="ds-info">
          <h1 id="title-bst">III. Stack</h1>
          <p>
            A stack is a data structure where the elements are stored in
            sequence, but only the element at the top can be acessed or removed
            at any time.
          </p>
          <p></p>
          <button className="ds-button" onClick={() => navigate("/stack")}>
            Visualize Stack
          </button>
        </div>

        <div className="ds-img">
          <div className="ds-img-container">
            <img src={stackimage} alt="" />
          </div>
        </div>
      </div>

      <div className="ds-container">
        <div className="ds-info">
          <h1 id="title-bst">IV. Queue</h1>
          <p>In delevopment</p>
          <p></p>
        </div>

        <div className="ds-img"></div>
      </div>

      <div className="ds-container">
        
      <div className="ds-info">
          <h1 id="title-bst">V. Heap</h1>
          <p>In development</p>
          <p></p>
        </div>
        
        <div className="ds-img"></div>

        
      </div>
    </div>
  );
};

export default Homepage;
