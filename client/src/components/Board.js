import React from 'react';
import Dice from './Dice';
import { Grid, Button, Divider, Header } from 'semantic-ui-react';
import { rollDice, newGame, postScore } from '../actions/currentGame';
import { connect } from 'react-redux';

class Board extends React.Component {
  state = { gameOver: false };

  checkEndGame = () => {
    let { scores, dispatch } = this.props;
    let gameOver = true;

    scores.map( s => s.score)
    .forEach( score => {
      if(score === null)
        gameOver = false;
    })

    if(gameOver && !this.state.gameOver) {
      let score = this.calcScore();
      dispatch(postScore(score));
      this.setState({ gameOver });
    }
  }

  newGame = () => {
    this.props.dispatch(newGame(() => this.setState({ gameOver: false })));
  }

  calcScore = () => {
    let { scores } = this.props;
    return scores.map( s => s.score)
      .reduce( (total, score) => {
        return total + score
      }, 0);
  }

  render() {
    const { roll, dice, keep, dispatch } = this.props;
    let maxRoll = roll === 3;
    let disabled = maxRoll ? { disabled: true } : {};
    this.checkEndGame();
    let { gameOver } = this.state;
  
    return (
      <Grid>
        <Grid.Row>
          {
            gameOver ?
              <Button
                fluid
                onClick={this.newGame}
              >
                New Game?
              </Button>

              :
              <Button
                fluid
                onClick={() => dispatch(rollDice())}
                {...disabled}
              >
                { maxRoll ? 'Score Roll' : 'Roll' }
              </Button>
          }
          <Grid.Column width={16}>
            <Divider hidden />
          </Grid.Column>
          { roll > 0 && 
            dice.map( (d, i) => {
              let kept = keep.includes(i)
              return (
                <Dice
                  key={i}
                  value={d}
                  kept={kept}
                  index={i}
                />
              )
            })
          }
        </Grid.Row>
        <Grid.Row columns={1} textAlign='center'>
          <Grid.Column>
            <Header>
              {`Total: ${this.calcScore()}`}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

  }
}

const mapStateToProps = (state) => {
  let { dice, keep, roll, scores } = state.currentGame;
  return { dice, keep, roll, scores };
}

export default connect(mapStateToProps)(Board);
