/* globals requester localStorage */
"use strict";

const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey";

var dataService = {
    login(user) {
        return requester.putJSON("/api/auth", user)
            .then(respUser => {
                localStorage.setItem(KEY_STORAGE_USERNAME, respUser.result.username);
                localStorage.setItem(KEY_STORAGE_AUTH_KEY, respUser.result.authKey);
            });
    },
    register(user) {
        return requester.postJSON("/api/users", user);
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem(KEY_STORAGE_USERNAME);
                localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
            });
    },
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem(KEY_STORAGE_USERNAME);
            });
    },
    search(options) {
        return requester.getJSON("api/search", options);
    },
    cart(options) {
        return requester.getJSON("api/cart", options);
    },
};