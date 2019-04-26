import React from 'react';
import ReactDOM from 'react-dom';
import algorithm from './algorithm';

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      firstColor: "fff",
      secondColor: "fff",
      backgroundColor: "fff",
      items: []
    }
  }

  generate() {
    const { name } = this.state;
    this.setState(algorithm(name))
  }

  render() {

    const { firstColor, secondColor, backgroundColor } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor }}>
        <input onChange={(e) => this.setState({ name: e.target.value })} />
        <a style={{ color: '#fff' }} onClick={() => this.generate()}>generate</a>
        <h2>Icon React:</h2>
        {
          this.state.items.map(items =>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {
                items.map(item =>
                  <div style={{ backgroundColor: item == 1 ? `#${firstColor}` : `#${secondColor}`, width: 80, height: 80, borderRadius: 0 }} />
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<TodoApp />, document.querySelector("#root-react"))