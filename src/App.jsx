import React, { Component } from 'react';

var theid = 0;
const ExampleItem = function (props) {
  return (<button id={props.todoItemId} type='button' className={props.priority} >
    <strong className='smalltextsize'>{props.name}</strong>
    <div onClick={() => props.edit(props.todoItemId)}> 
    <a className="fa fa-edit fa-2x edit-todo"></a></div>
    <div onClick={() => props.delete(props.todoItemId)}>
      <a className=" fa fa-trash-alt  fa-2x delete-todo" ></a> </div> 
      <br className='smalltextsize' /> <p>{props.othertext}</p></button>)
}

const Item = function (props) {
  return (<button id={props.todoItemId} type='button' className={props.priority} >
    <input type="checkbox" className='left' onClick={() => props.checked(props.todoItemId)} />
    <strong className='smalltextsize'>{props.name}</strong>
    <div onClick={() => props.edit(props.todoItemId)}> 
    <a className="fa fa-edit fa-2x edit-todo"></a></div><div onClick={() => props.delete(props.todoItemId)}>
      <a className=" fa fa-trash-alt  fa-2x delete-todo" ></a> </div>
      

  </button>)
}

const Itemcompleted = function (props) {
  return (<button id={props.todoItemId} type='button' className={props.priority} >
    <input id="checkBox" type="checkbox" className='left' onClick={() => props.checked(props.todoItemId)} />
    <strong className='smalltextsize strikethrough'>{props.name}</strong>
    <div onClick={() => props.edit(props.todoItemId)}> 
    <a className="fa fa-edit fa-2x edit-todo"></a></div><div onClick={() => props.delete(props.todoItemId)}>
      <a className=" fa fa-trash-alt  fa-2x delete-todo" ></a> </div> 
      

  </button>)


}

const Itemedit = function (props) {
  return (<li className={props.priority} id={props.todoItemId} >
    <strong htmlFor='edittext'> Description </strong>
    <textarea rows='4' onChange={props.inputs} className='update-todo-text' id='edittext' name='text' defaultValue={props.name}>
    </textarea>
    <strong htmlFor='editpriority' > Priority</strong><br />
    <select onChange={props.inputs} className='update-todo-priority' id='editpriority' name='priority'>
      <option value='0'>Select a Priority</option>
      <option value='1'> Low Priority </option>
      <option value='2'> Medium Priority </option>
      <option value='3'> High Priority </option>
    </select>
    <button className='update-todo btn btn-success lastbutton' onClick={() => props.edit(props.todoItemId)}> Save</button>
  </li>);
}

class Additem extends React.Component {

  render() {
    return (
      <div className='roundedandpadding plainbackground rounded'>
        <div >
          <p> Add New Todo </p>
        </div>
        <div>
          <div className="panel-body extraspace" >
            <strong> I want to...</strong>
            <textarea rows='4' onChange={this.props.inputs} className='create-todo-text' name='text'>
            </textarea>
            <strong> How Much of a Priority is this? </strong>
            <select onChange={this.props.inputs} className='create-todo-priority' name='priority'>
              <option value='0'>Select a Priority</option>
              <option value='1'> Low Priority </option>
              <option value='2'> Medium Priority </option>
              <option value='3'> High Priority </option>
            </select>

          </div>

          <button className='btn btn-success btn-lg btn-block create-todo' id='calculate' onClick={this.props.submit}> Add </button>

        </div>

      </div>
    );
  }
}



