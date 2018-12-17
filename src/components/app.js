import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.scss';
import './pride_and_prejudice.jpg';

const AVAILABLE_BOOKS = [
  { title: 'Pride and Prejudice', author: 'Jane Austen', img: 'pride_and_prejudice.jpg' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', img: 'pride_and_prejudice.jpg' },
];

class SentenceGenerator extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      sentence: 'Click the button below to generate a sentence',
      books: {
        'Pride and Prejudice': false,
        'Sleeping Beauty': false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.selectBook = this.selectBook.bind(this);
  }

  handleClick() {
    axios.get(
      //      'https://markov-chain-backend.herokuapp.com/sentence',
      'http://localhost:8000/sentence',
      {
        params: {
          books: this.state.books,
        },
      },
    )
      .then((response) => {
        console.log(response);
        this.setState({ sentence: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  selectBook(e) {
    const { books } = this.state;
    books[e.target.value] = !books[e.target.value];
    this.setState({ books });
  }

  renderBooks() {
    console.log(this.state);
    return (AVAILABLE_BOOKS.map((book) => {
      console.log(book);
      if (this.state.books[book.title]) {
        return (
          <div className="flex-item">
            <img src={book.img} alt="" />
            <h1> {book.title} </h1>
            <p> {book.author} </p>
          </div>
        );
      } else {
        return (
          <div className="flex-item">
            <img src={book.img} alt="" />
            <h1> {book.title} </h1>
            <p> {book.author} </p>
          </div>
        );
      }
    }));
  }

  //   { (this.state.books['Pride and Prejudice']) ?
  //   //   <Button className="submit-button" value="Pride and Prejudice" bsStyle="primary" onClick={e => this.selectBook(e)}> Pride and Prejudice </Button>
  //   //   : <Button className="submit-button" value="Pride and Prejudice" bsStyle="warning" onClick={e => this.selectBook(e)}> Pride and Prejudice </Button>
  //   // }    })
  // );

  render() {
    console.log(this.state);
    return (
      <div className="main-container">
        <div className="flex-container-wrapper">
          <div className="sentence-box">
            <Jumbotron class="jumbo">
              <h1>Sentence Generator</h1>
              <p>
                {this.state.sentence}
              </p>
              <p>
                <Button className="submit-button" bsStyle="primary" onClick={this.handleClick}> Generate Sentence </Button>
              </p>
            </Jumbotron>
          </div>
        </div>
        <span />
        <div className="flex-container-wrapper">
          <div className="flex-container">
            {this.renderBooks()}
          </div>
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
  return <footer> <a href="http://www.github.com/stopic13/markov-model-sentence-generator"> <i className="fab fa-github" /> </a></footer>;
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
