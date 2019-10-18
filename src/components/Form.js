import React, { Component } from "react";

class Form extends Component {

  constructor(){
    super();
    this.state = {
      inputValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getNextIdAndIncrement = this.getNextIdAndIncrement.bind(this);
  }

  getNextIdAndIncrement(){
    let id = localStorage.getItem("nextId")
    localStorage.setItem("nextId", ++id)
    return id;
  }

  handleSubmit(e){
    e.preventDefault();

    const text = this.refs.input.value.trim();

    if (!text){
      return;
    }


    this.props.addItem({
      text: text,
      editMode: false,
      checked: false,
      id: this.getNextIdAndIncrement()
    });
    this.setState({
      inputValue: ""
    });
  }

  updateInputValue(){
    this.setState({
      inputValue: this.refs.input.value
    });
  }

  render(){

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="input"
          ref="input"
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        <button className="button" type="submit" >Add</button>
      </form>
    );

  }

}

export default Form;
