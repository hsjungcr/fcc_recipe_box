import React from 'react';
import {ListGroupItem, ListGroup} from 'react-bootstrap';


export default class IngredientList extends React.Component{

  render(){
    var index = -1;
    var ingredientList = this.props.ingredients.map((ingredient)=>{
      index++;
      return(
        <ListGroupItem key={index}>
          {ingredient}
        </ListGroupItem>
      );
    })
    return(
      <ListGroup>
        {ingredientList}
      </ListGroup>
    )
  }
}
