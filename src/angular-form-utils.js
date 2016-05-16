(function(window, angular, undefined){
  'use strict';
  
  angular
    .module('gp.FormUtils',[]);
  
  /*
    gp-clean-form directive
  */

  angular
    .module('gp.FormUtils')
    .directive('gpCleanForm', directive);
  
  function directive(){
    var ddo = {
      restrict: 'A',
      link: linkFn,
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm'
    };
    return ddo;
    
    function linkFn(scope, element, attributes, ctrl){
      
      var formName = attributes.gpCleanForm;
      
      element.bind('click', function(){
        if(scope[formName]){
          ctrl.clearForm(scope[formName]);
        }
        else{
          throw ('Don\'t exist a form with the name ' + attributes.gpCleanForm + ' in the given scope');
        }
      });
    }
  }
  
  function Controller(){
    var vm = this;
    vm.clearForm = function(_form){
      angular.forEach(_form, function(value, key) {
        if (typeof value === 'object' && value.hasOwnProperty('$modelValue')){
          _form[key].$setViewValue('');
          _form[key].$render();
        }
      });
    };
    
  }
  
  
})(window, angular);
