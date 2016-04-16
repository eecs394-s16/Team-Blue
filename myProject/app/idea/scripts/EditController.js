angular
  .module('idea')
  .controller("EditController", function ($scope, supersonic) {
    $scope.idea = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Idea.find(steroids.view.params.id).then( function (idea) {
      $scope.$apply(function() {
        $scope.idea = idea;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.idea.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
