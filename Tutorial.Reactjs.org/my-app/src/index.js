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

//// Lists and Keys
const numbers = [1,2,3,4,5];
const listItems = numbers.map((n) => 
  <li>{n}</li>
);

function NumberList(props){
  const numbers1 = props.numbers;
  const listItems = numbers1.map((n) => 
    <li key={n.toString()}>{n}</li>
  );
  return (
    <ul>{listItems}</ul>
  )
}
//Key
function Blog(props){
  const sidebar = (
    <ul>
      {props.posts.map((post) => 
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map((post) => 
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr/>
      {content}
    </div>
  );
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];


//// Forms
class NameForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>

        <input type='submit' value='Submit' />
      </form>
    );
  }
}

class EssayForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { value: 'Please write an essay about your favorite DOM element.'};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

class FlavorForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: 'coconut'};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange} >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

class Reservation extends React.Component{
  constructor(props){
    super(props);
    this.state = { isGoing: true, numberOfGuests: 2 };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <form>
        <label>
          Is going:
          <input
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          numberOfGuests:
          <input
            name='numberOfGuests'
            type='number'
            checked={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    )
  }
}

//// Lifting State up
function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit){
  return (fahrenheit-32) * 5 /9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
  const input = parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);
    // this.state = { temperature: ''}; //before
  }
  handleChange = (event) =>{
    //this.setState({temperature: event.target.value}); // before
    this.props.OnTemperatureChange(event.target.value);
  }

  render(){
    //const temperature = this.state.temperature; // before
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return(
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
        {/* <BoilingVerdict celsius={parseFloat(temperature)} /> */}
      </fieldset>
    )
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = { temperature:'', scale: 'c'};
  }

  handleCelsiusChange=(temperature)=>{
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange=(temperature)=>{
    this.setState({scale: 'f', temperature});
  }

  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput scale='c' 
          temperature={celsius} 
          OnTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale='f' 
          temperature={fahrenheit} 
          OnTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }

  
}


ReactDOM.render(
  //<Clock />,
  //<Toggle />
  // <LoginControl />
  // <Page />
  // <ul>{listItems}</ul>
  // <NumberList numbers={numbers} />
  // <Blog posts={posts} />
  // <NameForm />
  // <EssayForm />
  // <FlavorForm />
  // <Reservation />
  <Calculator />
  , document.getElementById('root'));












// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
