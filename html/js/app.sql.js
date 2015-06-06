var app = app || {};

/* SQL Queries */
app.sql = (function() {
	return {
		allLots : "SELECT * FROM bushwick_survey_joined",
		vacant : "SELECT * FROM bushwick_survey_joined WHERE entire_vacant='Yes'",
		not_vacant : "SELECT * FROM bushwick_survey_joined WHERE entire_vacant='No'",
		informal : "SELECT * FROM bushwick_survey_joined WHERE informal_occupation='Yes'",
		construction : "SELECT * FROM bushwick_survey_joined WHERE construction='Yes'",
		rehabs : "SELECT * FROM bushwick_survey_joined WHERE new_construction_or_building_rehab = 'Building Rehabilitation'",
		new_buildings : "SELECT * FROM bushwick_survey_joined WHERE new_construction_or_building_rehab = 'Completely New Construction'",
		commercial : "SELECT  * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'C%' AND zoning_pluto NOT ilike '%R%';",
		residential : "SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'R%';",
		mixed: "SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'R%';",
		industrial : "SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'M%';"
	};
})();