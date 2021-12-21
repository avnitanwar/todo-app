import React from "react";
import './style.css';
import TodoList from './TodoList';
import TodoItem from "./TodoItem";
import TodoButton from "./TodoButton";
import './todoListStyle.css';

class App extends React.Component{
  constructor(){
    super()
    this.state={
      items:[],
      currentItem:{text:'', id:'', completed: false, edit: false},
      itemToShow:"all",
    }
  }
  handleInput = e =>{
    const itemText = e.target.value
    const currentItem = { text :itemText, id: Date.now(), completed: false, edit: false }//Date.now() returns the number of milliseconds
    this.setState({ currentItem, })//update the state from previous to new value when new item is triggered
    console.log("Hello new item.");
  }
  addItem = e =>{
    e.preventDefault();
    const newItem = this.state.currentItem
    if(newItem.text !== ''){
      console.log("new item enters")
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', id:'', completed: false, edit: false},
        itemToShow:"all",
      })
    }
    console.log("Hello item!");
  }
  deleteItem = id =>{
    const filteredItems = this.state.items.filter(item => {//traverse items array, remove id, group remaining data in filtereditems array
      return item.id !== id//removed the particular id on clicking
    })
    this.setState({
      items: filteredItems,//updated the items array
    })
  }
  completeItem = id => {
  const mapItems = this.state.items.map(item => {
    return item.id === id ?{...item, completed: !item.completed} : item
  })
  console.log(mapItems)
  this.setState({
    items:mapItems,
  })
   }

   handleAll = (itemState) => {
    this.setState({
      itemToShow: itemState
    })
   }

   handleActive = (itemState) => {
    this.setState({
      itemToShow: itemState
    })
   }

   handleCompleted = (itemState) => {
    this.setState({
      itemToShow: itemState
    })
   }


   

   editItem = (id) => {

     console.log(this.state.currentItem.edit)
     const updateItemState = this.state.items.map(item => {
       return item.id===id ? {...item, edit: true}:item
     });

     this.setState({
       items: updateItemState,
     })
     console.log(this.state.items)
   }

   updateChange= (e, id) =>{
     const newItem = e.target.value
     console.log(newItem)
     const updateItem = this.state.items.map(item => {
       return item.id === id ? {...item, text: newItem}: item
     })

     this.setState({
       items: updateItem
     })
  }

   handleUpdatedDone= (e, id) =>{
    if(e.keyCode === 13){
    const updateListItem = this.state.items.map(item => {
      return item.id === id ? {...item, edit: false} : item
    })
    this.setState({
     items: updateListItem
   })
   } 
  }

  clearCompletedItems = () =>{
    const activeItems = this.state.items.filter(item => item.completed === false)
    console.log(activeItems)
    this.setState({
      items:activeItems
    })
  }

  completeAllItems = () =>{
    const changeItemState = this.state.items.map(item => {
      return item.completed === false ? {...item, completed: true}:{...item, completed: false} 
    } )
    console.log(changeItemState)
    this.setState({
      items:changeItemState
    })
  }

  render() {
    let filterItems = [];
    if(this.state.itemToShow === "all"){
      filterItems=this.state.items
    }
    else if(this.state.itemToShow === "active"){
      filterItems = this.state.items.filter(item => !item.completed)
    }
    else if(this.state.itemToShow === "completed"){
      filterItems = this.state.items.filter(item => item.completed)
    }
    
    return (
    <div className="todoApp">
      
      <TodoList 
      addItem = {this.addItem}//handle click on add
      currentItem = {this.state.currentItem}//display value of the state set to current item
      handleInput = {this.handleInput}//handle data in input field on change
      inputElement = {this.inputElement}//refer to particular element 
      completeAllItems={this.completeAllItems}
      todoEntry = {this.state.items}
      />
      <div>
      {
      filterItems.map((item) => {
        return (<TodoItem key={item.id}
        entries={item} 
        deleteItem={this.deleteItem} 
        completeItem={this.completeItem} 
        
        editItem={this.editItem}
        updateChange={this.updateChange}
        handleUpdatedDone={this.handleUpdatedDone}
        />)

      })
      }
      </div>

      <div className="buttonsDiv">
                <div className="itemCount">{this.state.items.filter(item => !item.completed).length} item left</div>
                <ul className="itemStatus">
                    <TodoButton handleShow={()=>this.handleAll("all")} buttonText={"All"} />
                    <TodoButton handleShow={()=>this.handleActive("active")} buttonText={"Active"} />
                    <TodoButton handleShow={()=>this.handleCompleted("completed")} buttonText={"Completed"} />
                </ul>
                
                
                <div className={this.state.items.filter(item => item.completed).length > 0 ? "completedCount":"allActive"}
                onClick={() => this.clearCompletedItems()}>Clear Completed</div>
            </div>
    
    <footer className="todoAppInfo">
      <p>Double-click to edit a todo</p>
      <p>Created by petehunt</p>
      <p>Part of todoMVC</p>

    </footer>
    </div>
    );
  }
}

export default App;
