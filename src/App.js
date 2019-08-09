import React from 'react';
import MessageForm from './components/MessageForm'
import UserForm from './components/UserForm'
import { allMessages } from './actions'
import { connect } from 'react-redux'

class App extends React.Component {
  state = { message: "" }
  source = new EventSource('https://nameless-garden-13309.herokuapp.com/stream')

  componentDidMount() {
    this.source.onmessage = (event) => {
      const messages = JSON.parse(event.data)
      this.props.allMessages(messages)
    }
  }

  render() {
    const messages = this
      .props
      .messages
      .map((message, index) => <p key={index}>{message.user}: {message.text}</p>)

    return <main>
      <UserForm user={this.props.user} />
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
