angular
  .module('idea')
  .controller("NewController", function (taggy, $scope, supersonic, db_url, $firebaseArray) {
    "use strict";
    $scope.titleMissing = false;
    $scope.descMissing = false;
    $scope.idea = {};
    $scope.showSpinner = false;
    $scope.departments = [
    "Tag a Category"
    ];

    $scope.taggy=taggy.tag;
    supersonic.bind($scope, "taggy");

    //taggedDept is for showing the selection of dropdown list
    $scope.taggedDept = $scope.departments[0];

    var ref = new Firebase(db_url);
    var tagArr = new $firebaseArray(ref.child("tags"));
    tagArr.$loaded().then(function(tags) {
      tags.forEach(function(tag) {
        // console.log(tag.$value);
        $scope.departments.push(tag.$value);
      });
    });

    $scope.submitForm = function () {
      console.log('testing');
      if ($scope.idea.title==null) {
        $scope.titleMissing = true;
      }
      else $scope.titleMissing = false;
      if ($scope.idea.desc==null) {
        $scope.descMissing = true;
      }
      else $scope.descMissing = false;
      var newidea = new Idea($scope.idea.title,$scope.idea.desc, 'Rodrigo', new Date(), $scope.selectedTags);
      var ref = new Firebase(db_url);
      ref.child("ideas").push(newidea);
      supersonic.ui.layers.pop();
      $scope.taggy = "NONE";
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

    //selectedTags is an array contains the tags user selected
    $scope.selectedTags = [];

    $scope.addTag = function(taggedDept){
      if($scope.departments.indexOf(taggedDept) != 0
        && jQuery.inArray(taggedDept, $scope.selectedTags) == -1 ){
        //to ensure don't add duplicate tags
           $scope.selectedTags.push(taggedDept);
           console.log(taggedDept);
           console.log($scope.selectedTags);
      }
    };

    $scope.remove_tag = function(item) {
      $scope.selectedTags.splice($scope.selectedTags.indexOf(item), 1);
    }
  });
