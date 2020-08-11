import React, {Component} from 'react';
import axios from "../../../axios";

import Post from '../../../components/Post/Post'
import './Posts.css'


class Posts extends Component {
  state = {
    posts: []
  }
  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/' + id});
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts') // sends GET req to url
        .then(response => {
          const posts = response.data.slice(0,4); //stores first 4 posts from JSON into 'const posts'
          const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'Kyle'
            } // takes all posts and adds 'author' prop
          });
          this.setState({
            posts: updatedPosts
          })
        })
        .catch(error => {
          console.log(error);
          //this.setState({error: true})
        });
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if (!this.state.error) {
      posts = this.state.posts.map( post => { // maps posts from state into new array 'posts'
        return (
          // <Link to={'/' + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)} //passes 'id' from Post to postSelectedHandler(id)
            />
          // </Link>
        ) //post.title comes from the data (has title property in JSON)
      }
      );
    }

    return (
        <section className="Posts">
          {posts}
        </section>
    )
  }
}

export default Posts;