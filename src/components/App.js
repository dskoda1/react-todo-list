import React, { Component } from "react";

import ToDoList from "./ToDoList";

class App extends Component {

  constructor(){
    super();
    this.state = {};
  }

  render(){

    return (
        <ToDoList />
    );

  }

}

export default App;
