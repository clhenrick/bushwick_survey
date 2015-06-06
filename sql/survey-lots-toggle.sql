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

-- create zoning style column
ALTER TABLE bushwick_survey_joined ADD COLUMN zoning_style TEXT;

-- set zoning_style to 'R' for residential 
UPDATE bushwick_survey_joined SET zoning_style = 'R' WHERE zoning_pluto ilike 'R%' ;

-- set zoning_style to 'C' for commericial
UPDATE bushwick_survey_joined SET zoning_style = 'C' WHERE zoning_pluto ilike 'C%' and zoning_pluto not ilike '%R%';

-- set zoning_style to 'RC' for residential & commericial
UPDATE bushwick_survey_joined SET zoning_style = 'RC' WHERE zoning_pluto ilike 'C%R%';

-- set zoning_style to 'M' for manufacturing
UPDATE bushwick_survey_joined SET zoning_style = 'M' WHERE zoning_pluto ilike 'M%';

-- set zoning_style to 'P' for parkland
UPDATE bushwick_survey_joined SET zoning_style = 'P' WHERE zoning_pluto ilike 'P%';

-- set zoning_style to 'null' for NULL values
UPDATE bushwick_survey_joined SET zoning_style = 'null' WHERE zoning_pluto = '';
