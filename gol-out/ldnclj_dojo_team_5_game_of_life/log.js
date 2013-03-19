goog.provide('ldnclj_dojo_team_5_game_of_life.log');
goog.require('cljs.core');
ldnclj_dojo_team_5_game_of_life.log.debugEnabled = false;
ldnclj_dojo_team_5_game_of_life.log.infoEnabled = false;
ldnclj_dojo_team_5_game_of_life.log.log = (function log(level,s){
return console.log(cljs.core.apply.call(null,cljs.core.str,cljs.core.cons.call(null,[cljs.core.str("["),cljs.core.str(level),cljs.core.str("] ")].join(''),s)));
});
/**
* @param {...*} var_args
*/
ldnclj_dojo_team_5_game_of_life.log.debug = (function() { 
var debug__delegate = function (s){
if(cljs.core.truth_(ldnclj_dojo_team_5_game_of_life.log.debugEnabled))
{return ldnclj_dojo_team_5_game_of_life.log.log.call(null,"DEBUG",s);
} else
{return null;
}
};
var debug = function (var_args){
var s = null;
if (goog.isDef(var_args)) {
  s = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return debug__delegate.call(this, s);
};
debug.cljs$lang$maxFixedArity = 0;
debug.cljs$lang$applyTo = (function (arglist__4980){
var s = cljs.core.seq(arglist__4980);;
return debug__delegate(s);
});
debug.cljs$lang$arity$variadic = debug__delegate;
return debug;
})()
;
/**
* @param {...*} var_args
*/
ldnclj_dojo_team_5_game_of_life.log.info = (function() { 
var info__delegate = function (s){
if(cljs.core.truth_(ldnclj_dojo_team_5_game_of_life.log.infoEnabled))
{return ldnclj_dojo_team_5_game_of_life.log.log.call(null,"INFO",s);
} else
{return null;
}
};
var info = function (var_args){
var s = null;
if (goog.isDef(var_args)) {
  s = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return info__delegate.call(this, s);
};
info.cljs$lang$maxFixedArity = 0;
info.cljs$lang$applyTo = (function (arglist__4981){
var s = cljs.core.seq(arglist__4981);;
return info__delegate(s);
});
info.cljs$lang$arity$variadic = info__delegate;
return info;
})()
;

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__4982__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__4982 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4982__delegate.call(this, m);
};
G__4982.cljs$lang$maxFixedArity = 0;
G__4982.cljs$lang$applyTo = (function (arglist__4983){
var m = cljs.core.seq(arglist__4983);;
return G__4982__delegate(m);
});
G__4982.cljs$lang$arity$variadic = G__4982__delegate;
return G__4982;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"info")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log/info")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",13,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/log.cljs"),(new cljs.core.Symbol(null,"debug")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log/debug")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",9,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/log.cljs"),(new cljs.core.Symbol(null,"log")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"level")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"level")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log/log")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",6,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/log.cljs"),(new cljs.core.Symbol(null,"infoEnabled")),cljs.core.hash_map("\uFDD0'line",4,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/log.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log/infoEnabled"))),(new cljs.core.Symbol(null,"debugEnabled")),cljs.core.hash_map("\uFDD0'line",3,"\uFDD0'file","/home/joelm/personal/clj/CinC/game-of-life/src-cljs/ldnclj_dojo_team_5_game_of_life/log.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log/debugEnabled")))),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",null,"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"ldnclj-dojo-team-5-game-of-life.log"))),old);
}));
