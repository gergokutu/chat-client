import React from 'react';
import './App.css';
import * as request from 'superagent'

class App extends React.Component {
  state = {
    message: "",
    messages: []
  }
  // it manages receiving requests from the server..
  // change the http://localhost:5000/stream to heroku server 
  source = new EventSource('https://nameless-garden-13309.herokuapp.com/stream')

  componentDidMount() {
    // use fat arrow because of the .this
    this.source.onmessage = (event) => {
      // we do not want all the messages copied so
      // removed the newMessages part
      // const newMessages = [...this.state.messages, event.data]
      // create JSON from string
      const messages = JSON.parse(event.data)
      // clear the input field of the form
      this.setState({ messages })
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    // console.log('this.state.message', this.state.message)

    const response = await request
    // change the http://localhost:5000/message to heroku server 
      .post('https://nameless-garden-13309.herokuapp.com/message')
      .send({ message: this.state.message })
    console.log('response test:', response)

    this.setState({ message: "" })
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
