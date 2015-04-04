describe("Data Management", function(){
	var movieArchetype = {director:"", date:"", actors:[], roles: {lead:{name:"", age:""}, supporting:{name:"", age:""}, extra1:{name:"", age:""}}};

	beforeEach(function(){
		ArcheData.addArchetype("Movie", movieArchetype);	 
	});

    it("should have the state enum defined on ArcheData", function(){
    	expect(ArcheData.state.PRISTINE).toEqual(1);
    });

	it("should create instances from archetypes", function(){
		ArcheData.addObject("Movie", "GhostBusters");
		ArcheData.addObject("Movie", "Platoon");

		var gb = ArcheData.getObject("GhostBusters");
		var pt = ArcheData.getObject("Platoon");

		expect(typeof pt).toEqual("object");
		expect(typeof gb).toEqual("object");
		expect(gb.director).not.toBeNull();
	});

	it("should set and get values from instances", function(){
		ArcheData.addObject("Movie", "GhostBusters");
		var gb = ArcheData.getObject("GhostBusters");

		gb.director = "Ivan Reitman";
		gb.roles.lead.name = "Harold Ramis";
		expect(gb.director.value).toEqual("Ivan Reitman");
		expect(gb.roles.lead.name.value).toEqual("Harold Ramis");
		expect(gb.director.state).toEqual(ArcheData.state.PRISTINE);
	});

	it("should notify if a callback has been regisgtered", function(){
		ArcheData.addObject("Movie", "GhostBusters");
		var gb = ArcheData.getObject("GhostBusters");

		gb.director = "Ivan Reitman";	

		//Expect an abject with {name: , value:} format
		gb.director = function(changeObject){
			expect(changeObject.name).toEqual("director");
			expect(changeObject.value).toEqual("Oliver Stone");
			expect(changeObject.oldValue).toEqual("Ivan Reitman");

		}

		gb.director = "Oliver Stone";
	});
});