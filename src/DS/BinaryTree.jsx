/////////////João Gabriel Ferreira///////////////
//This program creates a visualization tool for a binary search tree
//graphics are created with SVG elements

import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BinaryTree = () => {
  const navigate = useNavigate();

  const svgref = useRef(); //reference to SVG element
  const svgContainer = useRef(); //reference to the div container that wraps the SVG element
  let NODE_COUNTER = 0;
  let MAX_LEVEL = 0;
  let insertButton = null;
  let searchButton = null;
  let deleteButton = null;
  const UPDATE_RATE = 15; //distance a node will move away from other
  const DEFAULT_DISTANCE = 12; //default distance in x between a parent and its children
  const DIFF_FROM_ROOT = 30;
  let INSERTION_SEQUENCE_SPEED = 1000; // in ms //let because the user can change it

  let zoom = 0;

  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.leftdistance = DEFAULT_DISTANCE; //distance between this node and his left child nodes in SVG
      this.rightdistance = DEFAULT_DISTANCE; //distance between this node and his right child nodes in SVG
      this.isROOT = false;
      this.parent = null;
      //x and y are the coordinates in svg
      this.x = 0;
      this.y = 0;
      this.number = 0;
      this.level = 0;
    }
  }

  let ROOT = null;

  //Array of nodes that needs to will have its positions and the positions of its children adjusted
  let nodesToAdjust = [];
  let deleteSequence = [];
  const insertionSoFar = [];

  //////////INSERT OPERATION///////////////
  const insert = (value) => {
    nodesToAdjust = [];

    //clear the log of last operation
    const messageDiv = document.getElementById("message");
    while (messageDiv.firstChild) {
      messageDiv.removeChild(messageDiv.lastChild);
    }

    for (let i = 0; i < insertionSoFar.length; i++) {
      if (insertionSoFar[i] === value) {
        const newMsg = document.createElement("p");
        newMsg.style.color = "red";
        newMsg.innerText = "Duplicate values are not allowed";

        messageDiv.appendChild(newMsg);

        return;
      }
    }

    const newMsg = document.createElement("p");
    newMsg.style.color = "#254569";
    newMsg.innerText = `Inserting ${value} into the tree.`;
    messageDiv.appendChild(newMsg);

    insertionSoFar.push(value);

    let y = null;
    let x = ROOT;
    let level = 0;

    const sequence = []; //sequence of nodes until it reaches the leave where the new node needs to be inserted

    while (x !== null) {
      sequence.push(x);
      y = x;
      //y stores the parent
      if (value < x.value) {
        x = x.left;
      } else {
        x = x.right;
      }
      level++;
    }

    let node = new Node(value);
    node.parent = y;

    //if y === null this the root is being inserted
    if (y === null) {
      node.isROOT = true;
      //values x and y for the root is always 50 and 20
      //for the others ones the position is based on the parent position
      node.x = 50;
      node.y = 30;
      node.isROOT = true;
      node.number = ++NODE_COUNTER;
      node.level = level;
      ROOT = node;
      MAX_LEVEL = 1;

      AnimateInsertion(node, "ROOT", null);

      document.getElementById("message").innerText =
        "ROOT inserted into the tree.";

      //not a root so set the positon based on parent's
    } else if (node.value < y.value) {
      //add node to the left of parent

      const x = y.x - y.leftdistance;
      const yy = y.y + 20; // distance between levels is always 20
      node.x = x;
      node.y = yy;
      node.leftdistance = DEFAULT_DISTANCE;
      node.rightdistance = DEFAULT_DISTANCE;
      node.isROOT = false;
      node.parent = y;
      node.number = ++NODE_COUNTER;
      node.level = level;
      if (MAX_LEVEL < level) MAX_LEVEL = level;
      y.left = node;

      insertButton.disabled = true;
      searchButton.disabled = true;
      deleteButton.disabled = true;

      //first animate the sequence of nodes, then animate the insertion of the new node

      AnimateSequence(sequence, value);

      setTimeout(() => {
        AnimateInsertion(node, "L", y);
        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
        // document.getElementById("message").innerText = "";
      }, sequence.length * INSERTION_SEQUENCE_SPEED + 100);
    } else {
      //add node to the right of parent
      const x = y.x + y.rightdistance;
      const yy = y.y + 20; // distance between levels is always 20
      node.x = x;
      node.y = yy;
      node.leftdistance = DEFAULT_DISTANCE;
      node.rightdistance = DEFAULT_DISTANCE;
      node.isROOT = false;
      node.parent = y;
      node.number = ++NODE_COUNTER;
      node.level = level;
      if (MAX_LEVEL < level) MAX_LEVEL = level;
      y.right = node;

      insertButton.disabled = true;
      searchButton.disabled = true;
      deleteButton.disabled = true;

      AnimateSequence(sequence, value);

      setTimeout(() => {
        AnimateInsertion(node, "R", y);
        insertButton.disabled = false;
        searchButton.disabled = false;
        deleteButton.disabled = false;
        // document.getElementById("message").innerText = "";
      }, sequence.length * INSERTION_SEQUENCE_SPEED + 100);
    }
  };

  const AnimateSequence = (sequence, value) => {
    const messageDiv = document.getElementById("message");

    for (let i = 0; i < sequence.length; i++) {
      setTimeout(() => {
        const newMsg = document.createElement("p");
        if (sequence[i].value < value)
          newMsg.innerText = `${value} > ${sequence[i].value}, going to the right.`;
        else
          newMsg.innerText = `${value} < ${sequence[i].value}, going to the left.`;
        messageDiv.appendChild(newMsg);
        const n = sequence[i].number;
        const id = `${n}c`;
        const node = document.getElementById(id);
        node.setAttribute(
          "style",
          "fill:white; stroke:#2fd900; stroke-width: 1.5;"
        );

        setTimeout(() => {
          node.setAttribute(
            "style",
            "fill:white; stroke:#254569; stroke-width: 1;"
          );
        }, INSERTION_SEQUENCE_SPEED);

        //console.log(node);
      }, INSERTION_SEQUENCE_SPEED * i);
    }
  };

  const add = () => {
    const input = document.getElementById("input");
    if (input.value === "") return;
    const valor = parseInt(input.value);
    insert(valor);
  };

  const AdjustLeft_left_root = (node) => {
    nodesToAdjust.push(node);
    let niveis = Array.apply(null, Array(MAX_LEVEL + 1)).map(function (x, i) {
      return [];
    });
    niveis = levelTraversal(niveis, ROOT, 0);

    let index = -1;

    for (let i = 0; i < niveis[node.level].length; i++) {
      if (node === niveis[node.level][i]) {
        index = i;
        break;
      }
    }

    //if the node is the first in its level nothing needs to be done
    if (index === -1 || index < 1) return;
    if (niveis[node.level][index - 1].x < ROOT.x) return;

    //find lowest common ancestor between niveis[node.level][index-1] and niveis[node.level][index]
    AdjustLeft_left_root(
      LowestCommonAncestor(
        ROOT,
        niveis[node.level][index - 1].value,
        niveis[node.level][index].value
      )
    );
  };

  const AdjustRight_right_root = (node) => {
    nodesToAdjust.push(node);
    let niveis = Array.apply(null, Array(MAX_LEVEL + 1)).map(function (x, i) {
      return [];
    });
    niveis = levelTraversal(niveis, ROOT, 0);

    let index = -1;

    for (let i = 0; i < niveis[node.level].length; i++) {
      if (node === niveis[node.level][i]) {
        index = i;
        break;
      }
    }

    //if the node is the last in its level nothing needs to be done
    if (index === -1 || index === niveis[node.level].length - 1) return;
    if (niveis[node.level][index + 1].x > ROOT.x) return;

    AdjustRight_right_root(
      LowestCommonAncestor(
        ROOT,
        niveis[node.level][index + 1].value,
        niveis[node.level][index].value
      )
    );
  };

  const levelTraversal = (niveis, node, level) => {
    if (node === null) return niveis;

    niveis[level].push(node);

    niveis = levelTraversal(niveis, node.left, level + 1);
    niveis = levelTraversal(niveis, node.right, level + 1);

    return niveis;
  };

  const LowestCommonAncestor = (node, v1, v2) => {
    if (node === null) return null;

    if (node.value > v1 && node.value > v2)
      return LowestCommonAncestor(node.left, v1, v2);

    if (node.value < v1 && node.value < v2)
      return LowestCommonAncestor(node.right, v1, v2);

    return node;
  };

  const PulltoLeft = (node) => {
    console.log("em pull to left com node:", node);
    //first increase distance of left child, then update the position of all
    //the nodes to the left
    if (node.x === null || node.left === null) return;
    const n = node.left.number;
    const id = n + "c";
    const no = document.getElementById(id);
    no.setAttribute("cx", node.left.x - UPDATE_RATE);
    node.left.x -= UPDATE_RATE;
    node.leftdistance += UPDATE_RATE;

    const idlinha = id + "l";
    const linha = document.getElementById(idlinha);
    linha.setAttribute("x2", node.left.x);

    const idtexto = node.left.number + "t";
    const texto = document.getElementById(idtexto);
    texto.setAttribute("x", node.left.x);

    //now updates the positions of all the children
    const queue = [];
    queue.push(node.left);

    while (queue.length > 0) {
      const current = queue.shift();
      //console.log("current:",current);
      if (current.left !== null) {
        setTimeout(() => {
          const n = current.left.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x - current.leftdistance);
          current.left.x = current.x - current.leftdistance;

          const idlinha = id + "l";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x - 5);
          linha.setAttribute("x2", current.x - current.leftdistance);
          //console.log(linha);

          const idtexto = current.left.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x - current.leftdistance);
        }, 100);
      }

      if (current.right !== null) {
        setTimeout(() => {
          const n = current.right.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x + current.rightdistance);
          current.right.x = current.x + current.rightdistance;

          const idlinha = id + "r";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x + 5);
          linha.setAttribute("x2", current.x + current.rightdistance);

          const idtexto = current.right.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x + current.rightdistance);
        }, 100);
      }

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  };

  const PulltoRight = (node) => {
    //first increase distance of right child, then update the position of all
    //the nodes to the left
    console.log("em pull to right com node:", node);
    if (node.x === null || node.right === null) return;
    const n = node.right.number;
    const id = n + "c";
    const no = document.getElementById(id);
    no.setAttribute("cx", node.right.x + UPDATE_RATE);
    node.right.x += UPDATE_RATE;
    node.rightdistance += UPDATE_RATE;

    const idlinha = id + "r";
    const linha = document.getElementById(idlinha);
    linha.setAttribute("x2", node.right.x);

    const idtexto = node.right.number + "t";
    const texto = document.getElementById(idtexto);
    texto.setAttribute("x", node.right.x);

    //now updates the positions of all the children
    const queue = [];
    queue.push(node.right);

    while (queue.length > 0) {
      const current = queue.shift();
      //console.log("current:",current);
      if (current.left !== null) {
        setTimeout(() => {
          const n = current.left.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x - current.leftdistance);
          current.left.x = current.x - current.leftdistance;

          const idlinha = id + "l";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x - 5);
          linha.setAttribute("x2", current.x - current.leftdistance);
          //console.log(linha);

          const idtexto = current.left.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x - current.leftdistance);
        }, 100);
      }

      if (current.right !== null) {
        setTimeout(() => {
          const n = current.right.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x + current.rightdistance);
          current.right.x = current.x + current.rightdistance;

          const idlinha = id + "r";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x + 5);
          linha.setAttribute("x2", current.x + current.rightdistance);

          const idtexto = current.right.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x + current.rightdistance);
        }, 100);
      }

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  };

  const AnimateInsertion = (node, direction, y) => {
    if (direction === "ROOT") {
      const textoroot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textoroot.setAttributeNS(null, "x", `${node.x}`);
      textoroot.setAttributeNS(null, "y", `${node.y - 10}`);
      textoroot.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#254569 ;font-size:0.3em; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      textoroot.textContent = `ROOT`;
      textoroot.setAttribute("class", "texto");
      setTimeout(() => {
        svgref.current.appendChild(textoroot);
      }, 300);

      let circulo = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circulo.setAttributeNS(null, "cx", `${node.x}`);
      circulo.setAttributeNS(null, "cy", `${node.y}`);
      circulo.setAttributeNS(null, "r", "7");
      circulo.setAttribute("id", `${node.number}`);
      circulo.setAttributeNS(
        null,
        "style",
        "fill:white; stroke:#254569; stroke-width: 1;"
      );
      circulo.setAttribute("class", "circulo");
      circulo.setAttribute("id", `${node.number}c`);
      svgref.current.appendChild(circulo);

      const texto = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      texto.setAttributeNS(null, "x", `${node.x}`);
      texto.setAttributeNS(null, "y", `${node.y + 1}`);
      texto.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      texto.textContent = `${node.value}`;
      texto.setAttribute("class", "texto");
      texto.setAttribute("id", `${node.number}t`);
      setTimeout(() => {
        svgref.current.appendChild(texto);
      }, 100);
    }

    if (direction === "L") {
      const circulo = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circulo.setAttributeNS(null, "cx", `${node.x}`);
      circulo.setAttributeNS(null, "cy", `${node.y}`);
      circulo.setAttributeNS(null, "r", `7`);
      circulo.setAttributeNS(
        null,
        "style",
        "fill:white; stroke:#254569; stroke-width: 1;"
      );
      circulo.setAttribute("class", "circulo");
      circulo.setAttribute("id", `${node.number}c`);

      //add edge between parent and new node
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `${y.x - 5}`);
      linha.setAttribute("y1", `${y.y + 5}`);
      linha.setAttribute("x2", `${node.x}`);
      linha.setAttribute("y2", `${node.y}`);
      linha.setAttribute("class", "linha");
      const id = node.number + "c" + "l";
      linha.setAttribute("id", id);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.05vw";

      const texto = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      texto.setAttributeNS(null, "x", `${node.x}`);
      texto.setAttributeNS(null, "y", `${node.y + 1}`);
      texto.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
      );
      texto.textContent = `${node.value}`;
      texto.setAttribute("class", "texto");
      texto.setAttribute("id", `${node.number}t`);

      //add edge first and then add node, so edge doesnt overlap node
      svgref.current.appendChild(linha);

      setTimeout(() => {
        svgref.current.appendChild(circulo);
      }, 50);

      setTimeout(() => {
        svgref.current.appendChild(texto);
      }, 150);

      if (node.x < ROOT.x) {
        //to the left of root
        setTimeout(() => {
          let aux = node;
          while (aux.parent.right !== aux) {
            if (aux.parent === ROOT) break;
            aux = aux.parent;
          }

          if (aux.parent !== ROOT) nodesToAdjust.push(aux.parent);
          if (aux.parent === ROOT && node.parent.right !== null)
            nodesToAdjust.push(node.parent);

          AdjustLeft_left_root(node);

          nodesToAdjust = [...new Set(nodesToAdjust)];

          // console.log("nodes to adjust:", nodesToAdjust);
          for (let i = nodesToAdjust.length - 1; i >= 0; i--) {
            PulltoLeft(nodesToAdjust[i]);
          }
        }, 500);
      } //to the right of root
      else {
        let niveis = Array.apply(null, Array(MAX_LEVEL + 1)).map(function (
          x,
          i
        ) {
          return [];
        });
        niveis = levelTraversal(niveis, ROOT, 0);

        let index = -1;

        for (let i = 0; i < niveis[node.level].length; i++) {
          if (node === niveis[node.level][i]) {
            index = i;
            break;
          }
        }
        //console.log(niveis);

        setTimeout(() => {
          // if(index === 0 && niveis[node.level][index].x - ROOT.x < DIFF_FROM_ROOT)
          // {
          //     PulltoRight(ROOT);
          // }
          // if(index !== 0 && niveis[node.level][index-1].x < ROOT.x && niveis[node.level][index].x - ROOT.x < DIFF_FROM_ROOT)
          // {
          //     PulltoRight(ROOT);
          // }

          let aux = node.parent;
          while (aux.parent.right !== aux) {
            aux = aux.parent;
          }

          // if(aux.parent !== ROOT)
          //     nodesToAdjust.push(aux.parent);

          AdjustRight_right_root(aux.parent);

          aux = aux.parent;

          if (aux !== ROOT) {
            while (aux.parent.right !== aux) {
              if (aux.parent === ROOT) break;
              aux = aux.parent;
            }
            if (aux.parent !== null) AdjustRight_right_root(aux.parent);
          }
          AdjustLeft_left_root(node);

          nodesToAdjust = [...new Set(nodesToAdjust)];

          // console.log("nodes to adjust:", nodesToAdjust);

          for (let i = nodesToAdjust.length - 1; i >= 0; i--) {
            PulltoRight(nodesToAdjust[i]);
          }
        }, 500);
      }
    }

    if (direction === "R") {
      const circulo = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circulo.setAttributeNS(null, "cx", `${node.x}`);
      circulo.setAttributeNS(null, "cy", `${node.y}`);
      circulo.setAttributeNS(null, "r", `7`);
      circulo.setAttributeNS(
        null,
        "style",
        "fill:white; stroke:#254569; stroke-width: 1;"
      );
      circulo.setAttribute("class", "circulo");
      circulo.setAttribute("id", `${node.number}c`);

      //add edge between parent and new node
      let linha = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      linha.setAttribute("x1", `${y.x + 5}`);
      linha.setAttribute("y1", `${y.y + 5}`);
      linha.setAttribute("x2", `${node.x}`);
      linha.setAttribute("y2", `${node.y}`);
      linha.setAttribute("class", "linha");
      const id = node.number + "c" + "r";
      linha.setAttribute("id", id);
      linha.style.stroke = "#254569";
      linha.style.strokeWidth = "0.05vw";

      const texto = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      texto.setAttributeNS(null, "x", `${node.x}`);
      texto.setAttributeNS(null, "y", `${node.y + 1}`);
      texto.setAttributeNS(
        null,
        "style",
        "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold;  font-family:Poppins; dy=.3em"
      );
      texto.textContent = `${node.value}`;
      texto.setAttribute("class", "texto");
      texto.setAttribute("id", `${node.number}t`);

      //add edge first and then add node, so edge doesnt overlap node
      svgref.current.appendChild(linha);

      setTimeout(() => {
        svgref.current.appendChild(circulo);
      }, 50);

      setTimeout(() => {
        svgref.current.appendChild(texto);
      }, 150);

      if (node.x > ROOT.x) {
        setTimeout(() => {
          let aux = node;
          while (aux.parent.left !== aux) {
            if (aux.parent === ROOT) break;
            aux = aux.parent;
          }

          if (aux.parent !== ROOT) nodesToAdjust.push(aux.parent);
          if (aux.parent === ROOT && node.parent.left !== null)
            nodesToAdjust.push(node.parent);

          AdjustRight_right_root(node);

          nodesToAdjust = [...new Set(nodesToAdjust)];

          console.log("nodes to adjust:", nodesToAdjust);

          for (let i = nodesToAdjust.length - 1; i >= 0; i--) {
            PulltoRight(nodesToAdjust[i]);
          }
        }, 500);
      } else {
        let niveis = Array.apply(null, Array(MAX_LEVEL + 1)).map(function (
          x,
          i
        ) {
          return [];
        });
        niveis = levelTraversal(niveis, ROOT, 0);

        let index = -1;

        for (let i = 0; i < niveis[node.level].length; i++) {
          if (node === niveis[node.level][i]) {
            index = i;
            break;
          }
        }

        setTimeout(() => {
          // if(index === niveis[node.level].length - 1 && ROOT.x - niveis[node.level][index].x < DIFF_FROM_ROOT)
          // {
          //     PulltoLeft(ROOT);
          // }
          // if(index < niveis[node.level].length - 1 && niveis[node.level][index+1].x > ROOT.x && ROOT.x - niveis[node.level][index].x < DIFF_FROM_ROOT)
          // {
          //     PulltoLeft(ROOT);
          // }

          let aux = node.parent;
          while (aux.parent.left !== aux) {
            aux = aux.parent;
          }

          // if(aux.parent !== ROOT)
          //     nodesToAdjust.push(aux.parent);

          AdjustLeft_left_root(aux.parent);

          aux = aux.parent;

          if (aux !== ROOT) {
            while (aux.parent.right !== aux) {
              if (aux.parent === ROOT) break;
              aux = aux.parent;
            }
            if (aux.parent !== null) AdjustLeft_left_root(aux.parent);
          }
          AdjustRight_right_root(node);

          nodesToAdjust = [...new Set(nodesToAdjust)];

          console.log("nodes to adjust:", nodesToAdjust);

          for (let i = nodesToAdjust.length - 1; i >= 0; i--) {
            PulltoLeft(nodesToAdjust[i]);
          }
        }, 500);
      }
    }
  };

  const look = () => {
    const input = document.getElementById("inputsearch");
    if (input.value === "") return;
    const value = parseInt(input.value);

    const messageDiv = document.getElementById("message");
    while (messageDiv.firstChild) {
      messageDiv.removeChild(messageDiv.lastChild);
    }

    if (ROOT === null) {
      const divMessage = document.getElementById("message");
      const newMsg = document.createElement("p");
      newMsg.innerText = "the tree is currently empty";
      divMessage.appendChild(newMsg);
      return;
    }

    search(value);
  };

  ////////////////SEARCH OPERATION ///////////////////
  const search = (value) => {
    let current = ROOT;

    const sequence = [];
    let inTree = false;
    const divMessage = document.getElementById("message");
    const newMsg = document.createElement("p");
    newMsg.style.color = "#254569";
    newMsg.innerText = `Searching for ${value} in the tree.`;
    divMessage.appendChild(newMsg);
    while (current !== null) {
      sequence.push(current);

      if (value < current.value) {
        if (current.left === null) {
          inTree = false;
          break;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          inTree = false;
          break;
        }
        current = current.right;
      } else if (value === current.value) {
        inTree = true;
        break;
      }
    }

    AnimateSearch(sequence, inTree, value);
    return sequence;
  };

  const AnimateSearch = (sequence, inTree, value) => {
    searchButton.disabled = true;
    insertButton.disabled = true;
    deleteButton.disabled = true;

    const divMessage = document.getElementById("message");

    for (let i = 0; i < sequence.length; i++) {
      setTimeout(() => {
        const newMsg = document.createElement("p");

        if (sequence[i].value < value)
          newMsg.innerText = `${value} > ${sequence[i].value}, going to the right.`;
        else if (sequence[i].value > value)
          newMsg.innerText = `${value} < ${sequence[i].value}, going to the left.`;
        else newMsg.innerText = `${value} = ${sequence[i].value}, found it.`;

        divMessage.appendChild(newMsg);
        const n = sequence[i].number;
        const id = `${n}c`;
        const node = document.getElementById(id);
        node.setAttribute(
          "style",
          "fill:white; stroke:#2fd900; stroke-width: 1.5;"
        );

        setTimeout(() => {
          node.setAttribute(
            "style",
            "fill:white; stroke:#254569; stroke-width: 1;"
          );
        }, INSERTION_SEQUENCE_SPEED);
      }, INSERTION_SEQUENCE_SPEED * i);
    }

    setTimeout(() => {
      if (inTree) {
        const n = sequence[sequence.length - 1].number;
        const id = `${n}c`;
        const node = document.getElementById(id);
        node.setAttribute(
          "style",
          "fill:white; stroke:#497549; stroke-width: 2.0;"
        );

        setTimeout(() => {
          node.setAttribute(
            "style",
            "fill:white; stroke:#254569; stroke-width: 1;"
          );
          const newMsg = document.createElement("p");
          newMsg.innerText = "The value is in the tree.";
          divMessage.appendChild(newMsg);
          searchButton.disabled = false;
          insertButton.disabled = false;
          deleteButton.disabled = false;
        }, INSERTION_SEQUENCE_SPEED / 2);
      } else {
        const newMsg = document.createElement("p");
        divMessage.appendChild(newMsg);
        const n = sequence[sequence.length - 1].number;
        const id = `${n}c`;
        const node = document.getElementById(id);
        node.setAttribute(
          "style",
          "fill:white; stroke:#d60019; stroke-width: 2.0;"
        );
        setTimeout(() => {
          node.setAttribute(
            "style",
            "fill:white; stroke:#254569; stroke-width: 1;"
          );
          newMsg.innerText = "The value is NOT in the tree.";
          divMessage.appendChild(newMsg);
          searchButton.disabled = false;
          insertButton.disabled = false;
          deleteButton.disabled = false;
        }, INSERTION_SEQUENCE_SPEED / 2);
      }
    }, INSERTION_SEQUENCE_SPEED * sequence.length + 200);
  };

  const erase = () => {
    deleteSequence = [];
    const input = document.getElementById("inputdelete");
    if (input.value === "") return;

    const value = parseInt(input.value);

    if (ROOT === null) return;

    const messageDiv = document.getElementById("message");
    while (messageDiv.firstChild) {
      messageDiv.removeChild(messageDiv.lastChild);
    }

    const sequence = search(value);
    let index = -1;
    if (sequence[sequence.length - 1].value === value) {
      setTimeout(() => {
        index = insertionSoFar.indexOf(value);
        if (index > -1) {
          insertionSoFar.splice(index, 1);
        }

        ROOT = deletion(ROOT, value);
        //console.log(ROOT);
        //console.log(deleteSequence);
        setTimeout(() => {
          AnimateDeletion();
        }, 200);
      }, INSERTION_SEQUENCE_SPEED * sequence.length + 500);
    }
  };

  const AnimateDeletion = () => {
    const divMessage = document.getElementById("message");
    for (let i = 0; i < deleteSequence.length; i++) {
      setTimeout(() => {
        const step = deleteSequence[i];

        if (step.op === "NLR") {
          const newMsg = document.createElement("p");
          newMsg.innerText = "Deleting node with no children.";
          divMessage.appendChild(newMsg);
          let id = step.number;
          id = `${id}c`;
          const circle = document.getElementById(id);
          circle.remove();
          const idtexto = `${step.number}t`;
          const texto = document.getElementById(idtexto);
          texto.remove();

          if (step.isroot) {
            //ROOT = null;
          } else {
            let idlinha = "";
            if (step.path === "right") {
              idlinha = `${step.number}cr`;
            } else {
              idlinha = `${step.number}cl`;
            }
            const linha = document.getElementById(idlinha);
            linha.remove();
          }
        } else if (step.op === "NR" || step.op === "NL") {
          let id = `${step.number}c`;
          const circle = document.getElementById(id);
          circle.remove();
          let idtexto = `${step.number}t`;
          const text = document.getElementById(idtexto);
          text.remove();
          if (step.op === "NR") {
            const newMsg = document.createElement("p");
            newMsg.innerText = "Deleting node with no right child.";
            divMessage.appendChild(newMsg);
            let idlinha = `${step.child.number}cl`;
            const linha = document.getElementById(idlinha);
            linha.remove();
          } else {
            const newMsg = document.createElement("p");
            newMsg.innerText = "Deleting node with no left child.";
            divMessage.appendChild(newMsg);
            let idlinha = `${step.child.number}cr`;
            const linha = document.getElementById(idlinha);
            linha.remove();
          }

          //update position of node

          step.child.x = step.x;
          step.child.y = step.y;

          let id2 = `${step.child.number}c`;
          const circle2 = document.getElementById(id2);
          circle2.setAttribute("cx", `${step.x}`);
          circle2.setAttribute("cy", `${step.y}`);

          let idtexto2 = `${step.child.number}t`;
          const text2 = document.getElementById(idtexto2);
          text2.setAttribute("x", `${step.x}`);
          text2.setAttribute("y", `${step.y + 1}`);
          text2.setAttribute("id", `${step.child.number}t`);

          let idlinha = "";

          if (!step.isroot && step.path === "left") {
            idlinha = `${step.number}cl`;
            const l = document.getElementById(idlinha);
            l.setAttribute("id", `${step.child.number}cl`);
          } else if (!step.isroot && step.path === "right") {
            idlinha = `${step.number}cr`;
            const l = document.getElementById(idlinha);
            l.setAttribute("id", `${step.child.number}cr`);
          }

          //update position of other nodes
          setTimeout(() => {
            UpdatePositions(step.child);
          }, 200);
        } else if (step.op === "TN") {
          const newMsg = document.createElement("p");
          newMsg.innerText =
            "Deleting node with no two children. Getting smallest value on the right subtree.";
          divMessage.appendChild(newMsg);
          let idtexto1 = `${step.node.number}t`;
          const text1 = document.getElementById(idtexto1);
          text1.remove();

          let idtexto2 = `${step.current.number}t`;
          const text2 = document.getElementById(idtexto2);
          text2.remove();

          let texto = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          texto.setAttributeNS(null, "x", `${step.node.x}`);
          texto.setAttributeNS(null, "y", `${step.node.y + 1}`);
          texto.setAttributeNS(
            null,
            "style",
            "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
          );
          texto.textContent = `${step.current.value}`;
          texto.setAttribute("class", "texto");
          texto.setAttribute("id", `${step.node.number}t`);
          svgref.current.appendChild(texto);

          texto = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          texto.setAttributeNS(null, "x", `${step.current.x}`);
          texto.setAttributeNS(null, "y", `${step.current.y + 1}`);
          texto.setAttributeNS(
            null,
            "style",
            "text-anchor:middle; fill:#254569 ;font-size:30%; font-weight:bold; font-family:Poppins; dy=.3em"
          );
          texto.textContent = `${step.node.value}`;
          texto.setAttribute("class", "texto");
          texto.setAttribute("id", `${step.current.number}t`);
          setTimeout(() => {
            svgref.current.appendChild(texto);
          }, 50);
        }
      }, INSERTION_SEQUENCE_SPEED * i);
    }
  };

  const UpdatePositions = (node) => {
    const queue = [];
    queue.push(node);

    while (queue.length > 0) {
      const current = queue.shift();
      console.log("atual:", current);
      //console.log("current:",current);
      if (current.left !== null) {
        setTimeout(() => {
          const n = current.left.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x - current.leftdistance);
          no.setAttribute("cy", current.y + 20);
          current.left.x = current.x - current.leftdistance;
          current.left.y = current.y + 20;

          const idlinha = id + "l";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x - 5);
          linha.setAttribute("y1", current.y + 5);
          linha.setAttribute("x2", current.x - current.leftdistance);
          linha.setAttribute("y2", current.y + 20);
          //console.log(linha);

          const idtexto = current.left.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x - current.leftdistance);
          texto.setAttribute("y", current.y + 20);
        }, 100);
      }

      if (current.right !== null) {
        setTimeout(() => {
          const n = current.right.number;
          const id = n + "c";
          const no = document.getElementById(id);
          no.setAttribute("cx", current.x + current.rightdistance);
          no.setAttribute("cy", current.y + 20);
          current.right.x = current.x + current.rightdistance;
          current.right.y = current.y + 20;

          const idlinha = id + "r";
          const linha = document.getElementById(idlinha);
          linha.setAttribute("x1", current.x + 5);
          linha.setAttribute("y1", current.y + 5);
          linha.setAttribute("x2", current.x + current.rightdistance);
          linha.setAttribute("y2", current.y + 20);

          const idtexto = current.right.number + "t";
          const texto = document.getElementById(idtexto);
          texto.setAttribute("x", current.x + current.rightdistance);
          texto.setAttribute("y", current.y + 20);
        }, 100);
      }

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  };

  ////////DELETION OPERATION /////////////////////
  const deletion = (node, value) => {
    if (node === null) return;

    if (value < node.value) node.left = deletion(node.left, value);
    else if (value > node.value) node.right = deletion(node.right, value);
    else {
      if (node.left === null && node.right === null) {
        // console.log("no sem filhos:", node);

        if (node.isROOT) {
          deleteSequence.push({
            op: "NLR",
            number: node.number,
            isroot: node.isROOT,
          });
          return null;
        }

        //deleting a node with no children
        const path = node.parent.left === node ? "left" : "right";
        deleteSequence.push({
          op: "NLR",
          number: node.number,
          parent: node.parent,
          isroot: node.isROOT,
          path: path,
        });
        return null;
      } else if (node.left === null) {
        //console.log("no sem filho a esquerda:",node);

        //deleting a node with only one child
        if (node.isROOT) {
          console.log(node);
          console.log("no sem filho a esquerda:", node);
          deleteSequence.push({
            op: "NL",
            number: node.number,
            isroot: node.isROOT,
            x: node.x,
            y: node.y,
            xc: node.right.x,
            yc: node.right.y,
            child: node.right,
            value: node.value,
          });
          node.right.isROOT = true;
          return node.right;
        } else {
          const path = node.parent.left === node ? "left" : "right";
          deleteSequence.push({
            op: "NL",
            number: node.number,
            parent: node.parent,
            isroot: node.isROOT,
            x: node.x,
            y: node.y,
            xc: node.right.x,
            yc: node.right.y,
            child: node.right,
            value: node.value,
            path: path,
          });

          if (node.parent.left === node) {
            node.right.parent = node.parent;
            node.parent.left = node.right;
          }
          if (node.parent.right === node) {
            node.right.parent = node.parent;
            node.parent.right = node.right;
          }

          return node.right;
        }
      } else if (node.right === null) {
        //console.log("no sem filho a direita:",node);

        //deleting a node with only one child
        if (node.isROOT) {
          console.log(node);
          console.log("no sem filho a direita:", node);
          console.log(node.x);
          const obj = {
            op: "NR",
            number: node.number,
            isroot: node.isROOT,
            x: node.x,
            y: node.y,
            xc: node.left.x,
            yc: node.left.y,
            child: node.left,
            value: node.value,
          };

          deleteSequence.push(obj);
          node.left.isROOT = true;
          return node.left;
        } else {
          const path = node.parent.left === node ? "left" : "right";
          deleteSequence.push({
            op: "NR",
            number: node.number,
            parent: node.parent,
            isroot: node.isROOT,
            x: node.x,
            y: node.y,
            xc: node.left.x,
            yc: node.left.y,
            child: node.left,
            value: node.value,
            path: path,
          });

          if (node.parent.left === node) {
            node.left.parent = node.parent;
            node.parent.left = node.left;
          }
          if (node.parent.right === node) {
            node.left.parent = node.parent;
            node.parent.right = node.left;
          }

          return node.left;
        }
      }

      //deleting a node with two children
      //console.log("no com dois filhos:",node);

      //get inorder successor
      let current = node.right;
      while (current !== null && current.left !== null) {
        current = current.left;
      }

      console.log("in order successor:", current);

      deleteSequence.push({ op: "TN", node: node, current: current });
      node.value = current.value;

      //delete inorder successor
      node.right = deletion(node.right, current.value);
    }

    return node;
  };

  //In order traversal just for debugging
  const traversal = (current) => {
    if (current !== null) {
      traversal(current.left);
      console.log(current.value);
      traversal(current.right);
    }
  };

  const changeAnimationSpeed = (value) => {
    value = parseInt(value);
    let real = 0;
    if (value < 1000) {
      real = value - 500;
      real = 1500 - real;
    }
    if (value > 1000) {
      real = 1500 - value;
      real = 500 + real;
    }
    INSERTION_SEQUENCE_SPEED = real;
  };

  useEffect(() => {
    svgref.current.style.border = "1px solid #254569";
    svgref.current.style.borderRadius = "0.3vw";
    svgref.current.style.width = "75vw";
    svgref.current.style.height = "65vh";

    //////Implementation of zoom in and zoom out///////////////////
    //Taken from https://stackoverflow.com/a/52640900/17213802
    //changed a little bit to fit this project
    //the variables svgref and svgContainer are references to their respective html elements
    //the reference is created with useRef hook
    // let viewBox = {x:0,y:0,w:svgref.current.clientWidth,h:svgref.current.clientHeight};
    let viewBox = { x: 0, y: 0, w: 100, h: 100 };
    svgref.current.setAttribute(
      "viewBox",
      `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
    );
    const svgSize = {
      w: svgref.current.clientWidth,
      h: svgref.current.clientHeight,
    };
    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let scale = 1;

    svgContainer.current.onmousewheel = function (e) {
      e.preventDefault();

      console.log("offset:", e.deltaY);

      if (e.deltaY < 0) {
        zoom--;
        document.getElementById("zoominfo").innerText = `Zoom: ${zoom}x`;
      } else {
        zoom++;
        document.getElementById("zoominfo").innerText = `Zoom: ${zoom}x`;
      }

      var w = viewBox.w;
      var h = viewBox.h;
      var mx = e.offsetX; //mouse x
      var my = e.offsetY;
      var dw = w * Math.sign(e.deltaY) * 0.05;
      var dh = h * Math.sign(e.deltaY) * 0.05;
      var dx = (dw * mx) / svgSize.w;
      var dy = (dh * my) / svgSize.h;
      viewBox = {
        x: viewBox.x + dx,
        y: viewBox.y + dy,
        w: viewBox.w - dw,
        h: viewBox.h - dh,
      };
      scale = svgSize.w / viewBox.w;
      svgref.current.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
      );
    };

    svgContainer.current.onmousedown = function (e) {
      isPanning = true;
      startPoint = { x: e.x, y: e.y };
    };

    svgContainer.current.onmousemove = function (e) {
      if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        var movedViewBox = {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w,
          h: viewBox.h,
        };
        svgref.current.setAttribute(
          "viewBox",
          `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
        );
      }
    };

    svgContainer.current.onmouseup = function (e) {
      console.log("zoom");
      if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        viewBox = {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w,
          h: viewBox.h,
        };
        svgref.current.setAttribute(
          "viewBox",
          `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
        );
        isPanning = false;
      }
    };

    svgContainer.current.onmouseleave = function (e) {
      isPanning = false;
    };

    ///////end of zoom in and zoom out implementation/////////////////////

    // svgref.current.style.backgroundColor = "#4d6894";

    //restricts input to only integers less than 99999
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

    setInputFilter(document.getElementById("input"), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 99999))
      );
    });

    setInputFilter(document.getElementById("inputsearch"), function (value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99999);
    });

    insertButton = document.getElementById("insertButton");
    searchButton = document.getElementById("searchButton");
    deleteButton = document.getElementById("deleteButton");
  }, []);

  return (
    <div className="BinaryTree">
      <div id="info">
        <div id="name">
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <p> ← return</p>{" "}
          </div>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <div>
            <h2>BINARY SEARCH TREE VISUALIZATION</h2>
          </div>
        </div>
      </div>

      <div id="opBST">
        <div>
          <p style={{ margin: "0 auto" }}> &nbsp; Animation speed:</p>
          <input
            type="range"
            min="500"
            max="1500"
            defaultValue="1000"
            onChange={(e) => changeAnimationSpeed(e.target.value)}
          ></input>
        </div>
        <p>&nbsp;</p>
        <div>
          <input type="text" id="input" placeholder="Try adding a number" />
          <button id="insertButton" className="button" onClick={add}>
            Insert
          </button>
        </div>
        <p>&nbsp;</p>
        <div>
          <input
            type="text"
            id="inputsearch"
            placeholder="Seach for a number"
          />
          <button id="searchButton" className="button" onClick={look}>
            Search
          </button>
        </div>
        <p>&nbsp;</p>
        <div>
          <input type="text" id="inputdelete" placeholder="Delete a number" />
          <button id="deleteButton" className="button" onClick={erase}>
            Delete
          </button>
        </div>
        <p>&nbsp;</p>
        <div id = "zoominfo-wrapper">
          <p id="zoominfo"></p>
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>

      <div className="bst-main-container">
        <div id="svgcontainer" ref={svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svg"
            viewBox="0 0 100 100"
            ref={svgref}
          ></svg>
        </div>
        <div className="message-container">
          <p id="controls">
            <i className="fas fa-info-circle"></i>
            Use the mouse scroll to zoom in and out. Click and drag to move the
            tree.
          </p>
          <p>LOG:</p>
          <div id="message"></div>
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

export default BinaryTree;
