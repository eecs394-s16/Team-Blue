angular
  .module('idea')
  .controller("ShowController", function ($scope, Idea, supersonic) {
    $scope.idea = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.comments = [];
    var Comments = supersonic.data.model("Comment");
    var _refreshViewData = function () {
      Idea.find($scope.dataId).then( function (idea) {
        $scope.$apply( function () {
          $scope.idea = idea;
          supersonic.logger.debug((idea.id).toString());
          console.log(idea.id);
          $scope.showSpinner = false;
          
          console.log(Comments);
          
          getComments(Comments);

        });
      });
    }

    function getComments(Comments) {
      $scope.comments = [];
      Comments.findAll().then( function (comments) {
            $scope.$apply( function() {
              for (comment of comments) {
                if (comment.idea_id==$scope.idea.id) {
                  // console.log('woot');
                  $scope.comments.push(comment.text);
                  
                }
              }
            });
            console.log($scope.comments);
          });
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
      var texty = (document.getElementById('comment-input').value).toString();
      var iid = $scope.idea.id;
      var commenty = {
        idea_id: iid,
        text: texty
      }
      var comment = new Comments(commenty);
      comment.save();
      $scope.$apply(function() {
        $scope.comments.push(texty);
      });
    }
    
  });