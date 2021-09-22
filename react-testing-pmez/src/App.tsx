import { Component } from "react";
import "./App.css";
import PersonLists from "./components/PersonLists";

class App extends Component {
  state = {
    people: [],
  };

  render() {
    return (
      <div className="App">
        <PersonLists people={this.state.people} />
      </div>
    );
  }
}

export default App;
