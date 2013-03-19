goog.provide('game_of_life_debug');
goog.require('cljs.core');
goog.require('webconsole');
goog.require('ldnclj_dojo_team_5_game_of_life.view');
game_of_life_debug._STAR_view_STAR_ = ldnclj_dojo_team_5_game_of_life.view;
game_of_life_debug._STAR_model_STAR_ = ldnclj_dojo_team_5_game_of_life.model;
game_of_life_debug.init = (function init(){
webconsole.console.call(null,"#console");
return $('#console').dialog({minWidth: 500, minHeight: 400, width: 700, right: 50});;
});
