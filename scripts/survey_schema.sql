-- for cleaning up survey data to be human readable
-- to run: copy and paste this whole thing into the cartodb sql editor and then do 'apply query'

-- fix typo on my part
ALTER TABLE bushwick_survey_joined rename column cnc_ou_br to cnc_or_br;

update bushwick_survey_joined 
set contact_info = rent_or_sale 
where rent_or_sale ilike '%nook%' or rent_or_sale ilike '%commercial%'

-- Change codes into human readable values
UPDATE bushwick_survey_joined SET lot = 
    CASE WHEN lot = '1' THEN 'Abandoned'
        WHEN lot = '2' THEN 'In Use'
        WHEN lot = '3' THEN 'Other'
    END;

UPDATE bushwick_survey_joined SET building =
    CASE WHEN building = '1' THEN 'Commercial'
        WHEN building = '2' THEN 'Residential'
        WHEN building = '3' THEN 'Mixed'
        WHEN building = '4' THEN 'Industrial'
        WHEN building = '5' THEN 'other'
    END;

UPDATE bushwick_survey_joined SET entire_vacant =
    CASE WHEN entire_vacant = '1' THEN 'Yes'
        WHEN entire_vacant = '2' THEN 'No'
        ELSE FALSE
    END;

-- other numbers such as 7 and 9 so ignore
-- UPDATE bushwick_survey_joined SET num_floors = 
--     CASE WHEN num_floors = '5' THEN '>=5'
--         WHEN num_floors = '4' THEN '4'
--         WHEN num_floors = '3' THEN '3'
--         WHEN num_floors = '2' THEN '2'
--         WHEN num_floors = '1' THEN '1'
--     ELSE FALSE
--     END;

UPDATE bushwick_survey_joined SET sealed = 
    CASE WHEN sealed = '1' THEN 'Yes'
        WHEN sealed = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET sealedtype = 
    CASE WHEN sealedtype = '1' THEN 'Cinder blocks'
        WHEN sealedtype = '2&3' THEN 'Wood and Chains'
        WHEN sealedtype = '2' THEN 'Wood'
        WHEN sealedtype = '3' THEN 'Chains'
        WHEN sealedtype = '4' THEN 'Cement'
        WHEN sealedtype = '5' THEN 'Other'
    END;

UPDATE bushwick_survey_joined SET possible_vacant = 
    CASE WHEN possible_vacant = '1' THEN 'Yes'
        WHEN possible_vacant = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET damage_ = 
    CASE WHEN damage_ = '1' THEN 'Roof'
        WHEN damage_ = '2' THEN 'Facade'
        WHEN damage_ = '3' THEN 'Other'
        WHEN damage_ = 'no stairs to front door' THEN 'no stairs to front door'
    END;

UPDATE bushwick_survey_joined SET construction =
    CASE WHEN construction = '1' THEN 'Yes'
        WHEN construction = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET occupation =
    CASE WHEN occupation = '1' THEN 'Yes'
        WHEN occupation = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET park_use =
    CASE WHEN park_use = '1' THEN 'Yes'
        WHEN park_use = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET cnc_or_br =
    CASE WHEN cnc_or_br = '1' THEN 'Completely New Construction'
        WHEN cnc_or_br = '2' THEN 'Building Rehabilitation'
    END;

-- UPDATE bushwick_survey_joined SET num_floors_nc =
--     CASE WHEN num_floors_nc = '5' THEN '>=5'
--         WHEN num_floors_nc = '4' THEN '4'
--         WHEN num_floors_nc = '3' THEN '3'
--         WHEN num_floors_nc = '2' THEN '2'
--         WHEN num_floors_nc = '1' THEN '1'    
--     END;

-- UPDATE bushwick_survey_joined SET num_floors_ic =
--     CASE WHEN num_floors_ic = '3' THEN '>=3'
--         WHEN num_floors_ic = '2' THEN '2'
--         WHEN num_floors_ic = '1' THEN '1'      
--     END;

UPDATE bushwick_survey_joined SET rent_or_sale_ic =
    CASE WHEN rent_or_sale_ic = '1' THEN 'Yes'
        WHEN rent_or_sale_ic = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET rent_or_sale =
    CASE WHEN rent_or_sale = '1' THEN 'Yes'
        WHEN rent_or_sale = '2' THEN 'No'
    END;

UPDATE bushwick_survey_joined SET landuse_pluto = 
    CASE WHEN landuse_pluto = '01' THEN 'One and Two Family Buildings'
         WHEN landuse_pluto = '02' THEN 'Multi-Family Walkup'
         WHEN landuse_pluto = '03' THEN 'Multi-Family with Elevator'
         WHEN landuse_pluto = '04' THEN 'Mixed Residential & Commerical'
         WHEN landuse_pluto = '05' THEN 'Commerical & Office'
         WHEN landuse_pluto = '06' THEN 'Industrial & Manufacturing'
         WHEN landuse_pluto = '07' THEN 'Transport & utility'
         WHEN landuse_pluto = '08' THEN 'Public Facilities & Insitutions'
         WHEN landuse_pluto = '09' THEN 'Open Space & Recreation'
         WHEN landuse_pluto = '10' THEN 'Parking Facilities'
         WHEN landuse_pluto = '11' THEN 'Vacant Land'
         WHEN landuse_pluto IS NULL THEN 'N/A'
    END;

-- rename columns to be more semantic
ALTER TABLE bushwick_survey_joined RENAME COLUMN occupation to informal_occupation;
ALTER TABLE bushwick_survey_joined rename column floors_pluto to num_floors_pluto;
ALTER TABLE bushwick_survey_joined rename column cnc_or_br to new_construction_or_building_rehab;
alter table bushwick_survey_joined rename column lot to lot_use_observed;
alter table bushwick_survey_joined add column contact_info_listed text;
alter table bushwick_survey_joined rename column address to address_survey;

-- concatenate 3 contact info columns to one
update bushwick_survey_joined set contact_info_listed =
    case when (contact_info, contact_info_ic, contact_info_nc) is null then null
    else concat(contact_info, contact_info_ic, contact_info_nc)
END;
