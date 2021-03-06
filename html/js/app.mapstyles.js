/**** CartoCSS for styling tax lot data ****/
var app = app || {};

app.mapStyles = (function(){
  return {
    // default style, all lots are the same color
    regular : '#bushwick_survey_joined {' +
                                  'polygon-fill: hsl(200,40%,90%);' +
                                  'polygon-opacity: 0.75;' +
                                  'line-color: #000;' +
                                  'line-width: 0.2;' +
                                  'line-opacity: 0.5;' +
                                '}',
    // red highlight                            
    red : '#bushwick_survey_joined {' +
                                  'polygon-fill: hsl(0,100%,30%);' +
                                  'polygon-opacity: 0.75;' +
                                  'line-color: #000;' +
                                  'line-width: 0.2;' +
                                  'line-opacity: 0.5;' +
                                '}',

    // category style based on zoning
    zoning : "#bushwick_survey_joined {" +
                                     "polygon-opacity: 0.75;" +
                                     "line-color: #000;" +
                                     "line-width: 1;" +
                                     "line-opacity: 0.3;" +
                                  "}" +                                
                                  '#bushwick_survey_joined[zoning_style="R"] { polygon-fill: #A6CEE3;}' +
                                  '#bushwick_survey_joined[zoning_style="RC"] {polygon-fill: #1F78B4;}' +
                                  '#bushwick_survey_joined[zoning_style="M"] {polygon-fill: #FFCC00;}' +
                                  '#bushwick_survey_joined[zoning_style="C"] {polygon-fill: #7B00B4;}' +
                                  '#bushwick_survey_joined[zoning_style="P"] {polygon-fill: #229A00;}' +
                                  '#bushwick_survey_joined[zoning_style=""] {polygon-fill: #6b6868;}',

    // choropleth style based on Built FAR                                
    builtFAR : "#bushwick_survey_joined {" +
                               "polygon-fill: #F1EEF6;" +
                               "polygon-opacity: 0.8;" +
                               "line-color: #000;" +
                               "line-width: 0.2;" +
                               "line-opacity: 0.5;" +
                            "}" +                           
                            '#bushwick_survey_joined[builtfar <= 23.05] { polygon-fill: #91003F;}' +
                            '#bushwick_survey_joined[builtfar <= 8.59] {polygon-fill: #CE1256;}' +
                            '#bushwick_survey_joined[builtfar <= 3.95] {polygon-fill: #E7298A;}' +
                            '#bushwick_survey_joined[builtfar <= 3.53] {polygon-fill: #DF65B0;}' +
                            '#bushwick_survey_joined[builtfar <= 2.7] {polygon-fill: #C994C7;}' +
                            '#bushwick_survey_joined[builtfar <= 1.57] {polygon-fill: #D4B9DA;}'+  
                            '#bushwick_survey_joined[builtfar <= 1.55]{polygon-fill: #F1EEF6;}',

    // choropleth style based on Residential FAR
    residFAR :  "#bushwick_survey_joined {" +
                               "polygon-fill: #FFFFB2;" +
                               "polygon-opacity: 0.8;" +
                               "line-color: #000;" +
                               "line-width: 0.2;" +
                               "line-opacity: 0.5;" +
                            "}" +                           
                            '#bushwick_survey_joined[ residfar <= 3.44] { polygon-fill: #BD0026;}' +
                            '#bushwick_survey_joined[ residfar <= 2.43] {polygon-fill: #F03B20;}' +
                            '#bushwick_survey_joined[ residfar <= 0.9] {polygon-fill: #FD8D3C;}' +
                            '#bushwick_survey_joined[ residfar <= 0.9] {polygon-fill: #FECC5C;}' +
                            '#bushwick_survey_joined[ residfar <= 0.6] {polygon-fill: #FFFFB2;}',                             
    // choropleth style for available FAR
    availFAR : "#bushwick_survey_joined{" +
                      "polygon-fill: #FFFFB2;" +
                      "polygon-opacity: 0.8;" +
                      "line-color: #000;" +
                      "line-width: 0.2;" +
                      "line-opacity: 0.5;" +
                      "}" +
                      "#bushwick_survey_joined [ availablefar <= 4] {" +
                      "polygon-fill: #BD0026;" +
                      "}" +
                      "#bushwick_survey_joined [ availablefar <= 3.2] {" +
                      "polygon-fill: #F03B20;" +
                      "}" +
                      "#bushwick_survey_joined [ availablefar <= 2.4000000000000004] {" +
                      "polygon-fill: #FD8D3C;" +
                      "}" +
                      "#bushwick_survey_joined [ availablefar <= 1.6] {" +
                      "polygon-fill: #FECC5C;" +
                      "}" +
                      "#bushwick_survey_joined [ availablefar <= 0.8] {" +
                      "polygon-fill: #FFFFB2;" +
                      "}",

    landuse : "#bushwick_survey_joined {" +
                       "polygon-opacity: 0.7;" +
                       "line-color: #000000;"+
                       "line-width: 0.2;"+
                       "line-opacity: 0.5;"+
                    "}"+
                    
                    '#bushwick_survey_joined[lu_descript="Multi-Family Walkup"] {'+
                       'polygon-fill: #A6CEE3;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="One and Two Family Buildings"] {'+
                       'polygon-fill: #1F78B4;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Mixed Residential & Commerical"] {'+
                       'polygon-fill: #B2DF8A;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Parking Facilities"] {'+
                       'polygon-fill: #33A02C;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Vacant Land"] {'+
                       'polygon-fill: #FB9A99;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Commerical & Office"] {'+
                       'polygon-fill: #E31A1C;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Industrial & Manufacturing"] {'+
                       'polygon-fill: #FDBF6F;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Public Facilities & Insitutions"] {'+
                       'polygon-fill: #FF7F00;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="N/A"] {'+
                       'polygon-fill: #CAB2D6;'+
                    '}'+
                    '#bushwick_survey_joined[lu_descript="Open Space & Recreation"] {'+
                       'polygon-fill: #6A3D9A;'+
                    '}'+
                    '#bushwick_survey_joined {'+
                       'polygon-fill: #DDDDDD;'+
                    "}",
    
    // yearbuilt choropleth style;                  
    yearbuilt : "@yearbuilt1: #feebe2;"+
                    "@yearbuilt2: #fcc5c0;"+
                    "@yearbuilt3: #fa9fb5;"+
                    "@yearbuilt4: #f768a1;"+
                    "@yearbuilt5: #dd3497;"+
                    "@yearbuilt6: #ae017e;"+
                    "@yearbuilt7: #7a0177;"+
                    "@white:  #FFF;"+
                    "@polyopacity:  0.8;"+
                    "@linewidth:  0.2;"+
                    "@lineopacity:  1;"+

                    "#bushwick_survey_joined{"+
                      "polygon-fill: @white;"+
                      "polygon-opacity: @polyopacity;"+
                      "line-color: @white;"+
                      "line-width: @linewidth;"+
                      "line-opacity: @lineopacity;"+
                    "}"+

                    "#bushwick_survey_joined [ yearbuilt <= 2014] {"+
                       "polygon-fill: @yearbuilt7;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 2004] {"+
                       "polygon-fill: @yearbuilt6;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 2000] {"+
                       "polygon-fill: @yearbuilt5;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 1990] {"+
                       "polygon-fill: @yearbuilt4;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 1973] {"+
                       "polygon-fill: @yearbuilt3;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 1933] {"+
                       "polygon-fill: @yearbuilt2;"+
                    "}"+
                    "#bushwick_survey_joined [ yearbuilt <= 1900] {"+
                       "polygon-fill: @yearbuilt1;"+
                    "}" +
                    "#bushwick_survey_joined [ yearbuilt = 0] {"+
                       "polygon-opacity: 0;"+
                    "}"                                                                               
  };
})();