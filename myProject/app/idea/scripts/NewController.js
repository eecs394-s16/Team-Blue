angular
  .module('idea')
  .controller("NewController", function ($scope, supersonic, db_url, $firebaseArray) {
    "use strict";
    $scope.idea = {};
    $scope.showSpinner = false;

    var ref = new Firebase(db_url);
    $scope.tagList = new $firebaseArray(ref.child("tags"));

    $scope.tagList.$loaded().then(function(tags) {
      console.log(tags);
    });

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      var tags = ['tag1','tag2'];
      var newidea = new Idea($scope.idea.title,$scope.idea.desc, 'Rodrigo', new Date(), tags);

      var ref = new Firebase(db_url);
      ref.child("ideas").push(newidea);
      $scope.showSpinner = false;
      supersonic.ui.layers.pop();
    };


    class Idea {
      constructor(title, desc, author, currentdate, tags) {
        this.tags = tags;


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

  });
