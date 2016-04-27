angular
  .module('idea')
  .factory('taggy', function() {
    return {tag: 'NONE'};
  })
  .controller("IndexController", function (taggy, $timeout, $rootScope, $scope, supersonic, db_url, $firebaseObject, $firebaseArray) {
    "use strict";
    $scope.viewTitle = "CrowdStorm";
    $scope.showSpinner = true;
    var loaded = false;

    $scope.taggy=taggy.tag;
    supersonic.bind($scope, "taggy");


    //NEW CODE
    // var ref = new Firebase(db_url);
    // var tagRef = ref.child("tags");
    // tagRef.push('Campus');
    // tagRef.push('Dining');
    // tagRef.push('CAPS');
    // tagRef.push('Libraries');
    // tagRef.push('Norris');
    // tagRef.push('EECS');

    //END NEW CODE
    var ref = new Firebase(db_url);
    $scope.ideas = new $firebaseArray(ref.child("ideas"));

    $scope.ideas.$loaded().then(function() {
      filter("NONE");
      loaded = true;
      $scope.upvoteVotings = [];
      $scope.downvoteVotings = [];
      for (var i = 0; i++; i<$scope.ideas.length) {
        $scope.upvoteVotings.push(false);
        $scope.downvoteVotings.push(false);
      };
      $scope.showSpinner = false;
    });

    function filter(tag) {
      console.log('Filtering on tag:', tag);
      if (tag=="NONE") {
        $scope.viewTitle = "CrowdStorm";
        $scope.ideas.forEach(function(idea) {
          idea.show=true;
        });
      }
      else {
        $scope.viewTitle = tag;
        $scope.ideas.forEach(function (idea,index) {
          if ((idea.tags!=null) && (idea.tags.indexOf(tag)>-1)) {
            idea.show= true;
          }
          else {
            idea.show = false;
          }
        });
      }
    }

    $scope.$watch(function(scope) {return scope.taggy}, function(newTag) {
      filter(newTag);
    });

    $scope.ideas.$watch(function(event) {
      if (loaded) {
        console.log("detected change in ideas array");
        filter("NONE");
      }
    });


    $scope.upvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      console.log(index);

      if (!$scope.upvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.upvotes += 1;
        $scope.upvoted = {
            "color" : "mediumblue"
          }
        if ($scope.downvoteVotings[index]) {
          $scope.downvoteVotings[index] = false;
          record.downvotes = Math.max(record.downvotes -=1,0);
          $scope.downvoted = {
             "color" : "balck"
          }
        }
        $scope.upvoteVotings[index]=true;
         record = $scope.id
        $scope.ideas.$save(record);
      }else{
          var record = $scope.ideas.$getRecord(id);
          record.upvotes = Math.max(record.upvotes -= 1,0);
          $scope.upvoted = {
            "color" : "balck"
          }
          $scope.upvoteVotings[index] = false;
          $scope.ideas.$save(record);
      }

    };

    $scope.downvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      if (!$scope.downvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.downvotes += 1;
        $scope.downvoted = {
          "color" : "brown"
        }
        if ($scope.upvoteVotings[index]) {
          $scope.upvoteVotings[index] = false;
          record.upvotes = Math.max(record.upvotes -=1, 0);
          $scope.upvoted = {
            "color" : "balck"
          }
        }
        $scope.downvoteVotings[index]=true;
        $scope.ideas.$save(record);
      }else{
          var record = $scope.ideas.$getRecord(id);
          record.downvotes = Math.max(record.downvotes -= 1, 0);
          $scope.downvoted = {
             "color" : "balck"
          }
          $scope.downvoteVotings[index] = false;
          $scope.ideas.$save(record);
      }


    };

    $scope.newIdea = function() {
  		var view = new supersonic.ui.View("idea#new");
  		supersonic.ui.layers.push(view);
    };


});



