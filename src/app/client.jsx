import React from 'react';
import ReactDOM from 'react-dom';
import { Accordion, Button, ButtonToolbar, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Panel } from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';
import IngredientList from './IngredientList';
import NavHeader from './NavHeader';

var defaultRecipe = [
    {
      drinkname: "Bloody Mary",
      recipe: [
        "1 lemon wedge",
        "1 Lime wedge",
        "2 oz Premium Vodka",
        "4 oz Tomato juice",
        "2 dashes Tabasco Sauce",
        "2 tsp Prepared horseradish",
        "2 dashes Worcestershire sauce",
        "1 pinch Celery salt",
        "1 pinch Ground black pepper",
        "1 pinch smoked paprika"
      ],
      quote: "Because you need to drink more when you're hungover."
    },
    {
      drinkname: "Gin and Tonic",
      recipe: [
        "3 oz gin",
        "4 oz tonic water",
        "1 tablespoon freshly squeezed lime juice",
        "4 to 5 tonic water Ice Cubes "
      ],
      quote: "It's really just gin and tonic water."
    },
    {
      drinkname: "Grasshopper",
      recipe: [
        "3/4 oz creme de menthe",
        "1/4 oz heavy cream",
        "3/4 oz white creme de cacao",
        "1 cup ice"
      ],
      quote: "Mint chocolate ice cream for adult."
    },
    {
      drinkname: "AMF",
      recipe: [
        "1/2 oz vodka",
        "1/2 oz rum",
        "1/2 oz tequila",
        "1/2 oz gin",
        "1/2 oz blue curacao liqueur",
        "2 oz sweet and sour mix",
        "2 oz lemon-lime soda"
      ],
      quote: "If you think about it, things about Mexico is wider known than things about Spain"
    }
  ]
var recipes = typeof localStorage["_hsjungcr_recipes"] != "undefined" && localStorage["_hsjungcr_recipes"] != "undefined"
  ? JSON.parse(localStorage["_hsjungcr_recipes"])
  : defaultRecipe,
  // Define global title and ingredients
  // Eww but just for this once.
  globalDrinkName = "",
  globalIngredients = [],
  globalQuote = "";

class App extends React.Component{
  constructor(props){
    super(props);
  }
  restoreDefault(){
      recipes = defaultRecipe;
      update();
  }

  render(){
    var justForCursor = {
      cursor : "pointer"
    }
    return(
      <div>
      <NavHeader />
      <div className="container">
      <div className="well">
          <Accordion style={justForCursor}>
          {this.props.data}
          </Accordion>
        <RecipeAdd drinkName = {globalDrinkName} ingredients = {globalIngredients} quote = {globalQuote} />
        {' '}{/*this is fine*/}
      <Button className="restore-default" bsStyle="danger" onClick={this.restoreDefault.bind(this)}>Restore Default</Button>
      </div>
    </div>
  </div>
    )
  }
}

class Recipe extends React.Component{
  remove(){
    recipes.splice(this.props.index, 1);
    update();
  }
  edit(){
    globalDrinkName = this.props.drinkname;
    globalIngredients = this.props.ingredients;
    globalQuote = this.props.quote;
    document.getElementById("show").click();
  }
  render(){
    return(
      <div>
        <h4 className="text-center">Ingredients</h4><hr/>
        <IngredientList ingredients={this.props.ingredients} />
          <h4 className="text-center">"{this.props.quote}"</h4><hr/>
        <ButtonToolbar>
          <Button className="delete" bsStyle="danger" id={"btn-del"+this.props.index} onClick={this.remove.bind(this)}>Delete</Button>
          <Button bsStyle="default" id={"btn-edit"+this.props.index} onClick={this.edit.bind(this)}>Edit</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

class RecipeAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal : false,
      addOrEdit : "Add Recipe",
      drinkName: "",
      ingredients: [],
      quote: ""
    }
  }
  handleChange(event){
    this.setState({
      [event.target.id] : event.target.value
    })
  }
  close() {
    this.setState({
      drinkName : "",
      ingredients : [],
      quote : ""
    })
    this.setState({ showModal : false });
  }
  open() {
    this.setState({ showModal : true });
    if(globalDrinkName != "" && globalIngredients != [] && globalQuote != ""){
      this.setState({
        addOrEdit : "Edit Recipe",
        drinkName : globalDrinkName,
        ingredients : globalIngredients,
        quote : globalQuote
      });
    }
  }
  add(){
    let drinkName = this.state.drinkName;
    let ingredients = this.state.ingredients.split(',').map((items)=>{
      return items.trim()
    });
    console.log(ingredients);
    let quote = this.state.quote;
    let exists = false;
    for(var i in recipes){
      if(recipes[i].drinkname == drinkName){
        recipes[i].recipe = ingredients;
        recipes[i].quote = quote;
        exists = true;
        break;
      }
    }
    if(!exists){
      if(drinkName.length < 1) drinkName = "Untitled";
      recipes.push({drinkname : drinkName, recipe: ingredients, quote:quote});
    }
    update();
    this.close();
  }
  render(){
    var nameStyle ={
      width:"100%",
      height:"30px",
      display:"inline-block",
      padding: "3%, 3%",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "10px"
    }
    var textareaStyle = {
      width:"100%",
      display:"inline-block",
      padding: "3%, 3%",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }
    var divInline ={
      display:"inline-block"
    }
    return(
      <div style={divInline}>
      <Button bsStyle="primary" onClick={this.open.bind(this)} id="show">
        Add Recipe
      </Button>
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <ModalHeader>
          <ModalTitle id="modalTitle">
            {this.state.addOrEdit}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            Drink Name:
            <input style={nameStyle} type="text"
              id = "drinkName"
              placeholder = "Your Drink name"
              value = {this.state.drinkName}
              onChange = {this.handleChange.bind(this)}/>
          Drink Recipe:
          <textarea style={textareaStyle}
            placeholder="Enter drink ingredient seperated, by, commas."
            id = "ingredients"
            value = {this.state.ingredients}
            onChange = {this.handleChange.bind(this)}
          />
        Quote:
        <textarea style={textareaStyle}
          placeholder="Enter a quote for your drink."
          id = "quote"
          value = {this.state.quote}
          onChange = {this.handleChange.bind(this)}
          />

        </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.add.bind(this)} bsStyle="primary" id="addButton">{this.state.addOrEdit}</Button>
          <Button onClick={this.close.bind(this)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
    )
  }
}


function update(){
  localStorage.setItem("_hsjungcr_recipes", JSON.stringify(recipes));
  var rows = [];
  for (var i=0; i < recipes.length; i++) {
    rows.push(
      <Panel key = {i} header={recipes[i].drinkname} eventKey={i} bsStyle="success">
        <br/>
        <Recipe index={i} drinkname={recipes[i].drinkname} ingredients={recipes[i].recipe} quote={recipes[i].quote}/>
        <hr/>
    </Panel>
    );
  }
  ReactDOM.render(<App data={rows} />,document.getElementById("app"));
}
update();
