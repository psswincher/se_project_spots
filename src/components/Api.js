import { routeData as routes } from "../utils/constants";
const debug = false;
// if(debug) console.log(``);

export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._authorization = headers.authorization;
        this._contentType = headers["Content-Type"];
    }
    
    _buildRequest(routeData, body = undefined) {
        const url = this._baseUrl + routeData.route;
        const info = {
            method: routeData.method,
            headers: {
                authorization: this._authorization,
                "Content-Type": this._contentType,
            }, 
        }

        if(body) info.body = JSON.stringify(body);
        if(debug) console.log(`call info:`);
        if(debug) console.log(info);

        return {url: url, info: info};
    }

    request(routeData, body) {
        const requestInfo = this._buildRequest(routeData, body);
        return fetch(requestInfo.url, requestInfo.info)
        .then((res) => {
            if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Error: ${res.status}`);
            })
        .catch((err) => {
            console.error(err); // log the error to the console
        })
    }

    requestDelete(cardId) {
        return fetch(this._baseUrl + routes.deleteCardById.route + cardId, {
            method: "DELETE",
            headers: {
                authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
                "Content-Type": "application/json"
            }}
        ).then((res) => {
            if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Error: ${res.status}`);
            })
        .catch((err) => {
            console.error(err); // log the error to the console
        })
    }

    requestLikeUpdate( cardId, likeStatus ) {
        
        let url = "";
        let method = "";
        if (likeStatus) {
            url = this._baseUrl + routes.likeCardUpdateRoute.route;
            method = routes.likeCardUpdateRoute.method;    
        } else {
            url = this._baseUrl + routes.dislikeCardUpdateRoute.route;
            method = routes.dislikeCardUpdateRoute.method;
        }

        url = url.replace(routes.likeCardReplaceKey, cardId);
        return fetch(url, {
            method: method,
            headers: {
                authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
                "Content-Type": "application/json"
            }}
        ).then((res) => {
            if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Error: ${res.status}`);
            })
        .catch((err) => {
            console.error(err); // log the error to the console
        })
    }

    getInitialCards() {
        console.log('getting initial cards');
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            headers: {
              authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
              "Content-Type": "application/json"
            }
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
            return res.json();
        } 
        return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
        console.log('data found');
        console.log(data);
    })
    .catch((err) => {
        console.error(err); // log the error to the console
      });
        
    }
}
    // parseCards(data) {
    //     return Promise((resolve, reject) => {
    //         data.forEach()
    //     });
    // }
    // Cards should be rendered after the user information is received from the server. 
    // Сreate a function in Api.js and return the Promise.all() method. 
    // Pass the array of function calls for getting user information and the list of cards to Promise.all() as a parameter.