import { routeData as routes } from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`API request Error: ${res.status}`);
  }

  request(routeData, body = undefined) {
    const requestInfo = this._buildRequest(routeData, body);
    return fetch(requestInfo.url, requestInfo.info).then(this._checkResponse);
  }

  requestDelete(cardId) {
    return this.request({
      method: "DELETE",
      route: routes.deleteCardById.route + cardId,
    });
  }

  requestLikeUpdate(cardId, likeStatus) {
    return this.request(this._buildLikeRequest(cardId, likeStatus));
  }

  _buildRequest(routeData, body = undefined) {
    const url = this._baseUrl + routeData.route;
    const info = {
      method: routeData.method,
      headers: this._headers,
    };

    if (body) info.body = JSON.stringify(body);
    return { url: url, info: info };
  }

  _buildLikeRequest(cardId, likeStatus) {
    let route = likeStatus
      ? routes.likeCardUpdateRoute.route
      : routes.dislikeCardUpdateRoute.route;
    const method = likeStatus
      ? routes.likeCardUpdateRoute.method
      : routes.dislikeCardUpdateRoute.method;
    route = route.replace(routes.likeCardReplaceKey, cardId);

    return { route: route, method: method };
  }

  getBatchData(route) {
    return new Promise((resolve) => {
      this.request(route).then((data) => {
        resolve(Promise.all(data));
      });
    });
  }

  getInitialUserData() {
    return new Promise((resolve) => {
      this.request(routes.getUserInfo).then((data) => {
        resolve(Promise.all(data));
      });
    });
  }
}
