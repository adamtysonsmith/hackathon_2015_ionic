angular.module('starter.controllers', [])

.controller('FavoritesCtrl', function($scope) {})

.controller('RoutesCtrl', function($scope, $http, Chats) {
  $http.get('http://104.131.45.27:3000/all-routes')
    .success(function(data) {
      $scope.routes = data;
    });

})

.controller('FindCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('RouteDetailCtrl', function($scope, $stateParams, $http) {
  
  var timeInts = [
    { time: '4:00 AM',  m_time: '04:00:00' },
    { time: '4:30 AM',  m_time: '04:30:00' },
    { time: '5:00 AM',  m_time: '05:00:00' },
    { time: '5:30 AM',  m_time: '05:30:00' },
    { time: '6:00 AM',  m_time: '06:00:00' },
    { time: '6:30 AM',  m_time: '06:30:00' },
    { time: '7:00 AM',  m_time: '07:00:00' },
    { time: '7:30 AM',  m_time: '07:30:00' },
    { time: '8:00 AM',  m_time: '08:00:00' },
    { time: '8:30 AM',  m_time: '08:30:00' },
    { time: '9:00 AM',  m_time: '09:00:00' },
    { time: '9:30 AM',  m_time: '09:30:00' },
    { time: '10:00 AM', m_time: '10:00:00' },
    { time: '10:30 AM', m_time: '10:30:00' },
    { time: '11:00 AM', m_time: '11:00:00' },
    { time: '11:30 AM', m_time: '11:30:00' },
    { time: '12:00 PM', m_time: '12:00:00' },
    { time: '12:30 PM', m_time: '12:30:00' },
    { time: '1:00 PM',  m_time: '13:00:00' },
    { time: '1:30 PM',  m_time: '13:30:00' },
    { time: '2:00 PM',  m_time: '14:00:00' },
    { time: '2:30 PM',  m_time: '14:30:00' },
    { time: '3:00 PM',  m_time: '15:00:00' },
    { time: '3:30 PM',  m_time: '15:30:00' },
    { time: '4:00 PM',  m_time: '16:00:00' },
    { time: '4:30 PM',  m_time: '16:30:00' },
    { time: '5:00 PM',  m_time: '17:00:00' },
    { time: '5:30 PM',  m_time: '17:30:00' },
    { time: '6:00 PM',  m_time: '18:00:00' },
    { time: '6:30 PM',  m_time: '18:30:00' },
    { time: '7:00 PM',  m_time: '19:00:00' },
    { time: '7:30 PM',  m_time: '19:30:00' },
    { time: '8:00 PM',  m_time: '20:00:00' },
    { time: '8:30 PM',  m_time: '20:30:00' },
    { time: '9:00 PM',  m_time: '21:00:00' },
    { time: '9:30 PM',  m_time: '21:30:00' },
    { time: '10:00 PM', m_time: '22:00:00' },
    { time: '10:30 PM', m_time: '22:30:00' },
    { time: '11:00 PM', m_time: '23:00:00' },
    { time: '11:30 PM', m_time: '23:30:00' },
    { time: '12:00 AM', m_time: '00:00:00' },
    { time: '12:30 AM', m_time: '00:30:00' },
    { time: '1:00 AM',  m_time: '01:00:00' },
    { time: '1:30 AM',  m_time: '01:30:00' },
    { time: '2:00 AM',  m_time: '02:00:00' },
    { time: '2:30 AM',  m_time: '02:30:00' },
    { time: '3:00 AM',  m_time: '03:00:00' },
    { time: '3:30 AM',  m_time: '03:30:00' }
  ];
  
  // Time Controls
  var now = new Date().toString().split(' ')[4]; // military time
  var range = document.getElementById('time');
  var output = document.getElementById('time-select');
    
  $scope.timeOutput = initTime(now);
  $scope.selectedTime = now;

  range.oninput = function(){
    var self = this;
    $scope.$apply(function(){
        $scope.timeOutput = null;
        $scope.selectedTime = timeInts[self.value].m_time;
    });
    output.innerHTML = timeInts[this.value].time;
  }
  
  $scope.$watch('selectedTime', function(newValue, oldValue){
      console.log('The time selected is', newValue)
  });
  
  function initTime(mt) {
    var hour = parseInt(mt.slice(0, 2));
    var estimate;
    
    for(var i = 0; i < timeInts.length; i++) {
      var thisHr = parseInt(timeInts[i].m_time.slice(0, 2));
      if(hour + 1 === thisHr) {
        estimate = timeInts[i].time;
        return estimate;
      }
    }
  }
  
  // Day Controls
  $scope.selectedDay = initDay();

  $scope.$watch('selectedDay', function(newValue, oldValue){
      console.log('The day selected is', newValue)
  });
    
  function initDay() {
    var days = ['SU','M','T','W','TR','F','SA'];
    var today = days[new Date().getDay()];
    return today;
  }
    
    
  // Direction Controls
  $scope.$watch('selectedDirection', function(newValue, oldValue){
      console.log('The direction selected is', newValue)
  });
  
    
  // Query all the trips for this route
  $http.get('http://104.131.45.27:3000/trips/' + $stateParams.routeId)
    .success(function(data) {
      $scope.trips = data;
      if($scope.trips[0].direction === 'NS') {
        $scope.northbound = true;
      } else {
        $scope.eastbound = true;
      }
    });

});
