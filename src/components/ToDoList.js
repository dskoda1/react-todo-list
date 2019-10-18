import React, { Component } from "react";

import Form from "./Form";
import List from "./List";

import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: 'flex',

  },
  paper: {
  }
})

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
    this.setState(state => {
      const list = state.listItems.map((item, j) => {
        if (item.id === id) {
          return {...item, rank: item.rank--}
        }
        return item
      })
      return {
        list
      }
    })
  }

  moveDown(id) {
    console.log(`Moving ${id} down`)
    this.setState(state => {
      const list = state.listItems.map((item, j) => {
        if (item.id === id) {
          return {...item, rank: item.rank++}
        }
        return item
      })
      return {
        list
      }
    })
  }

  componentDidUpdate(){
    localStorage.setItem("listItems", JSON.stringify(this.state.listItems));
  }

  render(){
    return (
      <div className={this.props.classes.root}>
        <Grid container justify={'center'}>
          <Paper>
          <Grid item xs={12}>
            <Typography variant="h2">To Do List</Typography>

          </Grid>
          <Grid item xs={12}>
          <Form addItem={this.addItem} />
            
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          </Paper>
          
        </Grid>
        
      </div>
    );

  }

}

export default withStyles(styles)(ToDoList);
