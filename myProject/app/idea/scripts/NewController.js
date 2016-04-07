angular
  .module('idea')
  .controller("NewController", function ($scope, Idea, supersonic) {
    $scope.idea = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newidea = new Idea($scope.idea);
      newidea.save().then( function () {
        supersonic.ui.modal.hide();
		var view = new supersonic.ui.View("idea#index");
		supersonic.ui.layers.push(view);
      });
	  $scope.showSpinner = false;
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });