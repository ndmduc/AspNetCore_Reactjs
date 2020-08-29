import React, { Component } from 'react';
import {TodoBanner} from './TodoBanner';
import {TodoRow} from './TodoRow';
import {TodoCreator} from './TodoCreator';
import {VisibilityControl} from './VisibilityControl';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { 
      userName: 'Adam',
      todoItems: [{ action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }],
      //newItemText: ''
      showCompleted: false
    };
  }

  updateNewTextValue = (event) => {
    this.setState({
      newItemText: event.target.value
    });
  }

  createNewTodo = (task) =>{
    if(!this.state.todoItems.find(item => item.action === task)){
      this.setState((state) => ({
        todoItems: [...state.todoItems, {action: task, done: false}]
        //newItemText: ''
      }, 
      () => localStorage.setItem('todos', JSON.stringify(this.state))));
    }
  }

  toggleTodo = (todo) => {
    this.setState((state) => ({
      todoItems: state.todoItems.map( item => item.action === todo.action
                                    ? {...item, done: !item.done} : item)
    }));
  }

  // todoTableRows = () =>
  //   this.state.todoItems.map(item => 
  //     <tr key={item.action}>
  //       <td>{item.action}</td>
  //       <td><input type='checkbox' checked={item.done} onChange={() => this.toggleTodo(item)}/></td>
  //     </tr>
  //   );
  // todoTableRows = () => 
  //   this.state.todoItems.map(item => 
  //     <TodoRow key={item.action} item={item} callback={this.toggleTodo} />)

  todoTableRows = (doneValue) => 
    this.state.todoItems.filter(item => item.done === doneValue)
      .map(item => 
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />)
  

  componentDidMount = () => {
    let data = localStorage.getItem('todos');
    this.setState(data != null ? JSON.parse(data) :
                  {
                    userName: 'Adam',
                    todoItems: [{ action: "Buy Flowers", done: false },
                      { action: "Get Shoes", done: false },
                      { action: "Collect Tickets", done: true },
                      { action: "Call Joe", done: false }],
                    //newItemText: ''
                    showCompleted: false
                  });
    
  }
  changeStateData = () => {
    // Use func to input previous state for async update of React
    this.setState((state) => ({
      userName: state.userName === 'Adam' ? 'Bob' : 'Adama'
    }));
  }
  
  render(){
    const listTodo = this.state.todoItems.map(function(n, index)  {
      return (<li key={index}>{n.action} : {n.done.toString()}</li>);
    });

    return(
      <div>
        {/* <h4 className="bg-primary text-white text-center p-2">
          {this.state.userName}'s To Do List
          ({this.state.todoItems.filter(t => !t.done).length} items to do)
        </h4> */}
        <TodoBanner name={this.state.userName} task={this.state.todoItems} />
       <div className='container-fluid'>
        {/* <div className='my-1'>
          <input className='form-control'
            value={this.state.newItemText} onChange={this.updateNewTextValue} />
          <button className='btn btn-primary mt-1'
            onClick={this.createNewTodo}> Add</button>
        </div> */}
        <TodoCreator callback={this.createNewTodo} />

        <table className='table table-striped table-bordered'>
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
            <tbody>{ this.todoTableRows(false) }</tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl isChecked={this.state.showCompleted}
            description='Completed Tasks'
            callback={ (checked) => this.setState({showCompleted: checked})} />
        </div>

        {this.state.showCompleted && 
          <table className='table table-striped table-bordered'>
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
            <tbody>{ this.todoTableRows(true) }</tbody>
        </table>
        }
       </div>
       
       {/* <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Description</th><th>Done</th></tr>
        </thead>
          <tbody>{ this.todoTableRows() }</tbody>
        </table> */}
      </div>
    );
  }
};
