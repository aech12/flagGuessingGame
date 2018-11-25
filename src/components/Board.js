import React, {Component} from 'react';
import './All.css'
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: Array(4).fill({name:'Country'}),
      correctOption: {flag: 'flag'},
      selectedOption: undefined,
      showAnswerScreen: 'loading'
    }
  }
  componentDidMount() {
      fetch('https://restcountries.eu/rest/v2/all')
        .then(d=> d.json())
        .then(d=> {
          const options = this.getRandomCountries(d);
          const correctOption = options[Math.floor(Math.random()*4)]
          this.setState({
            options,
            correctOption,
          })
        })
    }

  getRandomCountries = (allCountries) => {
    let options = this.state.options;
    for (let i=0; i<4; i++) {
      options[i] = 
      allCountries[Math.floor(Math.random()*allCountries.length)]
    }
    return options;
  }

  pickRadio = (e) => {
    this.setState({selectedOption: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({showAnswerScreen: 'next'})
  }
  showAnswer = () => {
    if (this.checkCorrectOpt()) {
      return (
        <div>
          <h3>{`Right! Answer is: ${this.state.correctOption.name}`}</h3>
          <button onClick={this.showNextQuestion}>Next</button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>{`Wrong! Answer is: ${this.state.correctOption.name}`}</h3>
          <button onClick={this.showNextQuestion}>Try again</button>
        </div>
      )
    }
  }

  showNextQuestion = () => {
    this.setState({
      showAnswerScreen: 'loading',
      options: Array(4).fill({name:'Country'}),
      correctOption: {flag: 'flag'},
      selectedOption: undefined,
    })
    this.componentDidMount();
  }

  checkCorrectOpt = () => {
    if (`${this.state.selectedOption}`===`${this.state.correctOption.name}`)
    {return true} else {return false}
  }
  
  displayPage = () => {
    let flag = this.state.correctOption.flag;
    switch(this.state.showAnswerScreen) {
      case 'loading':
        return(
          <div className='loading'>
            {<h1>Loading..</h1>}
            {setTimeout(()=>{
              this.setState({showAnswerScreen: 'game'})
            }, 500)}
          </div>
        )
        break;
      case 'game':
        return (
          <div>
              <Square 
                onSubmit={this.handleSubmit} 
                options={this.state.options}
                selectedOption={this.state.selectedOption}
                onChange={this.pickRadio}
              />
              <img className='flag' alt='flag' src={`${flag}`} />
            </div>
        )
        break;
      case 'next': 
        return (
          <div>
              {this.showAnswer()}
            </div>
        )
        break
    }
  }
  render() {
    return (
      <div>
        {this.displayPage()}
      </div>
    );
  }
}

export default Board;