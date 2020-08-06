import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
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
          // console.log(error);
          this.setState({error: true})
        });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id})
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if (!this.state.error) {
      posts = this.state.posts.map( post => { // maps posts from state into new array 'posts'
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} //passes 'id' from Post to postSelectedHandler(id)
            /> //post.title comes from the data (has title property in JSON)
          }
      );
    }

    return (
      <div>
        <section className="Posts">
          {/*output array of posts*/}
          {posts}
        </section>
        <section>
            <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
            <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;