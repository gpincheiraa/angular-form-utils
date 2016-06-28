(function(window, angular, undefined){
  'use strict';
  
  angular
    .module('gp.formUtils',[]);
  

  angular
    .module('gp.formUtils')
    .filter('gpThousandsSeparator', filterThousandsSeparator);


  function filterThousandsSeparator(){

    return function(value, _separator){
      var separator = _separator || '.';

      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    };
  }

  /*
    gp-clean-form directive
  */

  angular
    .module('gp.formUtils')
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
          /*
            Correctly throwing an error

              Two tips on throwing an error:
              
              -Always throw an instance of Error class, never throw a string or an object. Getting stack trace is only possible via Error object, for example.
              
              throw new Error('broken')  // good
              throw 'broken'  // bad
          */
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
