React = require 'react'
Streams = require 'rxmarbles/controllers/streams'
InputStream = require 'rxmarbles/views/input-stream'

#
# Responsible for startup and connecting controller streams to the views
#
Body = React.createClass({
  getInitialState: -> {}

  render: ->
    return (
      React.DOM.div(null,
        InputStream({stream: Streams.s1})
        InputStream({stream: Streams.s2})
        InputStream({stream: Streams.s3})
      )
    )
})

module.exports = Body