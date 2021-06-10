import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';
import Header from "./component/header"
import './App.css';

function App() {
  return (
    <div className="App">
    <Header/>
    hello Wes 
    < Button > Click me  </Button>
    <List >
    
   <ListItem> <Button> books </Button> </ListItem>
   <ListItem> drinks  </ListItem>
    </List>
    </div>
  );
}

export default App;
