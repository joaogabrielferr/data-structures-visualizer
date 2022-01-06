import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {

    const navigate = useNavigate();

    return (
        <div className='Homepage'>
            <div id="DSContainer">

                <div id="title">
                    <h1>Data Structures Visualization</h1>
                    <h3>Choose one of the data structures below to visualize its most important operations throught animations.</h3>
                </div>
                <div id="DSoptions">
                    <div className="DSOPTION" onClick={()=>navigate("/bst")}>
                        Binary Search Tree
                        <p></p>
                        
                    </div>
                    <div className="DSOPTION"  onClick={()=>navigate("/linkedlist")} >  
                        Linked List
                        <p></p>
                       
                        
                    </div>
                    <div className="DSOPTION" onClick={()=>navigate("/stack")} >
                        Stack
                    </div>
                </div>

            </div>
            <div id="footer">
                João Gabriel &nbsp; <a href='https://github.com/joaogabrielferr' target={"_blank"}><i className="fab fa-github"></i></a>
                &nbsp;<a href="https://www.linkedin.com/in/joaogabrielferr/" target={"_blank"}><i className="fab fa-linkedin"></i></a>  </div>

        </div>
    )
}

export default Homepage
