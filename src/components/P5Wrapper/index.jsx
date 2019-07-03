import React, { Component } from "react";
import Tone from "tone";

import beatsketch from "./beatsketch";

export default class P5Wrapper extends Component {
  state = {
    isPlaying: false,
    isReseting: false
  };

  componentDidMount() {
    this.canvas = new window.p5(beatsketch, "canvas-container");
    this.canvas.props = { ...this.props.p5Props, ...this.state };
    this.canvas.resetDone = this.resetDone;
    this.canvas.onSetAppState = this.props.onSetAppState;
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  updateCanvasProps = () => {
    this.canvas.props = this.state;
  };

  componentWillUnmount() {
    this.canvas.remove();
  }

  playPressed = e => {
    Tone.context.resume();
    if (!this.state.isPlaying)
      this.setState({ isPlaying: true }, this.updateCanvasProps);
    else this.setState({ isPlaying: false }, this.updateCanvasProps);
  };

  resetPressed = () => {
    this.setState({ isReseting: true }, this.updateCanvasProps);
  };

  resetDone = () => {
    this.setState({ isReseting: false }, this.updateCanvasProps);
  };

  render() {
    return (
      <>
        <div
          id="canvas-container"
          style={{ width: "100%", textAlign: "center" }}
        />
        <div style={{ padding: 20, margin: 20 }}>
          <button onClick={this.playPressed} style={styles.buttonStyle}>
            {(this.state.isPlaying && "Stop") || "Play"}
          </button>
          <button onClick={this.resetPressed} style={styles.buttonStyle}>
            Reset
          </button>
        </div>
      </>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 100,
    padding: 10,
    backgroundColor: "#ffdd59",
    margin: 20,
    borderRadius: 5,
    fontSize: 20
  }
};
