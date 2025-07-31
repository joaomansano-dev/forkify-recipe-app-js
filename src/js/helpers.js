import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const result = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await result.json();

    if (result.results == 0) throw new Error('Well, the ID is incorrect!...');

    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    // console.log(url);

    // const result = await fetch(
    //   `${API_URL}/${id.slice(1)}?key=<a08d2f71-51f3-4435-937d-260de8792b7c>`
    // );
    const result = await fetch(url);
    const data = await Promise.race([timeout(TIMEOUT_SEC), result.json()]);

    if (data.results == 0) throw new Error('Well, the ID is incorrect!...');

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const result = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = result.json();

    if (result.results == 0) throw new Error('Well, the ID is incorrect!...');

    return data;
  } catch (err) {
    throw err;
  }
    
};
*/
