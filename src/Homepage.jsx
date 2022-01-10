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
          <h1>Data structures Visualization</h1>
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
        <p>
          Visualize the operations for the most important data structures with
          animations.
        </p>

      </div>

      <div className="ds-container">
        <div className="ds-info">
          <h1 id="title-bst">Binary Search Tree</h1>
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
        <div className="ds-img">
          <div className="ds-img-container">
            <img src={linkedlistimage} alt="" />
          </div>
        </div>
        <div className="ds-info">
          <h1 id="title-bst">Linked List</h1>
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
      </div>

      <div className="ds-container">
        <div className="ds-info">
          <h1 id="title-bst">Stack</h1>
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
          <h1 id="title-bst">Queue</h1>
          <p>In delevopment</p>
          <p></p>
        </div>

        <div className="ds-img"></div>
      </div>

      <div className="ds-container">
        <div className="ds-img"></div>

        <div className="ds-info">
          <h1 id="title-bst">Heap</h1>
          <p>In development</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
