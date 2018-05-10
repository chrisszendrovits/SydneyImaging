﻿define(["jquery"], function ($) {

    var Preloader = (function () {

        function Preloader() {
        }

        Preloader.prototype.init = function () {
            $('#navMenuLoader').load('navMenu.html');
            $('#galleryLoader').load('gallery.html');
        };

        return Preloader;

    }());

    var preloader = new Preloader();

    $(document).ready(function () {
        preloader.init();
    });
    return preloader;
});