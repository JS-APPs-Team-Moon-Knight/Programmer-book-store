/* globals requester localStorage */
"use strict";
// import {requester} from 'requester';

const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey",
    CURRENT_USER_ID = "userID",
    BOOKS_COLLECTION_ID = "booksID",
    APP_ID = "kid_SkGEDPt6",
    APP_SECRET = "1ddc36c888904211906588c736731c4d",
    APP_MASTER_KEY = "2c9b407d779742d18a5e4afef9700855";

var dataService = {
    getInstance(requester) {
        return {
            login(user) {
                let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    }

                return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/login`, user, headers)
                    .then(response => {
                        localStorage.setItem(KEY_STORAGE_USERNAME, response.username);
                        localStorage.setItem(KEY_STORAGE_AUTH_KEY, response._kmd.authtoken);
                        localStorage.setItem(CURRENT_USER_ID, response._id);
                    });
            },

            register(user) {
                let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    }

                return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/`, user, headers);
            },

            logout() {
                let body = {},
                    headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    }

                return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/_logout`, body, headers)
                    .then((response) => {
                        console.log(response);
                        localStorage.removeItem(KEY_STORAGE_USERNAME);
                        localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
                        localStorage.removeItem(CURRENT_USER_ID);
                    });

            },

            isLoggedIn() {
                return Promise.resolve()
                    .then(() => {
                        return !!localStorage.getItem(KEY_STORAGE_USERNAME);
                    });
            },

            search(options) {
                // TODO:
                // return requester.getJSON("api/search", options);
            },

            getCart() {
                let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    }

                return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                    .then((response) => {
                        console.log(response)
                        return response.books;
                    })
            },

            addToCart(book) {
                dataService.getCart()
                    .then(((cart) => {
                        cart.push(book)
                        console.log(cart)
                        let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                            body = {
                                books: cart
                            },
                            headers = {
                                'Authorization': `Basic ${encodedAppKey}`
                            }

                        return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                    }));
            },

            removeFromCart(book) {
                dataService.getCart()
                    .then(((cart) => {
                        for (let i = 0; i < cart.length; i += 1) {
                            if (book._id == cart[i]._id) {
                                cart.splice(i, 1);
                                break;
                            }
                        }
                        console.log(cart)
                        let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                            body = {
                                books: cart
                            },
                            headers = {
                                'Authorization': `Basic ${encodedAppKey}`
                            }

                        return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                    }));
            },

            createBooksDataBase() {
                let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                    body = {},
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    }

                return requester.postJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase`, body, headers)
                    .then((response) => {
                        localStorage.setItem(BOOKS_COLLECTION_ID, response._id);
                    })
            },

            updateBooksDataBase(body) {
                let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    }

                return requester.putJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase/${localStorage.getItem(BOOKS_COLLECTION_ID)}`, body, headers);
            }
        }
    }
};

// export {dataService}