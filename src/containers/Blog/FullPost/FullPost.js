import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidMount() {
    this.loadData();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      //makes GET req if there is no loadedPost,
      // or if there is a loadedPost && it has a different id than the current post
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
        axios.get('/posts/' + this.props.match.params.id)
            .then(response => {
              this.setState({
                loadedPost: response.data
              })
            })
      }
    }
  }


  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
        .then(response => {
          console.log(response);
        })
}

  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{textAlign: 'center'}}>Loading...</p>
    }
    if (this.state.loadedPost) { //outputs if there is a loadedPost
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
          </div>
        </div>

      );
    }
    return post;
  }
}

export default FullPost;