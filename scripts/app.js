define(["jquery", "imageLoader", "gallery", "navMenu"], function ($, imageLoader, gallery, navMenu) {

    var App = (function () {

        this.imageLoader = null;
        this.gallery = null;
        this.navMenu = null;

        function App(loader, gallery, menu) {
            this.imageLoader = loader;
            this.gallery = gallery;
            this.navMenu = menu;
        }

        return App;

    }());

    return new App(imageLoader, gallery, navMenu);
});