import React from 'react';
// import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.scss';
import './pride_and_prejudice.jpg';
import './jane_eyre.jpg';
import './the_jungle.jpg';
import './a_little_princess.jpg';
import './madame_bovary.jpg';

const AVAILABLE_BOOKS = [
  { title: 'Pride and Prejudice', author: 'Jane Austen', img: 'pride_and_prejudice.jpg' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', img: 'jane_eyre.jpg' },
  { title: 'The Jungle', author: 'Upton Sinclair', img: 'the_jungle.jpg' },
  { title: 'A Little Princess', author: 'Frances Hodgson Burnett', img: 'a_little_princess.jpg' },
  { title: 'Madame Bovary', author: 'Gustave Flaubert', img: 'madame_bovary.jpg' },

];

class SentenceGenerator extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      sentence: ' \n \n \n',
      books: {
        'Pride and Prejudice': false,
        'Jane Eyre': false,
        'The Jungle': false,
        'A Little Princess': false,
        'Madame Bovary': false,
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
  selectBook(e, book) {
    e.preventDefault();
    console.log('Select book');
    console.log(book);
    const { books } = this.state;
    books[book] = !books[book];
    this.setState({ books });
  }

  renderBooks() {
    console.log(this.state);
    return (AVAILABLE_BOOKS.map((book) => {
      console.log(book);
      if (this.state.books[book.title]) {
        return (
          <div className="flex-item-selected"
            role="button"
            tabIndex={0}
            onClick={e => this.selectBook(e, book.title)}
            value={book.title}
          >
            <div className="checkbox"><i className="fas fa-check" /></div>
            <img src={book.img} alt={book.title} />
            <h1> {book.title} </h1>
            <p> {book.author} </p>
          </div>
        );
      } else {
        console.log(book.title);
        return (
          <div className="flex-item"
            role="button"
            tabIndex={0}
            onClick={e => this.selectBook(e, book.title)}
            value={book.title}
          >
            <div className="checkbox" />
            <img src={book.img} alt={book.title} />
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
        <h1 className="title">Second-Order Markov Chain Sentence Generator</h1>
        <div className="flex-container-wrapper">
          <div className="sentence-box">
            <Jumbotron className="jumbo">
              <p>
                {this.state.sentence}
              </p>
              <p>
                <Button className="submit-button" bsStyle="primary" onClick={this.handleClick}> Go! </Button>
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
        <div className="flex-container-wrapper">
          <h1> About </h1>
          <div className="sentence-box">
            <h3> Q: What is a Markov Chain </h3>
            <h4> A mathematical model describing the probabilty of a transitioning to a set of states, based only on the current state. </h4>
            <h3> Q: What does `Second-Order` mean? </h3>
            <h4> It means the probabilty of transitioning to the next state is based on the previous two states.
             In the context of sentence generation it means the state space consists of two words.
            </h4>
            <h3> Q: How are the probabilties generated? </h3>
            <h4> The selected texts are parsed into a dictionary where the key is a an ordered pair of <span style={{ color: 'blue' }}>(word_1, word_2)</span> and the value
            is another dictionary where the key is <span style={{ color: 'green' }}> word_3 </span> and the value is the frequency of
              <span style={{ color: 'green' }}> word_3 </span>ocurring after <span style={{ color: 'blue' }}>word_1</span>.
            and <span style={{ color: 'blue' }}> word_2 </span>. Then, for each ordered pair of words in the dictonary the corresponding
             dictionary is turned into a mapping of word_3 to the probabiillity of
             word_3 ocurring after word_1 and word_2 by dividing the frequency of word_3 by the total frequencies of all the words ocurring after
              <span style={{ color: 'blue' }}>word_1</span> and <span style={{ color: 'blue' }}>word_2</span>..
            </h4>
            <h3> Q: How are the sentences generated? </h3>
            <h4> A pair <span style={{ color: 'blue' }}>(word_1, word_2)</span> where <span style={{ color: 'blue' }}>word_1</span>
             has a capital letter is chosen at random. Based on <span style={{ color: 'blue' }}>(word_1, word_2)</span>,,
             word_3 is chosen according to the probabilty of it occurring after word_1 and word_2.
             This process repeats until a the model trasitions to a state where word_2 has stop punctuation (., !, or ?).
            </h4>
            <h3> Q: Where is the source available? </h3>
            <h4>
              Frontend: <a href="http://www.github.com/stopic13/markov-model-sentence-generator"><i class="fa fa-github" /></a>
              <br /> Backend:  <a href="http://www.github.com/stopic13/markov-model-sentence-generator-backend"><i class="fa fa-github" /></a>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}


const FallBack = () => {
  return <div>URL Not Found</div>;
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
