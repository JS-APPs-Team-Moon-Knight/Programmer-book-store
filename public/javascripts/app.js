/* globals Navigo controllers $ dataService document templates*/
"use strict";
// import {templates} from 'templates';
// import {dataService} from 'dataService';
// import {controllers} from 'controllers';
// import {requester} from 'requester';

let templateInstance = templates(requester, Handlebars);
let router = new Navigo(null, true);

let controller = controllers.get(dataService, templateInstance);

router
    .on('products', controller.home)
    .on("login", controller.login)
    .on("logout", controller.logout)
    .on("user", controller.user)
    .on("cart", controller.cart)
    .on("search/:productName", controller.search)
    .on("products/:category", controller.categories)
    .on("product/:id", controller.productById)
    .on("checkout", controller.checkout)
    .on("home", () => {
        router.navigate("products");
    })
    .on(() => {
        router.navigate("products");
    })
    .resolve();

templateInstance.compile('temp', {user: "Pesho"}).then(compiledHtml => {
    console.log(compiledHtml);
});