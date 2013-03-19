goog.provide('ldnclj_dojo_team_5_game_of_life.view');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.dom');
goog.require('ldnclj_dojo_team_5_game_of_life.log');
goog.require('ldnclj_dojo_team_5_game_of_life.model');
ldnclj_dojo_team_5_game_of_life.view.by_id = (function by_id(id){
return goog.dom.getElement(id);
});
/**
* adds a live CSS class attr to live cells, cells are <TD> elements in an HTML table with id of <x>-<y>
*/
ldnclj_dojo_team_5_game_of_life.view.set_cell_state = (function set_cell_state(x,y,state){
ldnclj_dojo_team_5_game_of_life.log.debug.call(null,x,",",y,"=",state);
var temp__3971__auto__ = ldnclj_dojo_team_5_game_of_life.view.by_id.call(null,[cljs.core.str(x),cljs.core.str("-"),cljs.core.str(y)].join(''));
if(cljs.core.truth_(temp__3971__auto__))
{var e = temp__3971__auto__;
if(cljs.core.truth_(state))
{return e.setAttribute("class","alive");
} else
{return e.removeAttribute("class");
}
} else
{return null;
}
});
/**
* callback that is called when the grid state changes, processes the grid sequence and updates the corresponding cells in an HTML table
*/
ldnclj_dojo_team_5_game_of_life.view.update_view = (function update_view(grid){
ldnclj_dojo_team_5_game_of_life.log.info.call(null,"update-view:",cljs.core.count.call(null,grid));
cljs.core.doall.call(null,cljs.core.map_indexed.call(null,(function (p1__4946_SHARP_,p2__4947_SHARP_){
var x = (p1__4946_SHARP_ % ldnclj_dojo_team_5_game_of_life.model.WIDTH);
var y = Math.floor.call(null,(p1__4946_SHARP_ / ldnclj_dojo_team_5_game_of_life.model.WIDTH));
return ldnclj_dojo_team_5_game_of_life.view.set_cell_state.call(null,x,y,p2__4947_SHARP_);
}),grid));
return ldnclj_dojo_team_5_game_of_life.log.info.call(null,"update-view-end");
});
/**
* Build an HTML table to act as our grid: TODO hiccup like library for the client side (moustauche does this?)
*/
ldnclj_dojo_team_5_game_of_life.view.create_table = (function create_table(){
return ldnclj_dojo_team_5_game_of_life.view.by_id.call(null,"game-of-life-content").innerHTML = cljs.core.apply.call(null,cljs.core.str,cljs.core.flatten.call(null,cljs.core.PersistentVector.fromArray(["<table id='game-of-life'>",(function (){var iter__2115__auto__ = (function iter__4954(s__4955){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4955__$1 = s__4955;
while(true){
if(cljs.core.seq.call(null,s__4955__$1))
{var y = cljs.core.first.call(null,s__4955__$1);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray(["<tr>",(function (){var iter__2115__auto__ = ((function (y){
return (function iter__4958(s__4959){
return (new cljs.core.LazySeq(null,false,((function (y){
return (function (){
var s__4959__$1 = s__4959;
while(true){
if(cljs.core.seq.call(null,s__4959__$1))
{var x = cljs.core.first.call(null,s__4959__$1);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([[cljs.core.str("<td id='"),cljs.core.str([cljs.core.str(x),cljs.core.str("-"),cljs.core.str(y)].join('')),cljs.core.str("'>")].join('')], true),iter__4958.call(null,cljs.core.rest.call(null,s__4959__$1)));
} else
{return null;
}
break;
}
});})(y))
,null));
});})(y))
;
return iter__2115__auto__.call(null,cljs.core.range.call(null,ldnclj_dojo_team_5_game_of_life.model.WIDTH));
})(),"</tr>"], true),iter__4954.call(null,cljs.core.rest.call(null,s__4955__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2115__auto__.call(null,cljs.core.range.call(null,ldnclj_dojo_team_5_game_of_life.model.HEIGHT));
})(),"</table>"], true)));
});
ldnclj_dojo_team_5_game_of_life.view.initialise = (function initialise(){
ldnclj_dojo_team_5_game_of_life.view.create_table.call(null);
ldnclj_dojo_team_5_game_of_life.model.toggle_run.call(null);
return ldnclj_dojo_team_5_game_of_life.model.add_listener.call(null,ldnclj_dojo_team_5_game_of_life.view.update_view);
});
goog.exportSymbol('ldnclj_dojo_team_5_game_of_life.view.initialise', ldnclj_dojo_team_5_game_of_life.view.initialise);
window.onload = ldnclj_dojo_team_5_game_of_life.view.initialise;

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(cljs.core.hash_map("\uFDD0'doc","UI concerns, displays the grid and listens for changes in the model, updating when it sees them"),"ldnclj-dojo-team-5-game-of-life.view"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__4960__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__4960 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4960__delegate.call(this, m);
};
G__4960.cljs$lang$maxFixedArity = 0;
G__4960.cljs$lang$applyTo = (function (arglist__4961){
var m = cljs.core.seq(arglist__4961);;
return G__4960__delegate(m);
});
G__4960.cljs$lang$arity$variadic = G__4960__delegate;
return G__4960;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"initialise")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view/initialise")),"\uFDD0'export",true,"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",41,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/view.cljs"),(new cljs.core.Symbol(null,"create-table")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view/create-table")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Build an HTML table to act as our grid: TODO hiccup like library for the client side (moustauche does this?)","\uFDD0'line",30,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/view.cljs"),(new cljs.core.Symbol(null,"update-view")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"grid"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"grid")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view/update-view")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","callback that is called when the grid state changes, processes the grid sequence and updates the corresponding cells in an HTML table","\uFDD0'line",20,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/view.cljs"),(new cljs.core.Symbol(null,"set-cell-state")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x")),(new cljs.core.Symbol(null,"y")),(new cljs.core.Symbol(null,"state"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"y")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"state")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view/set-cell-state")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","adds a live CSS class attr to live cells, cells are <TD> elements in an HTML table with id of <x>-<y>","\uFDD0'line",11,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/view.cljs"),(new cljs.core.Symbol(null,"by-id")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"id"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"id")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view/by-id")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",8,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/view.cljs")),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"events")),(new cljs.core.Symbol(null,"goog.events")),(new cljs.core.Symbol(null,"dom")),(new cljs.core.Symbol(null,"goog.dom")),(new cljs.core.Symbol(null,"log")),(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log")),(new cljs.core.Symbol(null,"model")),(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.view"))),old);
}));
