import http from "./httpService";
// @ts-ignore
// import config from "../utils/config.json";

var repliesEndPoint = "https://care-for-animals-backend.onrender.com/reply/";
export function createreply(commentbody, id) {
  return http.post(repliesEndPoint + "/create/" + id, {
    comment: commentbody.comment,
  });
}
