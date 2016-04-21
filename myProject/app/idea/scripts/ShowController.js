angular
  .module('idea')
  .controller("ShowController", function ($scope, db_url, supersonic, $firebaseArray, $firebaseObject) {
    $scope.idea = null;
    $scope.showSpinner = false;
    $scope.dataId = null;
    $scope.comments = [];
    $scope.ideaRef = null;

    var _refreshViewData = function () {
      $scope.ideaRef = new Firebase(db_url + 'ideas/' + $scope.dataId.toString());
      $scope.showSpinner = false;
      $scope.idea = new $firebaseObject($scope.ideaRef);
      console.log($scope.idea);
      $scope.ideaRef.once("value", function(snapshot) {
        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
          // key will be "fred" the first time and "barney" the second time
          var key = childSnapshot.key();
          // childData will be the actual contents of the child
          if (key[0]=='-') {
            $scope.comments.push(childSnapshot.val().hello);
          }
        });
      });



    }

    function getComments() {

    }
    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      supersonic.logger.debug(values);
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.idea.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }

    $scope.addComment = function() {

      var texty = (document.getElementById('comment_input').value).toString();

      var commenty = {
        hello: texty
      }
      console.log($scope.idea);
      $scope.ideaRef.push(commenty);
        $scope.comments.unshift(texty);

    };

//clear input textarea after submit the comment
    $scope.clearForm = function (){
            $scope.cmtForm.comment_input.$setPristine(); // doesn't work
            $scope.cmtForm.comment_input.$setPristine(true); // doesn't work
            $scope.comment_input = ''; // doesn't work
    };

  });
