import React from "react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Stack = () => {
  const navigate = useNavigate();

  const svgref = useRef(); //reference to SVG element
  const svgContainer = useRef(); //reference to the div container that wraps the SVG element

  const MAX_SIZE = 7;

  const stack = [];

  let top = -1;
  let place = 80;
  const IDs = [];
  let id = 1;
  let pushButton = "";
  let popButton = "";

  const push = () => {
    let input = document.getElementById("pushInput");
    if (input.value === "") return;
    const value = parseInt(input.value);
    if (top === MAX_SIZE) {
      console.log("stack overflow");
      animateStackOverflow(value);
      return;
    }
    stack.push(value);
    IDs.push(id++);
    top++;
    console.log(stack);
    animatePush(value, id - 1);
  };

  const pop = () => {
    if (top === -1) {
      console.log("empty stack");
      animateEmpty();
      return;
    }

    stack.pop();
    const lastid = IDs.pop();
    top--;
    id--;
    console.log(stack);
    animatePop(lastid);
  };

  const animateEmpty = () => {
    let textoroot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textoroot.setAttributeNS(null, "x", `53`);
    textoroot.setAttributeNS(null, "y", `60`);
    textoroot.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    textoroot.textContent = `Empty Stack`;
    textoroot.setAttribute("class", "texto");
    svgref.current.appendChild(textoroot);

    setTimeout(() => {
      textoroot.remove();
    }, 1000);
  };

  const animatePush = (value, id) => {
    popButton.disabled = true;
    pushButton.disabled = true;
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "31");
    rect.setAttribute("y", "-200");
    rect.setAttribute("width", "43");
    rect.setAttribute("height", "9");
    rect.setAttribute("fill", "#254569");
    rect.setAttribute("class", "rect");
    rect.setAttribute("id", `${id}`);

    svgref.current.append(rect);

    document.getElementById("topStack").innerText = `TOP:${top}`;

    setTimeout(() => {
      const r = document.getElementById(id);
      r.setAttribute("y", `${place}`);
      place -= 10;

      let textoroot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textoroot.setAttributeNS(null, "x", `53`);
      textoroot.setAttributeNS(null, "y", `${place + 16}`);
      textoroot.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#ffffff ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      textoroot.textContent = `${value}`;
      textoroot.setAttribute("class", "texto");
      textoroot.setAttribute("id", `${id}t`);
      svgref.current.appendChild(textoroot);

      textoroot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textoroot.setAttributeNS(null, "x", `80`);
      textoroot.setAttributeNS(null, "y", `${place + 16}`);
      textoroot.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      textoroot.textContent = `${id - 1}`;
      textoroot.setAttribute("class", "texto");
      textoroot.setAttribute("id", `${id}t_id`);
      svgref.current.appendChild(textoroot);

      setTimeout(() => {
        console.log(r);
        popButton.disabled = false;
        pushButton.disabled = false;
      }, 1000);
    }, 50);
  };

  const animateStackOverflow = (value) => {
    popButton.disabled = true;
    pushButton.disabled = true;
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "31");
    rect.setAttribute("y", `-200`);
    rect.setAttribute("width", "43");
    rect.setAttribute("height", "9");
    rect.setAttribute("fill", "#254569");
    rect.setAttribute("class", "rect");
    rect.setAttribute("id", `stackoverflowrect`);

    svgref.current.append(rect);

    setTimeout(() => {
      const r = document.getElementById("stackoverflowrect");
      r.setAttribute("y", `${place}`);
    }, 50);

    setTimeout(() => {
      let textoroot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textoroot.setAttributeNS(null, "x", `50`);
      textoroot.setAttributeNS(null, "y", `50`);
      textoroot.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#ed000c ;font-size:50%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      textoroot.textContent = `STACK OVERFLOW`;
      textoroot.setAttribute("class", "texto");
      textoroot.setAttribute("id", "stackoverflow");
      svgref.current.appendChild(textoroot);

      setTimeout(() => {
        document.getElementById("stackoverflow").remove();

        const r = document.getElementById("stackoverflowrect");
        r.setAttribute("x", `200`);

        setTimeout(() => {
          document.getElementById("stackoverflowrect").remove();
          popButton.disabled = false;
          pushButton.disabled = false;
        }, 1000);
      }, 2500);
    }, 1000);
  };

  const animatePop = (id) => {
    document.getElementById("topStack").innerText = `TOP:${top}`;
    popButton.disabled = true;
    pushButton.disabled = true;
    const rect = document.getElementById(id);
    const text = document.getElementById(`${id}t`);
    const t_id = document.getElementById(`${id}t_id`);
    rect.setAttribute("y", "-200");
    text.setAttribute("y", "-200");
    t_id.remove();
    place += 10;
    setTimeout(() => {
      rect.remove();
      text.remove();
      popButton.disabled = false;
      pushButton.disabled = false;
    }, 700);
  };

  useEffect(() => {
    // svgref.current.style.border = "1px solid #254569";
    svgref.current.style.borderRadius = "0.3vw";
    svgref.current.style.width = "70vw";
    svgref.current.style.height = "90vh";

    let linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linha.setAttribute("x1", `30`);
    linha.setAttribute("y1", `90`);
    linha.setAttribute("x2", `75`);
    linha.setAttribute("y2", `90`);
    linha.setAttribute("class", "linhaStack");
    linha.setAttribute("id", "base");
    linha.style.stroke = "#254569";
    linha.style.strokeWidth = "0.03vw";

    svgref.current.append(linha);

    linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linha.setAttribute("x1", `30`);
    linha.setAttribute("y1", `90`);
    linha.setAttribute("x2", `30`);
    linha.setAttribute("y2", `10`);
    linha.setAttribute("class", "linhaStack");
    linha.setAttribute("id", "leftline");
    linha.style.stroke = "#254569";
    linha.style.strokeWidth = "0.03vw";

    svgref.current.append(linha);

    linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linha.setAttribute("x1", `75`);
    linha.setAttribute("y1", `90`);
    linha.setAttribute("x2", `75`);
    linha.setAttribute("y2", `10`);
    linha.setAttribute("class", "linhaStack");
    linha.setAttribute("id", "rightline");
    linha.style.stroke = "#254569";
    linha.style.strokeWidth = "0.03vw";

    svgref.current.append(linha);

    let textoroot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textoroot.setAttributeNS(null, "x", `30`);
    textoroot.setAttributeNS(null, "y", `8`);
    textoroot.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#254569 ;font-size:20%; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    textoroot.textContent = `MAX_SIZE`;
    textoroot.setAttribute("class", "texto");
    svgref.current.appendChild(textoroot);

    textoroot = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textoroot.setAttributeNS(null, "x", `53`);
    textoroot.setAttributeNS(null, "y", `95`);
    textoroot.setAttributeNS(
      null,
      "style",
      "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
    );
    textoroot.textContent = `STACK`;
    textoroot.setAttribute("class", "texto");
    svgref.current.appendChild(textoroot);

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

    setInputFilter(document.getElementById("pushInput"), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 9999999))
      );
    });

    pushButton = document.getElementById("pushButton");
    popButton = document.getElementById("popButton");
  }, []);

  return (
    <div className="Stack">
      <div id="StackContainer">
        <div id="infostack">
          <div id="nameStack">
            <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              ← return
            </p>
            <h3>STACK VISUALIZATION</h3>
          </div>
          <div>
            <input type="text" placeholder="Add a element" id="pushInput" />
            <button id="pushButton" onClick={push} className="button">
              Push
            </button>
          </div>
          <div>
            <p></p>
            <button id="popButton" onClick={pop} className="button">
              Pop
            </button>
          </div>
          <div id="varStack">
            <h1 id="topStack">TOP:-1</h1>
            <p>
              A stack is a data structure that stores the values in a linear
              sequence of items. There are two operations, Pop and Push, and
              they are performed in a LIFO order (Last In Firt Out). The items
              are stored one after another, and only the element at the top can
              be removed from the stack. Similarly, items can only be inserted
              in the top.
            </p>
          </div>
        </div>
        <div id="svgcontainerStack" ref={svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svgStack"
            viewBox="0 0 100 100"
            ref={svgref}
          ></svg>
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

export default Stack;
