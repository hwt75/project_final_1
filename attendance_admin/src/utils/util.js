import axios from "axios";

const host = process.env.REACT_APP_HOST || "http://127.0.0.1:3005";
const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  

  
export const axiosRequest = (path, data) => {
  const url = `${host}${path}`;
  return axios.post(url, { ...data });
};

export const axiosGetRequest = async (isDelete,id) =>{
  var url = `${host}/user`
  url = id ? `${url}/${id}` : url
  url = isDelete ? `${url}/delete/${id}` : url
  return axios.get(url);
}


export const convertArrayToObject = (dataArray) => {
  return dataArray.reduce((acc, field) => {
    const fieldName = Object.keys(field)[0];
    acc[fieldName] = field[fieldName];
    return acc;
  }, {});
};