import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import '../style.scss';


const About = (props) => {
  return (
    <div>
      <h1> All there is to know about me </h1>
      <img src="https://media.giphy.com/media/3ohs7Lr3EacQi1Dh8Q/giphy.gif" alt="" width="480" height="360" />
    </div>
  );
};
const Welcome = (props) => {
  return (
    <div>
      <h1> Welcome </h1>
      <img src="https://media.giphy.com/media/BMaE0wCQhcJj2/giphy.gif" alt="" width="480" height="360" />
    </div>
  );
};
const Test = (props) => {
  return <div> ID: {props.match.params.id} </div>;
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li> <NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route exact path="/test/:id" component={Test} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
