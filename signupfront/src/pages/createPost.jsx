import React from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import Input from "../components/input";
import Form from "../components/form";
import http from "../services/httpService";
import ResponsiveAppBar from "../components/navBar";
import { Spinner, Stack } from "@chakra-ui/react";
import Provider from "../chakra-theme/Provider";
import { Link } from "react-router-dom";

// @ts-ignore
// import config from "../utils/config.json";
import { createpost } from "../services/postCreateService.js";

class NewPost extends Form {
  token = localStorage.getItem("token");

  tagsEndPoint = "https://care-for-animals-backend.onrender.com/tags";
  state = {
    data: { title: "", description: "", tags: [] },
    errors: { title: "", description: "", tags: [] },
    tags: [],
  };
  schema = {
    title: Joi.string().required().min(5).label("Title"),
    description: Joi.string().required().min(3).label("Description"),
    tags: Joi.array(),
  };
  handleTagChange = (tagID) => {
    // console.log("hellos");
    let data = this.state.data;
    const newtags = data.tags;
    const index = newtags.indexOf(tagID);
    if (index === -1) newtags.push(tagID);
    else newtags.splice(index, 1);
    data = {
      title: data.title,
      description: data.description,
      tags: newtags,
    };
    // console.log(data);
    this.setState({ data });
  };
  async componentDidMount() {
    let tags = await http.get(this.tagsEndPoint);
    console.log(tags);
    try {
      this.setState({ tags: tags.data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Post Validation Failed!");
      }
    }
  }
  doSubmit = async () => {
    try {
      const { data } = this.state;
      // alert(data.data);
      const { response } = await createpost(data);
      console.log(response);
      window.location = "/dashboard";
    } catch (ex) {}
  };
  render() {
    const { data, errors, tags } = this.state;
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
        <ToastContainer />
        <div className="container-lg">
          <h1 className="text-center m-2">Create a New Discussion</h1>
          <div
            className="container m-4 p-4 rounded"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <form onSubmit={this.handleSubmit}>
              <Input
                value={data.title}
                onChange={this.handleChange}
                label="Title"
                name="title"
                type="text"
                error={errors.title}
              />
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleChange}
                  name="description"
                  type="description"
                  id="description"
                  className="form-control"
                />
                {errors.description && (
                  <div className="alert-info">{errors.description}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="tags">Related Tags</label>
                <br />
                {tags.map((tag) => (
                  <React.Fragment>
                    <label className="mr-3 ml-3">
                      <input
                        key={tag._id}
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => this.handleTagChange(tag._id)}
                      />
                      {tag.name}
                    </label>
                  </React.Fragment>
                ))}
                {errors.tags && <div className="alert-info">{errors.tags}</div>}
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary mt-4"
                  disabled={this.validate()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPost;
