import React from 'react';
import Board from './Board';
import ScoreCard from './ScoreCard';
import { Grid } from 'semantic-ui-react';

const styles = {
  fullHeight: { height: '100vh' },
  board: { backgroundColor: '#AAFFAA' },
  scores: { backgroundColor: '#9370DB' }
}

const Game = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={10} style={{...styles.board, ...styles.fullHeight}}>
        <Board />
      </Grid.Column>
      <Grid.Column width={6} style={{...styles.scores, ...styles.fullHeight}}>
        <ScoreCard />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default Game;

