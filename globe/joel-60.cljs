(ns joel-60)

(def locations [
    33.768, -118.196, 0.01,
    -6.333,  145.874, 0.01,
    -2.016,  146.571, 0.01,
    -6.333,  145.874, 0.01,
    40.454,  -85.498, 0.01,
    30.060,   31.219, 0.01,
    40.454,  -85.498, 0.01,
    42.791,  -71.525, 0.01,
    32.757,  -97.160, 0.01,
    45.523, -122.676, 0.02])

(def positions [
    [4.310, -0.395, 800, nil],
    [2.625,  0.585, 450, nil],  ;; Long Beach
    [0.968, -0.120, 350, nil], ;; Ukarumpa
    [0.977, -0.042, 275, nil], ;; Lessau
    [0.977, -0.042, 275, "'kanaka'"], ;; Lessau
    [2.985,  0.565, 400, nil],  ;; Duncanville (Arlington)
    [2.985,  0.565, 400, "8th grade. Boo!"],  ;; Duncanville (Arlington)
    [0.968, -0.120, 350, nil], ;; Ukarumpa
    [0.968, -0.120, 350, "Much Better"], ;; Ukarumpa
    [3.200,  0.700, 400, "Taylor U"],  ;; Upland
    [5.250,  0.515, 400, nil],  ;; Zamalek
    [5.250,  0.515, 400, "Cairo is awesome!"],  ;; Zamalek
    [3.200,  0.700, 400, nil],  ;; Upland
    [3.200,  0.700, 400, "Taylor U. CS Dept"],  ;; Upland
    [3.450,  0.740, 350, nil],  ;; Deerwood
    [3.450,  0.740, 350, "Compaq"],  ;; Deerwood
    [3.450,  0.740, 350, "HP"],  ;; Deerwood
    [3.450,  0.740, 350, "Red Hat"],  ;; Deerwood
    [3.450,  0.740, 350, "SiCortex"],  ;; Deerwood
    [3.000,  0.565, 350, nil],  ;; Arlington
    [3.000,  0.565, 350, "SiCortex"],  ;; Arlington
    [3.000,  0.565, 350, "SIL"],  ;; Arlington
    [3.000,  0.565, 350, "Sentry Data Systems"],  ;; Arlington
    [3.000,  0.565, 350, "LonoCloud"],  ;; Arlington
    [2.550,  0.787, 400, nil], ;; Portland
    [2.550,  0.787, 400, "Clojure/West!"]]) ;; Portland

(def current-position (atom 0))

;; From here: https://gist.github.com/semperos/1658431
;; Original from here: http://mmcgrana.github.com/2011/09/clojurescript-nodejs.html
(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
  other ClojureScript colls into JavaScript arrays, and ClojureScript
  keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.-strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (into-array (map clj->js x))
    :else x))

(defn animate [& args]
  (js/requestAnimationFrame animate)
  (.update js/TWEEN))

(defn set-pos [globe p]
  (let [[x y dist caption] (nth positions p)
        cap (.getElementById js/document "caption")]
    (set! (.-hash (.-location js/window)) (str "#" p))
    (doto (js/TWEEN.Tween. globe)
          (.to (clj->js {:x x :y y :dist dist}) 1000)
          (.easing js/TWEEN.Easing.Cubic.Out)
          (.start))
    (if caption
      (do
        (set! (.-innerHTML cap) caption)
        (set! (.-display (.-style cap)) "block"))
      (do
        (set! (.-innerHTML cap) "")
        (set! (.-display (.-style cap)) "none")))))


(defn start []
  ;; Set the background earth texture image
  (set! (.-backgroundImage js/DAT) "land_shallow_topo_8192.jpg")
  (let [container (.getElementById js/document "container")
        hash-num (js/parseInt (.. js/window -location -hash (substr 1)) 10)
        _ (.dir js/console (clj->js locations))
        globe (doto (js/DAT.Globe. container)
                    (.addData (clj->js locations)
                              (clj->js {:format "magnitude"
                                        :name "locations"
                                        :animated true}))
                    (.createPoints))]

    (doto (js/TWEEN.Tween. globe)
          (.to (clj->js {:time 0}) 500)
          (.easing js/TWEEN.Easing.Cubic.Out)
          (.start))
    (.animate globe)
    (animate)

    (set-pos globe (reset! current-position
                     (mod (if (integer? hash-num)
                              hash-num
                              0)
                       (count positions))))

    (.addEventListener js/document "keydown"
      (fn [event]
        (let [len (count positions)
              posf (fn [f] (swap! current-position #(mod (+ len (f %)) len)))]
          (condp = (.-keyCode event)
            37 (set-pos globe (posf dec))
            39 (set-pos globe (posf inc))
            nil))) false)))

        


