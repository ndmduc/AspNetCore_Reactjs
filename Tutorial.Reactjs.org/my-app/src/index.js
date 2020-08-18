import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// function Clock(props){
//   return (
//     <div>
//       <h1>Hello, world</h1>
//       <h2>It is {props.date.toLocaleTimeString()}</h2>
//     </div>
//   )
// }

// function tick(){
//   ReactDOM.render(
//     <Clock />
//     , document.getElementById('root'));
// }

// setInterval(tick, 1000);

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }
  
  render(){
    return (
      <div>
        <h1>Hello, world</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    // can workaround in 2 other ways
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () =>{
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render(){
    return(
      
      <button onClick={this.handleClick}>
        {this.state.isToggleOn? 'ON' : 'OFF'}
      </button>
    );
  }
}

//// Login
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

class LoginControl extends React.Component{
  constructor(props){
    super(props);
    this.state={isLoggedIn: false};
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});

  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});

  }

  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let button = isLoggedIn ? 
                    <LogoutButton onClick={this.handleLogoutClick} /> :
                    <LoginButton onClick={this.handleLoginClick} />;
    

    return(
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}
//// Login

//// Warning
function WarningBanner(props){
  if (!props.warn){
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  )
}
class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {showWarning: true};

  }

  handleToggleClick = () => {
    this.setState(state => ({
      showWarning: !state.showWarning
    })

    );
  }

  render(){
    return(
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}
ReactDOM.render(
  //<Clock />,
  //<Toggle />
  // <LoginControl />
  <Page />
  , document.getElementById('root'));












// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
