//IRON ROUTER


Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/',{
    name: 'home',
    template: 'home'
});

Router.route('/search',{
    name: 'search',
    template: 'search'
});


Router.route('/details',{
    name: 'details',
    template: 'details'
});


