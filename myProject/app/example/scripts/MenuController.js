angular
  .module('example')
  .controller('MenuController', function($scope, supersonic) {
	supersonic.ui.navigationBar.update({
		overrideBackButton: true
	}).then(supersonic.ui.navigationBar.show());
	$scope.navbarTitle = "Learn More";
    $scope.x = "Hello";
    $scope.wth = 'I am a variable';
    // $scope.hello = 'yes';
    $scope.hello = function() {
    	supersonic.logger.log('running hello function');
    	supersonic.ui.dialog.alert('Hello'); 
    };
	$scope.newIdea = function() {
		var view = new supersonic.ui.View("idea#new");
		supersonic.ui.layers.push(view);
    };
  });
