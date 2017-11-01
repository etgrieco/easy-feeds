import React from 'react';
import { withRouter } from 'react-router-dom';

class StoriesShow extends  React.Component {

  constructor(props) {
    super(props);
    // props: match.params.id
    debugger
  }

  render() {
    return <h1>Hello, story!</h1>;
  }
}

export default withRouter(StoriesShow);
