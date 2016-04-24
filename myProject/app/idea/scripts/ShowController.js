angular
  .module('idea')
  .controller("ShowController", function ($scope, db_url, supersonic, $firebaseArray, $firebaseObject) {
    $scope.idea = null;
    $scope.showSpinner = false;
    $scope.dataId = null;
    $scope.comments = [];
    $scope.ideaRef = null;
    $scope.commentRef = null;

    $scope.upvoteVotings = [];
    $scope.downvoteVotings = [];
    

    var _refreshViewData = function () {
      $scope.ideaRef = new Firebase(db_url + 'ideas/' + $scope.dataId.toString());
      $scope.commentRef = $scope.ideaRef.child("comments");
      $scope.showSpinner = false;
      $scope.idea = new $firebaseObject($scope.ideaRef);
      //attempt

      $scope.comments = new $firebaseArray($scope.commentRef);
      for (var i = 0; i++; i<$scope.comments.length) {
        $scope.upvoteVotings.push(false);
        $scope.downvoteVotings.push(false);
      };

      // console.log($scope.idea);
//       $scope.ideaRef.once("value", function(snapshot) {
//         // The callback function will get called twice, once for "fred" and once for "barney"
//         snapshot.forEach(function(childSnapshot) {

//           //$scope.comments.push(childSnapshot.val());

//           // key will be "fred" the first time and "barney" the second time
//           var key = childSnapshot.key();
//           // childData will be the actual contents of the child
//           if (key[0]=='-') {
// //            $scope.comments.push(childSnapshot.val().content);
//             $scope.comments.push(childSnapshot.val());
//           }
//         });
//       });



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

    class Comment1 {
      constructor(content) {
        this.content = content;
        this.upvotes = 0;
        this.downvotes = 0;
      }
    }

    $scope.addComment = function() {

      var texty = (document.getElementById('comment_input').value).toString();
      newComment = new Comment1(texty);
      $scope.commentRef.push(newComment)
    };

    $scope.upvote = function(id) {
      var index = id;
      if (!$scope.upvoteVotings[index]) {
        var cmt = $scope.comments.$getRecord(id);
        cmt.upvotes += 1;
        if ($scope.downvoteVotings[index]) {
          $scope.downvoteVotings[index] = false;
          cmt.downvotes -=1;
        }
        $scope.upvoteVotings[index] = true;
        $scope.comments.$save(cmt);
      }
    };

    $scope.downvote = function(id) {
      var index = id;
      if (!$scope.downvoteVotings[index]) {
        var cmt = $scope.comments.$getRecord(id);
        cmt.downvotes +=1;
        if ($scope.upvoteVotings[index]) {
          $scope.upvoteVotings[index] = false;
          cmt.upvotes -=1;
        }
        $scope.downvoteVotings[index] = true;
        $scope.comments.$save(cmt);
      }
    };


//clear input textarea after submit the comment
    $scope.clearForm = function (){
            $scope.cmtForm.comment_input.$setPristine(); // doesn't work
            $scope.cmtForm.comment_input.$setPristine(true); // doesn't work
            $scope.comment_input = ''; // doesn't work
    };

  });
