import React from 'react';
import './App.css';
import * as request from 'superagent'

class App extends React.Component {
  state = {
    message: "",
    messages: []
  }
  // it manages receiving requests from the server..
  source = new EventSource('http://localhost:5000/stream')

  componentDidMount() {
    // use fat arrow because of the .this
    this.source.onmessage = (event) => {

      const newMessages = [...this.state.messages, event.data]

      this.setState({ messages: newMessages })
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    console.log('this.state.message', this.state.message)

    const response = await request
      .post('http://localhost:5000/message')
      .send({message: this.state.message})
      console.log('response test:', response)
  }

  onChange = (event) => {
    const { value } = event.target

    this.setState({ message: value })
  }

  render() {
    const messages = this.state
      .messages
      .map((message, index) => <p key={index}>{message}</p>)

    const form = <form onSubmit={this.onSubmit}>
      <input type='text' value={this.state.message} onChange={this.onChange} />
      <button type='submit'>Send</button>
    </form>

    return <main>
      {form}
      {messages}
    </main>
  }
}

export default App;
