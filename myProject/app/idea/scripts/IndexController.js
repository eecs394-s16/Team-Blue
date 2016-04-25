angular
  .module('idea')
  .factory('taggy', function() {
    return {tag: 'NONE'};
  })
  .controller("IndexController", function (taggy, $timeout, $rootScope, $scope, supersonic, db_url, $firebaseObject, $firebaseArray) {
    "use strict";
    $scope.showSpinner = true;
    $scope.showings = [];
    $scope.taggy=taggy.tag;
    supersonic.bind($scope, "taggy");

    $scope.ideas = [];
    var ref = new Firebase(db_url);
    $scope.ideas = new $firebaseArray(ref.child("ideas"));

    $scope.upvoteVotings = [];
    $scope.downvoteVotings = [];
    for (var i = 0; i++; i<$scope.ideas.length) {
      $scope.upvoteVotings.push(false);
      $scope.downvoteVotings.push(false);
    };

    $scope.ideas.$loaded().then(function() {
      $scope.showSpinner = false;
      for (var i=0; i<$scope.ideas.length; i++) {
        $scope.showings.push(true);
      }
    });


    function filter(tag) {
      console.log('Filtering on tag:', tag);
      if (tag=="NONE") {
        for (var i=0; i<$scope.showings.length; i++) {
          $scope.showings[i]=true;
        }
      }
      else {
        $scope.ideas.forEach(function (idea,index) {
          if ((idea.tags!=null) && (idea.tags.indexOf(tag)>-1)) {
              $scope.showings[index] = true;
          }
          else {
            $scope.showings[index] = false;
          }
        });
        // console.log($scope.showings);
      }
    };
    $scope.$watch(function(scope) {return scope.taggy}, function(newTag) {
      filter(newTag);
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
