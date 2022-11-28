import http from "./httpService";
// @ts-ignore
// import config from "../utils/config.json";

var repliesEndPoint = "http://localhost:4000/reply/";
export function createreply(commentbody, id) {
  return http.post(repliesEndPoint + "/create/" + id, {
    comment: commentbody.comment,
  });
}
