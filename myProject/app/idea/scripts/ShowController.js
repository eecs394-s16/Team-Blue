angular
  .module('idea')
  .controller("ShowController", function ($scope, Idea, supersonic) {
    $scope.idea = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Idea.find($scope.dataId).then( function (idea) {
        $scope.$apply( function () {
          $scope.idea = idea;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.idea.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });