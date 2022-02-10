import React from "react";
import { useNavigate } from "react-router-dom";
import bstimage from "./Images/bstimage.PNG";
import linkedlistimage from "./Images/linkedlistimage.PNG";
import stackimage from "./Images/stackimage.PNG";
import ApresentacaoDS from "./ApresentacaoDS";

const Homepage = () => {
  const navigate = useNavigate();

  const abre = "{";
  const fecha = "}";

  return (
    <div className="Homepage">
      <section className="header">
        <div className="inner-header">
          <div className="logo">
            <h1>Data Structure Visualization</h1>
            <p>
              Visualize the main data structures and how they maintain their
              properties after every operation
            </p>
          </div>
          <a href="https://github.com/joaogabrielferr/data-structures-visualizer" target={"_blank"} id="header-button">
            Repository on Github
          </a>
        </div>
      </section>

      <ApresentacaoDS
        title = {"Binary Search Tree"}
        desc = {"A binary search tree is a binary tree where, for each node, the value stored in that node is greater than all the values in the node's left subtree, and lesser than the values in its right subtree. All the operations are done maintaning this property."}
        color = {"#9bcede"}
        img = {bstimage}
        fontColor = {"#111"}
        buttonClass = {"visualize-button-1"}
        done = {true}
        link = {"/bst"}
        
      >
      </ApresentacaoDS>
      <ApresentacaoDS
        title = {"Linked List"}
        desc = {"A linked list is a data structure that store its items in a linear fashion, but the items are not stored in sequence, but rather in random memory locations, and are reached with pointers, where each item holds the pointer for the next item in the sequence."}
        color = {"#111"}
        img = {linkedlistimage}
        fontColor = {"#fff"}
        buttonClass = {"visualize-button-2"}
        done = {true}
        link = {"/linkedlist"}
      >
      </ApresentacaoDS>
      <ApresentacaoDS
        title = {"Stack"}
        desc = {"A stack is a data structure where the elements are stored in sequence, but only the element at the top can be acessed or removed at any time."}
        color = {"#9bcede"}
        img = {stackimage}
        fontColor = {"#111"}
        buttonClass = {"visualize-button-1"}
        done = {true}
        link = {"/stack"}
      >
      </ApresentacaoDS>
      <ApresentacaoDS
        title = {"Queue"}
        desc = {""}
        color = {"#111"}
        img = {linkedlistimage}
        fontColor = {"#fff"}
        buttonClass = {"visualize-button-2"}
        done = {false}

      >
      </ApresentacaoDS>
      <ApresentacaoDS
        title = {"Heap"}
        desc = {""}
        color = {"#9bcede"}
        img = {linkedlistimage}
        fontColor = {"#111"}
        buttonClass = {"visualize-button-1"}
        done = {false}

      >
      </ApresentacaoDS>
      <ApresentacaoDS
        title = {"Red Black Tree"}
        desc = {""}
        color = {"#111"}
        img = {linkedlistimage}
        fontColor = {"#fff"}
        buttonClass = {"visualize-button-1"}
        done = {false}

      >
      </ApresentacaoDS>

      <section className="footer">
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
      </section>

    </div>
  );
};

export default Homepage;
