import Axios from "axios";

export async function getRequest(url, params) {
  try {
    const response = await Axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function putRequest(url, data) {
  try {
    const response = await Axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
