goog.provide('nodecljs');
goog.require('cljs.core');
goog.require('cljs.repl');
/**
* @param {...*} var_args
*/
nodecljs._main = (function() { 
var _main__delegate = function (file,args){
cljs.repl.init.call(null);
cljs.core._STAR_out_STAR_ = (function (p1__2726_SHARP_){
return process.stdout.write(p1__2726_SHARP_);
});
cljs.core._STAR_rtn_STAR_ = cljs.core.identity;
cljs.core._STAR_err_STAR_ = (function (p1__2727_SHARP_){
return process.stderr.write(p1__2727_SHARP_);
});
cljs.core._STAR_print_fn_STAR_ = (function (p1__2728_SHARP_){
return cljs.core._STAR_out_STAR_.call(null,p1__2728_SHARP_);
});
var fs = require("fs");
var text = fs.readFileSync(file).toString();
var ret = cljs.repl.read_eval_print.call(null,text);
return process.exit(((cljs.core.number_QMARK_.call(null,ret))?ret:0));
};
var _main = function (file,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return _main__delegate.call(this, file, args);
};
_main.cljs$lang$maxFixedArity = 1;
_main.cljs$lang$applyTo = (function (arglist__3206){
var file = cljs.core.first(arglist__3206);
var args = cljs.core.rest(arglist__3206);
return _main__delegate(file, args);
});
_main.cljs$lang$arity$variadic = _main__delegate;
return _main;
})()
;
cljs.core._STAR_main_cli_fn_STAR_ = nodecljs._main;
