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
                    reject(err);
                }
            });
        });
    },
    putJSON(url, body, headers = {}) {
        return new Promise((resolve, reject) => {
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
                    reject(err);
                }
            });
        });
    },
    postJSON(url, body, headers = {}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    console.log(response);
                    resolve(response);
                },
                error(err) {
                    reject(err);

                }
            });
        });
    },
    getJSON(url, headers = {}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: "GET",
                headers: headers,
                contentType: "application/json",
                success(response) {
                    console.log(response);
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }
};

// export { requester }