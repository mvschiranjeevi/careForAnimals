import http from "./httpService";
// @ts-ignore
import config from "../utils/config.json";
export function createpost(postbody, user) {
  const users = {
    _id: localStorage.getItem("user_id"),
  };
  const param = {
    title: postbody.title,
    description: postbody.description,
    tags: postbody.tags,
    // users: users,
  };
  console.log(param);
  return http.post(config.postEndPoint + "/create", param);
}
