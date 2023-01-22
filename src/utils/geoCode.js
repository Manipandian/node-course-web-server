const axios = require('axios');

const baseLocationDataUrl = "https://positionstack.com/geo_api.php";
//Get lat and long from location
const getGeoCode = (address, callBack) => {
    return axios
      .get(baseLocationDataUrl, {
        params: { query: address },
      })
      .then((res) => {
        if (!res.data.data) {
          if (res.data.error) {
            // console.log(res.data.error.message);
            callBack(res.data.error.message, undefined);
          } else callBack(res.data, undefined);
        } else if (!Array.isArray(res.data.data) || !res.data.data.length) {
          callBack("Location data not available for given address!", undefined);
        } else {
          const { latitude, longitude, label } = res.data.data[0];
          // return { latitude, longitude, label };
          callBack(undefined, { latitude, longitude, label });
        }
      })
      .catch((err) => callBack("Unable to fetch location data", undefined));
}

module.exports = getGeoCode;