var intlData = {
    locales: 'he-IL'
};

var elements = {};

var Role = Parse && Parse.Object.extend("_Role"),
    User = Parse && Parse.Object.extend("_User"),
    Kinship = Parse && Parse.Object.extend("Kinship"),
    allKinship,
    allUsers,
    adminRole,
    _currentUserIsAdmin;

initGlobal();

function currentUserIsAdmin(){
    if (_currentUserIsAdmin !== undefined)
        return Promise.resolve(_currentUserIsAdmin);

    var query = (new Parse.Query(Role));
    query.equalTo("name", "Admin");
    query.equalTo("users", Parse.User.current());
    return query.first().then(function(adminRole) {
        return _currentUserIsAdmin = !!adminRole;
    });
}

function initElements(){
    var propertyElements = document.querySelectorAll("[data-property]");
    for(var i=0; i< propertyElements.length; i++){
        elements[propertyElements[i].dataset.property] = propertyElements[i];
    }
}

function getAllUsers(){
    if (allUsers)
        return Promise.resolve(allUsers);

    var query = new Parse.Query(User);
    query.include("kinship");
    return query.find().then(function(data){
        return allUsers = data;
    });
}

function getAllRoles(){
    var query = new Parse.Query(Role);
    query.include("child");
    return query.find().then(function(roles){
        var rolesIndex = {};

        roles.forEach(function(role){
            rolesIndex[role.id] = role;
        });

        return { roles: roles, index: rolesIndex };
    });
}

function getAllKinship(){
    if (allKinship)
        return Promise.resolve(allKinship);

    var query = new Parse.Query(Kinship);
    return query.find().then(function(data){
        var index = {};
        data.forEach(function(kinship){
            index[kinship.id] = kinship;
        });

        allKinship = { list: data, index: index };
        return allKinship;
    });
}

function setValuesToSelect(element, values, getName, defaultOptionText){
    var defaultOption = defaultOptionText ? "<option>" + defaultOptionText + "</option>" : "";
    element.innerHTML = defaultOption + values.map(function(value){
            return "<option value=\"" + value.id + "\">" + getName(value) + "</option>";
        }).join("");
}

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

function addUserToRole(role, user){
    role.getUsers().add(user);
    return role.save().then(function(role){
        console.log("SAVED: ", role);
    }, function(error){
        console.error("ERROR: ", error);
    });
}

function getAdminRole(){
    if (adminRole)
        return Promise.resolve(adminRole);

    return (new Parse.Query(Role)).equalTo("name", "Admin").first().then(function(admin){
        adminRole = admin;
        return admin;
    });
}

function createUser(attributes, role){
    return getAllUsers().then(function(allUsers){
        var user = new User();
        return user.save({
            username: attributes.username || attributes.email,
            fullName: attributes.fullName,
            kinship: attributes.kinship,
            password: attributes.password,
            email: attributes.email,
            contact: {
                address: attributes.address,
                tel: attributes.tel,
                tel2: attributes.tel2
            }
        }).then(function(newUser){
            allUsers.push(newUser);

            if (role)
                return addUserToRole(role, newUser);
            else
                return newUser;
        }, function(error){
            console.error("Error saving user: ", error);
        });
    });
}

function initGlobal(){
    currentUserIsAdmin().then(function(isAdmin){
        if (isAdmin)
            document.body.classList.add("admin");
    });

    initGlobal = null;
}
