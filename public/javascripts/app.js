/* globals Navigo controllers $ dataService document */

let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on("login", controllersInstance.login)
    .on("logout", controllersInstance.logout)
    // .on("user", controllersInstance.user)
    .on("cart", controllersInstance.cart)
    .on("search/:productName", controllersInstance.search)
    .on("products/:category", controllersInstance.categories)
    .on("checkout", controllersInstance.checkout)
    .on("home", () => {
        router.navigate("/products");
    })
    .on(() => {
        router.navigate("/products");
    })
    .resolve();
