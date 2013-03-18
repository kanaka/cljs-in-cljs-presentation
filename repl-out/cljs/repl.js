goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
cljs.repl._STAR_debug_STAR_ = false;
cljs.repl.prompt = (function prompt(){
return [cljs.core.str(cljs.core._STAR_ns_sym_STAR_),cljs.core.str("=> ")].join('');
});
/**
* Evaluates next clojure form in reader. Returns a map, containing
* either resulting value and emitted javascript, or an error
* object, or {:finished true}.
*/
cljs.repl.evaluate_next_form = (function evaluate_next_form(rdr){
try{var form = cljs.reader.read.call(null,rdr,false,"\uFDD0'cljs.repl/finished-reading");
var _ = (cljs.core.truth_(cljs.repl._STAR_debug_STAR_)?cljs.core.println.call(null,"READ:",cljs.core.pr_str.call(null,form)):null);
if(cljs.core._EQ_.call(null,form,"\uFDD0'cljs.repl/finished-reading"))
{return cljs.core.ObjMap.fromObject(["\uFDD0'finished"],{"\uFDD0'finished":true});
} else
{var env = cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),"\uFDD0'context","\uFDD0'expr");
var body = cljs.analyzer.analyze.call(null,env,form);
var ___$1 = (cljs.core.truth_(cljs.repl._STAR_debug_STAR_)?cljs.core.println.call(null,"ANALYZED:",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,body))):null);
var res = cljs.compiler.emit_str.call(null,body);
var ___$2 = (cljs.core.truth_(cljs.repl._STAR_debug_STAR_)?cljs.core.println.call(null,"EMITTED:",cljs.core.pr_str.call(null,res)):null);
var value = eval(res);
return cljs.core.ObjMap.fromObject(["\uFDD0'value","\uFDD0'js"],{"\uFDD0'value":value,"\uFDD0'js":res});
}
}catch (e3210){if(cljs.core.instance_QMARK_.call(null,Error,e3210))
{var e = e3210;
return cljs.core.ObjMap.fromObject(["\uFDD0'error","\uFDD0'line-number"],{"\uFDD0'error":e,"\uFDD0'line-number":cljs.reader.get_line_number.call(null,rdr)});
} else
{if("\uFDD0'else")
{throw e3210;
} else
{return null;
}
}
}});
/**
* Evaluates some text from REPL input. If multiple forms are
* present, evaluates in sequence until one throws an error
* or the last form is reached. The map resulting from calling
* evaluate-next-form on the last form is returned. *1, *2, *3,
* and *e are updated appropriately.
*/
cljs.repl.evaluate_code = (function evaluate_code(text){
var rdr = cljs.reader.indexing_push_back_reader.call(null,text);
var last_output = null;
while(true){
var output = cljs.repl.evaluate_next_form.call(null,rdr);
if(cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'finished")).call(null,output)))
{var temp__3971__auto__ = (new cljs.core.Keyword("\uFDD0'error")).call(null,output);
if(cljs.core.truth_(temp__3971__auto__))
{var err = temp__3971__auto__;
cljs.core._STAR_e = err;
return output;
} else
{{
var G__3211 = output;
last_output = G__3211;
continue;
}
}
} else
{cljs.core._STAR_3 = cljs.core._STAR_2;
cljs.core._STAR_2 = cljs.core._STAR_1;
cljs.core._STAR_1 = (new cljs.core.Keyword("\uFDD0'value")).call(null,last_output);
return last_output;
}
break;
}
});
cljs.repl.print_error = (function print_error(p__3212){
var map__3214 = p__3212;
var map__3214__$1 = ((cljs.core.seq_QMARK_.call(null,map__3214))?cljs.core.apply.call(null,cljs.core.hash_map,map__3214):map__3214);
var line_number = cljs.core._lookup.call(null,map__3214__$1,"\uFDD0'line-number",null);
var error = cljs.core._lookup.call(null,map__3214__$1,"\uFDD0'error",null);
return cljs.core.print.call(null,error,"at line",line_number);
});
cljs.repl.read_eval_print = (function read_eval_print(input){
var evaluated = cljs.repl.evaluate_code.call(null,input);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'error")).call(null,evaluated)))
{var _STAR_out_STAR_3222 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_err_STAR_;
return cljs.repl.print_error.call(null,evaluated);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3222;
}} else
{try{var _STAR_out_STAR_3227_3229 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_rtn_STAR_;
cljs.core.pr.call(null,(new cljs.core.Keyword("\uFDD0'value")).call(null,evaluated));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3227_3229;
}return (new cljs.core.Keyword("\uFDD0'value")).call(null,evaluated);
}catch (e3224){if(cljs.core.instance_QMARK_.call(null,Error,e3224))
{var e = e3224;
var _STAR_out_STAR_3225 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_err_STAR_;
return cljs.core.println.call(null,cljs.repl.err);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3225;
}} else
{if("\uFDD0'else")
{throw e3224;
} else
{return null;
}
}
}}
});
cljs.repl.complete_form_QMARK_ = (function complete_form_QMARK_(text){
try{cljs.reader.read_string.call(null,text);
return true;
}catch (e3234){if(cljs.core.instance_QMARK_.call(null,Error,e3234))
{var e = e3234;
return cljs.core.not.call(null,cljs.core.re_find.call(null,/EOF while reading/,e.message));
} else
{if("\uFDD0'else")
{throw e3234;
} else
{return null;
}
}
}});
cljs.repl.init = (function init(){
if(cljs.core.truth_(cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.compiler._STAR_emitted_provides_STAR_),cljs.core.symbol.call(null,"cljs.user"),null)))
{return null;
} else
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,cljs.core.symbol.call(null,"cljs.user"));
goog.provide("cljs.user");
cljs.core._STAR_ns_sym_STAR_ = cljs.core.symbol.call(null,"cljs.user");
cljs.core._STAR_out_STAR_ = (function (p1__3230_SHARP_){
return console.log(p1__3230_SHARP_.replace(/\n$/,""));
});
cljs.core._STAR_rtn_STAR_ = cljs.core.identity;
cljs.core._STAR_err_STAR_ = (function (p1__3231_SHARP_){
return console.error(p1__3231_SHARP_.replace(/\n$/,""));
});
return cljs.core._STAR_print_fn_STAR_ = (function (p1__3232_SHARP_){
return cljs.core._STAR_out_STAR_.call(null,p1__3232_SHARP_);
});
}
});

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"cljs.repl"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__3235__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__3235 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3235__delegate.call(this, m);
};
G__3235.cljs$lang$maxFixedArity = 0;
G__3235.cljs$lang$applyTo = (function (arglist__3236){
var m = cljs.core.seq(arglist__3236);;
return G__3235__delegate(m);
});
G__3235.cljs$lang$arity$variadic = G__3235__delegate;
return G__3235;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"evaluate-code")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"text"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"text")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/evaluate-code")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Evaluates some text from REPL input. If multiple forms are\n   present, evaluates in sequence until one throws an error\n   or the last form is reached. The map resulting from calling\n   evaluate-next-form on the last form is returned. *1, *2, *3,\n   and *e are updated appropriately.","\uFDD0'line",30,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"evaluate-next-form")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/evaluate-next-form")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Evaluates next clojure form in reader. Returns a map, containing\n   either resulting value and emitted javascript, or an error\n   object, or {:finished true}.","\uFDD0'line",10,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"init")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/init")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",70,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"*debug*")),cljs.core.hash_map("\uFDD0'line",6,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/*debug*"))),(new cljs.core.Symbol(null,"complete-form?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"text"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"text")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/complete-form?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",63,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"prompt")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/prompt")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",8,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"print-error")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"error")),(new cljs.core.Symbol(null,"line-number"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__3212")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/print-error")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",50,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs"),(new cljs.core.Symbol(null,"read-eval-print")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"input"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"input")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl/read-eval-print")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",53,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/repl.cljs")),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"cljs.reader")),(new cljs.core.Symbol(null,"comp")),(new cljs.core.Symbol(null,"cljs.compiler")),(new cljs.core.Symbol(null,"ana")),(new cljs.core.Symbol(null,"cljs.analyzer"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.repl"))),old);
}));
