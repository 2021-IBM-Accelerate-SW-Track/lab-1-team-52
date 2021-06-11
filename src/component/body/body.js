import {List} from '@material-ui/core'
import {ListItem} from '@material-ui/core'
import {ListItemText} from '@material-ui/core'
import {Checkbox} from '@material-ui/core'
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core'

const date = new Date();
let tasks = ["hello"];

function addTask(){
    let task = document.getElementById("task-input").value + " " + date + " " + date.getTime();
    for(let i = 0; i < tasks.length; i ++){
        if(task === tasks[i]){
            return;
        }
    }
    tasks.push(task);
    console.log(tasks);
}

export default function Body(){
    return (
        <body>
        <List>
          <h1>Your Tasks</h1>
          {tasks.map((task) => {
            const labelId = `checkbox-list-label-${task}`;
            return(
            <ListItem key={task} role={undefined}>
              <Checkbox edge="start" disableRipple inputProps={{'aria-labelledby': labelId}}/>
              <ListItemText id={labelId} primary={`${task}`}/>
            </ListItem>
            )
          })}
        </List>
        <form noValidate autoComplete="off">
          <TextField id="task-input" label="Input a task..." />
          <Button
            onClick={() => {
              addTask();
            }}
          >Submit</Button>
        </form>
        </body>
    );
}
