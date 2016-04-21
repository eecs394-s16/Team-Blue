angular
  .module('idea')
  .controller("IndexController", function ($scope, supersonic, db_url, $firebaseObject, $firebaseArray) {
    "use strict";
    $scope.ideas = [];
    $scope.ideasRef = null;
    $scope.showSpinner = true;

    var ref = new Firebase(db_url);
    $scope.ideasRef = ref.child("ideas");
    $scope.ideas = new $firebaseArray($scope.ideasRef);

    $scope.upvoteVotings = [];
    $scope.downvoteVotings = [];
    for (var i = 0; i++; i<$scope.ideas.length) {
      $scope.upvoteVotings.push(false);
      $scope.downvoteVotings.push(false);
    };
    $scope.ideas.$loaded().then(function() {
      $scope.showSpinner = false;
    });


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
