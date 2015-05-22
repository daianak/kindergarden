(function(){
    var User = Parse.Object.extend("_User"),
        Role = Parse.Object.extend("_Role"),
        currentUser,
        usersData,
        elements = {},
        rolesIndex = {};

    window.addRole = addRole;

    var elements = {
        username: document.querySelector("#username"),
        password: document.querySelector("#password"),
        email: document.querySelector("#email")
    };

    var userFormElement = document.querySelector("#user-form");
    var usersTbody = document.querySelector("#users"),
        usersTemplate = Handlebars.compile(document.querySelector("#user-template").innerHTML);

    window.addUser = function(){
        var userAttributes = getFormValues();

        var user = new User();
        user.save(userAttributes).then(function(userObj){
            usersData.push(userObj);
            renderUsers();
            toggleForm();

        }, function(error){
            console.error("Can't save user: ", error.message);
        });
    };

    getAllUsers();

    function getFormValues(){
        var values = {},
            element;

        for(var elementName in elements){
            element = elements[elementName];
            if (element) {
                if (element.getAttribute("type") === "date")
                    values[elementName] = new Date(element.value);
                else
                    values[elementName] = element.value;
            }
        }

        return values;
    }

    function getAllUsers(){
        var query = new Parse.Query(User);
        query.find().then(function(data){
            usersData = data;
            renderUser();
        });
    }

    function renderUser(){
        elements.username.innerText = currentUser.attributes.username;
    }

    window.toggleForm = function(){
        userFormElement.classList.toggle("hidden");
        if (!userFormElement.classList.contains("hidden"))
            document.querySelector("#username").focus();
    };
})();