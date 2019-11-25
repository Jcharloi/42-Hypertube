import axios from "axios";

export default axios.create({
  baseURL: `${window.location.origin}/API`,
  responseType: "json"
});
