(ns tempest_debug
  (:require [tempest]
            [webconsole]))

(defn add-dom [tag & [k1 v1 k2 v2 k3 v3]]
  (let [e (.createElement js/document tag)]
    (when k1 (aset e k1 v1))
    (when k2 (aset e k2 v2))
    (when k3 (aset e k3 v3))
    (.appendChild (.-head js/document) e)
    e))

;(add-dom "script" "src" "http://kanaka.github.com/clojurescript/web/vendor/jq-console/jqconsole.min.js")

(add-dom "div" "id" "console" "title" "ClojureScript Debug REPL")

(defn debug []
  (webconsole/console "#console")
  (js* "$('#console').dialog({minWidth: 500, minHeight: 400, width: 700, right: 50});"))
