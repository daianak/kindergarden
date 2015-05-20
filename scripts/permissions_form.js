(function(){
	var Role = Parse.Object.extend("_Role"),
		User = Parse.Object.extend("_User"),
		permissionsData;

	var elements = {
		username: document.querySelector("#username"),
		fullname: document.querySelector("#fullname"),
		email: document.querySelector("#email"),
		tel: document.querySelector("#tel"),
		permissionsOption: document.querySelector("#permissionsOption")
	};

	var permissionsFormElement = document.querySelector("#permissions-form");

	var permissionsTbody = document.querySelector("#permissions"),
		permissionsTemplate = Handlebars.compile(document.querySelector("#permissions-template").innerHTML);

	window.addPermissions = function(){
		var permissionsAttributes = getFormValues();


		var permissions = new permissions();
		permissions.save(permissionsAttributes).then(function(permissionsObj){
			permissionsData.push(permissionsObj);
			renderPermissions();
		}, function(error){
			console.error("Can't add permissions: ", error.message);
		});
	};

	getAllPermissions();
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

	function getAllPermissions(){
		var query = new Parse.Query(Role);
		query.find().then(function(data){
			permissionsData = data;
			renderPermissions();
		});
	}

	function getAllUsers(){
		var query = new Parse.Query(User);
		return query.find().then(function(data){
			console.log("users: ", data);
		});
	}

	function renderPermissions(){
		permissionsTbody.innerHTML = permissionsTemplate({ permissions: permissionsData });
	}

	window.toggleForm = function() {
		permissionsFormElement.classList.toggle("hidden");
		if (!permissionsFormElement.classList.contains("hidden"))
			document.querySelector("#username").focus();
	};
})();