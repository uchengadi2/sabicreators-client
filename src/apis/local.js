import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9700/api/v1", //for the localhost
  //baseURL: "https://api.nextchamps.com.ng/api/v1", // for production
});
