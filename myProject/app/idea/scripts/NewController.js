angular
  .module('idea')
  .controller("NewController", function ($scope, supersonic, db_url, $firebaseArray) {
    "use strict";
    $scope.idea = {};
    $scope.showSpinner = false;

    var ref = new Firebase(db_url);
    var tagArr = new $firebaseArray(ref.child("tags"));
    $scope.tagList = [];
    tagArr.$loaded().then(function(tags) {
      tags.forEach(function(tag) {
        console.log(tag.$value);
        $scope.tagList.push(tag.$value);
      });
    });

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      var newidea = new Idea($scope.idea.title,$scope.idea.desc, 'Rodrigo', new Date(), $scope.selectedTags);

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
//This part of data should be retrieved from database
     $scope.departments = [
     "Tag a Category",
      "ASG",
      "EECS",
      "Econ"
    ];

    $scope.taggedDept = $scope.departments[0];
    $scope.selectedTags = [];
    
    
    
    $scope.addTag = function(taggedDept){
      if($scope.departments.indexOf(taggedDept) != 0 
        && jQuery.inArray(taggedDept, $scope.selectedTags) == -1 ){
           $scope.selectedTags.push(taggedDept);
           console.log(taggedDept);
           console.log($scope.selectedTags);
      }
    };
    // $scope.tagValue = true;
    // if($scope.selectedTags.length != 0){
    //     $scope.tagValue = false;
    //     console.log($scope.tagValue);
    //     console.log($scope.selectedTags.length);

    // }else{
    //     $scope.tagValue =true;
    // };
    
    $scope.remove_tag = function(item) {
      $scope.selectedTags.splice($scope.selectedTags.indexOf(item), 1);
    }
  });
