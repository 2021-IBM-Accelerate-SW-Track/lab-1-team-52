import React from 'react';
import ReactDOM from 'react-dom';
import {List} from '@material-ui/core'
import {ListItem} from '@material-ui/core'
import {ListItemText} from '@material-ui/core'
import {ListItemSecondaryAction} from '@material-ui/core'
import {Checkbox} from '@material-ui/core'
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core'

function duplicate(task, tasks){
    for(let i = 0; i < tasks.length; i ++){
        if(task[0] === tasks[i][0]){
            return true;
        }
    }
    return false;
}

class TaskList extends React.Component{
    constructor(){
        super();
        this.state = {tasks: []};
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
    handleDelete(task){
        let newtasks = [];
        for(let i = 0; i < this.state.tasks.length; i ++){
            if(this.state.tasks[i][0] !== task[0]){
                newtasks.push(this.state.tasks[i]);
            }
        }
        this.setState({tasks: newtasks});
    }
    
    render(){
        return(
        <body>
         <List>
          <h1>Your Tasks</h1>
          {this.state.tasks.map((task) => {
            console.log(task);
            const labelId = `checkbox-list-label-${task[0]}`;
            return(
            <ListItem key={task[0]} role={undefined}>
              <Checkbox edge="start" disableRipple inputProps={{'aria-labelledby': labelId}}/>
              <TextField id={labelId} defaultValue={`${task[0]}}`}/>
              <ListItemText id={labelId} primary={`${task[1]}`}/>
              <ListItemSecondaryAction>
                <Button edge="end" onClick={() => {this.handleDelete(task);}} >Delete</Button>
              </ListItemSecondaryAction>
            </ListItem>
            )
          })}
        </List>
        <form noValidate autoComplete="off">
          <TextField id="task-input" label="Input a task..." />
          <Button onClick={() => {this.handleSubmit();}} >Submit</Button>
        </form>
        </body>
           
        )
    }
}

export default function Body(){
    return new TaskList();
}
