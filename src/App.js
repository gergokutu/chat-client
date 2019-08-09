import React from 'react';
import MessageForm from './components/MessageForm'
import UserForm from './components/UserForm'
import { allMessages } from './actions'
import { connect } from 'react-redux'

class App extends React.Component {
  // we changed to redux »
  // state = {
  //   // sent by users
  //   message: "",
  //   // messages from the server
  //   messages: []
  // }
  state = { message: "" }

  // it manages receiving requests from the server..
  // change the http://localhost:5000/stream to heroku server: https://nameless-garden-13309.herokuapp.com/stream  
  source = new EventSource('http://localhost:5000/stream')

  componentDidMount() {
    // use fat arrow because of the .this
    this.source.onmessage = (event) => {
      // we do not want all the messages copied so
      // removed the newMessages part
      // const newMessages = [...this.state.messages, event.data]
      // create JSON from string
      const messages = JSON.parse(event.data)
      // clear the input field of the form
      // we changed to redux
      // this.setState({ messages })
      this.props.allMessages(messages)
    }
  }

  // this part has been moved to a container » components/MessageForm/index.js
  // onSubmit = async (event) => {
    // // we changed to redux
    // event.preventDefault()
    // // console.log('this.state.message', this.state.message)

    // const response = await request
    // // change the http://localhost:5000/message to heroku server: https://nameless-garden-13309.herokuapp.com/message  
    //   .post('http://localhost:5000/message')
    //   .send({ message: this.state.message })
    // console.log('response test:', response)

    // this.setState({ message: "" })
  // }

  // this part has been moved to a container » components/MessageForm/index.js
  // onChange = (event) => {
  //   // // we changed to redux
  //   // const { value } = event.target
  //   // this.setState({ message: value })
  // }

  render() {
    const messages = this
      // we changed to redux
      // .state
      .props
      .messages
      .map((message, index) => <p key={index}>{message.user}: {message.text}</p>)

    // moved to a container » components/MessageForm/index.js
    // text input takes the value of the message
    // const form =
    //   <div>
    //   <h3>New messages</h3>
      
    //     <form onSubmit={this.onSubmit}>
    //       <input type='text' value={this.state.message} onChange={this.onChange} />
    //       <button type='submit'>Send</button>
    //     </form>
    //   </div>


    return <main>
      <UserForm/>
      <MessageForm user={this.props.user} />
      {messages}
    </main>
  }
}

function mapStateToStore(state) {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = {
  allMessages
}



export default connect(mapStateToStore, mapDispatchToProps)(App);
