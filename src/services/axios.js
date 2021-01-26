import axios from 'axios';

const API_URL = "https://core.icash.silkinv.com/api/login"

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'App-Authorizer': 647061697361,
    Accept: 'application/json',

  },
  timeout: 30000,
  validateStatus: status => status < 400,
});

const axiosCall = async (requestOptions) => {
    console.log("adsfasfadsf = ", requestOptions.body);
  try {
    const response = await axiosInstance({
      method: 'post',
      url: "https://core.icash.silkinv.com/api/login",
      data: requestOptions.body,
    });
    console.log("response -====== ", response.status)
    console.log("response ********** ", response.data)
    if (response.status >= 200 && response.status < 400) {
      if(response.data) {
          return response.data
      }
    }
  } catch (error) {
      console.log("error in catch ====== ", error)
      console.log("error in catch *********** ", error.message)
    if (error.message) {
      if(error.httpStatus === 401 || error.httpStatus === 400) {
        throw error;
      } else {
        throw "Internal Error";
      }
    } else {
      throw "Internal Error";
    }
  }
};

export const unAuthAxiosCall = async (requestOptions) => {
    const response = await axiosCall(requestOptions);
    console.log("response from unauthaxios call === ", response)
    return response;
};
