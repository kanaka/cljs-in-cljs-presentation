if(System.support.webgl === false){

    var message = document.createElement( 'div' );
    message.style.cssText = 'font-family:monospace;font-size:13px;text-align:center;color:#fff;background:#333;padding:1em;width:540px;margin:30em auto 0';
    message.innerHTML = 'Either your graphics card or your browser does not support WebGL.<br /><a href="http://www.khronos.org/webgl/wiki_1_15/index.php/Getting_a_WebGL_Implementation">View a list</a> of WebGL compatible browsers.';
    document.body.appendChild( message );
    document.body.style.background = '#000000';

} else {

    var locations = [
        33.768, -118.196, 0.01,
        -6.333,  145.874, 0.01,
        -2.016,  146.571, 0.01,
        -6.333,  145.874, 0.01,
        40.454,  -85.498, 0.01,
        30.060,   31.219, 0.01,
        40.454,  -85.498, 0.01,
        42.791,  -71.525, 0.01,
        32.757,  -97.160, 0.01,
        45.523, -122.676, 0.02];

    positions = [
        [4.310, -0.395, 800, ""],
        [2.625,  0.585, 450, ""],  // Long Beach
        [0.968, -0.120, 350, ""], // Ukarumpa
        [0.977, -0.042, 275, ""], // Lessau
        [0.977, -0.042, 275, "'kanaka'"], // Lessau
        [2.985,  0.565, 400, ""],  // Duncanville (Arlington)
        [2.985,  0.565, 400, "8th grade. Boo!"],  // Duncanville (Arlington)
        [0.968, -0.120, 350, "Much Better"], // Ukarumpa
        [3.200,  0.700, 400, "Taylor U"],  // Upland
        [5.250,  0.515, 400, ""],  // Zamalek
        [5.250,  0.515, 400, "Cairo is awesome!"],  // Zamalek
        [3.200,  0.700, 400, ""],  // Upland
        [3.200,  0.700, 400, "Taylor U. CS Dept"],  // Upland
        [3.450,  0.740, 350, ""],  // Deerwood
        [3.450,  0.740, 350, "Compaq"],  // Deerwood
        [3.450,  0.740, 350, "HP"],  // Deerwood
        [3.450,  0.740, 350, "Red Hat"],  // Deerwood
        [3.450,  0.740, 350, "SiCortex"],  // Deerwood
        [3.000,  0.565, 350, ""],  // Arlington
        [3.000,  0.565, 350, "SiCortex"],  // Arlington
        [3.000,  0.565, 350, "SIL"],  // Arlington
        [3.000,  0.565, 350, "Sentry Data Systems"],  // Arlington
        [3.000,  0.565, 350, "LonoCloud"],  // Arlington
        [2.550,  0.787, 400, ""], // Portland
        [2.550,  0.787, 400, "Clojure/West!"]]; // Portland


    var container = document.getElementById('container');
    DAT.backgroundImage = "land_shallow_topo_8192.jpg";
    var globe = new DAT.Globe(container);

    globe.addData(locations, {format: 'magnitude', name: "locations", animated: true});
    globe.createPoints();
    new TWEEN.Tween(globe).to({time: 0},500).easing(TWEEN.Easing.Cubic.Out).start();
    globe.animate();

    var animate = function(){
        requestAnimationFrame(animate);
        TWEEN.update();
    }

    animate();

    function pos(p) {
        var data = positions[p]
            cap = document.getElementById("caption");
        window.location.hash = "#" + p;
        new TWEEN.Tween(globe).to({x: data[0], y: data[1], dist: data[2]},1000)
                 .easing(TWEEN.Easing.Cubic.Out)
                 .start()
        console.log("here1:", data[3]);
        if (data[3]) {
            cap.innerHTML = data[3];
            cap.style.display = "block";
        } else {
            cap.innerHTML = "";
            cap.style.display = "none";
        }
    }

    var start_pos = parseInt(window.location.hash.substr(1),10) || 0;
    curPosition = start_pos % positions.length;
    pos(curPosition);

    function handleKey(e) {
        var len = positions.length;
        switch (e.keyCode) {
            case 37:
                curPosition = (len + --curPosition)%len;
                pos(curPosition);
                break;
            case 39:
                curPosition = (len + ++curPosition)%len;
                pos(curPosition);
                break;
        }
    };
    document.addEventListener('keydown', handleKey, false);
}


