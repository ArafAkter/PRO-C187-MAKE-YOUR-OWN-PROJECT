AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();

  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.2,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));
        bullet.addEventListener("collide", this.removeBall);
        var scene = document.querySelector("#scene");

        scene.appendChild(bullet);
      }
    });
  },
  removeBall: function (e) {
    var element = e.detail.target.el;
    var element = e.detail.body.el;

    if (element.id.includes("box")){
      var impulse = new CANNON.Vec3(0,1,-15);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")


      );
      elementHit.body.applyForce(impulse,worldPoint);
      element.removeEventListener("collide", this.removeBall);
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  }
});