class Tasks extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (

      <div className='roundedandpadding rounded'>
        <div className='lightgrey rounded'>
          <p className='indent'>View Todos</p>
          < ul className='list-group'>
            {this.props.items.map(item => {

              if (item.editEnabled === true) {
                return <Itemedit
                  key={item.todoItemId}
                  todoItemId={item.todoItemId}
                  name={item.name}
                  priority={item.priority}
                  completed={item.completed}
                  othertext={item.othertext}
                  editEnabled={item.editEnabled}
                  delete={this.props.delete}
                  edit={this.props.edit}
                  inputs={this.props.inputs}
                // submit={this.props.submit}
                />
              } else if (item.completed == true) {
                return <Itemcompleted
                  key={item.todoItemId}
                  todoItemId={item.todoItemId}
                  name={item.name}
                  priority={item.priority}
                  completed={item.completed}
                  othertext={item.othertext}
                  editEnabled={item.editEnabled}
                  delete={this.props.delete}
                  edit={this.props.edit}
                  checked={this.props.checked}
                />
              } else if (item.todoItemId == 0) {
                return <ExampleItem
                  key={item.todoItemId}
                  todoItemId={item.todoItemId}
                  name={item.name}
                  priority={item.priority}
                  completed={item.completed}
                  othertext={item.othertext}
                  editEnabled={item.editEnabled}
                  delete={this.props.delete}
                  edit={this.props.edit}
                  checked={this.props.checked}
                />
              }


              else {
                return <Item
                  key={item.todoItemId}
                  todoItemId={item.todoItemId}
                  name={item.name}
                  priority={item.priority}
                  completed={item.completed}
                  othertext={item.othertext}
                  editEnabled={item.editEnabled}
                  delete={this.props.delete}
                  edit={this.props.edit}
                  checked={this.props.checked}
                />
              }
            }

            )}

          </ul>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {

      items: [{
        todoItemId: 0,
        name: 'Welcome to the Very Simple Todo App!',
        priority: 'list-group-item list-group-item-info smallertext ',
        completed: false,
        othertext: 'Get Started now by adding a new todo  on the left ',
        editEnabled: false

      }]

    };
    this.handleChange = this.handleChange.bind(this);
    this.deletetodo = this.deletetodo.bind(this);
    this.edittodo = this.edittodo.bind(this);
    this.calculatenewtodo = this.calculatenewtodo.bind(this);

    this.completetodo = this.completetodo.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value

    });


  }


  deletetodo(i) {
    console.log(this.state);
    // debugger;
    let todocopy = this.state.items.slice();
    var index = this.state.items.findIndex(item => item.todoItemId === i);
    todocopy.splice(index,1);
    // todocopy.splice(this.state.items[index], 1);
    this.setState({ items: todocopy })
  }


  calculatenewtodo(event) {
    event.preventDefault();
    theid++
    var itemid = theid;
    var nametext1 = this.state.text;
    var priority1;
    if (this.state.priority == 1) {
      priority1 = 'list-group-item list-group-item-success smallertext ';
    } else if (this.state.priority == 2) {
      priority1 = 'list-group-item list-group-item-warning smallertext ';
    } else {
      priority1 = 'list-group-item list-group-item-danger smallertext ';
    }

    var completed1 = false;
    var othertext1 = '';


    var newItem = {
      todoItemId: itemid,
      name: nametext1,
      priority: priority1,
      completed: completed1,
      othertext: othertext1,
      editEnabled: false

    }

    var newTodos = [...this.state.items];
    newTodos.push(newItem);
    this.setState({ items: newTodos });
  }
  edittodo(i) {
    console.log(this.state);
    let todocopy = this.state.items.slice();
    var index = this.state.items.findIndex(item => item.todoItemId === i);
    if (todocopy[index].editEnabled == false) {
      todocopy[index].editEnabled = true;
    } else {
      todocopy[index].editEnabled = false;
      todocopy[index].name = this.state.text;
      // priority1=todocopy[index].
      if (this.state.priority == 1) {
        todocopy[index].priority = 'list-group-item list-group-item-success smallertext ';
      } else if (this.state.priority == 2) {
        todocopy[index].priority  = 'list-group-item list-group-item-warning smallertext ';
      } else {
        todocopy[index].priority  = 'list-group-item list-group-item-danger smallertext ';
      }

    }
    this.setState({ items: todocopy })
   

  }



  completetodo(i) {
    let todocopy = this.state.items.slice();
    var index = this.state.items.findIndex(item => item.todoItemId === i);
    if (todocopy[index].completed == false) {
      todocopy[index].completed = true
    } else {
      todocopy[index].completed = false

    };
    this.setState({ items: todocopy })
  }

  render() {

    return (
      <div className='container'>
        <div className='header white'>
          < h1> Very Simple Todo App </h1>
          <h2> Track all of the things </h2>
          <hr className='white bar' />
        </div>
        <form >
          <div className="row wide-gutter">
            <div className='col-md-4'>
              <Additem submit={this.calculatenewtodo} inputs={this.handleChange} />
            </div>
            <div className='col-md-8'>
              <Tasks items={this.state.items} delete={this.deletetodo} edit={this.edittodo} inputs={this.handleChange} checked={this.completetodo} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
