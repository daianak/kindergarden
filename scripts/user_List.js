(function(){
    var User = Parse.Object.extend("_User"),
        usersData;

    init();

    function init(){
        initElements();
        getAllUsers();
    }

    function getAllUsers(){
        var query = new Parse.Query(User);
        query.find().then(function(data){
            usersData = data;
            renderUsers();
        });
    }

    function renderUsers(){
        var usersTemplate = Handlebars.compile(elements.usersTemplate.innerHTML);
        elements.users.innerHTML = usersTemplate({ users: usersData }, {
            data: {intl: intlData}
        });
    }
})();