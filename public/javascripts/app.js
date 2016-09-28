/* globals Navigo controllers $ dataService document */

let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on("login", controllersInstance.login)
    .on("logout", controllersInstance.logout)
    .on("home", controllersInstance.home)
    // .on("user", controllersInstance.user)
    .on("cart", controllersInstance.cart)
    .on("search", controllersInstance.search)
    .on("categories", controllersInstance.categories)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();
