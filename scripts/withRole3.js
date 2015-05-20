(function(){
	var Position = Parse.Object.extend("Position"),
		positionsData;

	var elements = {
		firstname: document.querySelector("#firstname"),
		lastname: document.querySelector("#lastname"),
		role: document.querySelector("#role"),
		tel: document.querySelector("#tel"),
		email: document.querySelector("#email"),
		daysOfWork: document.querySelector("#daysOfWork")
	};

	var positionsTbody = document.querySelector("#positions"),
		positionTemplate = Handlebars.compile(document.querySelector("#position-template").innerHTML);

	window.addPosition = function(){
		var positionAttributes = getFormValues();


		var position = new Position();
		position.save(positionAttributes).then(function(positionObj){
			positionsData.push(positionObj);
			renderPositions();
		}, function(error){
			console.error("Can't save position: ", error.message);
		});
	};

	getAllPositions();

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

	function getAllPositions(){
		var query = new Parse.Query(Position);
		query.find().then(function(data){
			positionsData = data;
			renderPositions();
		});
	}

	function renderPositions(){
		positionsTbody.innerHTML = positionTemplate({ positions: positionsData });
	}
})();