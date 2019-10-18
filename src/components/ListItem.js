import React, { Component } from "react";

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      color: theme.palette.text.primary,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
  });

class ListItem extends Component {
  constructor(props){
    super(props);
    this.saveEdit = this.saveEdit.bind(this);
    this.goEditMode = this.goEditMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  saveEdit(){
    const newText = this.refs.input.value.trim();
    const { id } = this.props.item;
    this.props.saveEdit(id, newText);
  }

  handleKeyPress(e){
    if (e.key == 'Enter') {
        e.preventDefault()
        this.saveEdit()
    }
  }

  goEditMode(){
    const { id } = this.props.item;
    this.props.setToEditMode(id);
  }

  cancelEdit(){
    const { id } = this.props.item;
    this.props.cancelEditMode(id);
  }

  toggleItem(){
    const { id } = this.props.item;
    this.props.toggleItem(id);
  }

  render(){
    const { text, id, editMode, checked, rank} = this.props.item;
    const { classes, moveUp, moveDown } = this.props;
    if (editMode){
      return (
        <li className="list-item">
          <input
            className="input"
            ref="input"
            type="text"
            defaultValue={text}
            onKeyPress={this.handleKeyPress}
          />
          <button
            onClick={this.saveEdit}
          >Save
          </button>
          <button
            onClick={this.cancelEdit}
          >Cancel
          </button>
        </li>
      );
    }

    let cls = "list-item-text";
    if (checked){ cls = "list-item-text checked" }

    return (
      <li className="list-item">
        <p className={cls} onClick={this.toggleItem}>{rank}. {text}</p>
        <button
          onClick={this.props.handleDeleteItem.bind(this, id)}
        >X
        </button>
        <button
          onClick={this.goEditMode}
        >Edit
        </button>
        <button
        onClick={() => moveUp(id)}
        >Up
        </button>
        <button
        onClick={() => moveDown(id)}
        >Down
        </button>
      </li>
    );

  }

}

export default withStyles(styles)(ListItem);
