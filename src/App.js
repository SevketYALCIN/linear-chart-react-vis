import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { squat } from './data/squat';
import { deadlift } from './data/deadlift';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair,
  MarkSeries
} from 'react-vis';

const dataSquat = squat.data;
const dataDeadlift = deadlift.data;

class App extends Component {
  state = {
    // 1 = All, 2 = Squat only, 3 = Deadlift only
    elementsShown: 1,
    crosshairValues: [],
    hoveredNode: null
  };

  _onNearestXSquat = (value, { index }) => {
    this.setState({
      crosshairValues: [dataSquat[index]],
      hoveredNode: dataSquat[index]
    });
  };

  _onMouseLeave = () => {
    this.setState({
      crosshairValues: [],
      hoveredNode: []
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Linear Chart using react-vis</h1>
        </header>
        <p>
          <input
            type="button"
            onClick={() => this.setState({ elementsShown: 1 })}
            value="All"
          />
          <input
            type="button"
            onClick={() => this.setState({ elementsShown: 2 })}
            value="Squat"
          />
          <input
            type="button"
            onClick={() => this.setState({ elementsShown: 3 })}
            value="Deadlift"
          />
        </p>
        <div className="App-intro">
          <XYPlot
            xType="time"
            width={1000}
            height={450}
            style={{ margin: 'auto' }}
          >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="Time" />
            <YAxis title="Weight" />
            {(this.state.elementsShown === 1 ||
              this.state.elementsShown === 2) && (
              <LineSeries
                data={dataSquat}
                curve={'curveMonotoneX'}
                className="linear"
                onNearestX={this._onNearestXSquat}
              />
            )}
            {(this.state.elementsShown === 1 ||
              this.state.elementsShown === 3) && (
              <LineSeries
                data={dataDeadlift}
                curve={'curveMonotoneX'}
                className="linear"
              />
            )}
            <Crosshair
              values={this.state.crosshairValues}
              className={'test-class-name'}
            />
            {this.state.hoveredNode && (
              <MarkSeries data={[this.state.hoveredNode]} />
            )}
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default App;
