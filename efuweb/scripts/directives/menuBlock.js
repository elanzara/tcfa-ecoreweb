function MenuBlock() {

  return {
      restrict: 'EA',
      templateUrl: './views/templates/menu.tpl.html',
      // controller: 'menuCtrl',
     /* scope: {
        selected: '@selected',
        // username: '@username',
        // userrole: '@userrole',
        // customer: '@customer',
        // cuscode: '@cuscode',
      }*/
    };

};


angular.module('mainapp').directive('menu', MenuBlock);
