// Create a basic Three.js scene setup as a library

var MyScene = function () {
    var scene, camera, renderer;

    // Initialize the scene, camera, and renderer
    function init(containerId) {
        // Create the scene
        scene = new THREE.Scene();

        // Create the camera
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        // Create the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(containerId).appendChild(renderer.domElement);
        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    // Render the scene
    function render() {
        renderer.render(scene, camera);
    }

    // Update the scene
    function update() {
        // Add your scene update logic here
    }

    // Handle window resize event
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Set the background color of the scene
    function setBackground(color) {
        scene.background = new THREE.Color(color);
    }
    function setBackgroundImage(imageUrl) {
        var texture = new THREE.TextureLoader().load(imageUrl);
        scene.background = texture;
    }

    // Set the background image of the scene
    function setBackgroundImage360(imageUrl) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imageUrl, function (texture) {
          const generator = new THREE.EquirectangularToCubeGenerator(texture, { resolution: 1024 });
          const cubeTexture = generator.update(renderer);
          scene.background = cubeTexture;
        });
      }
  

    // Public API
    return {
        init: init,
        render: render,
        update: update,
        setBackground: setBackground,
        setBackgroundImage: setBackgroundImage,
        setBackgroundImage360:setBackgroundImage360
    };
};