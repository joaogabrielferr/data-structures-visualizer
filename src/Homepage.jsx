import React from "react";
import { useNavigate } from "react-router-dom";
import bstimage from "./Images/bstimage.PNG";
import linkedlistimage from "./Images/linkedlistimage.PNG";
import stackimage from "./Images/stackimage.PNG";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="Homepage">
      <div id="DSContainer">
        <div id="HomepageHeader">
          <div id="innerheader">
            <h1>Data Structures Visualization</h1>
            <div>
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
        </div>

        <div className="datastructure" id="bstdatastructure">
          <div className="innerdatastructure">
            <div className="infodatastructure">
              <h1>Binary Search Tree</h1>
              <p>
                A binary Search Tree is a binary tree where for each node, the
                data stored in the node is greater than all the values stored in
                the node's left subtree, and lesser than all the values stored
                in its right subtree. All the operations are done mantaining
                this property.
              </p>
              <button onClick={() => navigate("/bst")} className = "visualizeButton">Visualize</button>
            </div>

            <div className="imgdatastructure">
              <div className="innerimgdatastructure">
                <img src={bstimage} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="datastructure" id="linkedlistcontainer">
          <div className="innerdatastructure">
            <div className="infodatastructure">
              <h1>Linked List</h1>
              <p>
                A linked list is a data structure that stores its items in a
                linear fashion, but the elements are not stored in sequence in
                the memory, but rather in random locations, and can be retrieved
                using pointers.
              </p>
              <button onClick={() => navigate("/linkedlist")} className = "visualizeButton">Visualize</button>
            </div>

            <div className="imgdatastructure">
              <div className="innerimgdatastructure">
                <img src={linkedlistimage} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="datastructure" id="stackcontainer">
          <div className="innerdatastructure">
            <div className="infodatastructure">
              <h1>Stack</h1>
              <p>
                A stack is a data structure that stores its items following the
                LIFO order (Last In First Out). That means that the items are
                stores in a linear sequence, but only the last element added can
                be acessed or removed at any time.
              </p>
              <button onClick={() => navigate("/stack")} className = "visualizeButton">Visualize</button>
            </div>

            <div className="imgdatastructure">
              <div className="innerimgdatastructure">
                <img src={stackimage} alt="" />
              </div>
            </div>
          </div>
        </div>



        <div className="datastructure" id="queuecontainer">
          <div className="innerdatastructure">
            <div className="infodatastructure">
              <h1>Queue</h1>
              <p>
                In development
              </p>
              
            </div>

            <div className="imgdatastructure">
              <div className="innerimgdatastructure">
                
              </div>
            </div>
          </div>
        </div>


        <div className="datastructure" id="heapcontainer">
          <div className="innerdatastructure">
            <div className="infodatastructure">
              <h1>Heap</h1>
              <p>
                In development
              </p>
              
            </div>

            <div className="imgdatastructure">
              <div className="innerimgdatastructure">
                
              </div>
            </div>
          </div>
        </div>



      </div>

      <div id="footer-home">
                João Gabriel &nbsp; <a href='https://github.com/joaogabrielferr' target={"_blank"}><i className="fab fa-github"></i></a>
                &nbsp;<a href="https://www.linkedin.com/in/joaogabrielferr/" target={"_blank"}><i className="fab fa-linkedin"></i></a>  </div>

    </div>
  );
};

export default Homepage;
