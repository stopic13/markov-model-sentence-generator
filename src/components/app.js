import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.scss';

class SentenceGenerator extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { sentence: 'Click the button below to generate a sentence' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get('http://localhost:8000/sentence')
      .then((response) => {
        console.log(response);
        this.setState({ sentence: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="sentence-box">
          <Jumbotron class="jumbo">
            <h1>Sentence Generator</h1>
            <p>
              {this.state.sentence}
            </p>
            <p>
              <Button className="submit-button" bsStyle="primary" btn-onClick={this.handleClick}> Generate Sentence </Button>
            </p>
          </Jumbotron>
        </div>
        <Footer />
      </div>
    );
  }
}


const FallBack = () => {
  return <div>URL Not Found</div>;
};

const Footer = () => {
  return <footer> HI <i className="fab fa-github" /></footer>;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SentenceGenerator} />
        <Route component={FallBack} />
      </Switch>
    </Router>
  );
};
export default App;
// ReactDOM.render(<App />, document.getElementById('main'));
