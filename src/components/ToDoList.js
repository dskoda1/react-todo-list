import React, { Component } from "react";

import Form from "./Form";
import List from "./List";

class ToDoList extends Component {

  constructor(){
    super();
    this.state = {
      listItems: localStorage.listItems ? JSON.parse(localStorage.listItems) : []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.setToEditMode = this.setToEditMode.bind(this);
    this.cancelEditMode = this.cancelEditMode.bind(this);
    this.clearList = this.clearList.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);

    // Initialize the id counter
    if (! localStorage.getItem("nextId")) {
      localStorage.setItem("nextId", 0)
    }
  }

  componentDidMount(){
    this.setState({
      listItems: this.state.listItems.map( (item) => (
        Object.assign({}, item, {
          editMode: false
        })
      ) )
    });
  }

  toggleItem(id){
    this.setState({
      listItems: this.state.listItems.map( (item) => {
        if (item.id === id){
          return Object.assign({}, item, {
            checked: !item.checked
          });
        } else {
          return item;
        }
      })
    });
  }

  clearList(){
    this.setState({
      listItems: []
    });
  }

  setToEditMode(id){
    this.setState({
      listItems: this.state.listItems.map( (item) => {
        if (item.id === id){
          return Object.assign({}, item, {
            editMode: true
          });
        } else {
          return item;
        }
      })
    });
  }

  cancelEditMode(id){
    this.setState({
      listItems: this.state.listItems.map( (item) => {
        if (id === item.id){
          return Object.assign({}, item, {
            editMode: false
          });
        } else {
          return item;
        }
      })
    });
  }

  addItem(item){
    let rank = this.state.listItems.length + 1;
    this.setState({
      listItems: [...this.state.listItems, Object.assign({rank}, item)]
    }, function(){
      // console.log(this.state);
    });
  }

  deleteItem(id){
    this.setState({
      listItems: this.state.listItems.filter( (item) => (
        id !== item.id
      ) )
    }, function(){
      // console.log(this.state);
    });
  }

  saveEdit(id, newText){
    this.setState({
      listItems: this.state.listItems.map( (item) => {
        if (id === item.id){
          return Object.assign({}, item, {
            text: newText,
            editMode: false
          });
        } else {
          return item;
        }
      })
    });
  }

  moveUp(id) {
    console.log(`Moving ${id} up`)
    let listItems = JSON.parse(JSON.stringify(this.state.listItems));
    for (let i = 0; i < listItems.length; ++i) {
        if (listItems[i].id === id) {
            console.log(listItems[i].rank)
            // Raise this items rank
            if (i !== 0) {
                const item = listItems[i]
                listItems[i] = {...item, rank: item.rank-- }
            }
        }
    }
    this.setState({
        listItems
    })
  }

  moveDown(id) {
    console.log(`Moving ${id} down`)
    let listItems = JSON.parse(JSON.stringify(this.state.listItems));
    for (let i = 0; i < listItems.length; ++i) {
        if (listItems[i].id === id) {
            console.log(listItems[i].rank)
            // Lower this items rank
            if (i !== listItems.length - 1) {
                listItems[i].rank--
            }
        }
    }
    this.setState({
        listItems
    })
  }

  componentDidUpdate(){
    localStorage.setItem("listItems", JSON.stringify(this.state.listItems));
  }

  render(){

    return (
      <div className="todo-list">
        <h1 className="text-center">To Do List</h1>
        <Form addItem={this.addItem} />
        <List
          listItems={this.state.listItems}
          deleteItem={this.deleteItem}
          setToEditMode={this.setToEditMode}
          cancelEditMode={this.cancelEditMode}
          saveEdit={this.saveEdit}
          clearList={this.clearList}
          toggleItem={this.toggleItem}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
        />
      </div>
    );

  }

}

export default ToDoList;
