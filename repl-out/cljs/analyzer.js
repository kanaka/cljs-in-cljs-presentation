goog.provide('cljs.analyzer');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.io');
cljs.analyzer._STAR_cljs_warn_on_undeclared_STAR_ = false;
cljs.analyzer._STAR_reader_ns_name_STAR_ = cljs.core.gensym.call(null);
cljs.analyzer.namespaces = cljs.core.namespaces;
cljs.analyzer._STAR_cljs_ns_STAR_ = (new cljs.core.Symbol(null,"cljs.user"));
cljs.analyzer._STAR_cljs_file_STAR_ = null;
cljs.analyzer._STAR_cljs_warn_on_redef_STAR_ = true;
cljs.analyzer._STAR_cljs_warn_on_dynamic_STAR_ = true;
cljs.analyzer._STAR_cljs_warn_on_fn_var_STAR_ = true;
cljs.analyzer._STAR_cljs_warn_fn_arity_STAR_ = true;
cljs.analyzer._STAR_cljs_warn_fn_deprecated_STAR_ = true;
cljs.analyzer._STAR_cljs_warn_protocol_deprecated_STAR_ = true;
cljs.analyzer._STAR_unchecked_if_STAR_ = cljs.core.atom.call(null,false);
cljs.analyzer._STAR_cljs_static_fns_STAR_ = false;
cljs.analyzer._STAR_cljs_macros_path_STAR_ = "/cljs/core";
cljs.analyzer._STAR_cljs_macros_is_classpath_STAR_ = true;
cljs.analyzer._cljs_macros_loaded = cljs.core.atom.call(null,false);
cljs.analyzer.load_core = (function load_core(){
if(cljs.core.not.call(null,cljs.core.deref.call(null,cljs.analyzer._cljs_macros_loaded)))
{cljs.core.reset_BANG_.call(null,cljs.analyzer._cljs_macros_loaded,true);
if(cljs.core.truth_(cljs.analyzer._STAR_cljs_macros_is_classpath_STAR_))
{return cljs.analyzer.load.call(null,cljs.analyzer._STAR_cljs_macros_path_STAR_);
} else
{return cljs.core.load_file.call(null,cljs.analyzer._STAR_cljs_macros_path_STAR_);
}
} else
{return null;
}
});
cljs.analyzer.empty_env = (function empty_env(){
return cljs.core.ObjMap.fromObject(["\uFDD0'ns","\uFDD0'context","\uFDD0'locals"],{"\uFDD0'ns":cljs.core.deref.call(null,cljs.core.namespaces).call(null,cljs.analyzer._STAR_cljs_ns_STAR_),"\uFDD0'context":"\uFDD0'statement","\uFDD0'locals":cljs.core.ObjMap.EMPTY});
});
cljs.analyzer.warning = (function warning(env,s){
var _STAR_out_STAR_4647 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_err_STAR_;
return cljs.core.println.call(null,[cljs.core.str(s),cljs.core.str((cljs.core.truth_((new cljs.core.Keyword("\uFDD0'line")).call(null,env))?[cljs.core.str(" at line "),cljs.core.str((new cljs.core.Keyword("\uFDD0'line")).call(null,env)),cljs.core.str(" "),cljs.core.str(cljs.analyzer._STAR_cljs_file_STAR_)].join(''):null))].join(''));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_4647;
}});
cljs.analyzer.confirm_var_exists = (function confirm_var_exists(env,prefix,suffix){
if(cljs.core.truth_(cljs.analyzer._STAR_cljs_warn_on_undeclared_STAR_))
{var crnt_ns = (new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env));
if(cljs.core._EQ_.call(null,prefix,crnt_ns))
{if(cljs.core.truth_(suffix.call(null,(new cljs.core.Keyword("\uFDD0'defs")).call(null,crnt_ns.call(null,cljs.core.deref.call(null,cljs.core.namespaces))))))
{return null;
} else
{return cljs.analyzer.warning.call(null,env,[cljs.core.str("WARNING: Use of undeclared Var "),cljs.core.str(prefix),cljs.core.str("/"),cljs.core.str(suffix)].join(''));
}
} else
{return null;
}
} else
{return null;
}
});
cljs.analyzer.resolve_ns_alias = (function resolve_ns_alias(env,name){
var sym = cljs.core.symbol.call(null,name);
return cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'requires")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),sym,sym);
});
/**
* Is sym visible from core in the current compilation namespace?
*/
cljs.analyzer.core_name_QMARK_ = (function core_name_QMARK_(env,sym){
var and__3822__auto__ = cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'defs")).call(null,cljs.core.deref.call(null,cljs.core.namespaces).call(null,(new cljs.core.Symbol(null,"cljs.core")))),sym,null);
if(cljs.core.truth_(and__3822__auto__))
{return !(cljs.core.contains_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'excludes")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),sym));
} else
{return and__3822__auto__;
}
});
cljs.analyzer.resolve_existing_var = (function resolve_existing_var(env,sym){
while(true){
if(cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),"js"))
{return cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'ns"],{"\uFDD0'name":sym,"\uFDD0'ns":(new cljs.core.Symbol(null,"js"))});
} else
{var s = [cljs.core.str(sym)].join('');
var lb = sym.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(lb))
{return lb;
} else
{if(cljs.core.truth_(cljs.core.namespace.call(null,sym)))
{var ns = cljs.core.namespace.call(null,sym);
var ns__$1 = ((cljs.core._EQ_.call(null,"clojure.core",ns))?"cljs.core":ns);
var full_ns = cljs.analyzer.resolve_ns_alias.call(null,env,ns__$1);
cljs.analyzer.confirm_var_exists.call(null,env,full_ns,cljs.core.symbol.call(null,cljs.core.name.call(null,sym)));
return cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([full_ns,"\uFDD0'defs",cljs.core.symbol.call(null,cljs.core.name.call(null,sym))], true)),cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'ns"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(full_ns)].join(''),[cljs.core.str(cljs.core.name.call(null,sym))].join('')),"\uFDD0'ns":full_ns}));
} else
{if((function (){var and__3822__auto__ = cljs.core.not_EQ_.call(null,"..",s);
if(and__3822__auto__)
{return (s.indexOf(".") >= 0);
} else
{return and__3822__auto__;
}
})())
{var idx = s.indexOf(".");
var prefix = cljs.core.symbol.call(null,cljs.core.subs.call(null,s,0,idx));
var suffix = cljs.core.subs.call(null,s,(idx + 1));
var lb__$1 = prefix.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(lb__$1))
{return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,lb__$1)),cljs.core.str(suffix)].join(''))});
} else
{cljs.analyzer.confirm_var_exists.call(null,env,prefix,cljs.core.symbol.call(null,suffix));
return cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([prefix,"\uFDD0'defs",cljs.core.symbol.call(null,suffix)], true)),cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'ns"],{"\uFDD0'name":((cljs.core._EQ_.call(null,"",prefix))?cljs.core.symbol.call(null,suffix):cljs.core.symbol.call(null,[cljs.core.str(prefix)].join(''),suffix)),"\uFDD0'ns":prefix}));
}
} else
{if(cljs.core.truth_(cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'uses",sym], true))))
{var full_ns = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'uses",sym], true));
return cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([full_ns,"\uFDD0'defs",sym], true)),cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'ns"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(full_ns)].join(''),[cljs.core.str(sym)].join('')),"\uFDD0'ns":(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env))}));
} else
{if(cljs.core.truth_(cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'imports",sym], true))))
{{
var G__4649 = env;
var G__4650 = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'imports",sym], true));
env = G__4649;
sym = G__4650;
continue;
}
} else
{if("\uFDD0'else")
{var full_ns = (cljs.core.truth_(cljs.analyzer.core_name_QMARK_.call(null,env,sym))?(new cljs.core.Symbol(null,"cljs.core")):(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)));
cljs.analyzer.confirm_var_exists.call(null,env,full_ns,sym);
return cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([full_ns,"\uFDD0'defs",sym], true)),cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'ns"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(full_ns)].join(''),[cljs.core.str(sym)].join('')),"\uFDD0'ns":full_ns}));
} else
{return null;
}
}
}
}
}
}
}
break;
}
});
cljs.analyzer.resolve_var = (function resolve_var(env,sym){
while(true){
if(cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),"js"))
{return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":sym});
} else
{var s = [cljs.core.str(sym)].join('');
var lb = sym.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(lb))
{return lb;
} else
{if(cljs.core.truth_(cljs.core.namespace.call(null,sym)))
{var ns = cljs.core.namespace.call(null,sym);
var ns__$1 = ((cljs.core._EQ_.call(null,"clojure.core",ns))?"cljs.core":ns);
return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(cljs.analyzer.resolve_ns_alias.call(null,env,ns__$1))].join(''),cljs.core.name.call(null,sym))});
} else
{if((function (){var and__3822__auto__ = cljs.core.not_EQ_.call(null,"..",s);
if(and__3822__auto__)
{return (s.indexOf(".") >= 0);
} else
{return and__3822__auto__;
}
})())
{var idx = s.indexOf(".");
var prefix = cljs.core.symbol.call(null,cljs.core.subs.call(null,s,0,idx));
var suffix = cljs.core.subs.call(null,s,idx);
var lb__$1 = prefix.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(lb__$1))
{return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,lb__$1)),cljs.core.str(suffix)].join(''))});
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":sym});
}
} else
{if(cljs.core.truth_(cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'uses",sym], true))))
{var full_ns = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'uses",sym], true));
return cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([full_ns,"\uFDD0'defs",sym], true)),cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(full_ns)].join(''),cljs.core.name.call(null,sym))}));
} else
{if(cljs.core.truth_(cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'imports",sym], true))))
{{
var G__4651 = env;
var G__4652 = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'imports",sym], true));
env = G__4651;
sym = G__4652;
continue;
}
} else
{if("\uFDD0'else")
{var ns = (cljs.core.truth_(cljs.analyzer.core_name_QMARK_.call(null,env,sym))?(new cljs.core.Symbol(null,"cljs.core")):(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)));
return cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":cljs.core.symbol.call(null,[cljs.core.str(ns)].join(''),cljs.core.name.call(null,sym))});
} else
{return null;
}
}
}
}
}
}
}
break;
}
});
cljs.analyzer.confirm_bindings = (function confirm_bindings(env,names){
var G__4654 = cljs.core.seq.call(null,names);
while(true){
if(G__4654)
{var name = cljs.core.first.call(null,G__4654);
var env_4655__$1 = cljs.core.merge.call(null,env,cljs.core.ObjMap.fromObject(["\uFDD0'ns"],{"\uFDD0'ns":cljs.core.deref.call(null,cljs.core.namespaces).call(null,cljs.analyzer._STAR_cljs_ns_STAR_)}));
var ev_4656 = cljs.analyzer.resolve_existing_var.call(null,env_4655__$1,name);
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_warn_on_dynamic_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = ev_4656;
if(cljs.core.truth_(and__3822__auto____$1))
{return cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'dynamic")).call(null,ev_4656));
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})()))
{cljs.analyzer.warning.call(null,env_4655__$1,[cljs.core.str("WARNING: "),cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,ev_4656)),cljs.core.str(" not declared ^:dynamic")].join(''));
} else
{}
{
var G__4657 = cljs.core.next.call(null,G__4654);
G__4654 = G__4657;
continue;
}
} else
{return null;
}
break;
}
});
cljs.analyzer.specials = cljs.core.set([(new cljs.core.Symbol(null,"deftype*")),(new cljs.core.Symbol(null,"new")),(new cljs.core.Symbol(null,"try*")),(new cljs.core.Symbol(null,"quote")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"set!")),(new cljs.core.Symbol(null,"recur")),(new cljs.core.Symbol(null,".")),(new cljs.core.Symbol(null,"ns")),(new cljs.core.Symbol(null,"do")),(new cljs.core.Symbol(null,"fn*")),(new cljs.core.Symbol(null,"throw")),(new cljs.core.Symbol(null,"letfn*")),(new cljs.core.Symbol(null,"js*")),(new cljs.core.Symbol(null,"defrecord*")),(new cljs.core.Symbol(null,"let*")),(new cljs.core.Symbol(null,"loop*")),(new cljs.core.Symbol(null,"if")),(new cljs.core.Symbol(null,"def"))]);
cljs.analyzer._STAR_recur_frames_STAR_ = null;
cljs.analyzer._STAR_loop_lets_STAR_ = null;
cljs.analyzer.analyze_keyword = (function analyze_keyword(env,sym){
return cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form"],{"\uFDD0'op":"\uFDD0'constant","\uFDD0'env":env,"\uFDD0'form":((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),cljs.core.name.call(null,cljs.analyzer._STAR_reader_ns_name_STAR_)))?cljs.core.keyword.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env))),cljs.core.name.call(null,sym)):sym)});
});
/**
* returns {:statements .. :ret ..}
*/
cljs.analyzer.analyze_block = (function analyze_block(env,exprs){
var statements = (function (){var _STAR_recur_frames_STAR_4661 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.seq.call(null,cljs.core.map.call(null,(function (p1__4658_SHARP_){
return cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'statement"),p1__4658_SHARP_);
}),cljs.core.butlast.call(null,exprs)));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4661;
}})();
var ret = (((cljs.core.count.call(null,exprs) <= 1))?cljs.analyzer.analyze.call(null,env,cljs.core.first.call(null,exprs)):cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context",((cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))?"\uFDD0'statement":"\uFDD0'return")),cljs.core.last.call(null,exprs)));
return cljs.core.ObjMap.fromObject(["\uFDD0'statements","\uFDD0'ret"],{"\uFDD0'statements":statements,"\uFDD0'ret":ret});
});
cljs.analyzer.parse = (function (){var method_table__2190__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2191__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2192__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2193__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2194__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("parse",(function() { 
var G__4663__delegate = function (op,rest){
return op;
};
var G__4663 = function (op,var_args){
var rest = null;
if (goog.isDef(var_args)) {
  rest = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4663__delegate.call(this, op, rest);
};
G__4663.cljs$lang$maxFixedArity = 1;
G__4663.cljs$lang$applyTo = (function (arglist__4664){
var op = cljs.core.first(arglist__4664);
var rest = cljs.core.rest(arglist__4664);
return G__4663__delegate(op, rest);
});
G__4663.cljs$lang$arity$variadic = G__4663__delegate;
return G__4663;
})()
,"\uFDD0'default",hierarchy__2194__auto__,method_table__2190__auto__,prefer_table__2191__auto__,method_cache__2192__auto__,cached_hierarchy__2193__auto__));
})();
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"if")),(function (op,env,p__4665,name){
var vec__4666 = p__4665;
var _ = cljs.core.nth.call(null,vec__4666,0,null);
var test = cljs.core.nth.call(null,vec__4666,1,null);
var then = cljs.core.nth.call(null,vec__4666,2,null);
var else$ = cljs.core.nth.call(null,vec__4666,3,null);
var form = vec__4666;
var test_expr = (function (){var _STAR_recur_frames_STAR_4667 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr"),test);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4667;
}})();
var then_expr = cljs.analyzer.analyze.call(null,env,then);
var else_expr = cljs.analyzer.analyze.call(null,env,else$);
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'test","\uFDD0'then","\uFDD0'else","\uFDD0'unchecked","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'if","\uFDD0'form":form,"\uFDD0'test":test_expr,"\uFDD0'then":then_expr,"\uFDD0'else":else_expr,"\uFDD0'unchecked":cljs.core.deref.call(null,cljs.analyzer._STAR_unchecked_if_STAR_),"\uFDD0'children":cljs.core.PersistentVector.fromArray([test_expr,then_expr,else_expr], true)});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"throw")),(function (op,env,p__4669,name){
var vec__4670 = p__4669;
var _ = cljs.core.nth.call(null,vec__4670,0,null);
var throw$ = cljs.core.nth.call(null,vec__4670,1,null);
var form = vec__4670;
var throw_expr = (function (){var _STAR_recur_frames_STAR_4671 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr"),throw$);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4671;
}})();
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'throw","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'throw","\uFDD0'form":form,"\uFDD0'throw":throw_expr,"\uFDD0'children":cljs.core.PersistentVector.fromArray([throw_expr], true)});
}));
cljs.analyzer.block_children = (function block_children(p__4674){
var map__4676 = p__4674;
var map__4676__$1 = ((cljs.core.seq_QMARK_.call(null,map__4676))?cljs.core.apply.call(null,cljs.core.hash_map,map__4676):map__4676);
var block = map__4676__$1;
var ret = cljs.core._lookup.call(null,map__4676__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4676__$1,"\uFDD0'statements",null);
if(cljs.core.truth_(block))
{return cljs.core.conj.call(null,cljs.core.vec.call(null,statements),ret);
} else
{return null;
}
});
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"try*")),(function (op,env,p__4677,name){
var vec__4678 = p__4677;
var _ = cljs.core.nth.call(null,vec__4678,0,null);
var body = cljs.core.nthnext.call(null,vec__4678,1);
var form = vec__4678;
var body__$1 = cljs.core.vec.call(null,body);
var catchenv = cljs.core.update_in.call(null,env,cljs.core.PersistentVector.fromArray(["\uFDD0'context"], true),(function (p1__4673_SHARP_){
if(cljs.core._EQ_.call(null,"\uFDD0'expr",p1__4673_SHARP_))
{return "\uFDD0'return";
} else
{return p1__4673_SHARP_;
}
}));
var tail = cljs.core.peek.call(null,body__$1);
var fblock = (((function (){var and__3822__auto__ = cljs.core.seq_QMARK_.call(null,tail);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,(new cljs.core.Symbol(null,"finally")),cljs.core.first.call(null,tail));
} else
{return and__3822__auto__;
}
})())?cljs.core.rest.call(null,tail):null);
var finally$ = (cljs.core.truth_(fblock)?cljs.analyzer.analyze_block.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'statement"),fblock):null);
var body__$2 = (cljs.core.truth_(finally$)?cljs.core.pop.call(null,body__$1):body__$1);
var tail__$1 = cljs.core.peek.call(null,body__$2);
var cblock = (((function (){var and__3822__auto__ = cljs.core.seq_QMARK_.call(null,tail__$1);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,(new cljs.core.Symbol(null,"catch")),cljs.core.first.call(null,tail__$1));
} else
{return and__3822__auto__;
}
})())?cljs.core.rest.call(null,tail__$1):null);
var name__$1 = cljs.core.first.call(null,cblock);
var locals = (new cljs.core.Keyword("\uFDD0'locals")).call(null,catchenv);
var locals__$1 = (cljs.core.truth_(name__$1)?cljs.core.assoc.call(null,locals,name__$1,cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":name__$1})):locals);
var catch$ = (cljs.core.truth_(cblock)?cljs.analyzer.analyze_block.call(null,cljs.core.assoc.call(null,catchenv,"\uFDD0'locals",locals__$1),cljs.core.rest.call(null,cblock)):null);
var body__$3 = (cljs.core.truth_(name__$1)?cljs.core.pop.call(null,body__$2):body__$2);
var try$ = (cljs.core.truth_(body__$3)?cljs.analyzer.analyze_block.call(null,(cljs.core.truth_((function (){var or__3824__auto__ = name__$1;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return finally$;
}
})())?catchenv:env),body__$3):null);
if(cljs.core.truth_(name__$1))
{if(cljs.core.not.call(null,cljs.core.namespace.call(null,name__$1)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't qualify symbol in catch"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"namespace")),(new cljs.core.Symbol(null,"name"))),cljs.core.hash_map("\uFDD0'line",278))),cljs.core.hash_map("\uFDD0'line",278))))].join('')));
}
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'try","\uFDD0'finally","\uFDD0'name","\uFDD0'catch","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'try*","\uFDD0'form":form,"\uFDD0'try":try$,"\uFDD0'finally":finally$,"\uFDD0'name":name__$1,"\uFDD0'catch":catch$,"\uFDD0'children":cljs.core.vec.call(null,cljs.core.mapcat.call(null,cljs.analyzer.block_children,cljs.core.PersistentVector.fromArray([try$,catch$,finally$], true)))});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"def")),(function (op,env,form,name){
var pfn = (function() {
var G__4681 = null;
var G__4681__2 = (function (_,sym){
return cljs.core.ObjMap.fromObject(["\uFDD0'sym"],{"\uFDD0'sym":sym});
});
var G__4681__3 = (function (_,sym,init){
return cljs.core.ObjMap.fromObject(["\uFDD0'sym","\uFDD0'init"],{"\uFDD0'sym":sym,"\uFDD0'init":init});
});
var G__4681__4 = (function (_,sym,doc,init){
return cljs.core.ObjMap.fromObject(["\uFDD0'sym","\uFDD0'doc","\uFDD0'init"],{"\uFDD0'sym":sym,"\uFDD0'doc":doc,"\uFDD0'init":init});
});
G__4681 = function(_,sym,doc,init){
switch(arguments.length){
case 2:
return G__4681__2.call(this,_,sym);
case 3:
return G__4681__3.call(this,_,sym,doc);
case 4:
return G__4681__4.call(this,_,sym,doc,init);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__4681;
})()
;
var args = cljs.core.apply.call(null,pfn,form);
var sym = (new cljs.core.Keyword("\uFDD0'sym")).call(null,args);
var sym_meta = cljs.core.meta.call(null,sym);
var tag = (new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,sym));
var protocol = (new cljs.core.Keyword("\uFDD0'protocol")).call(null,cljs.core.meta.call(null,sym));
var dynamic = (new cljs.core.Keyword("\uFDD0'dynamic")).call(null,cljs.core.meta.call(null,sym));
var ns_name = (new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env));
if(cljs.core.not.call(null,cljs.core.namespace.call(null,sym)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't def ns-qualified name"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"namespace")),(new cljs.core.Symbol(null,"sym"))),cljs.core.hash_map("\uFDD0'line",300))),cljs.core.hash_map("\uFDD0'line",300))))].join('')));
}
var env__$1 = (cljs.core.truth_((function (){var or__3824__auto__ = (function (){var and__3822__auto__ = cljs.core.not_EQ_.call(null,ns_name,(new cljs.core.Symbol(null,"cljs.core")));
if(and__3822__auto__)
{return cljs.analyzer.core_name_QMARK_.call(null,env,sym);
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([ns_name,"\uFDD0'uses",sym], true));
}
})())?(function (){var ev = cljs.analyzer.resolve_existing_var.call(null,cljs.core.dissoc.call(null,env,"\uFDD0'locals"),sym);
if(cljs.core.truth_(cljs.analyzer._STAR_cljs_warn_on_redef_STAR_))
{cljs.analyzer.warning.call(null,env,[cljs.core.str("WARNING: "),cljs.core.str(sym),cljs.core.str(" already refers to: "),cljs.core.str(cljs.core.symbol.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'ns")).call(null,ev))].join(''),[cljs.core.str(sym)].join(''))),cljs.core.str(" being replaced by: "),cljs.core.str(cljs.core.symbol.call(null,[cljs.core.str(ns_name)].join(''),[cljs.core.str(sym)].join('')))].join(''));
} else
{}
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([ns_name,"\uFDD0'excludes"], true),cljs.core.conj,sym);
return cljs.core.update_in.call(null,env,cljs.core.PersistentVector.fromArray(["\uFDD0'ns","\uFDD0'excludes"], true),cljs.core.conj,sym);
})():env);
var name__$1 = (new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_var.call(null,cljs.core.dissoc.call(null,env__$1,"\uFDD0'locals"),sym));
var init_expr = ((cljs.core.contains_QMARK_.call(null,args,"\uFDD0'init"))?(function (){var _STAR_recur_frames_STAR_4679 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env__$1,"\uFDD0'context","\uFDD0'expr"),(new cljs.core.Keyword("\uFDD0'init")).call(null,args),sym);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4679;
}})():null);
var fn_var_QMARK_ = (function (){var and__3822__auto__ = init_expr;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,init_expr),"\uFDD0'fn");
} else
{return and__3822__auto__;
}
})();
var export_as = (function (){var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'export")).call(null,cljs.core.meta.call(null,sym));
if(cljs.core.truth_(temp__3974__auto__))
{var export_val = temp__3974__auto__;
if(cljs.core._EQ_.call(null,true,export_val))
{return name__$1;
} else
{return export_val;
}
} else
{return null;
}
})();
var doc = (function (){var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'doc")).call(null,args);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'doc")).call(null,cljs.core.meta.call(null,sym));
}
})();
var temp__3974__auto___4682 = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([ns_name,"\uFDD0'defs",sym], true));
if(cljs.core.truth_(temp__3974__auto___4682))
{var v_4683 = temp__3974__auto___4682;
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_warn_on_fn_var_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'declared")).call(null,cljs.core.meta.call(null,sym)));
if(and__3822__auto____$1)
{var and__3822__auto____$2 = (new cljs.core.Keyword("\uFDD0'fn-var")).call(null,v_4683);
if(cljs.core.truth_(and__3822__auto____$2))
{return cljs.core.not.call(null,fn_var_QMARK_);
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})()))
{cljs.analyzer.warning.call(null,env__$1,[cljs.core.str("WARNING: "),cljs.core.str(cljs.core.symbol.call(null,[cljs.core.str(ns_name)].join(''),[cljs.core.str(sym)].join(''))),cljs.core.str(" no longer fn, references are stale")].join(''));
} else
{}
} else
{}
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc_in,cljs.core.PersistentVector.fromArray([ns_name,"\uFDD0'defs",sym], true),cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'name"],{"\uFDD0'name":name__$1}),sym_meta,(cljs.core.truth_(doc)?cljs.core.ObjMap.fromObject(["\uFDD0'doc"],{"\uFDD0'doc":doc}):null),(cljs.core.truth_(dynamic)?cljs.core.ObjMap.fromObject(["\uFDD0'dynamic"],{"\uFDD0'dynamic":true}):null),(function (){var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'line")).call(null,env__$1);
if(cljs.core.truth_(temp__3974__auto__))
{var line = temp__3974__auto__;
return cljs.core.ObjMap.fromObject(["\uFDD0'file","\uFDD0'line"],{"\uFDD0'file":cljs.analyzer._STAR_cljs_file_STAR_,"\uFDD0'line":line});
} else
{return null;
}
})(),(cljs.core.truth_(protocol)?cljs.core.ObjMap.fromObject(["\uFDD0'protocol"],{"\uFDD0'protocol":protocol}):null),(function (){var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'protocol-symbol")).call(null,cljs.core.meta.call(null,sym));
if(cljs.core.truth_(temp__3974__auto__))
{var protocol_symbol = temp__3974__auto__;
return cljs.core.ObjMap.fromObject(["\uFDD0'protocol-symbol"],{"\uFDD0'protocol-symbol":protocol_symbol});
} else
{return null;
}
})(),(cljs.core.truth_(fn_var_QMARK_)?cljs.core.ObjMap.fromObject(["\uFDD0'fn-var","\uFDD0'protocol-impl","\uFDD0'protocol-inline","\uFDD0'variadic","\uFDD0'max-fixed-arity","\uFDD0'method-params"],{"\uFDD0'fn-var":true,"\uFDD0'protocol-impl":(new cljs.core.Keyword("\uFDD0'protocol-impl")).call(null,init_expr),"\uFDD0'protocol-inline":(new cljs.core.Keyword("\uFDD0'protocol-inline")).call(null,init_expr),"\uFDD0'variadic":(new cljs.core.Keyword("\uFDD0'variadic")).call(null,init_expr),"\uFDD0'max-fixed-arity":(new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,init_expr),"\uFDD0'method-params":cljs.core.map.call(null,"\uFDD0'params",(new cljs.core.Keyword("\uFDD0'methods")).call(null,init_expr))}):null)));
return cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'name","\uFDD0'doc","\uFDD0'init"],{"\uFDD0'env":env__$1,"\uFDD0'op":"\uFDD0'def","\uFDD0'form":form,"\uFDD0'name":name__$1,"\uFDD0'doc":doc,"\uFDD0'init":init_expr}),(cljs.core.truth_(tag)?cljs.core.ObjMap.fromObject(["\uFDD0'tag"],{"\uFDD0'tag":tag}):null),(cljs.core.truth_(dynamic)?cljs.core.ObjMap.fromObject(["\uFDD0'dynamic"],{"\uFDD0'dynamic":true}):null),(cljs.core.truth_(export_as)?cljs.core.ObjMap.fromObject(["\uFDD0'export"],{"\uFDD0'export":export_as}):null),(cljs.core.truth_(init_expr)?cljs.core.ObjMap.fromObject(["\uFDD0'children"],{"\uFDD0'children":cljs.core.PersistentVector.fromArray([init_expr], true)}):null));
}));
cljs.analyzer.analyze_fn_method = (function analyze_fn_method(env,locals,form,type){
var param_names = cljs.core.first.call(null,form);
var variadic = cljs.core.boolean$.call(null,cljs.core.some.call(null,cljs.core.set([(new cljs.core.Symbol(null,"&"))]),param_names));
var param_names__$1 = cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.set([(new cljs.core.Symbol(null,"&"))]),param_names));
var body = cljs.core.next.call(null,form);
var vec__4691 = cljs.core.reduce.call(null,(function (p__4692,name){
var vec__4693 = p__4692;
var locals__$1 = cljs.core.nth.call(null,vec__4693,0,null);
var params = cljs.core.nth.call(null,vec__4693,1,null);
var param = cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'tag","\uFDD0'shadow"],{"\uFDD0'name":name,"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,name)),"\uFDD0'shadow":locals__$1.call(null,name)});
return cljs.core.PersistentVector.fromArray([cljs.core.assoc.call(null,locals__$1,name,param),cljs.core.conj.call(null,params,param)], true);
}),cljs.core.PersistentVector.fromArray([locals,cljs.core.PersistentVector.EMPTY], true),param_names__$1);
var locals__$1 = cljs.core.nth.call(null,vec__4691,0,null);
var params = cljs.core.nth.call(null,vec__4691,1,null);
var fixed_arity = cljs.core.count.call(null,((variadic)?cljs.core.butlast.call(null,params):params));
var recur_frame = cljs.core.ObjMap.fromObject(["\uFDD0'params","\uFDD0'flag"],{"\uFDD0'params":params,"\uFDD0'flag":cljs.core.atom.call(null,null)});
var block = (function (){var _STAR_recur_frames_STAR_4694 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,recur_frame,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.analyzer.analyze_block.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'return","\uFDD0'locals",locals__$1),body);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4694;
}})();
return cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'variadic","\uFDD0'params","\uFDD0'max-fixed-arity","\uFDD0'type","\uFDD0'form","\uFDD0'recurs"],{"\uFDD0'env":env,"\uFDD0'variadic":variadic,"\uFDD0'params":params,"\uFDD0'max-fixed-arity":fixed_arity,"\uFDD0'type":type,"\uFDD0'form":form,"\uFDD0'recurs":cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,recur_frame))}),block);
});
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"fn*")),(function (op,env,p__4696,name){
var vec__4697 = p__4696;
var _ = cljs.core.nth.call(null,vec__4697,0,null);
var args = cljs.core.nthnext.call(null,vec__4697,1);
var form = vec__4697;
var vec__4698 = ((cljs.core.symbol_QMARK_.call(null,cljs.core.first.call(null,args)))?cljs.core.PersistentVector.fromArray([cljs.core.first.call(null,args),cljs.core.next.call(null,args)], true):cljs.core.PersistentVector.fromArray([name,cljs.core.seq.call(null,args)], true));
var name__$1 = cljs.core.nth.call(null,vec__4698,0,null);
var meths = cljs.core.nth.call(null,vec__4698,1,null);
var meths__$1 = ((cljs.core.vector_QMARK_.call(null,cljs.core.first.call(null,meths)))?cljs.core.list.call(null,meths):meths);
var locals = (new cljs.core.Keyword("\uFDD0'locals")).call(null,env);
var locals__$1 = (cljs.core.truth_(name__$1)?cljs.core.assoc.call(null,locals,name__$1,cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'shadow"],{"\uFDD0'name":name__$1,"\uFDD0'shadow":locals.call(null,name__$1)})):locals);
var type = (new cljs.core.Keyword("\uFDD0'cljs.analyzer/type")).call(null,cljs.core.meta.call(null,form));
var fields = (new cljs.core.Keyword("\uFDD0'cljs.analyzer/fields")).call(null,cljs.core.meta.call(null,form));
var protocol_impl = (new cljs.core.Keyword("\uFDD0'protocol-impl")).call(null,cljs.core.meta.call(null,form));
var protocol_inline = (new cljs.core.Keyword("\uFDD0'protocol-inline")).call(null,cljs.core.meta.call(null,form));
var locals__$2 = cljs.core.reduce.call(null,(function (m,fld){
return cljs.core.assoc.call(null,m,fld,cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'field","\uFDD0'mutable","\uFDD0'tag","\uFDD0'shadow"],{"\uFDD0'name":fld,"\uFDD0'field":true,"\uFDD0'mutable":(new cljs.core.Keyword("\uFDD0'mutable")).call(null,cljs.core.meta.call(null,fld)),"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,fld)),"\uFDD0'shadow":m.call(null,fld)}));
}),locals__$1,fields);
var menv = (((cljs.core.count.call(null,meths__$1) > 1))?cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr"):env);
var menv__$1 = cljs.core.merge.call(null,menv,cljs.core.ObjMap.fromObject(["\uFDD0'protocol-impl","\uFDD0'protocol-inline"],{"\uFDD0'protocol-impl":protocol_impl,"\uFDD0'protocol-inline":protocol_inline}));
var methods$ = cljs.core.map.call(null,(function (p1__4684_SHARP_){
return cljs.analyzer.analyze_fn_method.call(null,menv__$1,locals__$2,p1__4684_SHARP_,type);
}),meths__$1);
var max_fixed_arity = cljs.core.apply.call(null,cljs.core.max,cljs.core.map.call(null,"\uFDD0'max-fixed-arity",methods$));
var variadic = cljs.core.boolean$.call(null,cljs.core.some.call(null,"\uFDD0'variadic",methods$));
var locals__$3 = (cljs.core.truth_(name__$1)?cljs.core.update_in.call(null,locals__$2,cljs.core.PersistentVector.fromArray([name__$1], true),cljs.core.assoc,"\uFDD0'fn-var",true,"\uFDD0'variadic",variadic,"\uFDD0'max-fixed-arity",max_fixed_arity,"\uFDD0'method-params",cljs.core.map.call(null,"\uFDD0'params",methods$)):locals__$2);
var methods$__$1 = (cljs.core.truth_(name__$1)?cljs.core.map.call(null,(function (p1__4685_SHARP_){
return cljs.analyzer.analyze_fn_method.call(null,menv__$1,locals__$3,p1__4685_SHARP_,type);
}),meths__$1):methods$);
return cljs.core.ObjMap.fromObject(["\uFDD0'children","\uFDD0'loop-lets","\uFDD0'recur-frames","\uFDD0'form","\uFDD0'op","\uFDD0'name","\uFDD0'protocol-impl","\uFDD0'max-fixed-arity","\uFDD0'methods","\uFDD0'env","\uFDD0'protocol-inline","\uFDD0'variadic","\uFDD0'jsdoc"],{"\uFDD0'children":cljs.core.vec.call(null,cljs.core.mapcat.call(null,cljs.analyzer.block_children,methods$__$1)),"\uFDD0'loop-lets":cljs.analyzer._STAR_loop_lets_STAR_,"\uFDD0'recur-frames":cljs.analyzer._STAR_recur_frames_STAR_,"\uFDD0'form":form,"\uFDD0'op":"\uFDD0'fn","\uFDD0'name":name__$1,"\uFDD0'protocol-impl":protocol_impl,"\uFDD0'max-fixed-arity":max_fixed_arity,"\uFDD0'methods":methods$__$1,"\uFDD0'env":env,"\uFDD0'protocol-inline":protocol_inline,"\uFDD0'variadic":variadic,"\uFDD0'jsdoc":cljs.core.PersistentVector.fromArray([((variadic)?"@param {...*} var_args":null)], true)});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"letfn*")),(function (op,env,p__4699,name){
var vec__4700 = p__4699;
var _ = cljs.core.nth.call(null,vec__4700,0,null);
var bindings = cljs.core.nth.call(null,vec__4700,1,null);
var exprs = cljs.core.nthnext.call(null,vec__4700,2);
var form = vec__4700;
if((function (){var and__3822__auto__ = cljs.core.vector_QMARK_.call(null,bindings);
if(and__3822__auto__)
{return cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,bindings));
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("bindings must be vector of even number of elements"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"vector?")),(new cljs.core.Symbol(null,"bindings"))),cljs.core.hash_map("\uFDD0'line",429)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"even?")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"count")),(new cljs.core.Symbol(null,"bindings"))),cljs.core.hash_map("\uFDD0'line",429))),cljs.core.hash_map("\uFDD0'line",429))),cljs.core.hash_map("\uFDD0'line",429))))].join('')));
}
var n__GT_fexpr = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,cljs.core.first,cljs.core.second),cljs.core.partition.call(null,2,bindings)));
var names = cljs.core.keys.call(null,n__GT_fexpr);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var vec__4701 = cljs.core.reduce.call(null,(function (p__4703,n){
var vec__4704 = p__4703;
var map__4705 = cljs.core.nth.call(null,vec__4704,0,null);
var map__4705__$1 = ((cljs.core.seq_QMARK_.call(null,map__4705))?cljs.core.apply.call(null,cljs.core.hash_map,map__4705):map__4705);
var env__$1 = map__4705__$1;
var locals = cljs.core._lookup.call(null,map__4705__$1,"\uFDD0'locals",null);
var bes = cljs.core.nth.call(null,vec__4704,1,null);
var be = cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'tag","\uFDD0'local","\uFDD0'shadow"],{"\uFDD0'name":n,"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,n)),"\uFDD0'local":true,"\uFDD0'shadow":locals.call(null,n)});
return cljs.core.PersistentVector.fromArray([cljs.core.assoc_in.call(null,env__$1,cljs.core.PersistentVector.fromArray(["\uFDD0'locals",n], true),be),cljs.core.conj.call(null,bes,be)], true);
}),cljs.core.PersistentVector.fromArray([env,cljs.core.PersistentVector.EMPTY], true),names);
var meth_env = cljs.core.nth.call(null,vec__4701,0,null);
var bes = cljs.core.nth.call(null,vec__4701,1,null);
var meth_env__$1 = cljs.core.assoc.call(null,meth_env,"\uFDD0'context","\uFDD0'expr");
var bes__$1 = cljs.core.vec.call(null,cljs.core.map.call(null,(function (p__4706){
var map__4707 = p__4706;
var map__4707__$1 = ((cljs.core.seq_QMARK_.call(null,map__4707))?cljs.core.apply.call(null,cljs.core.hash_map,map__4707):map__4707);
var be = map__4707__$1;
var shadow = cljs.core._lookup.call(null,map__4707__$1,"\uFDD0'shadow",null);
var name__$1 = cljs.core._lookup.call(null,map__4707__$1,"\uFDD0'name",null);
var env__$1 = cljs.core.assoc_in.call(null,meth_env__$1,cljs.core.PersistentVector.fromArray(["\uFDD0'locals",name__$1], true),shadow);
return cljs.core.assoc.call(null,be,"\uFDD0'init",cljs.analyzer.analyze.call(null,env__$1,n__GT_fexpr.call(null,name__$1)));
}),bes));
var map__4702 = cljs.analyzer.analyze_block.call(null,cljs.core.assoc.call(null,meth_env__$1,"\uFDD0'context",((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context)),exprs);
var map__4702__$1 = ((cljs.core.seq_QMARK_.call(null,map__4702))?cljs.core.apply.call(null,cljs.core.hash_map,map__4702):map__4702);
var ret = cljs.core._lookup.call(null,map__4702__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4702__$1,"\uFDD0'statements",null);
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'bindings","\uFDD0'statements","\uFDD0'ret","\uFDD0'form","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'letfn","\uFDD0'bindings":bes__$1,"\uFDD0'statements":statements,"\uFDD0'ret":ret,"\uFDD0'form":form,"\uFDD0'children":cljs.core.into.call(null,cljs.core.vec.call(null,cljs.core.map.call(null,"\uFDD0'init",bes__$1)),cljs.core.conj.call(null,cljs.core.vec.call(null,statements),ret))});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"do")),(function (op,env,p__4708,_){
var vec__4709 = p__4708;
var ___$1 = cljs.core.nth.call(null,vec__4709,0,null);
var exprs = cljs.core.nthnext.call(null,vec__4709,1);
var form = vec__4709;
var block = cljs.analyzer.analyze_block.call(null,env,exprs);
return cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'do","\uFDD0'form":form,"\uFDD0'children":cljs.analyzer.block_children.call(null,block)}),block);
}));
cljs.analyzer.analyze_let = (function analyze_let(encl_env,p__4710,is_loop){
var vec__4720 = p__4710;
var _ = cljs.core.nth.call(null,vec__4720,0,null);
var bindings = cljs.core.nth.call(null,vec__4720,1,null);
var exprs = cljs.core.nthnext.call(null,vec__4720,2);
var form = vec__4720;
if((function (){var and__3822__auto__ = cljs.core.vector_QMARK_.call(null,bindings);
if(and__3822__auto__)
{return cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,bindings));
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("bindings must be vector of even number of elements"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"vector?")),(new cljs.core.Symbol(null,"bindings"))),cljs.core.hash_map("\uFDD0'line",460)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"even?")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"count")),(new cljs.core.Symbol(null,"bindings"))),cljs.core.hash_map("\uFDD0'line",460))),cljs.core.hash_map("\uFDD0'line",460))),cljs.core.hash_map("\uFDD0'line",460))))].join('')));
}
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,encl_env);
var vec__4721 = (function (){var _STAR_recur_frames_STAR_4723 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var bes = cljs.core.PersistentVector.EMPTY;
var env = cljs.core.assoc.call(null,encl_env,"\uFDD0'context","\uFDD0'expr");
var bindings__$1 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,bindings));
while(true){
var temp__3971__auto__ = cljs.core.first.call(null,bindings__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var vec__4725 = temp__3971__auto__;
var name = cljs.core.nth.call(null,vec__4725,0,null);
var init = cljs.core.nth.call(null,vec__4725,1,null);
if(cljs.core.not.call(null,(function (){var or__3824__auto__ = cljs.core.namespace.call(null,name);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return ([cljs.core.str(name)].join('').indexOf(".") >= 0);
}
})()))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Invalid local name: "),cljs.core.str(name)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"or")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"namespace")),(new cljs.core.Symbol(null,"name"))),cljs.core.hash_map("\uFDD0'line",469)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,">=")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,".indexOf")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"str")),(new cljs.core.Symbol(null,"name"))),cljs.core.hash_map("\uFDD0'line",469)),"."),cljs.core.hash_map("\uFDD0'line",469)),0),cljs.core.hash_map("\uFDD0'line",469))),cljs.core.hash_map("\uFDD0'line",469))),cljs.core.hash_map("\uFDD0'line",469))))].join('')));
}
var init_expr = cljs.analyzer.analyze.call(null,env,init);
var be = cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'init","\uFDD0'tag","\uFDD0'local","\uFDD0'shadow"],{"\uFDD0'name":name,"\uFDD0'init":init_expr,"\uFDD0'tag":(function (){var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,name));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (new cljs.core.Keyword("\uFDD0'tag")).call(null,init_expr);
if(cljs.core.truth_(or__3824__auto____$1))
{return or__3824__auto____$1;
} else
{return (new cljs.core.Keyword("\uFDD0'tag")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,init_expr));
}
}
})(),"\uFDD0'local":true,"\uFDD0'shadow":name.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env))});
var be__$1 = ((cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,init_expr),"\uFDD0'fn"))?cljs.core.merge.call(null,be,cljs.core.ObjMap.fromObject(["\uFDD0'fn-var","\uFDD0'variadic","\uFDD0'max-fixed-arity","\uFDD0'method-params"],{"\uFDD0'fn-var":true,"\uFDD0'variadic":(new cljs.core.Keyword("\uFDD0'variadic")).call(null,init_expr),"\uFDD0'max-fixed-arity":(new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,init_expr),"\uFDD0'method-params":cljs.core.map.call(null,"\uFDD0'params",(new cljs.core.Keyword("\uFDD0'methods")).call(null,init_expr))})):be);
{
var G__4729 = cljs.core.conj.call(null,bes,be__$1);
var G__4730 = cljs.core.assoc_in.call(null,env,cljs.core.PersistentVector.fromArray(["\uFDD0'locals",name], true),be__$1);
var G__4731 = cljs.core.next.call(null,bindings__$1);
bes = G__4729;
env = G__4730;
bindings__$1 = G__4731;
continue;
}
} else
{return cljs.core.PersistentVector.fromArray([bes,env], true);
}
break;
}
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4723;
}})();
var bes = cljs.core.nth.call(null,vec__4721,0,null);
var env = cljs.core.nth.call(null,vec__4721,1,null);
var recur_frame = (cljs.core.truth_(is_loop)?cljs.core.ObjMap.fromObject(["\uFDD0'params","\uFDD0'flag"],{"\uFDD0'params":bes,"\uFDD0'flag":cljs.core.atom.call(null,null)}):null);
var map__4722 = (function (){var _STAR_recur_frames_STAR_4726 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_loop_lets_STAR_4727 = cljs.analyzer._STAR_loop_lets_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = (cljs.core.truth_(recur_frame)?cljs.core.cons.call(null,recur_frame,cljs.analyzer._STAR_recur_frames_STAR_):cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_loop_lets_STAR_ = (cljs.core.truth_(is_loop)?(function (){var or__3824__auto__ = cljs.analyzer._STAR_loop_lets_STAR_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.List.EMPTY;
}
})():(cljs.core.truth_(cljs.analyzer._STAR_loop_lets_STAR_)?cljs.core.cons.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'params"],{"\uFDD0'params":bes}),cljs.analyzer._STAR_loop_lets_STAR_):null));
return cljs.analyzer.analyze_block.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context",((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context)),exprs);
}finally {cljs.analyzer._STAR_loop_lets_STAR_ = _STAR_loop_lets_STAR_4727;
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4726;
}})();
var map__4722__$1 = ((cljs.core.seq_QMARK_.call(null,map__4722))?cljs.core.apply.call(null,cljs.core.hash_map,map__4722):map__4722);
var ret = cljs.core._lookup.call(null,map__4722__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4722__$1,"\uFDD0'statements",null);
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'loop","\uFDD0'bindings","\uFDD0'statements","\uFDD0'ret","\uFDD0'form","\uFDD0'children"],{"\uFDD0'env":encl_env,"\uFDD0'op":"\uFDD0'let","\uFDD0'loop":is_loop,"\uFDD0'bindings":bes,"\uFDD0'statements":statements,"\uFDD0'ret":ret,"\uFDD0'form":form,"\uFDD0'children":cljs.core.into.call(null,cljs.core.vec.call(null,cljs.core.map.call(null,"\uFDD0'init",bes)),cljs.core.conj.call(null,cljs.core.vec.call(null,statements),ret))});
});
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"let*")),(function (op,encl_env,form,_){
return cljs.analyzer.analyze_let.call(null,encl_env,form,false);
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"loop*")),(function (op,encl_env,form,_){
return cljs.analyzer.analyze_let.call(null,encl_env,form,true);
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"recur")),(function (op,env,p__4733,_){
var vec__4734 = p__4733;
var ___$1 = cljs.core.nth.call(null,vec__4734,0,null);
var exprs = cljs.core.nthnext.call(null,vec__4734,1);
var form = vec__4734;
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var frame = cljs.core.first.call(null,cljs.analyzer._STAR_recur_frames_STAR_);
var exprs__$1 = (function (){var _STAR_recur_frames_STAR_4735 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4732_SHARP_){
return cljs.analyzer.analyze.call(null,cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr"),p1__4732_SHARP_);
}),exprs));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4735;
}})();
if(cljs.core.truth_(frame))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't recur here"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,(new cljs.core.Symbol(null,"frame"))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,exprs__$1),cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,frame))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("recur argument count mismatch"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"=")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"count")),(new cljs.core.Symbol(null,"exprs"))),cljs.core.hash_map("\uFDD0'line",515)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"count")),cljs.core.with_meta(cljs.core.list("\uFDD0'params",(new cljs.core.Symbol(null,"frame"))),cljs.core.hash_map("\uFDD0'line",515))),cljs.core.hash_map("\uFDD0'line",515))),cljs.core.hash_map("\uFDD0'line",515))))].join('')));
}
cljs.core.reset_BANG_.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,frame),true);
return cljs.core.assoc.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'recur","\uFDD0'form":form}),"\uFDD0'frame",frame,"\uFDD0'exprs",exprs__$1,"\uFDD0'children",exprs__$1);
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"quote")),(function (_,env,p__4738,___$1){
var vec__4739 = p__4738;
var ___$2 = cljs.core.nth.call(null,vec__4739,0,null);
var x = cljs.core.nth.call(null,vec__4739,1,null);
return cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form"],{"\uFDD0'op":"\uFDD0'constant","\uFDD0'env":env,"\uFDD0'form":x});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"new")),(function (_,env,p__4740,___$1){
var vec__4741 = p__4740;
var ___$2 = cljs.core.nth.call(null,vec__4741,0,null);
var ctor = cljs.core.nth.call(null,vec__4741,1,null);
var args = cljs.core.nthnext.call(null,vec__4741,2);
var form = vec__4741;
if(cljs.core.symbol_QMARK_.call(null,ctor))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("First arg to new must be a symbol"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"ctor"))),cljs.core.hash_map("\uFDD0'line",528))))].join('')));
}
var _STAR_recur_frames_STAR_4742 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var enve = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var ctorexpr = cljs.analyzer.analyze.call(null,enve,ctor);
var argexprs = cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4737_SHARP_){
return cljs.analyzer.analyze.call(null,enve,p1__4737_SHARP_);
}),args));
var known_num_fields = (new cljs.core.Keyword("\uFDD0'num-fields")).call(null,cljs.analyzer.resolve_existing_var.call(null,env,ctor));
var argc = cljs.core.count.call(null,args);
if(cljs.core.truth_((function (){var and__3822__auto__ = known_num_fields;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.not_EQ_.call(null,known_num_fields,argc);
} else
{return and__3822__auto__;
}
})()))
{cljs.analyzer.warning.call(null,env,[cljs.core.str("WARNING: Wrong number of args ("),cljs.core.str(argc),cljs.core.str(") passed to "),cljs.core.str(ctor)].join(''));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'ctor","\uFDD0'args","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'new","\uFDD0'form":form,"\uFDD0'ctor":ctorexpr,"\uFDD0'args":argexprs,"\uFDD0'children":cljs.core.into.call(null,cljs.core.PersistentVector.fromArray([ctorexpr], true),argexprs)});
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4742;
}}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"set!")),(function (_,env,p__4744,___$1){
var vec__4745 = p__4744;
var ___$2 = cljs.core.nth.call(null,vec__4745,0,null);
var target = cljs.core.nth.call(null,vec__4745,1,null);
var val = cljs.core.nth.call(null,vec__4745,2,null);
var alt = cljs.core.nth.call(null,vec__4745,3,null);
var form = vec__4745;
var vec__4746 = (cljs.core.truth_(alt)?cljs.core.PersistentVector.fromArray([cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.list.call(null,(new cljs.core.Symbol(null,"."))),cljs.core.list.call(null,target),cljs.core.list.call(null,val))),alt], true):cljs.core.PersistentVector.fromArray([target,val], true));
var target__$1 = cljs.core.nth.call(null,vec__4746,0,null);
var val__$1 = cljs.core.nth.call(null,vec__4746,1,null);
var _STAR_recur_frames_STAR_4747 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var enve = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var targetexpr = ((cljs.core._EQ_.call(null,target__$1,(new cljs.core.Symbol(null,"*unchecked-if*"))))?(function (){cljs.core.reset_BANG_.call(null,cljs.analyzer._STAR_unchecked_if_STAR_,val__$1);
return "\uFDD0'cljs.analyzer/set-unchecked-if";
})():((cljs.core.symbol_QMARK_.call(null,target__$1))?(function (){var local_4749 = target__$1.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_((function (){var or__3824__auto__ = (local_4749 == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = (new cljs.core.Keyword("\uFDD0'field")).call(null,local_4749);
if(cljs.core.truth_(and__3822__auto__))
{return (new cljs.core.Keyword("\uFDD0'mutable")).call(null,local_4749);
} else
{return and__3822__auto__;
}
}
})()))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't set! local var or non-mutable field"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"or")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"nil?")),(new cljs.core.Symbol(null,"local"))),cljs.core.hash_map("\uFDD0'line",560)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list("\uFDD0'field",(new cljs.core.Symbol(null,"local"))),cljs.core.hash_map("\uFDD0'line",561)),cljs.core.with_meta(cljs.core.list("\uFDD0'mutable",(new cljs.core.Symbol(null,"local"))),cljs.core.hash_map("\uFDD0'line",562))),cljs.core.hash_map("\uFDD0'line",561))),cljs.core.hash_map("\uFDD0'line",560))))].join('')));
}
return cljs.analyzer.analyze_symbol.call(null,enve,target__$1);
})():(("\uFDD0'else")?((cljs.core.seq_QMARK_.call(null,target__$1))?(function (){var targetexpr = cljs.analyzer.analyze_seq.call(null,enve,target__$1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'field")).call(null,targetexpr)))
{return targetexpr;
} else
{return null;
}
})():null):null)));
var valexpr = cljs.analyzer.analyze.call(null,enve,val__$1);
if(cljs.core.truth_(targetexpr))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("set! target must be a field or a symbol naming a var"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,(new cljs.core.Symbol(null,"targetexpr"))))].join('')));
}
if(cljs.core._EQ_.call(null,targetexpr,"\uFDD0'cljs.analyzer/set-unchecked-if"))
{return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'no-op"});
} else
{if("\uFDD0'else")
{return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'target","\uFDD0'val","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'set!","\uFDD0'form":form,"\uFDD0'target":targetexpr,"\uFDD0'val":valexpr,"\uFDD0'children":cljs.core.PersistentVector.fromArray([targetexpr,valexpr], true)});
} else
{return null;
}
}
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4747;
}}));
cljs.analyzer.munge_path = (function munge_path(ss){
return clojure.lang.Compiler.munge.call(null,[cljs.core.str(ss)].join(''));
});
cljs.analyzer.ns__GT_relpath = (function ns__GT_relpath(s){
return [cljs.core.str(clojure.string.replace.call(null,cljs.analyzer.munge_path.call(null,s),".","/")),cljs.core.str(".cljs")].join('');
});
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"ns")),(function (_,env,p__4751,___$1){
var vec__4752 = p__4751;
var ___$2 = cljs.core.nth.call(null,vec__4752,0,null);
var name = cljs.core.nth.call(null,vec__4752,1,null);
var args = cljs.core.nthnext.call(null,vec__4752,2);
var form = vec__4752;
var docstring = ((cljs.core.string_QMARK_.call(null,cljs.core.first.call(null,args)))?cljs.core.first.call(null,args):null);
var args__$1 = (cljs.core.truth_(docstring)?cljs.core.next.call(null,args):args);
var excludes = cljs.core.reduce.call(null,(function (s,p__4754){
var vec__4755 = p__4754;
var k = cljs.core.nth.call(null,vec__4755,0,null);
var exclude = cljs.core.nth.call(null,vec__4755,1,null);
var xs = cljs.core.nth.call(null,vec__4755,2,null);
if(cljs.core._EQ_.call(null,k,"\uFDD0'refer-clojure"))
{if(cljs.core._EQ_.call(null,exclude,"\uFDD0'exclude"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Only [:refer-clojure :exclude (names)] form supported"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"=")),(new cljs.core.Symbol(null,"exclude")),"\uFDD0'exclude"),cljs.core.hash_map("\uFDD0'line",601))))].join('')));
}
if(cljs.core.not.call(null,cljs.core.seq.call(null,s)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Only one :refer-clojure form is allowed per namespace definition"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"seq")),(new cljs.core.Symbol(null,"s"))),cljs.core.hash_map("\uFDD0'line",602))),cljs.core.hash_map("\uFDD0'line",602))))].join('')));
}
return cljs.core.into.call(null,s,xs);
} else
{return s;
}
}),cljs.core.PersistentHashSet.EMPTY,args__$1);
var deps = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
var valid_forms = cljs.core.atom.call(null,cljs.core.PersistentHashSet.fromArray(["\uFDD0'import","\uFDD0'use-macros","\uFDD0'require-macros","\uFDD0'require","\uFDD0'use"]));
var error_msg = (function (spec,msg){
return [cljs.core.str(msg),cljs.core.str("; offending spec: "),cljs.core.str(cljs.core.pr_str.call(null,spec))].join('');
});
var parse_require_spec = (function parse_require_spec(macros_QMARK_,spec){
while(true){
if((function (){var or__3824__auto__ = cljs.core.symbol_QMARK_.call(null,spec);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core.vector_QMARK_.call(null,spec);
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Only [lib.ns & options] and lib.ns specs supported in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"or")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",610)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"vector?")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",610))),cljs.core.hash_map("\uFDD0'line",610))))].join('')));
}
if(cljs.core.vector_QMARK_.call(null,spec))
{if(cljs.core.symbol_QMARK_.call(null,cljs.core.first.call(null,spec)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Library name must be specified as a symbol in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"first")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",613))),cljs.core.hash_map("\uFDD0'line",613))))].join('')));
}
if(cljs.core.odd_QMARK_.call(null,cljs.core.count.call(null,spec)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Only :as alias and :refer (names) options supported in :require")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"odd?")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"count")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",615))),cljs.core.hash_map("\uFDD0'line",615))))].join('')));
}
if(cljs.core.every_QMARK_.call(null,cljs.core.PersistentHashSet.fromArray(["\uFDD0'as","\uFDD0'refer"]),cljs.core.map.call(null,cljs.core.first,cljs.core.partition.call(null,2,cljs.core.next.call(null,spec)))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Only :as and :refer options supported in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"every?")),cljs.core.set(["\uFDD0'as","\uFDD0'refer"]),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"map")),(new cljs.core.Symbol(null,"first")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"partition")),2,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"next")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",617))),cljs.core.hash_map("\uFDD0'line",617))),cljs.core.hash_map("\uFDD0'line",617))),cljs.core.hash_map("\uFDD0'line",617))))].join('')));
}
if((function (){var fs = cljs.core.frequencies.call(null,cljs.core.next.call(null,spec));
var and__3822__auto__ = (fs.call(null,"\uFDD0'as",0) <= 1);
if(and__3822__auto__)
{return (fs.call(null,"\uFDD0'refer",0) <= 1);
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Each of :as and :refer options may only be specified once in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"let")),cljs.core.vec([(new cljs.core.Symbol(null,"fs")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"frequencies")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"next")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",619))),cljs.core.hash_map("\uFDD0'line",619))]),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"<=")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"fs")),"\uFDD0'as",0),cljs.core.hash_map("\uFDD0'line",620)),1),cljs.core.hash_map("\uFDD0'line",620)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"<=")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"fs")),"\uFDD0'refer",0),cljs.core.hash_map("\uFDD0'line",621)),1),cljs.core.hash_map("\uFDD0'line",621))),cljs.core.hash_map("\uFDD0'line",620))),cljs.core.hash_map("\uFDD0'line",619))))].join('')));
}
} else
{}
if(cljs.core.symbol_QMARK_.call(null,spec))
{{
var G__4772 = macros_QMARK_;
var G__4773 = cljs.core.PersistentVector.fromArray([spec], true);
macros_QMARK_ = G__4772;
spec = G__4773;
continue;
}
} else
{var vec__4759 = spec;
var lib = cljs.core.nth.call(null,vec__4759,0,null);
var opts = cljs.core.nthnext.call(null,vec__4759,1);
var map__4760 = cljs.core.apply.call(null,cljs.core.hash_map,opts);
var map__4760__$1 = ((cljs.core.seq_QMARK_.call(null,map__4760))?cljs.core.apply.call(null,cljs.core.hash_map,map__4760):map__4760);
var alias = cljs.core._lookup.call(null,map__4760__$1,"\uFDD0'as",lib);
var referred = cljs.core._lookup.call(null,map__4760__$1,"\uFDD0'refer",null);
var vec__4761 = (cljs.core.truth_(macros_QMARK_)?cljs.core.PersistentVector.fromArray(["\uFDD0'require-macros","\uFDD0'use-macros"], true):cljs.core.PersistentVector.fromArray(["\uFDD0'require","\uFDD0'use"], true));
var rk = cljs.core.nth.call(null,vec__4761,0,null);
var uk = cljs.core.nth.call(null,vec__4761,1,null);
if((function (){var or__3824__auto__ = cljs.core.symbol_QMARK_.call(null,alias);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (alias == null);
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,":as must be followed by a symbol in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"or")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"alias"))),cljs.core.hash_map("\uFDD0'line",628)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"nil?")),(new cljs.core.Symbol(null,"alias"))),cljs.core.hash_map("\uFDD0'line",628))),cljs.core.hash_map("\uFDD0'line",628))))].join('')));
}
if(cljs.core.truth_((function (){var or__3824__auto__ = (function (){var and__3822__auto__ = cljs.core.sequential_QMARK_.call(null,referred);
if(and__3822__auto__)
{return cljs.core.every_QMARK_.call(null,cljs.core.symbol_QMARK_,referred);
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (referred == null);
}
})()))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,":refer must be followed by a sequence of symbols in :require / :require-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"or")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"sequential?")),(new cljs.core.Symbol(null,"referred"))),cljs.core.hash_map("\uFDD0'line",630)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"every?")),(new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"referred"))),cljs.core.hash_map("\uFDD0'line",630))),cljs.core.hash_map("\uFDD0'line",630)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"nil?")),(new cljs.core.Symbol(null,"referred"))),cljs.core.hash_map("\uFDD0'line",631))),cljs.core.hash_map("\uFDD0'line",630))))].join('')));
}
if(cljs.core.truth_(macros_QMARK_))
{} else
{cljs.core.swap_BANG_.call(null,deps,cljs.core.conj,lib);
}
return cljs.core.merge.call(null,(cljs.core.truth_(alias)?cljs.core.PersistentArrayMap.fromArrays([rk],[cljs.core.PersistentArrayMap.fromArrays([alias],[lib])]):null),(cljs.core.truth_(referred)?cljs.core.PersistentArrayMap.fromArrays([uk],[cljs.core.apply.call(null,cljs.core.hash_map,cljs.core.interleave.call(null,referred,cljs.core.repeat.call(null,lib)))]):null));
}
break;
}
});
var use__GT_require = (function use__GT_require(p__4762){
var vec__4764 = p__4762;
var lib = cljs.core.nth.call(null,vec__4764,0,null);
var kw = cljs.core.nth.call(null,vec__4764,1,null);
var referred = cljs.core.nth.call(null,vec__4764,2,null);
var spec = vec__4764;
if((function (){var and__3822__auto__ = cljs.core.symbol_QMARK_.call(null,lib);
if(and__3822__auto__)
{var and__3822__auto____$1 = cljs.core._EQ_.call(null,"\uFDD0'only",kw);
if(and__3822__auto____$1)
{var and__3822__auto____$2 = cljs.core.sequential_QMARK_.call(null,referred);
if(and__3822__auto____$2)
{return cljs.core.every_QMARK_.call(null,cljs.core.symbol_QMARK_,referred);
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Only [lib.ns :only (names)] specs supported in :use / :use-macros")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"lib"))),cljs.core.hash_map("\uFDD0'line",638)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"=")),"\uFDD0'only",(new cljs.core.Symbol(null,"kw"))),cljs.core.hash_map("\uFDD0'line",638)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"sequential?")),(new cljs.core.Symbol(null,"referred"))),cljs.core.hash_map("\uFDD0'line",638)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"every?")),(new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"referred"))),cljs.core.hash_map("\uFDD0'line",638))),cljs.core.hash_map("\uFDD0'line",638))))].join('')));
}
return cljs.core.PersistentVector.fromArray([lib,"\uFDD0'refer",referred], true);
});
var parse_import_spec = (function parse_import_spec(spec){
if((function (){var and__3822__auto__ = cljs.core.symbol_QMARK_.call(null,spec);
if(and__3822__auto__)
{return (cljs.core.namespace.call(null,spec) == null);
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(error_msg.call(null,spec,"Only lib.Ctor specs supported in :import")),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"and")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"symbol?")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",642)),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"nil?")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"namespace")),(new cljs.core.Symbol(null,"spec"))),cljs.core.hash_map("\uFDD0'line",642))),cljs.core.hash_map("\uFDD0'line",642))),cljs.core.hash_map("\uFDD0'line",642))))].join('')));
}
cljs.core.swap_BANG_.call(null,deps,cljs.core.conj,spec);
var ctor_sym = cljs.core.symbol.call(null,cljs.core.last.call(null,clojure.string.split.call(null,[cljs.core.str(spec)].join(''),/\./)));
return cljs.core.ObjMap.fromObject(["\uFDD0'import","\uFDD0'require"],{"\uFDD0'import":cljs.core.PersistentArrayMap.fromArrays([ctor_sym],[spec]),"\uFDD0'require":cljs.core.PersistentArrayMap.fromArrays([ctor_sym],[spec])});
});
var spec_parsers = cljs.core.ObjMap.fromObject(["\uFDD0'require","\uFDD0'require-macros","\uFDD0'use","\uFDD0'use-macros","\uFDD0'import"],{"\uFDD0'require":cljs.core.partial.call(null,parse_require_spec,false),"\uFDD0'require-macros":cljs.core.partial.call(null,parse_require_spec,true),"\uFDD0'use":cljs.core.comp.call(null,cljs.core.partial.call(null,parse_require_spec,false),use__GT_require),"\uFDD0'use-macros":cljs.core.comp.call(null,cljs.core.partial.call(null,parse_require_spec,true),use__GT_require),"\uFDD0'import":parse_import_spec});
var map__4753 = cljs.core.reduce.call(null,(function (m,p__4765){
var vec__4766 = p__4765;
var k = cljs.core.nth.call(null,vec__4766,0,null);
var libs = cljs.core.nthnext.call(null,vec__4766,1);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray(["\uFDD0'import","\uFDD0'use-macros","\uFDD0'require-macros","\uFDD0'require","\uFDD0'use"]).call(null,k)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Only :refer-clojure, :require, :require-macros, :use and :use-macros libspecs supported"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list(cljs.core.set(["\uFDD0'import","\uFDD0'use-macros","\uFDD0'require-macros","\uFDD0'require","\uFDD0'use"]),(new cljs.core.Symbol(null,"k"))),cljs.core.hash_map("\uFDD0'line",655))))].join('')));
}
if(cljs.core.truth_(cljs.core.deref.call(null,valid_forms).call(null,k)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Only one "),cljs.core.str(k),cljs.core.str(" form is allowed per namespace definition")].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list(cljs.core.list((new cljs.core.Symbol(null,"clojure.core/deref")),(new cljs.core.Symbol(null,"valid-forms"))),(new cljs.core.Symbol(null,"k"))),cljs.core.hash_map("\uFDD0'line",657))))].join('')));
}
cljs.core.swap_BANG_.call(null,valid_forms,cljs.core.disj,k);
return cljs.core.apply.call(null,cljs.core.merge_with,cljs.core.merge,m,cljs.core.map.call(null,spec_parsers.call(null,k),libs));
}),cljs.core.ObjMap.EMPTY,cljs.core.remove.call(null,(function (p__4767){
var vec__4768 = p__4767;
var r = cljs.core.nth.call(null,vec__4768,0,null);
return cljs.core._EQ_.call(null,r,"\uFDD0'refer-clojure");
}),args__$1));
var map__4753__$1 = ((cljs.core.seq_QMARK_.call(null,map__4753))?cljs.core.apply.call(null,cljs.core.hash_map,map__4753):map__4753);
var params = map__4753__$1;
var uses = cljs.core._lookup.call(null,map__4753__$1,"\uFDD0'use",null);
var requires = cljs.core._lookup.call(null,map__4753__$1,"\uFDD0'require",null);
var uses_macros = cljs.core._lookup.call(null,map__4753__$1,"\uFDD0'use-macros",null);
var requires_macros = cljs.core._lookup.call(null,map__4753__$1,"\uFDD0'require-macros",null);
var imports = cljs.core._lookup.call(null,map__4753__$1,"\uFDD0'import",null);
if(cljs.core.seq.call(null,cljs.core.deref.call(null,deps)))
{cljs.core.println.call(null,"// **** Skipping analyze-deps ****");
} else
{}
cljs.analyzer._STAR_cljs_ns_STAR_ = name;
cljs.core._STAR_ns_sym_STAR_ = name;
var G__4769_4774 = cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.vals.call(null,requires_macros),cljs.core.vals.call(null,uses_macros)));
while(true){
if(G__4769_4774)
{var nsym_4775 = cljs.core.first.call(null,G__4769_4774);
cljs.core.require.call(null,nsym_4775);
{
var G__4776 = cljs.core.next.call(null,G__4769_4774);
G__4769_4774 = G__4776;
continue;
}
} else
{}
break;
}
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,(function (p1__4750_SHARP_){
return cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,p1__4750_SHARP_,cljs.core.PersistentVector.fromArray([name,"\uFDD0'name"], true),name),cljs.core.PersistentVector.fromArray([name,"\uFDD0'doc"], true),docstring),cljs.core.PersistentVector.fromArray([name,"\uFDD0'excludes"], true),excludes),cljs.core.PersistentVector.fromArray([name,"\uFDD0'uses"], true),uses),cljs.core.PersistentVector.fromArray([name,"\uFDD0'requires"], true),requires),cljs.core.PersistentVector.fromArray([name,"\uFDD0'uses-macros"], true),uses_macros),cljs.core.PersistentVector.fromArray([name,"\uFDD0'requires-macros"], true),cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__4770){
var vec__4771 = p__4770;
var alias = cljs.core.nth.call(null,vec__4771,0,null);
var nsym = cljs.core.nth.call(null,vec__4771,1,null);
return cljs.core.PersistentVector.fromArray([alias,cljs.core.find_ns.call(null,nsym)], true);
}),requires_macros))),cljs.core.PersistentVector.fromArray([name,"\uFDD0'imports"], true),imports);
}));
return cljs.core.ObjMap.fromObject(["\uFDD0'requires","\uFDD0'form","\uFDD0'op","\uFDD0'name","\uFDD0'excludes","\uFDD0'env","\uFDD0'imports","\uFDD0'doc","\uFDD0'uses","\uFDD0'uses-macros","\uFDD0'requires-macros"],{"\uFDD0'requires":requires,"\uFDD0'form":form,"\uFDD0'op":"\uFDD0'ns","\uFDD0'name":name,"\uFDD0'excludes":excludes,"\uFDD0'env":env,"\uFDD0'imports":imports,"\uFDD0'doc":docstring,"\uFDD0'uses":uses,"\uFDD0'uses-macros":uses_macros,"\uFDD0'requires-macros":requires_macros});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"deftype*")),(function (_,env,p__4777,___$1){
var vec__4778 = p__4777;
var ___$2 = cljs.core.nth.call(null,vec__4778,0,null);
var tsym = cljs.core.nth.call(null,vec__4778,1,null);
var fields = cljs.core.nth.call(null,vec__4778,2,null);
var pmasks = cljs.core.nth.call(null,vec__4778,3,null);
var form = vec__4778;
var t = (new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_var.call(null,cljs.core.dissoc.call(null,env,"\uFDD0'locals"),tsym));
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'defs",tsym], true),(function (m){
var m__$1 = cljs.core.assoc.call(null,(function (){var or__3824__auto__ = m;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),"\uFDD0'name",t,"\uFDD0'type",true,"\uFDD0'num-fields",cljs.core.count.call(null,fields));
return cljs.core.merge.call(null,m__$1,cljs.core.ObjMap.fromObject(["\uFDD0'protocols"],{"\uFDD0'protocols":(new cljs.core.Keyword("\uFDD0'protocols")).call(null,cljs.core.meta.call(null,tsym))}),(function (){var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'line")).call(null,env);
if(cljs.core.truth_(temp__3974__auto__))
{var line = temp__3974__auto__;
return cljs.core.ObjMap.fromObject(["\uFDD0'file","\uFDD0'line"],{"\uFDD0'file":cljs.analyzer._STAR_cljs_file_STAR_,"\uFDD0'line":line});
} else
{return null;
}
})());
}));
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0't","\uFDD0'fields","\uFDD0'pmasks"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'deftype*","\uFDD0'form":form,"\uFDD0't":t,"\uFDD0'fields":fields,"\uFDD0'pmasks":pmasks});
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"defrecord*")),(function (_,env,p__4780,___$1){
var vec__4781 = p__4780;
var ___$2 = cljs.core.nth.call(null,vec__4781,0,null);
var tsym = cljs.core.nth.call(null,vec__4781,1,null);
var fields = cljs.core.nth.call(null,vec__4781,2,null);
var pmasks = cljs.core.nth.call(null,vec__4781,3,null);
var form = vec__4781;
var t = (new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_var.call(null,cljs.core.dissoc.call(null,env,"\uFDD0'locals"),tsym));
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'defs",tsym], true),(function (m){
var m__$1 = cljs.core.assoc.call(null,(function (){var or__3824__auto__ = m;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),"\uFDD0'name",t,"\uFDD0'type",true);
return cljs.core.merge.call(null,m__$1,cljs.core.ObjMap.fromObject(["\uFDD0'protocols"],{"\uFDD0'protocols":(new cljs.core.Keyword("\uFDD0'protocols")).call(null,cljs.core.meta.call(null,tsym))}),(function (){var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'line")).call(null,env);
if(cljs.core.truth_(temp__3974__auto__))
{var line = temp__3974__auto__;
return cljs.core.ObjMap.fromObject(["\uFDD0'file","\uFDD0'line"],{"\uFDD0'file":cljs.analyzer._STAR_cljs_file_STAR_,"\uFDD0'line":line});
} else
{return null;
}
})());
}));
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0't","\uFDD0'fields","\uFDD0'pmasks"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'defrecord*","\uFDD0'form":form,"\uFDD0't":t,"\uFDD0'fields":fields,"\uFDD0'pmasks":pmasks});
}));
cljs.analyzer.property_symbol_QMARK_ = (function property_symbol_QMARK_(p1__4779_SHARP_){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto__ = cljs.core.symbol_QMARK_.call(null,p1__4779_SHARP_);
if(and__3822__auto__)
{return cljs.core.re_matches.call(null,/^-.*/,cljs.core.name.call(null,p1__4779_SHARP_));
} else
{return and__3822__auto__;
}
})());
});
cljs.analyzer.classify_dot_form = (function classify_dot_form(p__4783){
var vec__4785 = p__4783;
var target = cljs.core.nth.call(null,vec__4785,0,null);
var member = cljs.core.nth.call(null,vec__4785,1,null);
var args = cljs.core.nth.call(null,vec__4785,2,null);
return cljs.core.PersistentVector.fromArray([(((target == null))?"\uFDD0'cljs.analyzer/error":(("\uFDD0'default")?"\uFDD0'cljs.analyzer/expr":null)),(cljs.core.truth_(cljs.analyzer.property_symbol_QMARK_.call(null,member))?"\uFDD0'cljs.analyzer/property":((cljs.core.symbol_QMARK_.call(null,member))?"\uFDD0'cljs.analyzer/symbol":((cljs.core.seq_QMARK_.call(null,member))?"\uFDD0'cljs.analyzer/list":(("\uFDD0'default")?"\uFDD0'cljs.analyzer/error":null)))),(((args == null))?cljs.core.List.EMPTY:(("\uFDD0'default")?"\uFDD0'cljs.analyzer/expr":null))], true);
});
cljs.analyzer.build_dot_form = (function (){var method_table__2190__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2191__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2192__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2193__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2194__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("build-dot-form",(function (p1__4782_SHARP_){
return cljs.analyzer.classify_dot_form.call(null,p1__4782_SHARP_);
}),"\uFDD0'default",hierarchy__2194__auto__,method_table__2190__auto__,prefer_table__2191__auto__,method_cache__2192__auto__,cached_hierarchy__2193__auto__));
})();
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,cljs.core.PersistentVector.fromArray(["\uFDD0'cljs.analyzer/expr","\uFDD0'cljs.analyzer/property",cljs.core.List.EMPTY], true),(function (p__4786){
var vec__4787 = p__4786;
var target = cljs.core.nth.call(null,vec__4787,0,null);
var prop = cljs.core.nth.call(null,vec__4787,1,null);
var _ = cljs.core.nth.call(null,vec__4787,2,null);
return cljs.core.ObjMap.fromObject(["\uFDD0'dot-action","\uFDD0'target","\uFDD0'field"],{"\uFDD0'dot-action":"\uFDD0'cljs.analyzer/access","\uFDD0'target":target,"\uFDD0'field":cljs.core.symbol.call(null,cljs.core.name.call(null,prop).substring(1))});
}));
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,cljs.core.PersistentVector.fromArray(["\uFDD0'cljs.analyzer/expr","\uFDD0'cljs.analyzer/property","\uFDD0'cljs.analyzer/list"], true),(function (p__4788){
var vec__4789 = p__4788;
var target = cljs.core.nth.call(null,vec__4789,0,null);
var prop = cljs.core.nth.call(null,vec__4789,1,null);
var args = cljs.core.nth.call(null,vec__4789,2,null);
throw (new Error([cljs.core.str("Cannot provide arguments "),cljs.core.str(args),cljs.core.str(" on property access "),cljs.core.str(prop)].join('')));
}));
/**
* Builds the intermediate method call map used to reason about the parsed form during
* compilation.
*/
cljs.analyzer.build_method_call = (function build_method_call(target,meth,args){
if(cljs.core.symbol_QMARK_.call(null,meth))
{return cljs.core.ObjMap.fromObject(["\uFDD0'dot-action","\uFDD0'target","\uFDD0'method","\uFDD0'args"],{"\uFDD0'dot-action":"\uFDD0'cljs.analyzer/call","\uFDD0'target":target,"\uFDD0'method":meth,"\uFDD0'args":args});
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'dot-action","\uFDD0'target","\uFDD0'method","\uFDD0'args"],{"\uFDD0'dot-action":"\uFDD0'cljs.analyzer/call","\uFDD0'target":target,"\uFDD0'method":cljs.core.first.call(null,meth),"\uFDD0'args":args});
}
});
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,cljs.core.PersistentVector.fromArray(["\uFDD0'cljs.analyzer/expr","\uFDD0'cljs.analyzer/symbol","\uFDD0'cljs.analyzer/expr"], true),(function (p__4790){
var vec__4791 = p__4790;
var target = cljs.core.nth.call(null,vec__4791,0,null);
var meth = cljs.core.nth.call(null,vec__4791,1,null);
var args = cljs.core.nth.call(null,vec__4791,2,null);
return cljs.analyzer.build_method_call.call(null,target,meth,args);
}));
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,cljs.core.PersistentVector.fromArray(["\uFDD0'cljs.analyzer/expr","\uFDD0'cljs.analyzer/symbol",cljs.core.List.EMPTY], true),(function (p__4792){
var vec__4793 = p__4792;
var target = cljs.core.nth.call(null,vec__4793,0,null);
var meth = cljs.core.nth.call(null,vec__4793,1,null);
var args = cljs.core.nth.call(null,vec__4793,2,null);
return cljs.analyzer.build_method_call.call(null,target,meth,args);
}));
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,cljs.core.PersistentVector.fromArray(["\uFDD0'cljs.analyzer/expr","\uFDD0'cljs.analyzer/list",cljs.core.List.EMPTY], true),(function (p__4794){
var vec__4795 = p__4794;
var target = cljs.core.nth.call(null,vec__4795,0,null);
var meth_expr = cljs.core.nth.call(null,vec__4795,1,null);
var _ = cljs.core.nth.call(null,vec__4795,2,null);
return cljs.analyzer.build_method_call.call(null,target,cljs.core.first.call(null,meth_expr),cljs.core.rest.call(null,meth_expr));
}));
cljs.core._add_method.call(null,cljs.analyzer.build_dot_form,"\uFDD0'default",(function (dot_form){
throw (new Error([cljs.core.str("Unknown dot form of "),cljs.core.str(cljs.core.list_STAR_.call(null,(new cljs.core.Symbol(null,".")),dot_form)),cljs.core.str(" with classification "),cljs.core.str(cljs.analyzer.classify_dot_form.call(null,dot_form))].join('')));
}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,".")),(function (_,env,p__4798,___$1){
var vec__4799 = p__4798;
var ___$2 = cljs.core.nth.call(null,vec__4799,0,null);
var target = cljs.core.nth.call(null,vec__4799,1,null);
var vec__4800 = cljs.core.nthnext.call(null,vec__4799,2);
var field = cljs.core.nth.call(null,vec__4800,0,null);
var member_PLUS_ = cljs.core.nthnext.call(null,vec__4800,1);
var form = vec__4799;
var _STAR_recur_frames_STAR_4801 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var map__4803 = cljs.analyzer.build_dot_form.call(null,cljs.core.PersistentVector.fromArray([target,field,member_PLUS_], true));
var map__4803__$1 = ((cljs.core.seq_QMARK_.call(null,map__4803))?cljs.core.apply.call(null,cljs.core.hash_map,map__4803):map__4803);
var args = cljs.core._lookup.call(null,map__4803__$1,"\uFDD0'args",null);
var field__$1 = cljs.core._lookup.call(null,map__4803__$1,"\uFDD0'field",null);
var method = cljs.core._lookup.call(null,map__4803__$1,"\uFDD0'method",null);
var target__$1 = cljs.core._lookup.call(null,map__4803__$1,"\uFDD0'target",null);
var dot_action = cljs.core._lookup.call(null,map__4803__$1,"\uFDD0'dot-action",null);
var enve = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var targetexpr = cljs.analyzer.analyze.call(null,enve,target__$1);
var G__4804 = dot_action;
if(cljs.core._EQ_.call(null,"\uFDD0'cljs.analyzer/call",G__4804))
{var argexprs = cljs.core.map.call(null,(function (p1__4796_SHARP_){
return cljs.analyzer.analyze.call(null,enve,p1__4796_SHARP_);
}),args);
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'target","\uFDD0'method","\uFDD0'args","\uFDD0'children","\uFDD0'tag"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'dot","\uFDD0'form":form,"\uFDD0'target":targetexpr,"\uFDD0'method":method,"\uFDD0'args":argexprs,"\uFDD0'children":cljs.core.into.call(null,cljs.core.PersistentVector.fromArray([targetexpr], true),argexprs),"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,form))});
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'cljs.analyzer/access",G__4804))
{return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'target","\uFDD0'field","\uFDD0'children","\uFDD0'tag"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'dot","\uFDD0'form":form,"\uFDD0'target":targetexpr,"\uFDD0'field":field__$1,"\uFDD0'children":cljs.core.PersistentVector.fromArray([targetexpr], true),"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,form))});
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(dot_action)].join('')));
} else
{return null;
}
}
}
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4801;
}}));
cljs.core._add_method.call(null,cljs.analyzer.parse,(new cljs.core.Symbol(null,"js*")),(function (op,env,p__4806,_){
var vec__4807 = p__4806;
var ___$1 = cljs.core.nth.call(null,vec__4807,0,null);
var jsform = cljs.core.nth.call(null,vec__4807,1,null);
var args = cljs.core.nthnext.call(null,vec__4807,2);
var form = vec__4807;
if(cljs.core.string_QMARK_.call(null,jsform))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"string?")),(new cljs.core.Symbol(null,"jsform"))),cljs.core.hash_map("\uFDD0'line",793))))].join('')));
}
if(cljs.core.truth_(args))
{var _STAR_recur_frames_STAR_4808 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var seg = (function seg(s){
var idx = s.indexOf("~{");
if(cljs.core._EQ_.call(null,-1,idx))
{return cljs.core.list.call(null,s);
} else
{var end = s.indexOf("}",idx);
return cljs.core.cons.call(null,cljs.core.subs.call(null,s,0,idx),seg.call(null,cljs.core.subs.call(null,s,(end + 1))));
}
});
var enve = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var argexprs = cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4797_SHARP_){
return cljs.analyzer.analyze.call(null,enve,p1__4797_SHARP_);
}),args));
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'segs","\uFDD0'args","\uFDD0'tag","\uFDD0'form","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'js","\uFDD0'segs":seg.call(null,jsform),"\uFDD0'args":argexprs,"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,form)),"\uFDD0'form":form,"\uFDD0'children":argexprs});
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4808;
}} else
{var interp = (function interp(s){
var idx = s.indexOf("~{");
if(cljs.core._EQ_.call(null,-1,idx))
{return cljs.core.list.call(null,s);
} else
{var end = s.indexOf("}",idx);
var inner = (new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_existing_var.call(null,env,cljs.core.symbol.call(null,cljs.core.subs.call(null,s,(2 + idx),end))));
return cljs.core.cons.call(null,cljs.core.subs.call(null,s,0,idx),cljs.core.cons.call(null,inner,interp.call(null,cljs.core.subs.call(null,s,(end + 1)))));
}
});
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'code","\uFDD0'tag"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'js","\uFDD0'form":form,"\uFDD0'code":cljs.core.apply.call(null,cljs.core.str,interp.call(null,jsform)),"\uFDD0'tag":(new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,form))});
}
}));
cljs.analyzer.parse_invoke = (function parse_invoke(env,p__4810){
var vec__4815 = p__4810;
var f = cljs.core.nth.call(null,vec__4815,0,null);
var args = cljs.core.nthnext.call(null,vec__4815,1);
var form = vec__4815;
var _STAR_recur_frames_STAR_4816 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
var enve = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var fexpr = cljs.analyzer.analyze.call(null,enve,f);
var argexprs = cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4805_SHARP_){
return cljs.analyzer.analyze.call(null,enve,p1__4805_SHARP_);
}),args));
var argc = cljs.core.count.call(null,args);
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_warn_fn_arity_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{return (new cljs.core.Keyword("\uFDD0'fn-var")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,fexpr));
} else
{return and__3822__auto__;
}
})()))
{var map__4818_4819 = (new cljs.core.Keyword("\uFDD0'info")).call(null,fexpr);
var map__4818_4820__$1 = ((cljs.core.seq_QMARK_.call(null,map__4818_4819))?cljs.core.apply.call(null,cljs.core.hash_map,map__4818_4819):map__4818_4819);
var name_4821 = cljs.core._lookup.call(null,map__4818_4820__$1,"\uFDD0'name",null);
var method_params_4822 = cljs.core._lookup.call(null,map__4818_4820__$1,"\uFDD0'method-params",null);
var max_fixed_arity_4823 = cljs.core._lookup.call(null,map__4818_4820__$1,"\uFDD0'max-fixed-arity",null);
var variadic_4824 = cljs.core._lookup.call(null,map__4818_4820__$1,"\uFDD0'variadic",null);
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.core.not.call(null,cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([argc]),cljs.core.map.call(null,cljs.core.count,method_params_4822)));
if(and__3822__auto__)
{var or__3824__auto__ = cljs.core.not.call(null,variadic_4824);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto____$1 = variadic_4824;
if(cljs.core.truth_(and__3822__auto____$1))
{return (argc < max_fixed_arity_4823);
} else
{return and__3822__auto____$1;
}
}
} else
{return and__3822__auto__;
}
})()))
{cljs.analyzer.warning.call(null,env,[cljs.core.str("WARNING: Wrong number of args ("),cljs.core.str(argc),cljs.core.str(") passed to "),cljs.core.str(name_4821)].join(''));
} else
{}
} else
{}
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_warn_fn_deprecated_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = (new cljs.core.Keyword("\uFDD0'deprecated")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,fexpr));
if(cljs.core.truth_(and__3822__auto____$1))
{return cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'deprecation-nowarn")).call(null,cljs.core.meta.call(null,form)));
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})()))
{cljs.analyzer.warning.call(null,env,[cljs.core.str("WARNING: "),cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,fexpr))),cljs.core.str(" is deprecated.")].join(''));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'op","\uFDD0'form","\uFDD0'f","\uFDD0'args","\uFDD0'tag","\uFDD0'children"],{"\uFDD0'env":env,"\uFDD0'op":"\uFDD0'invoke","\uFDD0'form":form,"\uFDD0'f":fexpr,"\uFDD0'args":argexprs,"\uFDD0'tag":(function (){var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'tag")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,fexpr));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'tag")).call(null,cljs.core.meta.call(null,form));
}
})(),"\uFDD0'children":cljs.core.into.call(null,cljs.core.PersistentVector.fromArray([fexpr], true),argexprs)});
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4816;
}});
/**
* Finds the var associated with sym
*/
cljs.analyzer.analyze_symbol = (function analyze_symbol(env,sym){
var ret = cljs.core.ObjMap.fromObject(["\uFDD0'env","\uFDD0'form"],{"\uFDD0'env":env,"\uFDD0'form":sym});
var lb = sym.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(lb))
{return cljs.core.assoc.call(null,ret,"\uFDD0'op","\uFDD0'var","\uFDD0'info",lb);
} else
{return cljs.core.assoc.call(null,ret,"\uFDD0'op","\uFDD0'var","\uFDD0'info",cljs.analyzer.resolve_existing_var.call(null,env,sym));
}
});
cljs.analyzer.get_expander = (function get_expander(sym,env){
var mvar = (cljs.core.truth_((function (){var or__3824__auto__ = sym.call(null,(new cljs.core.Keyword("\uFDD0'locals")).call(null,env));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var and__3822__auto__ = (function (){var or__3824__auto____$1 = sym.call(null,(new cljs.core.Keyword("\uFDD0'excludes")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)));
if(cljs.core.truth_(or__3824__auto____$1))
{return or__3824__auto____$1;
} else
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'excludes",sym], true));
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.not.call(null,(function (){var or__3824__auto____$1 = sym.call(null,(new cljs.core.Keyword("\uFDD0'uses-macros")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)));
if(cljs.core.truth_(or__3824__auto____$1))
{return or__3824__auto____$1;
} else
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0'name")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),"\uFDD0'uses-macros",sym], true));
}
})());
} else
{return and__3822__auto__;
}
}
})())?null:(function (){var temp__3971__auto__ = cljs.core.namespace.call(null,sym);
if(cljs.core.truth_(temp__3971__auto__))
{var nstr = temp__3971__auto__;
var temp__3971__auto____$1 = cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'requires-macros")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)),cljs.core.symbol.call(null,nstr),null);
if(cljs.core.truth_(temp__3971__auto____$1))
{var ns = temp__3971__auto____$1;
return cljs.core.get_in.call(null,ns,cljs.core.PersistentVector.fromArray(["\uFDD0'defs",cljs.core.symbol.call(null,cljs.core.name.call(null,sym))], true));
} else
{return cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),sym);
}
} else
{var temp__3971__auto____$1 = sym.call(null,(new cljs.core.Keyword("\uFDD0'uses-macros")).call(null,(new cljs.core.Keyword("\uFDD0'ns")).call(null,env)));
if(cljs.core.truth_(temp__3971__auto____$1))
{var nsym = temp__3971__auto____$1;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.namespaces),cljs.core.PersistentVector.fromArray([nsym,"\uFDD0'defs",sym], true));
} else
{return cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),sym);
}
}
})());
if(cljs.core.truth_((function (){var and__3822__auto__ = mvar;
if(cljs.core.truth_(and__3822__auto__))
{return (new cljs.core.Keyword("\uFDD0'macro?")).call(null,mvar);
} else
{return and__3822__auto__;
}
})()))
{return eval([cljs.core.str(cljs.compiler.munge.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,mvar)))].join(''));
} else
{return null;
}
});
cljs.analyzer.macroexpand_1 = (function macroexpand_1(env,form){
var op = cljs.core.first.call(null,form);
if(cljs.core.truth_(cljs.analyzer.specials.call(null,op)))
{return form;
} else
{var temp__3971__auto__ = (function (){var and__3822__auto__ = cljs.core.symbol_QMARK_.call(null,op);
if(and__3822__auto__)
{return cljs.analyzer.get_expander.call(null,op,env);
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(temp__3971__auto__))
{var mac = temp__3971__auto__;
var _STAR_ns_sym_STAR_4828 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.analyzer._STAR_cljs_ns_STAR_;
return cljs.core.apply.call(null,mac,form,env,cljs.core.rest.call(null,form));
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_4828;
}} else
{if(cljs.core.symbol_QMARK_.call(null,op))
{var opname = [cljs.core.str(op)].join('');
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,opname),"."))
{var vec__4830 = cljs.core.next.call(null,form);
var target = cljs.core.nth.call(null,vec__4830,0,null);
var args = cljs.core.nthnext.call(null,vec__4830,1);
return cljs.core.with_meta.call(null,cljs.core.list_STAR_.call(null,(new cljs.core.Symbol(null,".")),target,cljs.core.symbol.call(null,cljs.core.subs.call(null,opname,1)),args),cljs.core.meta.call(null,form));
} else
{if(cljs.core._EQ_.call(null,cljs.core.last.call(null,opname),"."))
{return cljs.core.with_meta.call(null,cljs.core.list_STAR_.call(null,(new cljs.core.Symbol(null,"new")),cljs.core.symbol.call(null,cljs.core.subs.call(null,opname,0,(cljs.core.count.call(null,opname) - 1))),cljs.core.next.call(null,form)),cljs.core.meta.call(null,form));
} else
{if("\uFDD0'else")
{return form;
} else
{return null;
}
}
}
} else
{return form;
}
}
}
});
cljs.analyzer.analyze_seq = (function analyze_seq(env,form,name){
var env__$1 = cljs.core.assoc.call(null,env,"\uFDD0'line",(function (){var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'line")).call(null,cljs.core.meta.call(null,form));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'line")).call(null,env);
}
})());
var op = cljs.core.first.call(null,form);
if(!((op == null)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't call nil"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not")),cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"nil?")),(new cljs.core.Symbol(null,"op"))),cljs.core.hash_map("\uFDD0'line",892))),cljs.core.hash_map("\uFDD0'line",892))))].join('')));
}
var mform = cljs.analyzer.macroexpand_1.call(null,env__$1,form);
if((form === mform))
{if(cljs.core.truth_(cljs.analyzer.specials.call(null,op)))
{return cljs.analyzer.parse.call(null,op,env__$1,form,name);
} else
{return cljs.analyzer.parse_invoke.call(null,env__$1,form);
}
} else
{return cljs.analyzer.analyze.call(null,env__$1,mform,name);
}
});
cljs.analyzer.analyze_map = (function analyze_map(env,form,name){
var expr_env = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var simple_keys_QMARK_ = cljs.core.every_QMARK_.call(null,(function (p1__4831_SHARP_){
var or__3824__auto__ = cljs.core.string_QMARK_.call(null,p1__4831_SHARP_);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core.keyword_QMARK_.call(null,p1__4831_SHARP_);
}
}),cljs.core.keys.call(null,form));
var ks = (function (){var _STAR_recur_frames_STAR_4839 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4832_SHARP_){
return cljs.analyzer.analyze.call(null,expr_env,p1__4832_SHARP_,name);
}),cljs.core.keys.call(null,form)));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4839;
}})();
var vs = (function (){var _STAR_recur_frames_STAR_4841 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4833_SHARP_){
return cljs.analyzer.analyze.call(null,expr_env,p1__4833_SHARP_,name);
}),cljs.core.vals.call(null,form)));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4841;
}})();
return cljs.analyzer.analyze_wrap_meta.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form","\uFDD0'keys","\uFDD0'vals","\uFDD0'simple-keys?","\uFDD0'children"],{"\uFDD0'op":"\uFDD0'map","\uFDD0'env":env,"\uFDD0'form":form,"\uFDD0'keys":ks,"\uFDD0'vals":vs,"\uFDD0'simple-keys?":simple_keys_QMARK_,"\uFDD0'children":cljs.core.vec.call(null,cljs.core.interleave.call(null,ks,vs))}),name);
});
cljs.analyzer.analyze_vector = (function analyze_vector(env,form,name){
var expr_env = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var items = (function (){var _STAR_recur_frames_STAR_4846 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4834_SHARP_){
return cljs.analyzer.analyze.call(null,expr_env,p1__4834_SHARP_,name);
}),form));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4846;
}})();
return cljs.analyzer.analyze_wrap_meta.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form","\uFDD0'items","\uFDD0'children"],{"\uFDD0'op":"\uFDD0'vector","\uFDD0'env":env,"\uFDD0'form":form,"\uFDD0'items":items,"\uFDD0'children":items}),name);
});
cljs.analyzer.analyze_set = (function analyze_set(env,form,name){
var expr_env = cljs.core.assoc.call(null,env,"\uFDD0'context","\uFDD0'expr");
var items = (function (){var _STAR_recur_frames_STAR_4850 = cljs.analyzer._STAR_recur_frames_STAR_;
try{cljs.analyzer._STAR_recur_frames_STAR_ = cljs.core.cons.call(null,null,cljs.analyzer._STAR_recur_frames_STAR_);
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4843_SHARP_){
return cljs.analyzer.analyze.call(null,expr_env,p1__4843_SHARP_,name);
}),form));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR_4850;
}})();
return cljs.analyzer.analyze_wrap_meta.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form","\uFDD0'items","\uFDD0'children"],{"\uFDD0'op":"\uFDD0'set","\uFDD0'env":env,"\uFDD0'form":form,"\uFDD0'items":items,"\uFDD0'children":items}),name);
});
cljs.analyzer.analyze_wrap_meta = (function analyze_wrap_meta(expr,name){
var form = (new cljs.core.Keyword("\uFDD0'form")).call(null,expr);
if(cljs.core.truth_(cljs.core.meta.call(null,form)))
{var env = (new cljs.core.Keyword("\uFDD0'env")).call(null,expr);
var expr__$1 = cljs.core.assoc_in.call(null,expr,cljs.core.PersistentVector.fromArray(["\uFDD0'env","\uFDD0'context"], true),"\uFDD0'expr");
var meta_expr = cljs.analyzer.analyze_map.call(null,(new cljs.core.Keyword("\uFDD0'env")).call(null,expr__$1),cljs.core.meta.call(null,form),name);
return cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form","\uFDD0'meta","\uFDD0'expr","\uFDD0'children"],{"\uFDD0'op":"\uFDD0'meta","\uFDD0'env":env,"\uFDD0'form":form,"\uFDD0'meta":meta_expr,"\uFDD0'expr":expr__$1,"\uFDD0'children":cljs.core.PersistentVector.fromArray([meta_expr,expr__$1], true)});
} else
{return expr;
}
});
/**
* Given an environment, a map containing {:locals (mapping of names to bindings), :context
* (one of :statement, :expr, :return), :ns (a symbol naming the
* compilation ns)}, and form, returns an expression object (a map
* containing at least :form, :op and :env keys). If expr has any (immediately)
* nested exprs, must have :children [exprs...] entry. This will
* facilitate code walking without knowing the details of the op set.
*/
cljs.analyzer.analyze = (function() {
var analyze = null;
var analyze__2 = (function (env,form){
return analyze.call(null,env,form,null);
});
var analyze__3 = (function (env,form,name){
var form__$1 = ((cljs.core.instance_QMARK_.call(null,cljs.core.LazySeq,form))?(function (){var or__3824__auto__ = cljs.core.seq.call(null,form);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core.List.EMPTY;
}
})():form);
if(cljs.core.symbol_QMARK_.call(null,form__$1))
{return cljs.analyzer.analyze_symbol.call(null,env,form__$1);
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.core.seq_QMARK_.call(null,form__$1);
if(and__3822__auto__)
{return cljs.core.seq.call(null,form__$1);
} else
{return and__3822__auto__;
}
})()))
{return cljs.analyzer.analyze_seq.call(null,env,form__$1,name);
} else
{if(cljs.core.map_QMARK_.call(null,form__$1))
{return cljs.analyzer.analyze_map.call(null,env,form__$1,name);
} else
{if(cljs.core.vector_QMARK_.call(null,form__$1))
{return cljs.analyzer.analyze_vector.call(null,env,form__$1,name);
} else
{if(cljs.core.set_QMARK_.call(null,form__$1))
{return cljs.analyzer.analyze_set.call(null,env,form__$1,name);
} else
{if(cljs.core.keyword_QMARK_.call(null,form__$1))
{return cljs.analyzer.analyze_keyword.call(null,env,form__$1);
} else
{if("\uFDD0'else")
{return cljs.core.ObjMap.fromObject(["\uFDD0'op","\uFDD0'env","\uFDD0'form"],{"\uFDD0'op":"\uFDD0'constant","\uFDD0'env":env,"\uFDD0'form":form__$1});
} else
{return null;
}
}
}
}
}
}
}
});
analyze = function(env,form,name){
switch(arguments.length){
case 2:
return analyze__2.call(this,env,form);
case 3:
return analyze__3.call(this,env,form,name);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
analyze.cljs$lang$arity$2 = analyze__2;
analyze.cljs$lang$arity$3 = analyze__3;
return analyze;
})()
;
cljs.analyzer.analyze_file = (function analyze_file(f){
var raw_string = cljs.io.file_read.call(null,f);
var _STAR_cljs_ns_STAR_4856 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_cljs_file_STAR_4857 = cljs.analyzer._STAR_cljs_file_STAR_;
var _STAR_ns_sym_STAR_4858 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.analyzer._STAR_cljs_ns_STAR_ = (new cljs.core.Symbol(null,"cljs.user"));
cljs.analyzer._STAR_cljs_file_STAR_ = f;
cljs.core._STAR_ns_sym_STAR_ = cljs.analyzer._STAR_reader_ns_name_STAR_;
var env = cljs.analyzer.empty_env.call(null);
var pbr = reader.string_push_back_reader.call(null,raw_string);
var eof = (new Object());
var r = cljs.reader.read.call(null,pbr,false,eof,false);
while(true){
var env__$1 = cljs.core.assoc.call(null,env,"\uFDD0'ns",cljs.core.find_ns.call(null,cljs.analyzer._STAR_cljs_ns_STAR_));
if((eof === r))
{return null;
} else
{cljs.analyzer.analyze.call(null,env__$1,r);
{
var G__4860 = cljs.reader.read.call(null,pbr,false,eof,false);
r = G__4860;
continue;
}
}
break;
}
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_4858;
cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR_4857;
cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_4856;
}});

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"cljs.analyzer"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__4861__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__4861 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4861__delegate.call(this, m);
};
G__4861.cljs$lang$maxFixedArity = 0;
G__4861.cljs$lang$applyTo = (function (arglist__4862){
var m = cljs.core.seq(arglist__4862);;
return G__4861__delegate(m);
});
G__4861.cljs$lang$arity$variadic = G__4861__delegate;
return G__4861;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"analyze")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form"))]),cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Given an environment, a map containing {:locals (mapping of names to bindings), :context\n  (one of :statement, :expr, :return), :ns (a symbol naming the\n  compilation ns)}, and form, returns an expression object (a map\n  containing at least :form, :op and :env keys). If expr has any (immediately)\n  nested exprs, must have :children [exprs...] entry. This will\n  facilitate code walking without knowing the details of the op set.","\uFDD0'line",936,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-block")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"exprs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"exprs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-block")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","returns {:statements .. :ret ..}","\uFDD0'line",220,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-fn-deprecated*")),cljs.core.hash_map("\uFDD0'line",43,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-fn-deprecated*"))),(new cljs.core.Symbol(null,"ns->relpath")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/ns->relpath")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",581,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-macros-is-classpath*")),cljs.core.hash_map("\uFDD0'line",48,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-macros-is-classpath*"))),(new cljs.core.Symbol(null,"load-core")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/load-core")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",51,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"resolve-existing-var")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/resolve-existing-var")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",106,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"classify-dot-form")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.vec([(new cljs.core.Symbol(null,"target")),(new cljs.core.Symbol(null,"member")),(new cljs.core.Symbol(null,"args"))])]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4783")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/classify-dot-form")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",719,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-let")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"encl-env")),cljs.core.vec([(new cljs.core.Symbol(null,"_")),(new cljs.core.Symbol(null,"bindings")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"exprs")),"\uFDD0'as",(new cljs.core.Symbol(null,"form"))]),(new cljs.core.Symbol(null,"is-loop"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"encl-env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4710")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"is-loop")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-let")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",458,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-on-redef*")),cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-on-redef*"))),(new cljs.core.Symbol(null,"*cljs-warn-protocol-deprecated*")),cljs.core.hash_map("\uFDD0'line",44,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-protocol-deprecated*"))),(new cljs.core.Symbol(null,"*cljs-static-fns*")),cljs.core.hash_map("\uFDD0'line",46,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-static-fns*"))),(new cljs.core.Symbol(null,"munge-path")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ss"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ss")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/munge-path")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",578,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-on-dynamic*")),cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-on-dynamic*"))),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"property-symbol?")),cljs.core.hash_map("\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p1__4779#")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/property-symbol?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",717,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"confirm-bindings")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"names"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"names")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/confirm-bindings")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",192,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-fn-arity*")),cljs.core.hash_map("\uFDD0'line",42,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-fn-arity*"))),(new cljs.core.Symbol(null,"resolve-var")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/resolve-var")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",155,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-macros-path*")),cljs.core.hash_map("\uFDD0'line",47,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-macros-path*"))),(new cljs.core.Symbol(null,"analyze-file")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",(new cljs.core.Symbol(null,"String")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-file")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",959,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"build-dot-form")),cljs.core.hash_map("\uFDD0'line",730,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/build-dot-form"))),(new cljs.core.Symbol(null,"get-expander")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sym")),(new cljs.core.Symbol(null,"env"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/get-expander")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",848,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-seq")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-seq")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",886,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"locals")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"type"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"locals")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"type")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",4,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",357,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-set")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-set")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",920,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"macroexpand-1")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/macroexpand-1")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",866,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"resolve-ns-alias")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/resolve-ns-alias")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",96,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"analyze-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",902,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"core-name?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/core-name?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Is sym visible from core in the current compilation namespace?","\uFDD0'line",100,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"-cljs-macros-loaded")),cljs.core.hash_map("\uFDD0'line",49,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/-cljs-macros-loaded"))),(new cljs.core.Symbol(null,"*cljs-file*")),cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-file*"))),(new cljs.core.Symbol(null,"specials")),cljs.core.hash_map("\uFDD0'line",203,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/specials"))),(new cljs.core.Symbol(null,"analyze-wrap-meta")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"expr")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"expr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-wrap-meta")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",926,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*loop-lets*")),cljs.core.hash_map("\uFDD0'line",206,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*loop-lets*"))),(new cljs.core.Symbol(null,"analyze-vector")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"form")),(new cljs.core.Symbol(null,"name"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"name")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-vector")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",914,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*unchecked-if*")),cljs.core.hash_map("\uFDD0'line",45,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*unchecked-if*"))),(new cljs.core.Symbol(null,"parse")),cljs.core.hash_map("\uFDD0'line",230,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/parse"))),(new cljs.core.Symbol(null,"block-children")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret"))]),"\uFDD0'as",(new cljs.core.Symbol(null,"block")))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4674")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/block-children")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",249,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-on-undeclared*")),cljs.core.hash_map("\uFDD0'line",25,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-on-undeclared*"))),(new cljs.core.Symbol(null,"build-method-call")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"target")),(new cljs.core.Symbol(null,"meth")),(new cljs.core.Symbol(null,"args"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"target")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"meth")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"args")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/build-method-call")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Builds the intermediate method call map used to reason about the parsed form during\n  compilation.","\uFDD0'line",743,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"empty-env")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/empty-env")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",75,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*reader-ns-name*")),cljs.core.hash_map("\uFDD0'line",32,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*reader-ns-name*"))),(new cljs.core.Symbol(null,"*cljs-ns*")),cljs.core.hash_map("\uFDD0'line",37,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-ns*"))),(new cljs.core.Symbol(null,"analyze-keyword")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-keyword")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",211,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"confirm-var-exists")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"prefix")),(new cljs.core.Symbol(null,"suffix"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"prefix")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"suffix")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/confirm-var-exists")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",88,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"warning")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/warning")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",82,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"*cljs-warn-on-fn-var*")),cljs.core.hash_map("\uFDD0'line",41,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*cljs-warn-on-fn-var*"))),(new cljs.core.Symbol(null,"*recur-frames*")),cljs.core.hash_map("\uFDD0'line",205,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/*recur-frames*"))),(new cljs.core.Symbol(null,"analyze-symbol")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/analyze-symbol")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Finds the var associated with sym","\uFDD0'line",837,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs"),(new cljs.core.Symbol(null,"parse-invoke")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"env")),cljs.core.vec([(new cljs.core.Symbol(null,"f")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"args")),"\uFDD0'as",(new cljs.core.Symbol(null,"form"))])]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"env")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4810")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer/parse-invoke")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",816,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/analyzer.cljs")),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map((new cljs.core.Symbol(null,"disallowing-recur")),(new cljs.core.Symbol(null,"cljs.analyzer-macros"))),"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"string")),(new cljs.core.Symbol(null,"clojure.string")),(new cljs.core.Symbol(null,"io")),(new cljs.core.Symbol(null,"cljs.io"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([(new cljs.core.Symbol(null,"macroexpand-1")),(new cljs.core.Symbol(null,"*unchecked-if*"))]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.analyzer"))),old);
}));
