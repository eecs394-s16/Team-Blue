angular
  .module('idea')
  .constant('Idea', supersonic.data.model('Idea'))
  .constant('db_url', 'https://crowdstormdb.firebaseio.com/');
