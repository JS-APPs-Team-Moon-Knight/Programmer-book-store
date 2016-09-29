/* globals Navigo controllers $ dataService document templates*/
"use strict";
import {templates} from 'templates';
import {dataService} from 'dataService';
import {controllers} from 'controllers';

let router = new Navigo(null, true);

let controller = controllers.get(dataService, templates);

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

templates.compile('temp', {user: "Pesho"}).then(x => {
    console.log(x);
});