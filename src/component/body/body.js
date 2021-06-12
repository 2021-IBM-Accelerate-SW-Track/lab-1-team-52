import React from 'react';
import ReactDOM from 'react-dom';
import {List} from '@material-ui/core'
import {ListItem} from '@material-ui/core'
import {ListItemText} from '@material-ui/core'
import {ListItemSecondaryAction} from '@material-ui/core'
import {Checkbox} from '@material-ui/core'
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {ClickAwayListener} from '@material-ui/core'

function duplicate(task, tasks){
    for(let i = 0; i < tasks.length; i ++){
        if(task[0] === tasks[i][0]){
            alert("Duplicate Detected");
            return true;
        }
    }
    return false;
}

class TaskList extends React.Component{
    constructor(){
        super();
        this.state = {tasks: [], change: [-1, ""]};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleSubmit(event){
        let date = new Date();
        let task = [document.getElementById("task-input").value, date + " " + date.getTime()];
        if(duplicate(task, this.state.tasks)){
            return; //Add an duplicate Alert
        }
        let newtasks = this.state.tasks;
        newtasks.push(task);
        this.setState({ tasks: newtasks});
    }
    
    handleDelete(i){
        let newtasks = this.state.tasks;
        newtasks.splice(i, 1);
        this.setState({tasks: newtasks});
    }
    
    handleChange(){
        if (this.state.change[0] !== -1){
            let newtasks = this.state.tasks;
            newtasks[this.state.change[0]][0] = this.state.change[1];
            this.setState({tasks: newtasks});
            this.setState({change: [-1, ""]});
        }
    }

    render(){
        return(
        <body>
         <List>
          <h1>Your Tasks</h1>
          {this.state.tasks.map((task, i) => {
            const labelId = `label-${i}`;
            return(
            <ListItem key={task[0]} role={undefined}>
              <Checkbox edge="start" disableRipple inputProps={{'aria-labelledby': labelId}}/>
              <ClickAwayListener onClickAway={() => {this.handleChange(i);}}>
                <TextField id={labelId} onChange={(e) => {this.setState({change: [i, e.target.value]});} } defaultValue={`${task[0]}`}/>
              </ClickAwayListener>
              <ListItemText id={labelId} primary={`${task[1]}`}/>
              <ListItemSecondaryAction>
                <Button edge="end" onClick={() => {this.handleDelete(i);}}>Delete</Button>
              </ListItemSecondaryAction>
            </ListItem>
            )
          })}
        </List>
        <form noValidate autoComplete="off">
          <TextField id="task-input" data-testid="new-item-input" label="Input a task..." />
          <Button
            onClick={() => {this.handleSubmit();}}
            data-testid="new-item-button">Submit</Button>
        </form>
        </body>
        )
    }
}

export default function Body(){
    return new TaskList();
}
