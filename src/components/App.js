import React, { Component } from "react";

import ToDoList from "./ToDoList";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({

})


class App extends Component {

  constructor(){
    super();
    this.state = {};
  }

  render(){

    return (
      <MuiThemeProvider theme={theme}>
        <ToDoList />
      </MuiThemeProvider>
    );

  }

}

export default App;
