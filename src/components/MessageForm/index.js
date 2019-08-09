import React from 'react'
import * as request from 'superagent'
import View from './view'

export default class MessageForm extends React.Component {
  state = { message: "" }

  onSubmit = async (event) => {
    event.preventDefault()


    await request
      // change the http://localhost:5000/message to heroku server: https://nameless-garden-13309.herokuapp.com/message  
      .post('http://localhost:5000/message')
      .send({
        message: this.state.message,
        user: this.props.user 
      })

    this.setState({ message: "" })
  }

  onChange = (event) => {
    // we changed to redux
    const { value } = event.target
    this.setState({ message: value })
  }

  render() {
    return <View
      onSubmit={this.onSubmit}
      value={this.state.message}
      onChange={this.onChange}
    />
  }
}

