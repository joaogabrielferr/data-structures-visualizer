//João Gabriel Ferreira

import './App.css';
import BinaryTree from './DS/BinaryTree';
import Stack from './DS/Stack';
import LinkedList from './DS/LinkedList';
import Queue from './DS/Queue';
import Homepage from './Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {


  return (
    <div className="App">

      <Router basename="/data-structures-visualizer">

          <Routes>

            <Route exact path = "/" element = {<Homepage></Homepage>} ></Route>
            <Route exact path = "/bst" element = {<BinaryTree></BinaryTree>} ></Route>
            <Route exact path = "/linkedlist" element = {<LinkedList></LinkedList>} ></Route>
            <Route exact path = "/stack" element = {<Stack></Stack>} ></Route>
            <Route exact path = "/queue" element = {<Queue></Queue>}></Route> 
            <Route path = "*" element = {<Homepage></Homepage>}></Route>
          </Routes>

      </Router>

      {/* <BinaryTree></BinaryTree> */}
      {/* <Stack></Stack> */}
      {/* <LinkedList></LinkedList> */}
      {/* <Homepage></Homepage> */}
    </div>  
  );
}

export default App;

