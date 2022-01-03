import React from 'react'

const Stack = () => {

    const svgref = useRef(); //reference to SVG element
    const svgContainer = useRef(); //reference to the div container that wraps the SVG element


    class Stack{

        constructor()
        {
            this.array = [];
        }

        


    }


    return (
        <div className='Stack'>
            
            <div id="infostack">

            </div>
            <div id="svgcontainerStack" ref={svgContainer}>
                <svg  xmlns="http://www.w3.org/2000/svg"  id = "svg" viewBox="0 0 100 100" ref={svgref}>

                </svg>
            </div>

        </div>
    )
}

export default Stack
