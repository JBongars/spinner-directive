/**
 * Title        :   Client side controller applicaiton
 * Author       :   Julien Bongars
 * Date         :   31/08/2017
 * Comments     :   Client side application
 */

(function(){
    "strict"
    var app = angular.module('app').controller('MainCtrl', function() {
        
        var self = this;
        self.targetIndex = {};
        self.timer = 4000;
        self.unit_y = 50;
        self.list = {"participants":[11210,11211,11212,11213,11214,11215,11216,11217,11218,11219,11220,11221,11222,11223,11224,11225,11226,11227,11228,11229],"winner":11223};
        
        self.stop = function(e) {
          self.timer = self.timer * 2;
          $('.js-slot__list').stop(true);
          var targetY = (self.targetIndex) * - self.unit_y;
          $('.js-slot__list').css({marginTop:-50});
            $('.js-slot__list').animate({
                marginTop: targetY,
                easing: 'easeOutElastic'
            }, self.timer);
        }
        
        self.roll = function(e) {
            var targetY = (self.list.participants.length+1) * - self.unit_y;
          $('.js-slot__list').css({marginTop:-50});
            $('.js-slot__list').animate({
                marginTop: targetY,
                easing: 'easeOutElastic'
              }, self.timer, '', function() {
              self.roll();
            });
        }
      });
          
      app.directive('spinner', function(){
        return {
         restrict: 'E',
         scope: {
           index: '=',
           list: '='
         },
         link: function(scope, element, attrs) {
           scope.populateContent = function(elem, config) {
             var participants = config.participants;
             var winner = config.winner;
             var index = 0; var count = 0;
             
                for(var j=0; j<participants.length+3; j++){
              if(j<participants.length) {
                 var li = $('<li>').html(participants[j]);
                      if(participants[j]==winner){
                            li.addClass('js-slot__list--target');
                            index = count;
                   }
              } else {
                 // Buffer by 3 so that the numbers don't jump when looping
                 var li = $('<li>').html(participants[j-participants.length]);
              }
                    elem.append(li);
                    count++;
                }
          
            return index;
        };
           
           scope.index = scope.populateContent($('.js-slot__list'), {
                 winner: scope.list.winner,
             participants: scope.list.participants
             });
         },
         template: '<div class="slot">' +
      '<div class="slot__container">' +
      '	<div class="slot__highlight"></div>' +
      '  <div>' +
      '		<ul class="slot__list js-slot__list"></ul>' +
      '	  </div>' +
      '</div>'
        };
        
      });
})();