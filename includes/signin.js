(function(){
	var elements = {
		username: document.querySelector("#username"),
		password: document.querySelector("#password"),
		email: document.querySelector("#email")
	};

	setCurrentUser();

	window.signUp = function(){
		var formValues = getFormValues();

		var user = new Parse.User(formValues);

		user.signUp(null, {
			success: function(user) {
				window.location.href = "index.html";
			},
			error: function(user, error) {
				console.error("Can't create user: ,", error);
			}
		});
	};

	window.signIn = function(){
		var formValues = getFormValues();
		Parse.User.logIn(formValues.username, formValues.password).then(function(user){
			window.location.href = "index.html";
		}, function(error){
			alert("לא יכול להכנס: " +error.message);
		});
	};

	function getFormValues(){
		var values = {},
			element;

		for(var elementName in elements){
			element = elements[elementName];
			if (element)
				values[elementName] = element.value;
		}

		return values;
	}

	window.logout= function(){
		Parse.User.logOut().then(function(){
            window.location.href = "signin.html";
        })
	};

	function setCurrentUser(){
		var currentUser = Parse.User.current(),
			logoutElement = document.querySelector("#logout");

			if (!currentUser){
				logoutElement && (logoutElement.style.display = "none");
				document.querySelector("#logo").style.display = "none";
			}

			else {
				if (!window.location.href.match('signin.html')) {
					if (!window.location.href.match('signup.html')) {
						if (currentUser)
							logoutElement.innerText = "התנתק " + (currentUser.attributes.fullName || currentUser.attributes.username);
						else
							logoutElement.style.display = "none";
					}
				}
			}
		}
})();