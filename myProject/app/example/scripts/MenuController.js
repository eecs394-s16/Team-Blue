angular
  .module('example')
  .controller('MenuController', function($scope, supersonic) {
	supersonic.ui.navigationBar.update({
		overrideBackButton: true
	}).then(supersonic.ui.navigationBar.show());
  });
