angular
  .module('idea')
  .controller("drawerController", function (taggy, $timeout, $rootScope, $scope, supersonic, db_url, $firebaseObject, $firebaseArray) {
    "use strict";
    // console.log(test);
    $scope.taggy=taggy;
    supersonic.bind($scope, "taggy");
    $scope.showSpinner = true;

    $scope.changeTag = function(tag) {
      $scope.taggy=tag;
      supersonic.ui.drawers.close();
    };

    var ref = new Firebase('https://crowdstormdb.firebaseio.com/');
    var tagArr = new $firebaseArray(ref.child("tags"));
    $scope.tagList = [];
    tagArr.$loaded().then(function(tags) {
      $scope.showSpinner=false;
      tags.forEach(function(tag) {
        console.log(tag.$value);
        $scope.tagList.push(tag.$value);
      });
    });

    $scope.reset = function() {
      $scope.taggy="NONE";
      supersonic.ui.drawers.close();
    };


});
