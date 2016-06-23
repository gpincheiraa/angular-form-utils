(function() {
  
  'use strict';
  

  describe('gpThousandsSeparator filter', thousandsSeparatorSpec);

  function thousandsSeparatorSpec(){
    
    var filterService;

    beforeEach(module('gp.formUtils'));

    it('1. Should be format of a given number to thousands separator using the default separator "."', inject(spec1));

    function spec1($filter){
      
      var num1 =  '10000',
          num2 = '200000',
          num3 = '300000000';
      
      expect($filter('gpThousandsSeparator')(num1)).toBe('10.000');
      expect($filter('gpThousandsSeparator')(num2)).toBe('200.000');
      expect($filter('gpThousandsSeparator')(num3)).toBe('300.000.000');
    }

    it('2. Should be format of a given number to thousands separator using the custom separator "."', inject(spec2));

    function spec2($filter){
      
      var num1 =  '10000',
          num2 = '200000';
      
      expect($filter('gpThousandsSeparator')(num1, ',')).toBe('10,000');
      expect($filter('gpThousandsSeparator')(num2, '-')).toBe('200-000');

    }

    it('3. Should be return the same entry if the given value it\'s not a number',inject(spec3));

    function spec3($filter){
      
      var num1 =  'value',
          num2 = 'false_value';
      
      expect($filter('gpThousandsSeparator')(num1)).toBe(num1);
      expect($filter('gpThousandsSeparator')(num2)).toBe(num2);

    }



  }

  describe('gpCleanForm directive', cleanFormSpec);
  
  function cleanFormSpec(){
    
    var scope, domElement, rawHtmlString;
    
    beforeEach(module('gp.formUtils'));
    beforeEach(inject(eachSpecSetup));
    
    function eachSpecSetup($compile, $rootScope){
      scope = $rootScope.$new();
      rawHtmlString = '<div>\
                        <form name="theForm"> \
                          <input name="theFirst" ng-model="theFirstInput">\
                          <input name="theSecond" ng-model="theSecondInput">\
                          <input name="theThird" ng-model="theThirdInput">\
                        </form>\
                        <button gp-clean-form="theForm"></button>\
                      </div>';
      domElement = angular
                      .element(rawHtmlString);
      $compile(domElement)(scope);
    }
    
    it('1. Should be clean all inputs that have ng-model and name attributes when the user clicks on the button that have attached the directive ',spec1);
    
     function spec1(){
       var button = domElement.children('button[gp-clean-form]');
       
       scope.theFirstInput = 'Hi';
       scope.theSecondInput = 'Hola';
       scope.theThirdInput = 'ciao';
       
       button.triggerHandler('click');
       
       expect(scope.theFirstInput).toEqual('');
       expect(scope.theSecondInput).toEqual('');
       expect(scope.theThirdInput).toEqual('');
     }
    
    it('2. Should throws a error when the given name of the form it\'s not found in the scope', inject(spec2));
    
    function spec2($compile, $rootScope){
      
      var errorMsg = 'Don\'t exist a form with the name invalidFormName in the given scope';
      
      rawHtmlString = rawHtmlString.replace(/gp\-clean\-form\=\"theForm\"/g, 'gp-clean-form="invalidFormName"');
      //creates a function that have the html modified
      domElement = angular.element(rawHtmlString);
      $compile(domElement)(scope);
      
      expect(function(){domElement.children('button[gp-clean-form]').triggerHandler('click');}).toThrow();
    }
        
  }


})();