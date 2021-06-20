import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
//
var Total = class App extends React.Component{
  render(){
    return(
      <div className="total">
        <h3>Total Amount of Tasks: {this.props.total}</h3>
      </div>
    );
  }
};

var ItemForm = class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {qty: 0};
  }
  

  submit(){
    var today = new Date(),
    thisTime = today.getHours() + ':' + today.getMinutes(),
    thisDate = today.getDate() +  '-' + (today.getMonth() + 1) + '-' +  today.getFullYear();
    
    var item = {
      name: this.refs.name.value,
      time: thisTime,
      date: thisDate
    }
    this.props.handleCreate(item);
    this.refs.name.value = "";
  }

  render(){
    return(
      <form>
        <input type="text" placeholder="Item Name" ref="name"/>
        <Button onClick={this.submit.bind(this)}>Add Item</Button>
        <br/>
      </form>
    );
  }
};

var ItemList = class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {total: 0, 
      itemList: [],
      editing: false,
      editingItem: -1
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(item){
    this.setState({
      itemList: this.state.itemList.concat(item), 
      total: this.state.total + 1
    })
  }

  delete(i){
    let newlist = this.state.itemList;
    newlist.splice(i, 1);
    this.setState({
      itemList: newlist,
      total: this.state.total - 1
    })
  }

  saveEdit(idx) {
    let newlist = this.state.itemList;
    // console.log(newlist[idx].name);
    newlist[idx].name = this.refs.edit.value;
    console.log(this.refs.edit.value, idx);
    this.setState({
      itemList: newlist,
      editing: false
    })
  }

  edit(name, idx){
    this.setState(
      {editing: true,
      editingItem: idx}
    )
    console.log(this.state);
  }

  calculateTotal(){
    this.setState({total: this.state.total + 1});
  }

  render(){
    var component = this;
    var items = this.state.itemList.map((item, i)=>{
      console.log(item);
      return(
      <div className="item">
        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
        <div className="item-info">
          <p className="item-name">{`${item.name}`}</p>
          <p className="item-date-and-time">Added on {`${item.date} at ${item.time}`}</p>
        </div>
        <div className="buttons">
          <Button color="default" variant="contained" onClick={() => this.edit(item.name, i)}>Edit</Button>
          {this.state.editingItem === i && this.state.editing &&
            <form>
              <input type="text" placeholder="Write your edit here" ref="edit"/>
              <Button onClick={()=> this.saveEdit(i)}>Save</Button>
              <br/>
            </form>
          } 
          <Button color="secondary" variant="contained" onClick={()=> this.delete(i)}>Delete</Button>
        </div>
       
        {/* <hr/> */}
      </div>


    );
    
    });
    return(
      <div className="item-list">
        <ItemForm handleCreate={this.createProduct}/>
        {items}
        <Total total={this.state.total} />
      </div>
    );
  }
};



ReactDOM.render(
  <React.StrictMode>
    <App />
    <ItemList />
  </React.StrictMode>,
  document.getElementById('root')
);


