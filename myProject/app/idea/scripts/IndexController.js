angular
  .module('idea')
  .controller("IndexController", function ($scope, Idea, supersonic) {
    $scope.ideas = null;
    $scope.showSpinner = true;

    Idea.all().whenChanged( function (ideas) {
        $scope.$apply( function () {
          $scope.ideas = ideas;
          $scope.showSpinner = false;
        // });
        // var data = supersonic.data.model('Idea');
        // data.findAll().then(function(arr) {
          $scope.ideas.ratings = [];
          for (item of ideas) {
            var rating = item.upvotes-item.downvotes;
            $scope.ideas.ratings.push(rating);
          }
          console.log($scope.ideas.ratings);
        });
    });


    $scope.upvote = function (id) {
      // supersonic.ui.dialog.alert('Hello');
      Idea.find(id).then(function(idea) {
        idea.upvotes++;
        idea.save();
      });
    };

    $scope.downvote = function (id) {
      // supersonic.ui.dialog.alert('Hello');
      Idea.find(id).then(function(idea) {
        idea.downvotes++;
        idea.save().then( function() {
          console.log("idea saved");
        });
      });
    };

  });