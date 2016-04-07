angular
  .module('idea')
  .controller("NewController", function ($scope, Idea, supersonic) {
    $scope.idea = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newidea = new Idea($scope.idea);
      newidea.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });