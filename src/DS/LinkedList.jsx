///////João Gabriel Ferreira/////////////////
///////This code generates a visualization tool for Linked Lists
import React from "react";
import { useRef, useEffect } from "react";

const LinkedList = () => {
  const svgref = useRef(); //reference to SVG element
  const svgContainer = useRef(); //reference to the div container that wraps the SVG element

  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.x = 0;
      this.y = 0;
      this.isHEAD = false;
      this.id = 0;
    }
  }

  let HEAD = null;
  let positions = [];
  let used = [];
  const MAX_ID = 66;

  const add = () => {
    let value = document.getElementById("insertInput").value;
    if (value === "") return;
    value = parseInt(value);
    insert(value);
  };

  const insert = (value) => {
    if (used.length === MAX_ID) {
      console.log("memory is full");
      return;
    }

    if (HEAD === null) {
      const node = new Node(value);
      node.isHEAD = true;
      HEAD = node;
      print();
      animateInsertion(node, null);
      return;
    }

    let current = HEAD;
    while (current.next !== null) {
      current = current.next;
    }

    const node = new Node(value);
    current.next = node;

    print();
    animateInsertion(current.next, current);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const animateInsertion = (node, anterior) => {
    let pos = 0;
    let x = 0,
      y = 0;
    while (true) {
      const id = getRandomInt(1, 67);
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

    node.id = pos.id;
    node.x = pos.x;
    node.y = pos.y;

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", `${pos.x}`);
    rect.setAttribute("y", `${pos.y + 2}`);
    rect.setAttribute("width", "11");
    rect.setAttribute("height", "10");
    rect.setAttribute("fill", "#254569");
    rect.setAttribute("class", "rect");
    rect.setAttribute("id", `${pos.id}`);

    svgref.current.append(rect);

    let valuetext = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    valuetext.setAttributeNS(null, "x", `${pos.x + 6}`);
    valuetext.setAttributeNS(null, "y", `${pos.y + 6}`);
    valuetext.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#ffffff ;font-size:0.2vw; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    valuetext.textContent = `${node.value}`;
    valuetext.setAttribute("id", `${pos.id}t`);
    svgref.current.appendChild(valuetext);

    let nexttext = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      nexttext.setAttributeNS(null, "x", `${pos.x + 5.5}`);
      nexttext.setAttributeNS(null, "y", `${pos.y + 10}`);
      nexttext.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#ffffff ;font-size:0.13vw; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      nexttext.textContent = `Next: NULL`;
      nexttext.setAttribute("id", `${pos.id}t_next`);
      svgref.current.appendChild(nexttext);

    if (anterior === null) {
      //adding the head
      let r = document.getElementById(`${pos.id}`);
      r.setAttribute("stroke", "#d16900");
      r.setAttribute("stroke-width", "0.3");
    } else {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
    //   linha.setAttribute("x2", `${pos.x + 6}`);
    //   linha.setAttribute("y2", `${pos.y + 6}`);
    //   linha.setAttribute("x1", `${anterior.x + 6}`);
    //   linha.setAttribute("y1", `${anterior.y + 6}`);
    //   linha.setAttribute("marker-end", `url(#arrowhead)`);
    //   linha.style.stroke = "#254569";
    //   linha.style.strokeWidth = "0.03vw";
    //   linha.setAttribute("class", "linhaList");
    //   svgref.current.append(linha);

    document.getElementById( `${anterior.id}t_next`).textContent = `Next: ${node.id}`;
        
    }
  };

  const lookup = () => {
    let value = document.getElementById("searchInput").value;
    if (value === "") return;
    value = parseInt(value);

    search(value);
  };

  const search = (value) => {
    let current = HEAD;

    let nodeList = [];
    while (current !== null) {
        nodeList.push(current);
      if (current.value === value) {
        console.log("the value is in the list");
        animateSeach(current,nodeList);
        return;
      }
      current = current.next;
    }
    nodeList.push(null);
    animateSeach(current,nodeList);
  }

    const animateSeach = (node,nodeList) =>{

        console.log(nodeList);
        for(let i = 0;i<nodeList.length;i++)
        {
            if(nodeList[i] === null)return;

            setTimeout(() => {
                const r = document.getElementById(`${nodeList[i].id}`);
                if(nodeList[i+1] === null)
                {
                    r.setAttribute("stroke", "#a80000");
                    r.setAttribute("stroke-width", "0.8");
                }else
                {

                    if(i === nodeList.length - 1)
                    {
                        r.setAttribute("stroke", "#00940a");
                        r.setAttribute("stroke-width", "0.8");
                    }else
                    {
                        r.setAttribute("stroke", "#00940a");
                        r.setAttribute("stroke-width", "0.5");
                    }

                }
                let linha = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                  );

                setTimeout(() => {
                    
                    const n = document.getElementById(`${nodeList[i].id}t_next`);
                    n.setAttributeNS(
                        null,
                        "style",
                        "text-anchor:middle; fill:#ffffff ;font-size:0.2vw; font-weight:bold; font-family:Poppins; dy=.3em"
                      );

                    
                      if(i < nodeList.length - 1 && nodeList[i] !== null){
                      linha.setAttribute("x1", `${nodeList[i].x + 6}`);
                      linha.setAttribute("y1", `${nodeList[i].y + 6}`);
                      linha.setAttribute("x2", `${nodeList[i+1].x + 6}`);
                      linha.setAttribute("y2", `${nodeList[i+1].y + 6}`);
                      linha.style.stroke = "#254569";
                      linha.style.strokeWidth = "0.01vw";
                      linha.setAttribute("class", "linhaSearch");
                      svgref.current.append(linha);
                      }


                }, 500);

                setTimeout(() => {
                    
                    linha.remove();

                    if(nodeList[i].isHEAD)
                    {
                        r.setAttribute("stroke", "#d16900");
                        r.setAttribute("stroke-width", "0.3");
                        
                    }else{
                        r.setAttribute("stroke-width","0");
                    }
                    const n = document.getElementById(`${nodeList[i].id}t_next`);
                    n.setAttributeNS(
                        null,
                        "style",
                        "text-anchor:middle; fill:#ffffff ;font-size:0.13vw; font-weight:bold; font-family:Poppins; dy=.3em"
                      );
                }, 2000);

            }, 3000*i);
        }

  };

  const update = (old, _new) => {};

  const erase = () => {
    let value = document.getElementById("deleteInput").value;
    if (value === "") return;
    value = parseInt(value);

    deletion(value);
  };

  const deletion = (value) => {
    if (!search(value)) {
      console.log("the value is NOT in the list");
      return;
    }

    let current = HEAD;

    if (HEAD.value === value) {
      HEAD = HEAD.next;
      if (HEAD !== null) HEAD.isHEAD = true;
      print();
      return;
    }

    while (current.next.value !== value) {
      current = current.next;
    }

    current.next = current.next.next;
    print();
  };

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
    svgref.current.style.width = "70vw";
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

    let pos = -33;
    for (let i = 1; i <= 12; i++) {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `${pos}`);
      linha.setAttribute("y1", `10`);
      linha.setAttribute("x2", `${pos}`);
      linha.setAttribute("y2", `100`);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.01vw";
      linha.setAttribute("class", "linhaList");
      svgref.current.append(linha);
      pos += 15;
    }

    pos = 10;
    for (let i = 1; i <= 8; i++) {
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `-33`);
      linha.setAttribute("y1", `${pos}`);
      linha.setAttribute("x2", `132`);
      linha.setAttribute("y2", `${pos}`);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.01vw";
      linha.setAttribute("class", "linhaList");
      svgref.current.append(linha);
      pos += 15;
    }

    let textoroot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textoroot.setAttributeNS(null, "x", `50`);
    textoroot.setAttributeNS(null, "y", `8`);
    textoroot.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#254569 ;font-size:0.2vw; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    textoroot.textContent = `MEMORY`;
    svgref.current.appendChild(textoroot);

    let inirow = -33;
    let inicol = 10;
    let row = [];
    let id = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 11; j++) {
        positions.push({ x: inirow + 2, y: inicol + 2, id: id });
        let textoroot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textoroot.setAttributeNS(null, "x", `${inirow + 6}`);
        textoroot.setAttributeNS(null, "y", `${inicol + 2.5}`);
        textoroot.setAttributeNS(
          null,
          "style",
          "text-anchor:middle; fill:#254569 ;font-size:0.2vw; font-weight:bold; font-family:Poppins; dy=.3em"
        );
        textoroot.textContent = `#${mempos++}`;
        svgref.current.appendChild(textoroot);
        id++;
        inirow += 15;
      }
      inirow = -33;
      inicol += 15;
    }

    setInputFilter(document.getElementById("insertInput"), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 9999999))
      );
    });
  }, []);

  return (
    <div className="LinkedList">
      <div id="StackContainer">
        <div id="infostack">
          <div id="nameStack">
            <h3>LinkedList Visualization Tool</h3>
          </div>
          <div>
            <input type="text" placeholder="Add a element" id="insertInput" />
            <button id="insertButton" onClick={add}>
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
            <button id="seachtButton" onClick={lookup}>
              Search
            </button>
          </div>
          <p></p>
          <div>
            <input
              type="text"
              placeholder="Seach for a element"
              id="deleteInput"
            />
            <button id="deleteButton" onClick={erase}>
              Delete
            </button>
          </div>
          <p></p>
          <div>A linked list is a data structure where the elements are stored in a linear fashion, but the sequence is not based on memory location. Each item stores the data and a pointer to the next item, this way, the items can be stored randomly in the memory. All items can be reached from a initial pointer called Head.</div>
        </div>
        <div id="svgcontainerStack" ref={svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svgStack"
            viewBox="0 0 100 100"
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
