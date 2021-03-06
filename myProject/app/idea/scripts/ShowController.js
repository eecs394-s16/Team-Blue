angular
  .module('idea')
  .controller("ShowController", function ($scope, db_url, supersonic, $firebaseArray, $firebaseObject) {
    "use strict";
    $scope.idea = null;
    $scope.showSpinner = false;
    $scope.dataId = null;
    $scope.comments = [];
    $scope.ideaRef = null;
    $scope.commentRef = null;
    $scope.postClass = "button-clear";
    $scope.upvoteVotings = [];
    $scope.downvoteVotings = [];
    $scope.comment_input = null;
    $scope.cmtMissing = false;
    $scope.posting = function() {
      $scope.postClass = "postClass";
    }

    $scope.donePosting = function() {
      $scope.postClass = "button-clear";
    }

    var _refreshViewData = function () {
      $scope.ideaRef = new Firebase(db_url + 'ideas/' + $scope.dataId.toString());
      $scope.commentRef = $scope.ideaRef.child("comments");
      $scope.showSpinner = false;
      $scope.idea = new $firebaseObject($scope.ideaRef);
      $scope.comments = new $firebaseArray($scope.commentRef);

      for (var i = 0; i++; i < $scope.comments.length) {
        $scope.upvoteVotings.push(false);
        $scope.downvoteVotings.push(false);
      };
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

      console.log($scope.comment_input);
      if ($scope.comment_input.toString()!="") {
        $scope.donePosting();
        // var texty = (document.getElementById('comment_input').value).toString();
        var newComment = new Comment1($scope.comment_input);

        $scope.commentRef.push(newComment);
      }
    };

    $scope.upvote = function(id) {
      var index = id;
      if (!$scope.upvoteVotings[index]) {
        var cmt = $scope.comments.$getRecord(id);
        cmt.upvotes += 1;
        // $scope.upvoted = {
        //     "color" : "mediumblue"
        //   }
        if ($scope.downvoteVotings[index]) {
          $scope.downvoteVotings[index] = false;
          cmt.downvotes = Math.max(cmt.downvotes -=1,0);
          }
          // $scope.downvoted = {
          //    "color" : "balck"
          // }
        $scope.upvoteVotings[index] = true;
        $scope.comments.$save(cmt);
      }else{
          var cmt = $scope.comments.$getRecord(id);
          cmt.upvotes = Math.max(cmt.upvotes -=1,0);
          // $scope.upvoted = {
          //   "color" : "balck"
          // }

          $scope.upvoteVotings[index] = false;
          $scope.comments.$save(cmt);
      }
    };

    $scope.downvote = function(id) {
      var index = id;
      if (!$scope.downvoteVotings[index]) {
        var cmt = $scope.comments.$getRecord(id);
        cmt.downvotes +=1;
        // $scope.downvoted = {
        //   "color" : "brown"
        // }
        if ($scope.upvoteVotings[index]) {
          $scope.upvoteVotings[index] = false;
          cmt.upvotes=Math.max(cmt.upvotes -=1, 0);
          // $scope.upvoted = {
          //   "color" : "balck"
          // }
        }
        $scope.downvoteVotings[index] = true;
        $scope.comments.$save(cmt);
      }else{
          var cmt = $scope.comments.$getRecord(id);
          cmt.downvotes = Math.max(cmt.downvotes -=1, 0);
          // $scope.downvoted = {
          //    "color" : "balck"
          // }
          $scope.downvoteVotings[index] = false;
          $scope.comments.$save(cmt);
      }
    };


//clear input textarea after submit the comment
    $scope.clearForm = function (){
      $scope.cmtForm.comment_input.$setPristine(); // doesn't work
      $scope.cmtForm.comment_input.$setPristine(true); // doesn't work
      $scope.comment_input = ''; // doesn't work
    };


    // $scope.downvoted = {
    //          "color" : "balck"
    //       }
    // $scope.UPvoted = {
    //    "color" : "balck"
    // }


    $scope.upvotedBool = false;
    $scope.downvotedBool = false;
    $scope.upvoteIdea = function(id) {
      console.log(id);
      $scope.upvotedIdea = {

      }
      if (!$scope.upvotedBool) {
        $scope.idea.upvotes +=1;
        // $scope.upvotedIdea = {
        //     "color" : "mediumblue"
        //   }
        $scope.upvotedBool = true;
        if ($scope.downvotedBool) {
          $scope.downvotedBool = false;
          $scope.idea.downvotes-=1;
        }
      }
      else{
          // $scope.upvotedIdea = {
          //   "color" : "balck"
          // }
          $scope.upvotedBool = false;
          $scope.idea.upvotes -=1;
      }
      $scope.idea.$save();

    };

    $scope.downvoteIdea = function(id) {
      console.log(id);
      $scope.downvotedIdea = {

      }
      // var index = $scope.ideas.$indexFor(id);
      // console.log(index);
      //
      if (!$scope.downvotedBool) {
        $scope.idea.downvotes+=1;
        // $scope.downvotedIdea = {
        //     "color" : "mediumblue"
        //   }
        $scope.downvotedBool = true;
        if ($scope.upvotedBool) {
          $scope.upvotedBool = false;
          $scope.idea.upvotes-=1;
        }
      }
      else {
          console.log('hello');
          // $scope.downvotedIdea = {
          //   "color" : "balck"
          // }
          $scope.downvotedBool = false;
          $scope.idea.downvotes-=1;
      }
      $scope.idea.$save();

    };

  });
