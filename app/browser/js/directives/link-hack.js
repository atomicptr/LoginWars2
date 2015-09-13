// override link click behaviour
app.directive("a", function() {
    return {
        restrict: "E",
        link: function(scope, elem, attrs) {

            elem.on("click", function(e){
                e.preventDefault();

                var url = attrs.href;

                openUrl(url);
            });
        }
   };
});
