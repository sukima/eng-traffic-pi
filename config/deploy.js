module.exports = function(environment){
  var ENV = {};

  if (environment === 'production') {
    ENV['scp'] = {
      username: 'pi',
      host: '10.0.0.100',
      path: '/var/www/html'
    }
  };
  return ENV;
};
