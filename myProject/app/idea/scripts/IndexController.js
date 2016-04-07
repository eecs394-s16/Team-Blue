angular
  .module('idea')
  .controller("IndexController", function ($scope, Idea, supersonic) {
    $scope.ideas = null;
    $scope.showSpinner = true;
    $scope.liked = false;
    $scope.stormed = false;

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

    $scope.like = function (id) {
      // supersonic.ui.dialog.alert('Hello');
      // console.log($scope.liked);
      if (!$scope.liked) {
        Idea.find(id).then(function(idea) {
          idea.likes+=1;
          idea.save();
          $scope.liked = true;
          // console.log($scope.liked);
          $scope.apply();
        });
      }
      else {
        Idea.find(id).then(function(idea) {
          idea.likes-=1;
          idea.save();
          $scope.liked = false;
          // console.log($scope.liked);
          $scope.apply();
        });
      }
    };

    $scope.storm = function (id) {
      // supersonic.ui.dialog.alert('Hello');
      // console.log($scope.liked);
      if (!$scope.stormed) {
        Idea.find(id).then(function(idea) {
          idea.storms+=1;
          idea.save();
          $scope.stormed = true;
          // console.log($scope.liked);
          $scope.apply();
        });
      }
      else {
        Idea.find(id).then(function(idea) {
          idea.storms-=1;
          idea.save();
          $scope.stormed = false;
          // console.log($scope.liked);
          $scope.apply();
        });
      }
    };
	
	$scope.newIdea = function() {
		var modalView = new supersonic.ui.View("idea#new");
		var options = {
		animate: true
		}
		supersonic.ui.modal.show(modalView, options);
    };

  });