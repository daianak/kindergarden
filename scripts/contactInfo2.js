(function(){
	var contactsData,
        roles,
        kinships;

	var contactsTemplate;

	window.addContact = function(){
		var contactAttributes = getFormValues();

        var roleId = elements.roles.querySelector(":checked").value,
            role = roles.index[roleId];

        var kinshipId = elements.kinship.querySelector(":checked").value,
            kinship = kinships.index[kinshipId];

        contactAttributes.kinship = kinship;

        try {
            createUser(contactAttributes, role).then(function (newUser) {
                renderContacts();
                toggleForm();
            }, function (error) {
                console.error("Can't save contact: ", error.message);
            });
        }
        catch(e){
            alert("Can't save user.");
            console.error("Can't save user: ", e);
        }

        return false;
	};

	init();

	function init() {
		initElements();

		contactsTemplate = Handlebars.compile(elements.contactsTemplate.innerHTML);
		renderContacts();
        getAllRoles().then(function(allRoles){
            roles = allRoles;
            setValuesToSelect(elements.roles, allRoles.roles, function(role){
                return role.attributes.child ? role.attributes.child.attributes.name : role.attributes.name;
            }, "בחר ילד");
        });

        getAllKinship().then(function(allKinship){
            kinships = allKinship;
            setValuesToSelect(elements.kinship, kinships.list, function(value){
                return value.attributes.name;
            });
        });
	}

	function renderContacts() {
        getAllUsers().then(function(users){
            elements.contacts.innerHTML = contactsTemplate({contacts: users});
        });
	}

	window.toggleForm = function() {
		elements.contactForm.classList.toggle("hidden");
		if (!elements.contactForm.classList.contains("hidden"))
			document.querySelector("#fullname").focus();
	};

})();



