angular
  .module('idea')
  .controller("NewController", function ($scope, supersonic, db_url, $firebaseArray) {
    "use strict";
    $scope.idea = {};
    $scope.showSpinner = false;
    class Idea {
      constructor(title, desc, author, currentdate) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;
        var addZero = function(i) {
          if (i < 10) {
              i = "0" + i;
          }
          return i;
        }
        var month = addZero(currentdate.getMonth()+1);
        var date = addZero(currentdate.getDate());
        var h = addZero(currentdate.getHours());
        var m = addZero(currentdate.getMinutes());
        var s = addZero(currentdate.getSeconds());
        var date = month + "/" + date
              + "/" + currentdate.getFullYear() + " "
              + h + ":" + m + ":"
              + s;
        this.date = date;
      }
    }

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      var newidea = new Idea($scope.idea.title,$scope.idea.desc, 'Rodrigo', new Date());

      var ref = new Firebase(db_url);
      ref.child("ideas").push(newidea);
      $scope.showSpinner = false;
      supersonic.ui.layers.popAll();

      // $scope.ideas = new $firebaseArray(ref.child("ideas"));
      // $scope.ideas.$add(newidea);
      // $scope.ideas.$save().then(function() {

      // })

    };

  });
