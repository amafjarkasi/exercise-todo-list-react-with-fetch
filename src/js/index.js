//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import ToDo from "./component/toDoList";

//render your react application
ReactDOM.render(<ToDo />, document.querySelector("#app"));
