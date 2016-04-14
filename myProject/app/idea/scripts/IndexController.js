angular
  .module('idea')
  .controller("IndexController", function ($scope, Idea, supersonic, db_url, $firebaseObject, $firebaseArray) {
    $scope.ideas = [];
    $scope.ideasRef = null;
    $scope.showSpinner = true;


    class Idea {
      constructor(title, desc, author, currentdate) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;

        var date = currentdate.getDay() + "/"+currentdate.getMonth()
              + "/" + currentdate.getFullYear() + " "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        this.date = date;
      }
    }

    // var addIdea = function(ideasRef, idea) {
    //   ideasRef.push(idea);
    // }
    console.log(db_url);
    var ref = new Firebase(db_url);
    $scope.ideasRef = ref.child("ideas");
    // $scope.ideasRef.push(new Idea("hello", "wawa", "me", new Date()));

    $scope.ideas = new $firebaseArray($scope.ideasRef);
    console.log($scope.ideas);
    $scope.upvoteVotings = [];
    $scope.downvoteVotings = [];
    for (var i = 0; i++; i<$scope.ideas.length) {
      $scope.upvoteVotings.push(false);
      $scope.downvoteVotings.push(false);
    };
    $scope.ideas.$loaded().then(function() {
      $scope.showSpinner = false;
    });

    $scope.upvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      console.log(index);
      if (!$scope.upvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.upvotes += 1;
        if ($scope.downvoteVotings[index]) {
          $scope.downvoteVotings[index] = false;
          record.downvotes -=1;
        }
        $scope.upvoteVotings[index]=true;
        $scope.ideas.$save(record);
      }
    };

    $scope.downvote = function(id) {
      var index = $scope.ideas.$indexFor(id);
      if (!$scope.downvoteVotings[index]) {
        var record = $scope.ideas.$getRecord(id);
        record.downvotes += 1;
        if ($scope.upvoteVotings[index]) {
          $scope.upvoteVotings[index] = false;
          record.upvotes -=1;
        }
        $scope.downvoteVotings[index]=true;
        $scope.ideas.$save(record);
      }
    };


	// $scope.newIdea = function() {
	// 	var view = new supersonic.ui.View("idea#new");
	// 	supersonic.ui.layers.push(view);
  //   };


  });

  //   Idea.all().whenChanged( function (ideas) {
  //       $scope.$apply( function () {
  //         $scope.ideas = ideas;
  //         $scope.showSpinner = false;
  //       // });
  //       // var data = supersonic.data.model('Idea');
  //       // data.findAll().then(function(arr) {
  //         $scope.ideas.ratings = [];
  //         for (item of ideas) {
  //           var rating = item.upvotes-item.downvotes;
  //           $scope.ideas.ratings.push(rating);
  //         }
  //         console.log($scope.ideas.ratings);
  //       });
  //   });
