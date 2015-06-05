-- - Land Use
-- select all commercial
SELECT  * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'C%' AND zoning_pluto NOT ilike '%R%';
-- select all residential
SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'R%';
-- select all mixed use
SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'R%';
-- select all industrial
SELECT * FROM bushwick_survey_joined WHERE zoning_pluto ilike 'M%';

--- Vacant
--  select all vacant
SELECT * FROM bushwick_survey_joined WHERE entire_vacant='Yes'
-- select all not vacant
SELECT * FROM bushwick_survey_joined WHERE entire_vacant='No'
-- informal occupation
SELECT * FROM bushwick_survey_joined WHERE informal_occupation = 'Yes'


--- Construction
-- construction = 'yes'
SELECT * FROM bushwick_survey_joined WHERE construction = 'Yes'
-- building rehabs
SELECT * FROM bushwick_survey_joined WHERE new_construction_or_building_rehab = 'Building Rehabilitation'
-- new buildings
SELECT * FROM bushwick_survey_joined WHERE new_construction_or_building_rehab = 'Completely New Construction'

