(ns game-of-life-debug
  (:require [ldnclj_dojo_team_5_game_of_life.view]
            [webconsole]))

(defn init []
  (webconsole/console "#console")
  (js* "$('#console').dialog({minWidth: 500, minHeight: 400, width: 700, right: 50});"))
