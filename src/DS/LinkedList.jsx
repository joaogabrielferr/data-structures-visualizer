///////João Gabriel Ferreira/////////////////
///////This code generates a visualization tool for Linked Lists
import React from "react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LinkedList = () => {

  const navigate = useNavigate();

  const svgref = useRef(); //reference to SVG element
  const svgContainer = useRef(); //reference to the div container that wraps the SVG element

  class Node {
    constructor(value) {
      this.value = value; //data stored
      this.next = null; //pointer to the next node
      this.x = 0; //x coordinate for this node in the svg area
      this.y = 0; //y coordinate for this node in the svg area
      this.isHEAD = false;
      this.id = 0;
    }
  }

  let HEAD = null;
  let positions = [];
  let used = [];
  const MAX_ID = 54;
  let insertButton = null;
  let searchButton = null;
  let deleteButton = null;


  //get the value to insert from the input
  const add = () => {
    let value = document.getElementById("insertInput").value;
    if (value === "") return;
    value = parseInt(value);
    insert(value);
  };


  //////INSERT OPERATION/////////////////
  const insert = (value) => {
    if (used.length === MAX_ID) {
      console.log("memory is full");
      animateFullMemory();
      return;
    }

    insertButton.disabled = true;
    searchButton.disabled = true;
    deleteButton.disabled = true;

    let pos = 0;
    let x = 0,
      y = 0;
    while (true) {
      const id = getRandomInt(1, 55);
      if (!used.includes(id)) {
        for (let i = 0; i < positions.length; i++) {
          if (positions[i].id === id) {
            pos = positions[i];
            used.push(id);
            break;
          }
        }
        break;
      }
    }

    const nodeList = [];

    if (HEAD === null) {
      const node = new Node(value);
      node.id = pos.id;
      node.x = pos.x;
      node.y = pos.y;
      node.isHEAD = true;
      HEAD = node;
      print();
      animateInsertion(node, null,pos);
      setTimeout(() => {
        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
      }, 200);
      return;
    }

    let current = HEAD;
    while (current.next !== null) {
      nodeList.push(current);
      current = current.next;
    }
    nodeList.push(current);
    const node = new Node(value);


    node.id = pos.id;
    node.x = pos.x;
    node.y = pos.y;


    current.next = node;
    nodeList.push(current.next);

    animateSeach(current.next,nodeList,"insert");

    setTimeout(() => {
      animateInsertion(current.next, current,pos);
      setTimeout(() => {
        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
      }, 200);

    }, 2000*(nodeList.length - 1));

    print();


  };


  ///RETURNS RANDOM INTEGER BETWEEN MIN AND MAX - 1//////////////
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  ///////////FUNCTION TO ANIMATE THE INSERTION IN THE MEMORY
  const animateInsertion = (node, anterior,pos) => {
  
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", `${pos.x}%`);
    rect.setAttribute("y", `${pos.y + 2}%`);
    rect.setAttribute("width", "7.5%");
    rect.setAttribute("height", "10%");
    rect.setAttribute("fill", "#254569");
    rect.setAttribute("class", "rect");
    rect.setAttribute("id", `${pos.id}`);

    svgref.current.append(rect);

    let valuetext = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    valuetext.setAttributeNS(null, "x", `${pos.x + 3.5}%`);
    valuetext.setAttributeNS(null, "y", `${pos.y + 6}%`);
    valuetext.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#ffffff ;font-size:100%; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    valuetext.textContent = `${node.value}`;
    valuetext.setAttribute("id", `${pos.id}t`);
    svgref.current.appendChild(valuetext);

    let nexttext = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      nexttext.setAttributeNS(null, "x", `${pos.x + 3.5}%`);
      nexttext.setAttributeNS(null, "y", `${pos.y + 10}%`);
      nexttext.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#ffffff ;font-size:70%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      nexttext.textContent = `Next: NULL`;
      nexttext.setAttribute("id", `${pos.id}t_next`);
      svgref.current.appendChild(nexttext);

    if (anterior === null) {
      //adding the head
      let r = document.getElementById(`${pos.id}`);
      r.setAttribute("stroke", "#d16900");
      r.setAttribute("stroke-width", "0.5%");
    } else {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

    
    document.getElementById( `${anterior.id}t_next`).textContent = `Next: ${node.id}`;
        
    }
  };


  const animateFullMemory = () =>{

      insertButton.disabled = true;
      searchButton.disabled = true;
      deleteButton.disabled = true;

      const memtext = document.getElementById("memtitle");
      memtext.textContent = "MEMORY IS FULL";
      memtext.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#c90300 ;font-size:0.3vw; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      
      setTimeout(() => {

        memtext.textContent = "MEMORY";
        memtext.setAttributeNS(
          null,
          "style",
          "text-anchor:middle; fill:#c90300 ;font-size:0.2vw; font-weight:bold; font-family:Poppins; dy=.3em"
        );
        
        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;


      }, 1500);


  }


  //get the value to search for from input
  const lookup = () => {
    let value = document.getElementById("searchInput").value;
    if (value === "") return;
    value = parseInt(value);

    search(value);
  };

  //////SEARCH OPERATION///////////////
  const search = (value) => {
    let current = HEAD;

    insertButton.disabled = true;
    searchButton.disabled = true;
    deleteButton.disabled = true;

    let nodeList = [];
    while (current !== null) {
        nodeList.push(current);
      if (current.value === value) {
        console.log("the value is in the list");
        animateSeach(current,nodeList,"search");
        setTimeout(() => {
          insertButton.disabled = false;
          searchButton.disabled = false;
          deleteButton.disabled = false;
        }, 2000*(nodeList.length - 1));
        return true;
      }
      current = current.next;
    }
    nodeList.push(null);
    animateSeach(current,nodeList,"search");

    setTimeout(() => {
      insertButton.disabled = false;
      searchButton.disabled = false;
      deleteButton.disabled = false;
    }, 2000*(nodeList.length - 1));

    return false;
  }


    ////////FUNCTION TO ANIMATE THE SEARCH FOR THE NODE IN THE LIST/////////////
    const animateSeach = (node,nodeList,op) =>{

        console.log(nodeList);
        for(let i = 0;i<nodeList.length;i++)
        {
            if(nodeList[i] === null)return;
            if(i === nodeList.length - 1 && op === "insert")return;


            setTimeout(() => {
                const r = document.getElementById(`${nodeList[i].id}`);
                if(nodeList[i+1] === null)
                {
                    r.setAttribute("stroke", "#a80000");
                    r.setAttribute("stroke-width", "1%");
                }else
                {

                    if(i === nodeList.length - 1)
                    {
                        r.setAttribute("stroke", "#00940a");
                        r.setAttribute("stroke-width", "1%");
                    }else
                    {
                        r.setAttribute("stroke", "#00940a");
                        r.setAttribute("stroke-width", "0.5%");
                    }

                }

                const n = document.getElementById(`${nodeList[i].id}t_next`);
                    n.setAttributeNS(
                        null,
                        "style",
                        "text-anchor:middle; fill:#ffffff ;font-size:90%; font-weight:bold; font-family:Poppins; dy=.3em"
                      );

                let linha = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                  );

                setTimeout(() => {
                    
                  
                      if(i < nodeList.length - 1 && nodeList[i] !== null && nodeList[i+1] !== null){
                      linha.setAttribute("x1", `${nodeList[i].x + 6}%`);
                      linha.setAttribute("y1", `${nodeList[i].y + 6}%`);
                      linha.setAttribute("x2", `${nodeList[i+1].x + 6}%`);
                      linha.setAttribute("y2", `${nodeList[i+1].y + 6}%`);
                      linha.style.stroke = "#d16900";
                      linha.style.strokeWidth = "0.5%";
                      linha.setAttribute("class", "linhaSearch");
                      svgref.current.append(linha);
                      }


                }, 1000);

                setTimeout(() => {
                    
                    linha.remove();

                    if(nodeList[i].isHEAD)
                    {
                        r.setAttribute("stroke", "#d16900");
                        r.setAttribute("stroke-width", "0.5%");
                        
                    }else{
                        r.setAttribute("stroke-width","0");
                    }
                    const n = document.getElementById(`${nodeList[i].id}t_next`);
                    n.setAttributeNS(
                        null,
                        "style",
                        "text-anchor:middle; fill:#ffffff ;font-size:70%; font-weight:bold; font-family:Poppins; dy=.3em"
                      );

                }, 1500);

            }, 2000*i);
            
          }
  };

  const update = (old, _new) => {};

  const erase = () => {
    let value = document.getElementById("deleteInput").value;
    if (value === "") return;
    value = parseInt(value);

    deletion(value);
  };

  ///////DELETION OPERATION/////////////////
  const deletion = (value) => {
    if (!search(value)) {
      //console.log("the value is NOT in the list");
      return;
    }

    insertButton.disabled = true;
    searchButton.disabled = true;
    deleteButton.disabled = true;

    let current = HEAD;

    let nodeList = [];
    while(current.value !== value)
    {
        nodeList.push(current);
        current = current.next;
    }
    nodeList.push(current);

    current = HEAD;

    if(HEAD.value !== value){
    while (current.next.value !== value) {
      current = current.next;
    }
  }
    let node = null;
    let id = -1;
    if(HEAD.value !== value)
    {
    node = current.next;
    id = node.id;
    }else
    {
      node = HEAD;
      id = node.id;
    }

    let idx = used.indexOf(id);
    used.splice(idx,1);

    if (HEAD.value === value) {
      console.log("HEAD:",node);
      HEAD = HEAD.next;
      if (HEAD !== null) HEAD.isHEAD = true;
      animateSeach(node,nodeList,"search");

      setTimeout(() => {
        animateDeletion(null,node,HEAD);

        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
        

      }, 2000);


      print();
      return;
    }


    
    current.next = node.next;

    animateSeach(node,nodeList,"search");

    setTimeout(() => {

        animateDeletion(current,node,current.next);

        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
    }, 2000*(nodeList.length-1));

    print();
  };


  ///////////FUNCTION TO ANIMATE THE DELETION OF A NODE//////////////
  const animateDeletion = (prev,node,next) =>{
  

      const textnode = document.getElementById(`${node.id}t_next`);
      textnode.setAttributeNS(
          null,
          "style",
          "text-anchor:middle; fill:#ffffff ;font-size:1%; font-weight:bold; font-family:Poppins; dy=.3em"
        );

      if(prev === null)
      {

        if(next === null)
        {
          //console.log("somente a head.");
          document.getElementById(node.id).remove();
        }else
        {

          let linha = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );  
          linha.setAttribute("x1", `${node.x + 6}%`);
          linha.setAttribute("y1", `${node.y + 6}%`);
          linha.setAttribute("x2", `${next.x + 6}%`);
          linha.setAttribute("y2", `${next.y + 6}%`);
          linha.style.stroke = "#d16900";
          linha.style.strokeWidth = "0.5%";
          linha.setAttribute("class", "linhaSearch");
          svgref.current.append(linha);

          setTimeout(() => {
          
            const nextrect = document.getElementById(next.id);
          nextrect.setAttribute("stroke", "#d16900");
          nextrect.setAttribute("stroke-width", "0.5%");

          linha.remove();
          document.getElementById(node.id).remove();
          }, 1000);
          

        }


      }else if(next === null)
      {
        

        const textprev = document.getElementById(`${prev.id}t_next`);
        textprev.textContent = `Next:NULL`;

        setTimeout(() => {
          document.getElementById(`${node.id}t_next`).remove();
          document.getElementById(node.id).remove();
        }, 1000);

      }else
      {

      setTimeout(() => {
        
        const textprev = document.getElementById(`${prev.id}t_next`);
        textprev.textContent = `Next:${next.id}`;

          setTimeout(() => {

            let linha = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );  
            linha.setAttribute("x1", `${prev.x + 6}%`);
            linha.setAttribute("y1", `${prev.y + 6}%`);
            linha.setAttribute("x2", `${next.x + 6}%`);
            linha.setAttribute("y2", `${next.y + 6}%`);
            linha.style.stroke = "#d16900";
            linha.style.strokeWidth = "0.5%";
            linha.setAttribute("class", "linhaSearch");
            svgref.current.append(linha);

            setTimeout(() => {
              
              textnode.remove();
              const textrect = document.getElementById(`${node.id}`);
              textrect.remove();
              linha.remove();
            }, 1500);


          }, 1000);



      }, 500);

      


    

    }
    


  }


  const print = () => {
    let current = HEAD;
    let string = "";
    while (current !== null) {
      string += current.value + ",";
      current = current.next;
    }
    console.log(string);
  };

  useEffect(() => {
    // svgref.current.style.border = "1px solid #254569";
    svgref.current.style.borderRadius = "0.3vw";
    svgref.current.style.width = "75vw";
    svgref.current.style.height = "90vh";

    //restricts input to only integers less than 9999999
    //taken from https://stackoverflow.com/a/469362
    function setInputFilter(textbox, inputFilter) {
      [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
      ].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        });
      });
    }

    let mempos = 1;

    let pos = 5;
    for (let i = 1; i <= 10; i++) {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `${pos}%`);
      linha.setAttribute("y1", `10%`);
      linha.setAttribute("x2", `${pos}%`);
      linha.setAttribute("y2", `100%`);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.1vw";
      linha.setAttribute("class", "linhaList");
      svgref.current.append(linha);
      pos += 10;
    }

    pos = 10;
    for (let i = 1; i <= 8; i++) {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `5%`);
      linha.setAttribute("y1", `${pos}%`);
      linha.setAttribute("x2", `95%`);
      linha.setAttribute("y2", `${pos}%`);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.1vw";
      linha.setAttribute("class", "linhaList");
      svgref.current.append(linha);
      pos += 15;
    }

    let textoroot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textoroot.setAttributeNS(null, "x", `50%`);
    textoroot.setAttributeNS(null, "y", `7%`);
    textoroot.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#254569 ;font-size:100%; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    textoroot.textContent = `MEMORY`;
    textoroot.setAttribute("id", `memtitle`)
    svgref.current.appendChild(textoroot);

    // let inirow = -33;
    // let inicol = 10;
    let inirow = 10;
    let inicol = 10;
    let row = [];
    let id = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push({ x: inirow - 3.7, y: inicol + 2, id: id });
        let textoroot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textoroot.setAttributeNS(null, "x", `${inirow}%`);
        textoroot.setAttributeNS(null, "y", `${inicol + 2.5}%`);
        textoroot.setAttributeNS(
          null,
          "style",
          "text-anchor:middle; fill:#254569 ;font-size:80%; font-weight:bold; font-family:Poppins; dy=.3em"
        );
        textoroot.textContent = `#${mempos++}`;
        svgref.current.appendChild(textoroot);
        id++;
        inirow += 10;
      }
      inirow = 10;
      inicol += 15;
    }

    setInputFilter(document.getElementById("insertInput"), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 9999999))
      );
    });

    insertButton = document.getElementById("insertButton");
    searchButton = document.getElementById("searchButton");;
    deleteButton = document.getElementById("deleteButton");;

  }, []);

  return (
    <div className="LinkedList">
      <div id="StackContainer">
        <div id="infolist">
          <div id="nameStack">
            <p onClick={()=>navigate("/")} style={{cursor:"pointer"}}>← return</p>
            <h3>LINKED LIST VISUALIZATION</h3>
          </div>
          <div>
            <input type="text" placeholder="Add a element" id="insertInput" />
            <button id="insertButton" onClick={add} className="button">
              Insert
            </button>
          </div>
          <p></p>
          <div>
            <input
              type="text"
              placeholder="Seach for a element"
              id="searchInput"
            />
            <button id="searchButton" onClick={lookup} className="button">
              Search
            </button>
          </div>
          <p></p>
          <div>
            <input
              type="text"
              placeholder="Delete a element"
              id="deleteInput"
            />
            <button id="deleteButton" onClick={erase} className="button">
              Delete
            </button>
          </div>
          <p></p>
          <div>A linked list is a data structure where the elements are stored in a linear fashion, but the sequence is not based on memory location. Each item stores the data and a pointer to the next item, this way, the items can be stored randomly in the memory. All items can be reached from a initial pointer called Head.</div>
        </div>
        <div id="svgcontainerList" ref={svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svgStack"
            // viewBox="0 0 100 100"
            ref={svgref}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
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

export default LinkedList;
