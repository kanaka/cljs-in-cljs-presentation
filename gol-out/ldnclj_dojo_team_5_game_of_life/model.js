goog.provide('ldnclj_dojo_team_5_game_of_life.model');
goog.require('cljs.core');
goog.require('ldnclj_dojo_team_5_game_of_life.log');
goog.require('goog.events');
goog.require('goog.Timer');
ldnclj_dojo_team_5_game_of_life.model.WIDTH = 40;
ldnclj_dojo_team_5_game_of_life.model.HEIGHT = 30;
ldnclj_dojo_team_5_game_of_life.model.INDICES = cljs.core.partition.call(null,ldnclj_dojo_team_5_game_of_life.model.WIDTH,cljs.core.range.call(null,(ldnclj_dojo_team_5_game_of_life.model.WIDTH * ldnclj_dojo_team_5_game_of_life.model.HEIGHT)));
ldnclj_dojo_team_5_game_of_life.model._STAR_print_fn_STAR_ = ldnclj_dojo_team_5_game_of_life.log.info;
/**
* Generate some random data to seed the
*/
ldnclj_dojo_team_5_game_of_life.model.fill_random = (function fill_random(){
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (_){
if((0.6 < cljs.core.rand.call(null,1)))
{return "\uFDD0'alive";
} else
{return null;
}
}),cljs.core.range.call(null,(ldnclj_dojo_team_5_game_of_life.model.WIDTH * ldnclj_dojo_team_5_game_of_life.model.HEIGHT))));
});
ldnclj_dojo_team_5_game_of_life.model._STAR_grid_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
ldnclj_dojo_team_5_game_of_life.model.adjacent_indices_internal = (function adjacent_indices_internal(i){
var x = (i % ldnclj_dojo_team_5_game_of_life.model.WIDTH);
var y = Math.floor.call(null,(i / ldnclj_dojo_team_5_game_of_life.model.WIDTH));
var n = (y - 1);
var e = ((ldnclj_dojo_team_5_game_of_life.model.WIDTH - x) - 2);
var s = ((ldnclj_dojo_team_5_game_of_life.model.HEIGHT - y) - 2);
var w = (x - 1);
return cljs.core.vec.call(null,cljs.core.remove.call(null,(function (p1__4962_SHARP_){
return cljs.core._EQ_.call(null,p1__4962_SHARP_,i);
}),cljs.core.mapcat.call(null,(function (p1__4963_SHARP_){
return cljs.core.drop_last.call(null,e,cljs.core.drop.call(null,w,p1__4963_SHARP_));
}),cljs.core.drop_last.call(null,s,cljs.core.drop.call(null,n,ldnclj_dojo_team_5_game_of_life.model.INDICES)))));
});
ldnclj_dojo_team_5_game_of_life.model.adjacent_indices = cljs.core.memoize.call(null,ldnclj_dojo_team_5_game_of_life.model.adjacent_indices_internal);
ldnclj_dojo_team_5_game_of_life.model.adjacent_indices1 = (function adjacent_indices1(i){
return cljs.core.filter.call(null,(function (p1__4964_SHARP_){
return (p1__4964_SHARP_ >= 0);
}),cljs.core.juxt.call(null,(function (p1__4965_SHARP_){
return (p1__4965_SHARP_ - (ldnclj_dojo_team_5_game_of_life.model.WIDTH + 1));
}),(function (p1__4966_SHARP_){
return (p1__4966_SHARP_ - ldnclj_dojo_team_5_game_of_life.model.WIDTH);
}),(function (p1__4967_SHARP_){
return (p1__4967_SHARP_ - (ldnclj_dojo_team_5_game_of_life.model.WIDTH - 1));
}),cljs.core.dec,cljs.core.inc,(function (p1__4968_SHARP_){
return (p1__4968_SHARP_ + (ldnclj_dojo_team_5_game_of_life.model.WIDTH - 1));
}),(function (p1__4969_SHARP_){
return (p1__4969_SHARP_ + ldnclj_dojo_team_5_game_of_life.model.WIDTH);
}),(function (p1__4970_SHARP_){
return (p1__4970_SHARP_ + (ldnclj_dojo_team_5_game_of_life.model.WIDTH + 1));
})).call(null,i));
});
ldnclj_dojo_team_5_game_of_life.model.adjacent_indices2 = (function adjacent_indices2(i){
var x = (i % ldnclj_dojo_team_5_game_of_life.model.HEIGHT);
var y = Math.floor.call(null,(i / ldnclj_dojo_team_5_game_of_life.model.HEIGHT));
var n = (y - 1);
var e = ((ldnclj_dojo_team_5_game_of_life.model.HEIGHT - x) - 2);
var s = ((ldnclj_dojo_team_5_game_of_life.model.WIDTH - y) - 2);
var w = (x - 1);
return cljs.core.remove.call(null,(function (p1__4971_SHARP_){
return cljs.core._EQ_.call(null,p1__4971_SHARP_,i);
}),cljs.core.apply.call(null,cljs.core.concat,cljs.core.drop.call(null,e,cljs.core.drop.call(null,w,cljs.core.apply.call(null,cljs.core.map,cljs.core.vector,cljs.core.drop_last.call(null,s,cljs.core.drop.call(null,n,ldnclj_dojo_team_5_game_of_life.model.INDICES)))))));
});
/**
* Main logic routine. Applies the rules of Conway's game of life.
* 
* 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
* 2. Any live cell with two or three live neighbours lives on to the next generation.
* 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
* 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
* cl
* See http://en.wikipedia.org/wiki/Conway's_Game_of_Life for full details
*/
ldnclj_dojo_team_5_game_of_life.model.next_gen_state = (function next_gen_state(grid,index,alive_QMARK_){
var n = cljs.core.count.call(null,cljs.core.keep.call(null,grid,ldnclj_dojo_team_5_game_of_life.model.adjacent_indices.call(null,index)));
if((function (){var or__3824__auto__ = (n > 3);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (n < 2);
}
})())
{return null;
} else
{if(cljs.core._EQ_.call(null,n,3))
{return "\uFDD0'alive";
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.core._EQ_.call(null,n,2);
if(and__3822__auto__)
{return alive_QMARK_;
} else
{return and__3822__auto__;
}
})()))
{return "\uFDD0'alive";
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
}
});
/**
* Applies the main logic of next-gen-state to each cell in the grid
*/
ldnclj_dojo_team_5_game_of_life.model.update_model = (function update_model(){
ldnclj_dojo_team_5_game_of_life.log.info.call(null,"update-model");
cljs.core.swap_BANG_.call(null,ldnclj_dojo_team_5_game_of_life.model._STAR_grid_STAR_,(function (p1__4972_SHARP_){
return cljs.core.vec.call(null,cljs.core.map_indexed.call(null,cljs.core.partial.call(null,ldnclj_dojo_team_5_game_of_life.model.next_gen_state,p1__4972_SHARP_),p1__4972_SHARP_));
}));
return ldnclj_dojo_team_5_game_of_life.log.debug.call(null,"update-model-end");
});
/**
* Allows interested view to register interest in model changes. TODO: only supports a single listener, should maintain a list.
*/
ldnclj_dojo_team_5_game_of_life.model.add_listener = (function add_listener(f){
return cljs.core.add_watch.call(null,ldnclj_dojo_team_5_game_of_life.model._STAR_grid_STAR_,null,(function (k,r,o,n){
return f.call(null,n);
}));
});
ldnclj_dojo_team_5_game_of_life.model.start_timer = (function start_timer(){
var timer = (new goog.Timer(1000));
ldnclj_dojo_team_5_game_of_life.model.update_model.call(null);
timer.start();
return goog.events.listen(timer,goog.Timer.TICK,ldnclj_dojo_team_5_game_of_life.model.update_model);
});
/**
* Start the timer. TODO: Expose this up to UI and make it a genuine toggle to start/stop reproduction.
*/
ldnclj_dojo_team_5_game_of_life.model.toggle_run = (function toggle_run(){
cljs.core.swap_BANG_.call(null,ldnclj_dojo_team_5_game_of_life.model._STAR_grid_STAR_,(function (_){
return ldnclj_dojo_team_5_game_of_life.model.fill_random.call(null);
}));
var iter__2115__auto___4977 = (function iter__4975(s__4976){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4976__$1 = s__4976;
while(true){
if(cljs.core.seq.call(null,s__4976__$1))
{var n = cljs.core.first.call(null,s__4976__$1);
return cljs.core.cons.call(null,ldnclj_dojo_team_5_game_of_life.model.adjacent_indices.call(null,n),iter__4975.call(null,cljs.core.rest.call(null,s__4976__$1)));
} else
{return null;
}
break;
}
}),null));
});
iter__2115__auto___4977.call(null,cljs.core.range.call(null,(ldnclj_dojo_team_5_game_of_life.model.WIDTH * ldnclj_dojo_team_5_game_of_life.model.HEIGHT)));
ldnclj_dojo_team_5_game_of_life.log.info.call(null,"toggle-run!");
return ldnclj_dojo_team_5_game_of_life.model.start_timer.call(null);
});

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__4978__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__4978 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4978__delegate.call(this, m);
};
G__4978.cljs$lang$maxFixedArity = 0;
G__4978.cljs$lang$applyTo = (function (arglist__4979){
var m = cljs.core.seq(arglist__4979);;
return G__4978__delegate(m);
});
G__4978.cljs$lang$arity$variadic = G__4978__delegate;
return G__4978;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"fill-random")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/fill-random")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Generate some random data to seed the ","\uFDD0'line",12,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"adjacent-indices-internal")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"i"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"i")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/adjacent-indices-internal")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",19,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"WIDTH")),cljs.core.hash_map("\uFDD0'line",6,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'static",true,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/WIDTH"))),(new cljs.core.Symbol(null,"start-timer")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/start-timer")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",96,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"HEIGHT")),cljs.core.hash_map("\uFDD0'line",7,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'static",true,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/HEIGHT"))),(new cljs.core.Symbol(null,"update-model")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/update-model")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Applies the main logic of next-gen-state to each cell in the grid","\uFDD0'line",80,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"adjacent-indices2")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"i"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"i")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/adjacent-indices2")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",46,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"adjacent-indices1")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"i"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"i")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/adjacent-indices1")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",34,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"next-gen-state")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"grid")),(new cljs.core.Symbol(null,"index")),(new cljs.core.Symbol(null,"alive?"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"grid")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"index")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"alive?")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/next-gen-state")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Main logic routine. Applies the rules of Conway's game of life.\n\n   1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.\n   2. Any live cell with two or three live neighbours lives on to the next generation.\n   3. Any live cell with more than three live neighbours dies, as if by overcrowding.\n   4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.\ncl\n  See http://en.wikipedia.org/wiki/Conway's_Game_of_Life for full details ","\uFDD0'line",62,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"toggle-run")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/toggle-run")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Start the timer. TODO: Expose this up to UI and make it a genuine toggle to start/stop reproduction.","\uFDD0'line",102,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"add-listener")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/add-listener")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Allows interested view to register interest in model changes. TODO: only supports a single listener, should maintain a list.","\uFDD0'line",89,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs"),(new cljs.core.Symbol(null,"*print-fn*")),cljs.core.hash_map("\uFDD0'line",10,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/*print-fn*"))),(new cljs.core.Symbol(null,"adjacent-indices")),cljs.core.hash_map("\uFDD0'line",31,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/adjacent-indices"))),(new cljs.core.Symbol(null,"*grid*")),cljs.core.hash_map("\uFDD0'line",17,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/*grid*"))),(new cljs.core.Symbol(null,"INDICES")),cljs.core.hash_map("\uFDD0'line",8,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/model.cljs","\uFDD0'static",true,"\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model/INDICES")))),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"log")),(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log")),(new cljs.core.Symbol(null,"events")),(new cljs.core.Symbol(null,"goog.events")),(new cljs.core.Symbol(null,"Timer")),(new cljs.core.Symbol(null,"goog.Timer"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([(new cljs.core.Symbol(null,"*print-fn*"))]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.model"))),old);
}));
