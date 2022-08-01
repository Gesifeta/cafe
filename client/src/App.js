import './App.css';
import UserList from './views/userList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
         <span style={{backgroundColor:"red",color:"White",fontSize:"24px", fontStyle:"italic"}}>CAFE</span><span style={{backgroundColor:"white",color:"black",fontSize:"24px"}}>.ET</span> 
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      
      </header> 
       <UserList/>
    </div>
  );
}

export default App;
