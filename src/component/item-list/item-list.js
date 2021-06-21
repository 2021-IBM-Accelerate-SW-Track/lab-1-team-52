import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

function duplicate(task, tasks){
    for(let i = 0; i < tasks.length; i ++){
        if(task === tasks[i].name){
            return true;
        }
    }
    return false;
}

class Total extends React.Component{
  render(){
    return(
      <div className="total">
        <h3>Total Amount of Tasks: {this.props.total}</h3>
      </div>
    );
  }
};

class ItemForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {qty: 0};
  }
  

  submit(){
    if(duplicate(this.refs.name.value, this.props.itemList)){
        return;
    }
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
        <input type="text" data-testid="new-item-input" placeholder="Input Item Name" ref="name"/>
        <Button data-testid="new-item-button" onClick={this.submit.bind(this)}>Add Item</Button>
        <br/>
      </form>
    );
  }
};

export default class ItemList extends React.Component{
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
    if (!this.state.editing) {
      let newlist = this.state.itemList;
      newlist.splice(i, 1);
      this.setState({
        itemList: newlist,
        total: this.state.total - 1
      })
    }
  }

  saveEdit(idx) {
    if(duplicate(this.refs.edit.value, this.state.itemList)){
        return;
    }
    let newlist = this.state.itemList;
    // console.log(newlist[idx].name);
    newlist[idx].name = this.refs.edit.value;
    console.log(this.refs.edit.value, idx);
    this.setState({
      itemList: newlist,
      editing: false,
      editingItem: -1
    })
  }

  cancelEdit() {
    this.setState(
      {editing: false,
      editingItem: -1}
    )
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
  alphaSort(){   
    let newlist = this.state.itemList;
    newlist.sort((a, b)=>{
      if (a.name < b.name){
        return -1;
      } else if (a.name > b.name){
        return 1;
      } return 0;
    });
    this.setState({
      itemList: newlist
    })

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
              <div display="inline">
                <Button onClick={()=> this.saveEdit(i)} display="inline">Save</Button>
                <Button onClick={()=> this.cancelEdit(i)} display="inline">Cancel</Button>
              </div>
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
        <ItemForm handleCreate={this.createProduct} itemList={this.state.itemList}/>
        <Button onClick={()=> this.alphaSort()}> Sort Alphabetically</Button>
        {items}
        <Total total={this.state.total} />
      </div>
    );
  }
};
