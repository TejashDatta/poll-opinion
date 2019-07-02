import React from "react";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import M from "materialize-css";
import NavBar from "./components/NavBar";
import AddForm from "./components/AddForm";
import PostItem from "./components/PostItem";
import loading from "./loading.svg";

class App extends React.Component {
  state = {
    loading: true,
    posts: [],
    canPost: true,
    sortBy: "Date",
    filter: "All",
    page: 1,
    canLoad: false,
  };

  getPosts = () => {
    this.setState({ loading: true });
    let { page, filter, sortBy } = this.state;
    sortBy = sortBy === "Likes" ? "voteUpsLength" : "date";
    axios.get("/api/posts", { params: { page, filter, sortBy } }).then(res => {
      this.setState({
        loading: false,
        canPost: res.data.canPost,
        canLoad: res.data.canLoad,
        posts:
          this.state.page === 1
            ? [...res.data.posts]
            : [...this.state.posts, ...res.data.posts],
        page: this.state.page + 1,
      });
    });
  };

  removePost = id => {
    this.setState({ loading: true });
    axios.delete(`/api/posts/${id}`).then(() => {
      this.setState({
        loading: false,
        canPost: true,
        posts: this.state.posts.filter(post => post._id !== id),
      });
    });
  };

  addPost = post => {
    this.setState({ loading: true });
    axios
      .post("/api/posts", post)
      .then(res => {
        this.setState({
          loading: false,
          canPost: false,
          posts: [{ ...res.data, canDelete: true }, ...this.state.posts],
        });
      })
      .catch(err => console.log(err.response.data));
  };

  likeHandler = id => {
    let posts = [...this.state.posts];
    let index = posts.findIndex(post => post._id === id);
    let post = posts[index];
    post.voteUpsLength += post.liked ? -1 : +1;
    post.liked = !post.liked;
    this.setState({ posts });

    axios.put(`api/posts/like/${id}`).then(res => {
      let posts = [...this.state.posts];
      let index = posts.findIndex(post => post._id === res.data._id);
      posts[index].voteUpsLength = res.data.voteUpsLength;
      this.setState({ posts });
    });
  };

  flagHandler = id => {
    let posts = [...this.state.posts];
    let index = posts.findIndex(post => post._id === id);
    let post = posts[index];
    post.flagsLength += post.flagged ? -1 : +1;
    post.flagged = !post.flagged;
    this.setState({ posts });

    axios.put(`api/posts/flag/${id}`).then(res => {
      let posts = [...this.state.posts];
      let index = posts.findIndex(post => post._id === res.data._id);
      posts[index].flagsLength = res.data.flagsLength;
      this.setState({ posts });
    });
  };

  sortByHandler = sortBy => {
    this.setState({
      sortBy,
      page: 1,
    });
  };

  filterHandler = filter => {
    this.setState({
      filter,
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filter !== this.state.filter ||
      prevState.sortBy !== this.state.sortBy
    )
      this.getPosts();
  }

  componentDidMount() {
    this.getPosts();
    M.AutoInit();
    // let dropdowns = document.querySelectorAll(".dropdown-trigger");
    // M.Dropdown.init(dropdowns, { coverTrigger: false });
  }

  render() {
    const postList = this.state.posts.length ? (
      this.state.posts.map(post => {
        return (
          <PostItem
            post={post}
            key={post._id}
            likeHandler={this.likeHandler}
            flagHandler={this.flagHandler}
            removePost={this.removePost}
          />
        );
      })
    ) : (
      <h4 className="text-center">
        No posts yet {this.state.filter === "CPIM" ? "(obviously)" : ""}
      </h4>
    );
    return (
      <div className="App">
        <NavBar
          sortBy={this.state.sortBy}
          filter={this.state.filter}
          filterHandler={this.filterHandler}
          sortByHandler={this.sortByHandler}
        />
        <div className="container">
          <div className="row">
            <div className="col s12 xl8 push-xl2">
              <AddForm addPost={this.addPost} canPost={this.state.canPost} />
              {this.state.loading ? (
                <img className="loading" src={loading} alt="Loading" />
              ) : (
                <div>
                  {postList}
                  {this.state.canLoad ? (
                    <div className="card">
                      <div className="card-content">
                        <h5
                          onClick={this.getPosts}
                          className="text-center blue-text"
                          style={{ margin: "1.5rem auto", cursor: "pointer" }}
                        >
                          Load More
                        </h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
