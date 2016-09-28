/* globals $ Promise */
"use strict";

let requester = {
    get(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: "GET",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    console.log(err);
                }
            });
        });
    },
    putJSON(url, body, options = {}) {
        return new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url: url,
                headers: headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    console.log(err);
                }
            });
        });
    },
    postJSON(url, body, options = {}) {
        return new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    console.log(err);
                }
            });
        });
    },
    getJSON(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    console.log(err);
                }
            });
        });
    }
};