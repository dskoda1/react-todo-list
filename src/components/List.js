import React, { Component } from "react";

import ListItem from "./ListItem";

class List extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    console.log("update");
  }

  render(){
    const listItems = this.props.listItems
    .sort( (itemOne, itemTwo) => itemOne.rank > itemTwo.rank )
    .map( (item) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          setToEditMode={this.props.setToEditMode}
          cancelEditMode={this.props.cancelEditMode}
          handleDeleteItem={this.props.deleteItem}
          saveEdit={this.props.saveEdit}
          toggleItem={this.props.toggleItem}
          moveUp={this.props.moveUp}
          moveDown={this.props.moveDown}
        />
      )
    });

    let clear = null;
    if (this.props.listItems.length > 0){
      clear = (
        <li className="list-item">
          <button
            onClick={this.props.clearList}
            className="clear">
            Reset
          </button>
        </li>
      )
    }

    return (
      <ul className="list">
        {listItems}
        {clear}
      </ul>
    );

  }

}

export default List;
