//LOGIN APP --
angular.module('loginapp', ['ngRoute', 'ngCookies']);

// MAIN APP
angular.module('mainapp', [
    'ui.router',
    'ngCookies',
    'ui.router.state.events',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngFileUpload', 'ui.bootstrap'
]);

angular.module('mainapp').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('app/home/favoritos');

    $translateProvider.translations('en', en_translations);

    $translateProvider.translations('sp', sp_translations);

    $translateProvider.preferredLanguage('en');

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'app.html',
            controller: 'mainCtrl',
            abstract: true
        })
        .state('app.home', {
            url: '/home/:param',
            controller: 'homeCtrl',
            templateUrl: 'views/home/index.html',
            data: {
                pageTitle: 'Inicio'
            },
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/homeService.js',
                            'scripts/controllers/homeCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.configuration', {
            url: '/configuration',
            template: '<ui-view></ui-view>',
            abstract: true
        })

    .state('app.configuration.groups', {
        url: '/groups/:param',
        controller: 'groupsCtrl',
        data: {
            pageTitle: 'Grupo de programas'
        },
        templateUrl: 'views/groups/index.html',
        resolve: {
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'scripts/services/groupService.js',
                        'scripts/controllers/groupsCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('app.configuration.profiles', {
        url: '/profiles/:param',
        controller: 'profilesCtrl',
        data: {
            pageTitle: 'Perfiles'
        },
        templateUrl: 'views/profiles/index.html',
        resolve: {
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'scripts/services/profileService.js',
                        'scripts/controllers/profilesCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('app.configuration.modules', {
        url: '/modules/:param',
        controller: 'modulesCtrl',
        data: {
            pageTitle: 'Modulos'
        },
        templateUrl: 'views/modules/index.html',
        resolve: {
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'scripts/services/moduloService.js',
                        'scripts/controllers/modulesCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('app.configuration.programs', {
        url: '/programs/:param',
        controller: 'programsCtrl',
        data: {
            pageTitle: 'Programas'
        },
        templateUrl: 'views/programs/index.html',
        resolve: {
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'scripts/services/programService.js',
                        'scripts/controllers/programsCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('app.configuration.users', {
        url: '/users/:param',
        controller: 'usersCtrl',
        data: {
            pageTitle: 'Usuarios'
        },
        templateUrl: 'views/users/index.html',
        resolve: {
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'scripts/services/profileService.js',
                        'scripts/services/userService.js',
                        'scripts/controllers/usersCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('app.configuration.grupoperfil', {
            url: '/grupoperfil/:param/:prespective',
            controller: 'grupoperfilCtrl',
            data: {
                pageTitle: 'Grupos por Perfiles'
            },
            templateUrl: 'views/grupoxperfil/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/profileService.js',
                            'scripts/services/groupService.js',
                            'scripts/services/grupoperfilService.js',
                            'scripts/controllers/grupoperfilCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance', {
            url: '/insurance',
            template: '<ui-view></ui-view>',
            abstract: true
        })
        .state('app.insurance.allianzPortfolio', {
            url: '/portfolio/:param',
            controller: 'allianzPortfolioCtrl',
            data: {
                pageTitle: 'Allianz Cartera'
            },
            templateUrl: 'views/allianzPortfolio/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/allianzPortfolioService.js',
                            'scripts/controllers/allianzPortfolioCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.allianzCommission', {
            url: '/commission/:param',
            controller: 'allianzCommissionCtrl',
            data: {
                pageTitle: 'Allianz Comisiones'
            },
            templateUrl: 'views/allianzCommission/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/allianzCommissionService.js',
                            'scripts/controllers/allianzCommissionCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.triumphNews', {
            url: '/triumphNews/:param',
            controller: 'triumphNewsCtrl',
            data: {
                pageTitle: 'Triunfo Novedades'
            },
            templateUrl: 'views/triumphNews/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/triumphNewsService.js',
                            'scripts/controllers/triumphNewsCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.cajaCartera', {
            url: '/cajaCartera/:param',
            controller: 'cajaCarteraCtrl',
            data: {
                pageTitle: 'Caja Cartera'
            },
            templateUrl: 'views/cajaCartera/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/cajaCarteraService.js',
                            'scripts/controllers/cajaCarteraCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.mapfreNews', {
            url: '/mapfreNews/:param',
            controller: 'mapfreNewsCtrl',
            data: {
                pageTitle: 'Mapfre Novedades'
            },
            templateUrl: 'views/mapfreNews/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/mapfreNewsService.js',
                            'scripts/controllers/mapfreNewsCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.sanCristobalMov', {
            url: '/scriMovements/:param',
            controller: 'scriMovementsCtrl',
            data: {
                pageTitle: 'San Cristobal Movimientos'
            },
            templateUrl: 'views/scriMovements/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/scriMovementsService.js',
                            'scripts/controllers/scriMovementsCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.cajaNews', {
            url: '/cajaNews/:param',
            controller: 'cajaNewsCtrl',
            data: {
                pageTitle: 'Caja Novedades'
            },
            templateUrl: 'views/cajaNews/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/cajaNewsService.js',
                            'scripts/controllers/cajaNewsCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.sancor', {
            url: '/sancor/:param',
            controller: 'sancorCtrl',
            data: {
                pageTitle: 'Sancor'
            },
            templateUrl: 'views/sancor/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/sancorService.js',
                            'scripts/controllers/sancorCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.insurance.sanCristobalCob', {
            url: '/scriCollections/:param',
            controller: 'scriCollectionsCtrl',
            data: {
                pageTitle: 'San Cristobal Cobranzas'
            },
            templateUrl: 'views/scriCollections/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/scriCollectionsService.js',
                            'scripts/controllers/scriCollectionsCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.abm', {
            url: '/abm',
            template: '<ui-view></ui-view>',
            abstract: true
        })
        .state('app.abm.changeState', {
            url: '/changeState/:param',
            controller: 'changeStateCtrl',
            data: {
                pageTitle: 'Cambio de estado'
            },
            templateUrl: 'views/changeState/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/changeStateService.js',
                            'scripts/controllers/changeStateCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.abm.altaCobertura', {
            url: '/altaCobertura/:param',
            controller: 'altaCoberturaCtrl',
            data: {
                pageTitle: 'Alta Cobertura'
            },
            templateUrl: 'views/altaCobertura/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/altaCoberturaService.js',
                            'scripts/controllers/altaCoberturaCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.abm.edicionCobertura', {
            url: '/edicionCobertura/:param',
            controller: 'edicionCoberturaCtrl',
            data: {
                pageTitle: 'Edicion Cobertura'
            },
            templateUrl: 'views/edicionCobertura/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/edicionCoberturaService.js',
                            'scripts/controllers/edicionCoberturaCtrl.js',
                        ]
                    });
                }]
            }
        })
        .state('app.abm.reporteCobertura', {
            url: '/reporteCobertura/:param',
            controller: 'reporteCoberturaCtrl',
            data: {
                pageTitle: 'Reporte Cobertura'
            },
            templateUrl: 'views/reporteCobertura/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'scripts/services/reporteCoberturaService.js',
                            'scripts/controllers/reporteCoberturaCtrl.js',
                        ]
                    });
                }]
            }
        });
}]);

angular.module('mainapp').factory('setting', ['$rootScope', function($rootScope) {
    var setting = {
        layout: {
            /*pageSidebarMinified: false,
            pageFixedFooter: false,
            pageRightSidebar: false,
            pageTwoSidebar: false,
            pageTopMenu: false,
            pageBoxedLayout: false,
            pageWithoutSidebar: false,
            pageContentFullHeight: false,
            pageContentFullWidth: false,
            pageContentInverseMode: false,
            pageSidebarTransparent: false,
            pageWithFooter: false,
            pageLightSidebar: false,
            pageMegaMenu: false,
            pageBgWhite: false,
            pageWithoutHeader: false,
            paceTop: false*/
        }
    };

    return setting;
}]);


angular.module('mainapp').run(['$rootScope', '$state', 'setting', function($rootScope, $state, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}]);