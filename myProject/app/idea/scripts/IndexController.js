angular
  .module('idea')
  .controller("IndexController", function ($scope, supersonic, db_url, $firebaseObject, $firebaseArray) {
    "use strict";
    $scope.ideas = [];
    $scope.ideasRef = null;
    $scope.showSpinner = true;

    class Idea {
      constructor(title, desc, author, currentdate) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;

        /*sam's date stuff*/

        /*var time = currentDate.getHours() + ":" + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
        this.time = time;*/

        var date = currentdate.getDay() + "/"+currentdate.getMonth()
              + "/" + currentdate.getFullYear() + " "
              + currentDate.getHours() + ":" + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();;
        this.date = date;
      }
    }

    // var addIdea = function(ideasRef, idea) {
    //   ideasRef.push(idea);
    // }
    // console.log(db_url);
    // var _refreshViewData = function () {
      var ref = new Firebase(db_url);
      $scope.ideasRef = ref.child("ideas");
      // $scope.ideasRef.push(new Idea("hello", "wawa", "me", new Date()));

      $scope.ideas = new $firebaseArray($scope.ideasRef);

      $scope.upvoteVotings = [];
      $scope.downvoteVotings = [];
    //for (var i = $scope.ideas.length; i--; i<=0) {
      for (var i = 0; i++; i<$scope.ideas.length) {
        $scope.upvoteVotings.push(false);
        $scope.downvoteVotings.push(false);
      };
      $scope.ideas.$loaded().then(function() {
        $scope.showSpinner = false;
        // $scope.ideas.reverse();
      });
    // }

    $scope.upvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      console.log(index);
      if (!$scope.upvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.upvotes += 1;
        if ($scope.downvoteVotings[index]) {
          $scope.downvoteVotings[index] = false;
          record.downvotes -=1;
        }
        $scope.upvoteVotings[index]=true;
        $scope.ideas.$save(record);
      }
    };

    $scope.downvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      if (!$scope.downvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.downvotes += 1;
        if ($scope.upvoteVotings[index]) {
          $scope.upvoteVotings[index] = false;
          record.upvotes -=1;
        }
        $scope.downvoteVotings[index]=true;
        $scope.ideas.$save(record);
      }
    };


	$scope.newIdea = function() {
		var view = new supersonic.ui.View("idea#new");
		supersonic.ui.layers.push(view);
    };


  });
