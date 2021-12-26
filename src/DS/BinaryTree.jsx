/////////////João Gabriel Ferreira///////////////
//This program creates a visualization tool for a binary search tree
//graphics are created with SVG element

import React from 'react'
import { useRef,useEffect } from 'react'; 

const BinaryTree = () => {
    
    const svgref = useRef(); //reference to SVG element
    const svgContainer = useRef();
    let nodecounter = 0;
    let maxlevel = 0;


    class Node{

        constructor(value)
        {
            this.value =  value;
            this.left = null;
            this.right = null;
            this.distance = 30; //distance between this node and his children nodes in SVG 
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
    
    //levels[i] stores the nodes in a particular level of the tree
    //Array.apply is used just to initialize the array with size 1000, with 0's on every position
    //just to facilitate updating the array
    let levels = Array.apply(null, Array(1000)).map(function (x, i) { return 0; })
 
    //////////INSERT OPERATION///////////////
    //(interative approach instead of recursive because then its easy to add the svg elements in the scene)
    const insert = (value) =>{

        let y = null;
        let x = ROOT;
        let level = 0;

        while(x !== null)
        { 
            y = x;
            //marca o node

            if(value < x.value)
            {
                x = x.left;
            }else
            {
                x = x.right;
            }
            level++;
        }

        let node = new Node(value);
        node.parent = y;
        if(y === null)
        {
            node.isROOT = true;
            //values x and y for the root is always 50vw and 10vh
            //for the others ones the position is based on the parent position
            node.x = 50;
            node.y = 10;
            node.isROOT = true;
            node.number = ++nodecounter;
            node.level = level;
            let circulo = document.createElementNS("http://www.w3.org/2000/svg" ,'circle');
            circulo.setAttributeNS(null,"cx",`${node.x}`);
            circulo.setAttributeNS(null,"cy",`${node.y}`);
            circulo.setAttributeNS(null,"r","7");
            circulo.setAttribute("id",`${node.number}`);
            circulo.setAttributeNS(null,"style","fill:blue; stroke:purple; stroke-width: 1;");
            circulo.setAttribute("class","circulo");
            circulo.setAttribute("id",`${node.number}c`);
            svgref.current.appendChild(circulo);
           
            const texto = document.createElementNS("http://www.w3.org/2000/svg" ,'text');
            texto.setAttributeNS(null,"x",`${node.x}`);
            texto.setAttributeNS(null,"y",`${node.y + 1}`);
            texto.setAttributeNS(null,"style","text-anchor:middle; fill:white ;font-size:0.3vw; font-family:Arial; dy=.3em");
            texto.textContent = `${node.value}`;
            texto.setAttribute("class","texto");
            texto.setAttribute("id",`${node.number}t`);
            svgref.current.appendChild(texto);

            ROOT = node;

            if(levels[level] === 0)
            {
                levels[level] = [node];
            }else
            {
                levels[level] = [...levels[level],node];
            }

            

            maxlevel = 1;

        //not a root so set the positon based on parent's 
        }else if(node.value < y.value)
        {
            
            //if the distance of parent is 5, then the new distance 
            //of new node will also be the distance of parent, else it will be the distance of 
            //parent - 2
            const dist = (y.distance <= 7 ? y.distance : y.distance - 12);
            const x = y.x - y.distance;
            const yy = y.y + 20; // distance between levels is always 20
            node.x = x;
            node.y = yy;
            node.distance = dist;
            node.isROOT = false;
            node.parent = y;
            node.number = ++nodecounter;
            node.level = level;

            y.left = node;


            const circulo = document.createElementNS("http://www.w3.org/2000/svg",'circle');
            circulo.setAttributeNS(null,"cx",`${x}`);
            circulo.setAttributeNS(null,"cy",`${yy}`);
            circulo.setAttributeNS(null,"r",`7`);
            circulo.setAttributeNS(null,"style","fill:blue; stroke:purple; stroke-width: 1;");
            circulo.setAttribute("class","circulo");
            circulo.setAttribute("id",`${node.number}c`);

            //add edge between parent and new node
            let linha = document.createElementNS("http://www.w3.org/2000/svg", 'line');  
            linha.setAttribute("x1",`${y.x - 5}`);
            linha.setAttribute("y1",`${y.y + 5}`);
            linha.setAttribute("x2",`${x}`);
            linha.setAttribute("y2",`${yy}`);
            linha.setAttribute("class","linha");
            const id = node.number + 'c' + 'l';
            linha.setAttribute("id",id);
            linha.style.stroke = "#000";   
            linha.style.strokeWidth = "0.05vw";
            
            const texto = document.createElementNS("http://www.w3.org/2000/svg" ,'text');
            texto.setAttributeNS(null,"x",`${node.x}`);
            texto.setAttributeNS(null,"y",`${node.y + 1}`);
            texto.setAttributeNS(null,"style","text-anchor:middle; fill:white ;font-size:0.3vw; font-family:Arial; dy=.3em");
            texto.textContent = `${node.value}`;
            texto.setAttribute("class","texto");
            texto.setAttribute("id",`${node.number}t`);
            

            //add edge first and then add node, so edge doesnt overlap node
            svgref.current.appendChild(linha);


            setTimeout(() => {
                svgref.current.appendChild(circulo);
            }, 20);
            
            setTimeout(() => {
                svgref.current.appendChild(texto);
            }, 20);


            if(maxlevel < level)maxlevel = level;

            //att levels array
            if(levels[level] === 0)
            {
                levels[level] = [node];
            }else levels[level] = [...levels[level],node];

            for(let i = 0;i<=maxlevel;i++){
            
                levels[i].sort((a,b)=>a.x - b.x);

            }

            adjust();

        }else
        {
            const dist = (y.distance <= 7 ? y.distance : y.distance - 12);
            const x = y.x + y.distance;
            const yy = y.y + 20; // distance between levels is always 20
            node.x = x;
            node.y = yy;
            node.distance = dist;
            node.isROOT = false;
            node.parent = y;
            node.number = ++nodecounter;
            node.level = level;

            y.right = node;


            const circulo = document.createElementNS("http://www.w3.org/2000/svg",'circle');
            circulo.setAttributeNS(null,"cx",`${x}`);
            circulo.setAttributeNS(null,"cy",`${yy}`);
            circulo.setAttributeNS(null,"r",`7`);
            circulo.setAttributeNS(null,"style","fill:blue; stroke:purple; stroke-width: 1;");
            circulo.setAttribute("class","circulo");
            circulo.setAttribute("id",`${node.number}c`);

            //add edge between parent and new node
            let linha = document.createElementNS("http://www.w3.org/2000/svg", 'line');  
            linha.setAttribute("x1",`${y.x + 5}`);
            linha.setAttribute("y1",`${y.y + 5}`);
            linha.setAttribute("x2",`${x}`);
            linha.setAttribute("y2",`${yy}`);
            linha.setAttribute("class","linha");
            const id = node.number + 'c' + 'r';
            linha.setAttribute("id",id) ;
            linha.style.stroke = "#000";   
            linha.style.strokeWidth = "0.05vw";
            
            const texto = document.createElementNS("http://www.w3.org/2000/svg" ,'text');
            texto.setAttributeNS(null,"x",`${node.x}`);
            texto.setAttributeNS(null,"y",`${node.y + 1}`);
            texto.setAttributeNS(null,"style","text-anchor:middle; fill:white ;font-size:0.3vw; font-family:Arial; dy=.3em");
            texto.textContent = `${node.value}`;
            texto.setAttribute("class","texto");
            texto.setAttribute("id",`${node.number}t`);
            

            //add edge first and then add node, so edge doesnt overlap node
            svgref.current.appendChild(linha);


            setTimeout(() => {
                svgref.current.appendChild(circulo);
            }, 20);
            
            setTimeout(() => {
                svgref.current.appendChild(texto);
            }, 20);


            if(maxlevel < level)maxlevel = level;

            //att levels array
            if(levels[level] === 0)
            {
                levels[level] = [node];
            }else levels[level] = [...levels[level],node];

            for(let i = 0;i<=maxlevel;i++){
                
                levels[i].sort((a,b)=>a.x - b.x);            
            }

            adjust();

        }

    }

    //In order traversal
    const traversal = (current) =>{

        if(current !== null)
        {
            traversal(current.left);
            console.log(current.value);
            traversal(current.right);
        }
    }


        const add = () =>{
            const input = document.getElementById("input");
            if(input.value === "")return;
            const valor = parseInt(input.value);
            insert(valor);
            //console.log("Tree:");
            //traversal(ROOT);
        }


        
          //verify if there is a node overlaping another
          //if yes, then adjust the tree
        const adjust = () =>{

            //get all nodes in order of levels
            
            let niveis = Array.apply(null, Array(maxlevel + 1)).map(function (x, i) { return []; })   
            
            niveis = levelTraversal(niveis,ROOT,0);
            
            //go throught each level checking if there are nodes overlaped

            let overlapedlevel = - 1;
            let sameParent = false;
            let differentSubTrees = false;
            //console.log("niveis:",niveis);

            console.log("maxlevel:",maxlevel);
            for(let i = 0;i<=maxlevel;i++)
            {
                //console.log("looking at level ",i);
                for(let j = 0;j<niveis[i].length;j++)
                {
                    //console.log("looking at ", niveis[i][j]);
                    for(let k = j + 1;k<niveis[i].length;k++)
                    {
                        //console.log(niveis[i][j]," and ",niveis[i][k]);
                        if(niveis[i][k].x < niveis[i][j].x || ( niveis[i][j].x + 7 > niveis[i][k].x -7))
                        {
                            //the three needs to be adjusted
                            overlapedlevel = i;
                            if(niveis[i][j].parent === niveis[i][k].parent)sameParent = true;
                            if(niveis[i][j].parent.x < ROOT.x && niveis[i][k].parent.x > ROOT.x)differentSubTrees = true;
                        }
                    }
                }
            }
            //log("overlaped level:",overlapedlevel);
            //console.log("sameParent:",sameParent);
            //console.log("different sub trees:",differentSubTrees);
            //if differentsubTrees === true the two nodes are in different sub tres relative to the root
            //in this case just inscrease  the distance for the root and update all nodes

            if(differentSubTrees)
            {
                setTimeout(() => {
                    updateroot(10);    
                }, 1000);
                
            
            }
            else if(sameParent)console.log();
            else console.log();
            //if sameParent === true update distances and positions of all nodes

            //if overlapped > - 1 and sameParent === false
            //update positions of all nodes except the ones in the overlaped level:
            //console.log("niveis:",niveis);
        }

        const levelTraversal = (niveis,node,level) =>{
            if(node === null)return niveis;

            niveis[level].push(node);

            niveis = levelTraversal(niveis,node.left,level+1);
            niveis = levelTraversal(niveis,node.right,level+1);

            return niveis;
        }

        const updateroot = (rate) =>{

            const queue = [];

            queue.push(ROOT);

            while(queue.length > 0)
            {
                const node = queue.shift();

                if(node.isROOT)
                {
                    node.distance+= rate;
                    if(node.left !== null)
                    {
                                        
                    const n = node.left.number;
                    const id = n + 'c';
                    const no = document.getElementById(id);
                    console.log("id:",id);
                    console.log(no);
                    no.setAttribute("cx",node.left.x - rate);
                    const idlinha = id + 'l';
                    const linha = document.getElementById(idlinha);
                    //console.log(linha);
                    linha.setAttribute("x2",node.left.x - rate);
                    const idtexto = node.left.number + 't';
                    const texto = document.getElementById(idtexto);
                    texto.setAttribute("x",node.left.x - rate);
                    node.left.x -=rate;
                    
                    }

                    if(node.right !== null)
                    {
                        const n = node.right.number;
                        const id = n + 'c';
                        const no = document.getElementById(id);
                        console.log("id:",id);
                        console.log(no);
                        no.setAttribute("cx",node.right.x + rate);
                        const idlinha = id + 'r';
                        const linha = document.getElementById(idlinha);
                        //console.log(linha);
                        linha.setAttribute("x2",node.right.x + rate);
                        const idtexto = node.right.number + 't';
                        const texto = document.getElementById(idtexto);
                        texto.setAttribute("x",node.right.x + rate);
                        node.right.x +=rate;
                    }

                }else
                {
                    
                    if(node.left !== null)
                    {
                        setTimeout(() => {
                        
                            const n = node.left.number;
                        const id = n + 'c';
                        const no = document.getElementById(id);
                        console.log("id:",id);
                        console.log(no);
                        console.log("parent:",node);
                        console.log("x do parent:",node.x);
                        console.log("distance do parent:",node.distance);
                        console.log("nova pos do node:",node.x - node.distance);
                        no.setAttribute("cx",node.x - node.distance);
                        
                        const idlinha = id + 'l';
                        const linha = document.getElementById(idlinha);
                        //console.log(linha);
                        //linha.setAttribute("x1",node)
                        linha.setAttribute("x1",node.x - 5);
                        linha.setAttribute("x2",node.x - node.distance);
                               
                        const idtexto = node.left.number + 't';
                        const texto = document.getElementById(idtexto);
                        texto.setAttribute("x",node.x - node.distance);
                        // node.left.x -= node.distance;
                        node.left.x = node.x - node.distance;
                        }, 100);
                        
 
                        
                    }

                    if(node.right !== null)
                    {
                        setTimeout(() => {
                        
                            const n = node.right.number;
                        const id = n + 'c';
                        const no = document.getElementById(id);
                        console.log("id:",id);
                        console.log(no);
                        console.log("parent:",node);
                        console.log("x do parent:",node.x);
                        console.log("distance do parent:",node.distance);
                        console.log("nova pos do node:",node.x - node.distance);     
                        no.setAttribute("cx",node.x + node.distance);
                        
                        const idlinha = id + 'r';
                        const linha = document.getElementById(idlinha);
                        //console.log(linha);
                        linha.setAttribute("x1",node.x + 5);
                        linha.setAttribute("x2",node.x + node.distance);
                            
                        const idtexto = node.right.number + 't';
                        const texto = document.getElementById(idtexto);
                        texto.setAttribute("x",node.x + node.distance);
                        // node.right.x += node.distance;
                        node.right.x = node.x + node.distance;
                        }, 100);
                        
                    }
                }


                console.log("olhando para:",node);
                if(node.left !== null)queue.push(node.left);
                if(node.right !== null)queue.push(node.right);
            }
        }
        
        // const updateroot = (rate) =>{

        //     const queue = [];

        //     queue.push(ROOT);

        //     while(queue.length > 0)
        //     {
        //     let node = queue.shift();
        //     if(node === null)continue;

        //     console.log("olhando para:",node);

        //     if(node.isROOT){
        //     node.distance += rate;
        //     if(node.left !== null){
        //     setTimeout(() => {
                
        //         const n = node.left.number;
        //         const id = n + 'c';
        //         const no = document.getElementById(id);
        //         no.setAttribute("cx",node.left.x - rate);
                
        //         setTimeout(() => {
        //             const idlinha = id + 'l';
        //             const linha = document.getElementById(idlinha);
        //             //console.log(linha);
        //             linha.setAttribute("x2",node.left.x - rate);
        //             setTimeout(() => {
        //                 const idtexto = node.left.number + 't';
        //                 const texto = document.getElementById(idtexto);
        //                 texto.setAttribute("x",node.left.x - rate);
        //                 node.left.x -=rate;
        //             }, 20);
        //         }, 20);
        //     }, 50);
            
        //     }
        //     if(node.right !== null){
        //     setTimeout(() => {
        //         const n = node.right.number;
        //         const id = n + 'c';
        //         const no = document.getElementById(id);
        //         no.setAttribute("cx",node.right.x + rate);
        //         setTimeout(() => {
        //             const idlinha = id + 'r';
        //             const linha = document.getElementById(idlinha);
        //             //console.log(linha);
        //             linha.setAttribute("x2",node.right.x + rate);
        //             setTimeout(() => {
        //                 const idtexto = node.right.number + 't';
        //                 const texto = document.getElementById(idtexto);
        //                 texto.setAttribute("x",node.right.x + rate);
        //                 node.right.x -=rate;
        //             }, 20);
        //         }, 20);                
        //     }, 100);
        //     }
        //     if(node.left !== null)queue.push(node.left);
        //     if(node.right !== null)queue.push(node.right);
        //     }else
        //     {
        //         //console.log("updateroot fora de ROOT");
        //         //console.log("olhando para:",node);
        //         if(node.left !== null){
        //         setTimeout(() => {
        //             const n = node.left.number;
        //             const id = n + 'c';
        //             const no = document.getElementById(id);
        //             //console.log(no);
        //             no.setAttribute("cx",node.x - node.distance);
        //             setTimeout(() => {
        //                 const idlinha = id + 'l';
        //                 const linha = document.getElementById(idlinha);
        //                 //console.log(linha);
        //                 //linha.setAttribute("x1",node)
        //                 linha.setAttribute("x1",node.x - 5);
        //                 linha.setAttribute("x2",node.left.x);
        //                 setTimeout(() => {
        //                     const idtexto = node.left.number + 't';
        //                     const texto = document.getElementById(idtexto);
        //                     texto.setAttribute("x",node.x - node.distance);
        //                     node.left.x -= node.distance;
        //                 }, 20);
        //             }, 20);
        //         }, 50);
                

        //         }
        //         if(node.right === null)return;
        //         setTimeout(() => {
        //             const n = node.right.number;
        //             const id = n + 'c';
        //             const no = document.getElementById(id);
        //             no.setAttribute("cx",node.x + node.distance);
        //             setTimeout(() => {
        //                 const idlinha = id + 'r';
        //                 const linha = document.getElementById(idlinha);
        //                 //console.log(linha);
        //                 linha.setAttribute("x1",node.x + 5);
        //                 linha.setAttribute("x2",node.right.x);
        //                 setTimeout(() => {
        //                     const idtexto = node.right.number + 't';
        //                     const texto = document.getElementById(idtexto);
        //                     texto.setAttribute("x",node.x + node.distance);
        //                     node.right.x += node.distance;
        //                 }, 20);
        //             }, 20);                
        //         }, 100); 
                


        //     }
        //     if(node.left !== null)queue.push(node.left);
        //     if(node.right !== null)queue.push(node.right);
            
        // }

    //}
        


          useEffect(()=>{
            svgref.current.style.border = "1px solid black";
            svgref.current.style.width = "98vw";
            svgref.current.style.height = "79vh";
            

            //to do: Save current tree on local storage so that if the user leaves the page
            //when he comes back, the tree is still there

        
            //////Implementation of zoom in and zoom out///////////////////
            //Taken from https://stackoverflow.com/a/52640900/17213802
            //changed a little bit to fit this project
            //also the variables svgref and svgContainer are references to their respective html elements
            //the reference is used with useRef hook
            // let viewBox = {x:0,y:0,w:svgref.current.clientWidth,h:svgref.current.clientHeight};
            let viewBox = {x:0,y:0,w:100,h:100};
            svgref.current.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
            const svgSize = {w:svgref.current.clientWidth,h:svgref.current.clientHeight};
            let isPanning = false;
            let startPoint = {x:0,y:0};
            let endPoint = {x:0,y:0};;
            let scale = 1;
        
            svgContainer.current.onmousewheel = function(e) {
                e.preventDefault();
                var w = viewBox.w;
                var h = viewBox.h;
                var mx = e.offsetX;//mouse x  
                var my = e.offsetY;    
                var dw = w*Math.sign(e.deltaY)*0.05;
                var dh = h*Math.sign(e.deltaY)*0.05;
                var dx = dw*mx/svgSize.w;
                var dy = dh*my/svgSize.h;
                viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
                scale = svgSize.w/viewBox.w;
                svgref.current.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
             }
             
             
             svgContainer.current.onmousedown = function(e){
                isPanning = true;
                startPoint = {x:e.x,y:e.y};   
             }
             
             svgContainer.current.onmousemove = function(e){
                if (isPanning){
               endPoint = {x:e.x,y:e.y};
               var dx = (startPoint.x - endPoint.x)/scale;
               var dy = (startPoint.y - endPoint.y)/scale;
               var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
               svgref.current.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
                }
             }
             
             svgContainer.current.onmouseup = function(e){
                if (isPanning){ 
               endPoint = {x:e.x,y:e.y};
               var dx = (startPoint.x - endPoint.x)/scale;
               var dy = (startPoint.y - endPoint.y)/scale;
               viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
               svgref.current.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
               isPanning = false;
                }
             }
             
             svgContainer.current.onmouseleave = function(e){
              isPanning = false;
             }
        
             ///////end of zoom in and zoom out implementation/////////////////////
        
            svgref.current.style.backgroundColor = "#4d6894";
        
            },[]);  
          



    
    return (
        <div className = "BinaryTree">
            
            <div id="info">
                <input type="text" id = "input" placeholder='Try adding a number'/>
                <button id="botao" onClick = {add}>Add</button>
                {/* <h2>Zoom in and out using the mouse scroll, click and drag to move the tree</h2> */}
            </div>

            <div id="svgcontainer" ref={svgContainer}>
                <svg  xmlns="http://www.w3.org/2000/svg"  id = "svg" viewBox="0 0 100 100" ref={svgref}>

                </svg>
            </div>

        </div>
    )
}

export default BinaryTree
