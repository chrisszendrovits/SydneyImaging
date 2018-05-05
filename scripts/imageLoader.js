define(["jquery"], function ($) {

    var ImageLoader = (function () {

        this.images = null;

        function ImageLoader() {
            this.images = null;
        }

        ImageLoader.prototype.loadImagesFromJson = function (jsonPath) {
            return new Promise((resolve, reject) => {

                this.jsonPath = jsonPath;
                var _app = this;

                $.getJSON(jsonPath)
                    .done(function (json) {
                        _app.images = json;
                        resolve("Json data loaded.");
                    })
                    .fail(function (jqxhr, textStatus, error) {
                        var message = "Json data request failed: " + textStatus + ", " + error;
                        console.log(message);
                        reject(message);
                    });

            });
        };

        return ImageLoader;
    }());

    return new ImageLoader;
});

