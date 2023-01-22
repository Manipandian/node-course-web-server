const axios = require('axios');

const baseWheatherUrl = "http://api.weatherstack.com/current";


//get wheather data
const getWheatherData = ({ latitude, longitude } = {}, address, callBack) => {
    axios
      .get(`${baseWheatherUrl}`, {
        params: {
          access_key: "0fc6c4e5ee2dfd572b6ca3ce16a44cb8",
          query: address,
          // `${latitude},${longitude}`,
          units: "f",
        },
      })
      .then((res) => {
        if(res.data.error) {
          callBack(res.data.error.info, undefined);
        } else {
          callBack(undefined, res.data.current);
        }
      })
      .catch((err) => {
        callBack("Unable to fetch wheather data", undefined);
      });
};

module.exports = getWheatherData;