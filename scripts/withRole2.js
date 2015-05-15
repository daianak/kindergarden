(function(){
	var Role = Parse.Object.extend("Role"),
		rolesData;

	var elements = {
		firstname: document.querySelector("#firstname"),
		lastname: document.querySelector("#lastname"),
		role: document.querySelector("#role"),
		tel: document.querySelector("#tel"),
		email: document.querySelector("#email"),
		daysOfWork: document.querySelector("#daysOfWork[]")
	};
	
	var rolesTbody = document.querySelector("#roles tbody"),
		roleTemplate = Handlebars.compile(document.querySelector("#role-template").innerHTML);

	window.addRole = function(){
		var roleAttributes = getFormValues();


		var role = new Role();
		role.save(roleAttributes).then(function(roleObj){
			rolesData.push(roleObj);
			renderRoles();
		}, function(error){
			console.error("Can't save role: ", error.message);
		});
	};

	getAllRoles();

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

	function getAllRoles(){
		var query = new Parse.Query(Role);
		query.find().then(function(data){
			rolesData = data;
			renderRoles();
		});
	}

	function renderRoles(){
		rolesTbody.innerHTML = roleTemplate({ roles: rolesData });
	}
})();