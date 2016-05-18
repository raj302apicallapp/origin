var app=angular.module('app');
app.directive('chooseFile', function() {
    return {
      link: function (scope, elem, attrs) {
        var button = elem.find('button');
        var input = angular.element(elem[0].querySelector('input#fileInput'));
        button.bind('click', function() {
          input[0].click();
        });
        input.bind('change', function(e) {
          scope.$apply(function() {
            var files = e.target.files;
            if (files[0]) {
              scope.carrymodel.localurl = files[0].name;
              scope.carrymodel.localfile=files[0];
            } else {
              scope.carrymodel.localurl = null;
            }
          });
        });
      }
    };
  });