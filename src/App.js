import React from 'react';
import MessageForm from './components/MessageForm'
import UserForm from './components/UserForm'
import { allChannels } from './actions'
import { connect } from 'react-redux'

class App extends React.Component {
  state = { message: "" }
  source = new EventSource('https://nameless-garden-13309.herokuapp.com/stream')

  componentDidMount() {
    this.source.onmessage = (event) => {
      const channels = JSON.parse(event.data)
      this.props.allChannels(channels)
    }
  }

  render() {
    const channels = this
      .props
      .messages
      .map((channel, index) => <p key={index}>{channel.name}</p>)

    return <main>
      <UserForm user={this.props.user} />
      <MessageForm user={this.props.user} />
      {channels}
    </main>
  }
}

function mapStateToStore(state) {
  return {
    channels: state.channels,
    user: state.user
  }
}

const mapDispatchToProps = {
  allChannels
}

export default connect(mapStateToStore, mapDispatchToProps)(App);
