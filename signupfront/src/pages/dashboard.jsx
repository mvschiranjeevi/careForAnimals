import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../utils/paginate";
// @ts-ignore
// import config from "../utils/config.json";
import http from "../services/httpService";
import ResponsiveAppBar from "../components/navBar";
import { Spinner, Stack } from "@chakra-ui/react";
import Provider from "../chakra-theme/Provider";

class DashboardPage extends Component {
  token = localStorage.getItem("token");
  postEndPoint = "http://localhost:4000/posts/";
  tagsEndPoint = "http://localhost:4000/tags/";
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
  };
  async componentDidMount() {
    const { data: allposts } = await http.get(this.postEndPoint);
    const { data: tags } = await http.get(this.tagsEndPoint);

    this.setState({
      allposts: [...allposts],
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlePostDelete = (post) => {};
  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };
  getPosts() {
    const { allposts, selectedTag } = this.state;
    const filtered = [];
    for (let i in allposts) {
      const post = allposts[i];
      const { tags } = post;
      for (let j in tags) {
        if (tags[j].name === selectedTag.name) {
          filtered.push(post);
          break;
        }
      }
    }
    console.log(filtered);
    return filtered;
  }

  render() {
    const { user } = this.props;
    const { allposts, pageSize, currentPage, tags, selectedTag } = this.state;
    const filtered = selectedTag._id === "1" ? allposts : this.getPosts();
    console.log(allposts);
    const posts = paginate(filtered, currentPage, pageSize);
    // return <div>Sexy</div>;

    return (
      <React.Fragment>
        {/* <ResponsiveAppBar /> */}
        {!this.token && (
          <Provider>
            <Stack
              boxSize="full"
              h="100vh"
              justify="center"
              alignItems="center"
            >
              <Spinner size="xl" />
              <Link href="/login">You may not be logged in</Link>
            </Stack>
          </Provider>
        )}
        {this.token && (
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="d-flex w-100 justify-content-between m-3">
                  {allposts.length === 0 && (
                    <p>There are no posts in the database!</p>
                  )}
                  {allposts.length !== 0 && (
                    <p>Showing {filtered.length} posts.</p>
                  )}

                  {user && (
                    <Link to="/new-post">
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginBottom: 20 }}
                      >
                        New Post
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <Posts posts={posts} onDelete={this.handlePostDelete} />
              </div>
              {allposts.length !== 0 && (
                <div className="col-3">
                  <ListGroup
                    items={tags}
                    selectedTag={this.state.selectedTag}
                    onTagSelect={this.handleTagSelect}
                  />
                </div>
              )}

              <Pagination
                itemCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default DashboardPage;
