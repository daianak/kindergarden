(function(){
    var User = Parse.Object.extend("_User"),
        currentUser,
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
            addUserToRole(role, currentUser);
        }

        return false;
    }

    function getUserRoles(){
        return (new Parse.Query(Role)).equalTo("users", currentUser).include("child").find().then(function(roles){
            elements.roles.innerHTML = roles.map(function(role){
                return "<li>" + role.attributes.child.attributes.name + "</li>";
            }).join("");
            return roles;
        });
    }

    function renderUser(){
        elements.username.innerText = currentUser.attributes.username;

        getUserRoles().then(function(userRoles){
            var userRolesIndex = {};
            userRoles.forEach(function(role){
                userRolesIndex[role.id] = true;
            });

            getAllRoles().then(function(allRoles){
               elements.roles_select.innerHTML = "<option>Choose permission</option>" +
                   allRoles.roles
                       .filter(function(role) {
                           return !userRolesIndex[role.id];
                       })
                       .map(function(role){
                           var roleName = role.attributes.child ? role.attributes.child.attributes.name : role.attributes.name;
                           return '<option value="' + role.id + '">' + roleName + '</option>';
                       })
                       .join("");
            });
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
})();