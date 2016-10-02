/* globals requester localStorage */
"use strict";
var dataService = {
    getInstance(requester) {
        const HTTP_HEADER_KEY = "x-auth-key",
            KEY_STORAGE_USERNAME = "username",
            KEY_STORAGE_AUTH_KEY = "authKey",
            CURRENT_USER_ID = "userID",
            BOOKS_COLLECTION_ID = "booksID",
            APP_ID = "kid_SkGEDPt6",
            APP_SECRET = "1ddc36c888904211906588c736731c4d",
            //TODO: Remove in production
            APP_MASTER_KEY = "2c9b407d779742d18a5e4afef9700855";

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

        function getCart() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                .then((response) => {
                    return response.books;
                })
        }

        function addToCart(book) {
            return getCart()
                .then(((cart) => {
                    cart.push(book);
                    let headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                    return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                        .then(response => {
                            var body = {
                                books: cart,
                                username: response.username,
                                address: response.address,
                                phone: response.phone,
                                email: response.email
                            };
                            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                        });
                }));
        }

        function removeFromCart(book) {
            return getCart()
                .then(((cart) => {
                    for (let i = 0; i < cart.length; i += 1) {
                        if (book._id == cart[i]._id) {
                            cart.splice(i, 1);
                            break;
                        }
                    }
                    let headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                    return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                        .then(response => {
                            var body = {
                                books: cart,
                                username: response.username,
                                address: response.address,
                                phone: response.phone,
                                email: response.email
                            };
                            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                        });
                }));
        }

        function clearCart() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                .then(response => {
                    var body = {
                        books: [],
                        username: response.username,
                        address: response.address,
                        phone: response.phone,
                        email: response.email
                    };

                    return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                });
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
                    });
                    return cachedBooks;
                });
        }

        function getBookById(id) {
            if (cachedBooks[id]) {
                return Promise.resolve(cachedBooks[id]);
            }
            else {
                let headers = {
                    'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                };

                return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase/${id}`, headers)
                    .then(book => {
                        _cacheBook(book);
                        return book;
                    });
            }
        }

        function placeOrder(totalPrice) {
            return getCart().then(cart => {
                let body = {
                        userId: localStorage.getItem(CURRENT_USER_ID),
                        books: cart,
                        status: "open",
                        totalPrice: totalPrice
                    },
                    headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                return requester.postJSON(`https://baas.kinvey.com/appdata/${APP_ID}/orders`, body, headers);
            });
        }

        function getOrdersByUserId() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/orders/?query={"userId":"${localStorage.getItem(CURRENT_USER_ID)}"}`, headers);
        }

        function getCurrentUserData() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers);
        }

        function updateUserData(body) {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };
            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
        }

        return {
            login,
            register,
            logout,
            isLoggedIn,
            getCart,
            addToCart,
            removeFromCart,
            createBookInstance,
            updateBookInstance,
            getAllBooks,
            getBookById,
            placeOrder,
            clearCart,
            getCurrentUserData,
            getOrdersByUserId,
            updateUserData
        }
    }
};
