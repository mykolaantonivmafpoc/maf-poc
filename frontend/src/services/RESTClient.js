import {
  API_ROOT,
  config,
  defHeaders,
  defOptions
} from '../config';

class RestClient {
  API_ROOT = API_ROOT;

  config = {
    qsDelim: '&',
    qsJoin: '=',
    ...config
  };

  defHeaders = defHeaders;

  defOptions = defOptions;

  user = null;

  async fetchData(url, reqOptions) {
    let out = {};
    try {
      const fullUrl = (url.indexOf(this.API_ROOT) === -1) ? this.API_ROOT + url : url;
      const response = await fetch(fullUrl, reqOptions);
      let payload;
      if (response.ok) {
        const responseType = response.headers.get('Content-Type');
        if (responseType && responseType.includes('json')) {
          payload = response.json();
        } else {
          payload = response.text();
        }
        const data = await payload;
        out = data;
      } else {
        const data = await response.text();
        throw JSON.parse(data) || data;
      }
    } catch (error) {
      // console.log('API call error: ', error);
      out = error;
    }
    return out;
  }

  qsGenerate(getParams = {}) {
    let out = '';
    const { qsDelim, qsJoin } = this.config;
    Object.keys(getParams).forEach((key) => {
      out += `${key}${qsJoin}${getParams[key]}${qsDelim}`;
    });
    return out;
  }

  sendQuery(url, method, data, getParams = {}, options = {}, headers = {}) {
    let out;

    if (['GET', 'POST', 'PUT', 'DELETE', 'HEAD'].indexOf(method) > -1) {
      const reqHeaders = new Headers(Object.assign(
        {},
        this.defHeaders,
        headers,
        { Authorization: 'Basic YXBpdXNlcjphcGlwYXNz' },
      ));

      const reqOptions = Object.assign({ method }, this.defOptions, options);

      // Add the Headers to the options
      reqOptions.headers = reqHeaders;

      // TODO: handle other response types
      out = this.fetchData(`${url}${this.qsGenerate(getParams)}`, reqOptions);
    } else {
      out = new Promise((resolve, reject) => {
        reject(new Error('Unsupported type'));
      });
    }

    return out;
  }

  get(url, data, getParams = {}, options = {}, headers = {}) {
    return this.sendQuery(url, 'GET', data, getParams, options, headers);
  }

  post(url, data, getParams = {}, options = {}, headers = {}) {
    return this.sendQuery(url, 'POST', data, getParams, options, headers);
  }

  put(url, data, getParams = {}, options = {}, headers = {}) {
    return this.sendQuery(url, 'PUT', data, getParams, options, headers);
  }

  delete(url, data, getParams = {}, options = {}, headers = {}) {
    return this.sendQuery(url, 'DELETE', data, getParams, options, headers);
  }
}

export default new RestClient();
