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
