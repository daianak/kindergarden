(function(){
    var User = Parse.Object.extend("_User"),
        Role = Parse.Object.extend("_Role"),
        currentUser,
        elements = {},
        rolesIndex = {};

    window.addRole = addRole;

    init();

    function init(){
        initElements();

        var userId = getUserIdFromUrl();
        if (userId){
            getUserById(userId).then(renderUser);
        }
    }

    function addRole(){
        var roleId = elements.roles_select.querySelector(":checked").value;
        if (roleId){
            var role = rolesIndex[roleId];

            role.getUsers().add(currentUser);
            role.save().then(function(role){
                console.log("SAVED: ", role);
            }, function(error){
                console.error("ERROR: ", error);
            });
        }

        return false;
    }

    function initElements(){
        var propertyElements = document.querySelectorAll("[data-property]");
        for(var i=0; i< propertyElements.length; i++){
            elements[propertyElements[i].dataset.property] = propertyElements[i];
        }
    }
    function renderUser(){
        elements.username.innerText = currentUser.attributes.username;

        getAllRoles().then(function(roles){
           elements.roles_select.innerHTML = "<option>Choose permission:</option>" + roles.map(function(role){
               var roleName = role.attributes.child ? role.attributes.child.attributes.name : role.attributes.name;
               return '<option value="' + role.id + '">' + roleName + '</option>';
           }).join("");
        });
    }

    function getUserIdFromUrl(){
        var userIdMatch = window.location.search.match(/[\?&]userId=([^&]+)/);
        if (!userIdMatch)
            return null;

        return userIdMatch[1];
    }

    function getUserById(userId){
        var query = new Parse.Query(User);
        return query.get(userId).then(function(user){
            currentUser = user;
            return user;
        });
    }

    function getAllRoles(){
        var query = new Parse.Query(Role);
        query.include("child");
        return query.find().then(function(roles){
            roles.forEach(function(role){
                rolesIndex[role.id] = role;
            });

            return roles;
        });
    }
})();