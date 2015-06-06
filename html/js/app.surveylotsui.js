var app = app || {};

app.surveryLotsUI = (function(w,d,$) {
  var styles, sql, el;

  function initGlobals() {
    // grab cartocss
    styles = app.mapStyles;
    // grab sql
    sql = app.sql;
    // grab global variables
    el = app.main.el;

    console.log(
        'app.surveryLotsUI.el: ', el, '\n',
        'app.sql: ', app.sql, '\n',
        'app.mapStyles: ', app.mapStyles
        );     
  } 
  

  function initButtonLogic() {
    // change the cartoCSS of a layer
    function changeCartoCSS(css) {
      el.surveyLots.setCartoCSS(css);
    };

    // change SQL query of a layer
    function changeSQL(sql) {      
      el.surveyLots.setSQL(sql);
    } 

    el.surveyLotActions = {
        allLots : function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.allLots);
          return true;
        },

        allCommercial : function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.commercial);
          return true;
        },

        allResidential : function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.residential);
          return true;
        },

        allMixedUse : function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.mixed);
          return true;
        },

        allIndustrial: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.industrial);
          return true;
        },

        allVacant: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.vacant);
          return true;
        },

        allNotVacant: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.not_vacant);
          return true;
        },

        allInformalOcc: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.informal);
          return true;
        },

        allConstruction: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.construction);
          return true;
        },

        allRehab: function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.rehabs);
          return true;
        },

        allNewBuildings : function() {
          changeCartoCSS(styles.zoning);
          changeSQL(sql.new_buildings);
          return true;
        }
    };
  }

  // add tax lot layer button event listeners
  function initButtons() {
    $('.button').click(function(e) {
      e.preventDefault(); 
      $('.button').removeClass('selected');
      $(this).addClass('selected');
      el.surveyLotActions[$(this).attr('id')]();
      el.surveyLots.show();
    }); 
  }

  function init() {
    initGlobals();
    initButtonLogic();
    initButtons();
  }

  return {
    init : init
  };

})(window, document, jQuery);
