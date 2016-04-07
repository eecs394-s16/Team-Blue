angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

    $scope.x = "Hello";
    $scope.wth = 'I am a variable';
    // $scope.hello = 'yes';
    $scope.hello = function() {
    	supersonic.logger.log('running hello function');
    	supersonic.ui.dialog.alert('Hello');
    };

  });
