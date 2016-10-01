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
        var cachedBooks = {};

        function _cacheBook(book) {
            cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description)
        }

        function _unCacheBook(book) {
            cachedBooks[book._id] = undefined;
        }

        function login(user) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/login`, user, headers)
                .then(response => {
                    localStorage.setItem(KEY_STORAGE_USERNAME, response.username);
                    localStorage.setItem(KEY_STORAGE_AUTH_KEY, response._kmd.authtoken);
                    localStorage.setItem(CURRENT_USER_ID, response._id);
                });
        }

        function register(user) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/`, user, headers);
        }

        function logout() {
            let body = {},
                headers = {
                    'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/_logout`, body, headers)
                .then((response) => {
                    console.log(response);
                    localStorage.removeItem(KEY_STORAGE_USERNAME);
                    localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
                    localStorage.removeItem(CURRENT_USER_ID);
                });

        }

        function isLoggedIn() {
            return Promise.resolve()
                .then(() => {
                    return !!localStorage.getItem(KEY_STORAGE_USERNAME);
                });
        }

        function search(options) {
            // TODO:
            // return requester.getJSON("api/search", options);
        }

        function getCart() {
            let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                .then((response) => {
                    return response.books;
                })
        }

        function addToCart(book) {
            getCart()
                .then(((cart) => {
                    cart.push(book);
                    let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                        body = {
                            books: cart
                        },
                        headers = {
                            'Authorization': `Basic ${encodedAppKey}`
                        };

                    return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                }));
        }

        function removeFromCart(book) {
            getCart()
                .then(((cart) => {
                    for (let i = 0; i < cart.length; i += 1) {
                        if (book._id == cart[i]._id) {
                            cart.splice(i, 1);
                            break;
                        }
                    }
                    // console.log(cart);
                    let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                        body = {
                            books: cart
                        },
                        headers = {
                            'Authorization': `Basic ${encodedAppKey}`
                        };

                    return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                }));
        }

        function createBookInstance(book) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                body = book,
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            _cacheBook(book);

            return requester.postJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase`, body, headers)
                .catch(() => {
                    _unCacheBook(body)
                });
        }

        function updateBookInstance(id, body) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            _cacheBook(body);

            return requester.putJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase/${id}`, body, headers)
                .catch(() => {
                    _unCacheBook(body)
                });
        }

        function getAllBooks() {
            let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };


            return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase`, headers)
                .then(response => {
                    response.forEach(book => {
                        cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description);
                    })
                });
        }

        function getBookById(id) {
            if (cachedBooks[id]) {
                return Promise.resolve(cachedBooks[id]);
            }
            else {
                let encodedAppKey = btoa(`${APP_ID}:${APP_MASTER_KEY}`),
                    headers = {
                        'Authorization': `Basic ${encodedAppKey}`
                    };

                return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase/${id}`, headers)
                    .then(book => {
                        _cacheBook(book);
                        return book;
                    });
            }
        }

        return {
            login,
            register,
            logout,
            isLoggedIn,
            search,
            getCart,
            addToCart,
            removeFromCart,
            createBookInstance,
            updateBookInstance,
            getAllBooks,
            getBookById
        }
    }
};

// export {dataService}