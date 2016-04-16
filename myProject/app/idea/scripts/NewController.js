angular
  .module('idea')
  .controller("NewController", function ($scope, Idea, supersonic, db_url, $firebaseArray) {
    $scope.idea = {};
    $scope.showSpinner = false;
    class Idea {
      constructor(title, desc, author, currentdate) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;

        var date = currentdate.getDay() + "/"+currentdate.getMonth()
              + "/" + currentdate.getFullYear() + " "
              + currentDate.getHours() + ":" + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();;
        this.date = date;

        /*var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        this.time = time;*/
      }
    }

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      var newidea = new Idea($scope.idea.title,$scope.idea.desc, 'Rodrigo', new Date());

      var ref = new Firebase(db_url);
      ref.child("ideas").push(newidea);
      $scope.showSpinner = false;
      supersonic.ui.layers.popAll();
      // $scope.ideas = new $firebaseArray(ref.child("ideas"));
      // $scope.ideas.$add(newidea);
      // $scope.ideas.$save().then(function() {

      // })

    };

  });
