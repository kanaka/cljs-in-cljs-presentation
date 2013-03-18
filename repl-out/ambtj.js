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
}catch (e3180){if(cljs.core.instance_QMARK_.call(null,Error,e3180))
{var e = e3180;
return cljs.core.ObjMap.fromObject(["\uFDD0'error","\uFDD0'line-number"],{"\uFDD0'error":e,"\uFDD0'line-number":cljs.reader.get_line_number.call(null,rdr)});
} else
{if("\uFDD0'else")
{throw e3180;
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
var G__3181 = output;
last_output = G__3181;
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
cljs.repl.print_error = (function print_error(p__3182){
var map__3184 = p__3182;
var map__3184__$1 = ((cljs.core.seq_QMARK_.call(null,map__3184))?cljs.core.apply.call(null,cljs.core.hash_map,map__3184):map__3184);
var line_number = cljs.core._lookup.call(null,map__3184__$1,"\uFDD0'line-number",null);
var error = cljs.core._lookup.call(null,map__3184__$1,"\uFDD0'error",null);
return cljs.core.print.call(null,error,"at line",line_number);
});
cljs.repl.read_eval_print = (function read_eval_print(input){
var evaluated = cljs.repl.evaluate_code.call(null,input);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'error")).call(null,evaluated)))
{var _STAR_out_STAR_3192 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_err_STAR_;
return cljs.repl.print_error.call(null,evaluated);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3192;
}} else
{try{var _STAR_out_STAR_3197_3199 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_rtn_STAR_;
cljs.core.pr.call(null,(new cljs.core.Keyword("\uFDD0'value")).call(null,evaluated));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3197_3199;
}return (new cljs.core.Keyword("\uFDD0'value")).call(null,evaluated);
}catch (e3194){if(cljs.core.instance_QMARK_.call(null,Error,e3194))
{var e = e3194;
var _STAR_out_STAR_3195 = cljs.core._STAR_out_STAR_;
try{cljs.core._STAR_out_STAR_ = cljs.core._STAR_err_STAR_;
return cljs.core.println.call(null,cljs.repl.err);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3195;
}} else
{if("\uFDD0'else")
{throw e3194;
} else
{return null;
}
}
}}
});
cljs.repl.complete_form_QMARK_ = (function complete_form_QMARK_(text){
try{cljs.reader.read_string.call(null,text);
return true;
}catch (e3204){if(cljs.core.instance_QMARK_.call(null,Error,e3204))
{var e = e3204;
return cljs.core.not.call(null,cljs.core.re_find.call(null,/EOF while reading/,e.message));
} else
{if("\uFDD0'else")
{throw e3204;
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
cljs.core._STAR_out_STAR_ = (function (p1__3200_SHARP_){
return console.log(p1__3200_SHARP_.replace(/\n$/,""));
});
cljs.core._STAR_rtn_STAR_ = cljs.core.identity;
cljs.core._STAR_err_STAR_ = (function (p1__3201_SHARP_){
return console.error(p1__3201_SHARP_.replace(/\n$/,""));
});
return cljs.core._STAR_print_fn_STAR_ = (function (p1__3202_SHARP_){
return cljs.core._STAR_out_STAR_.call(null,p1__3202_SHARP_);
});
}
});
