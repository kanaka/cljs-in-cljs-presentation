goog.addDependency("base.js", ['goog'], []);
goog.addDependency("../cljs/core.js", ['cljs.core'], ['goog.string', 'goog.array', 'goog.object', 'goog.string.format', 'goog.string.StringBuffer']);
goog.addDependency("../cljs/io.js", ['cljs.io'], ['cljs.core']);
goog.addDependency("../clojure/string.js", ['clojure.string'], ['cljs.core', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency("../cljs/analyzer.js", ['cljs.analyzer'], ['cljs.io', 'cljs.core', 'clojure.string']);
goog.addDependency("../cljs/reader.js", ['cljs.reader'], ['cljs.analyzer', 'cljs.core', 'goog.string', 'clojure.string']);
goog.addDependency("../cljs/compiler.js", ['cljs.compiler'], ['cljs.io', 'cljs.analyzer', 'cljs.core', 'clojure.string', 'cljs.reader']);
goog.addDependency("../ambtj.js", ['cljs.repl', 'cljs.user'], ['cljs.core', 'cljs.reader', 'cljs.compiler', 'cljs.analyzer']);
