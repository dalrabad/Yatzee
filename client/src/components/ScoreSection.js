import React from 'react';
import { Segment, Header, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ScoreRow from './ScoreRow';

class ScoreSection extends React.Component {
  total = (score, label) => {
    return(
      <List.Item key={label}>
        <Header floated='left'>{label}</Header>
        <Header floated='right' style={{ marginRight: '20px'}}>{score}</Header>
      </List.Item>
    )
  }

  generateTotal = () => {
    const { currentGame: { scores }, label } = this.props;
    const sectionScores = [];
    const sectionTotal = scores.reduce( (total, entry) => {
      let score = entry.score || 0;
      return total + score
    }, 0);

    sectionScores.push(this.total(sectionTotal, 'Section Total'));

    if(label === 'Upper') {
      const bonus = sectionTotal >= 63 ? 35 : 0;
      sectionScores.push(this.total(bonus, 'Bonus'));
      sectionScores.push(this.total(bonus + sectionTotal, 'Total Score'));
    }

    return sectionScores;
  }

  render() {
    const { label, currentGame: { scores } } = this.props;

    return(
      <Segment basic>
        <Header as='h3'>{label} Section</Header>
        <List divided>
          {
            scores.map( (score, i) => {
              return <ScoreRow key={i} {...score} />
            })
          }
          { this.generateTotal() }
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = (globalState, props) => {
  const scores = globalState.currentGame.scores.filter( s => s.section === props.label.toLowerCase());
  return { currentGame: { ...globalState.currentGame, scores } }
}

export default connect(mapStateToProps)(ScoreSection);
