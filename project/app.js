// Global variables for WebGL context, shader program, and matrices
let gl, program;
let modelViewMatrix;

// Arrays to store points, normals, and colors for the scene
let points = [];
let normals = [];
let colors = [];

// Arrays to store diffuse and specular values for the lighting
let diffuseVals = [];
let specularVals = [];

// Camera position and orientation
let eye = [0, 0, 5];
let at = [0, 0, 0];
let up = [0, 1, 0];

// Light properties
let light, ambient;
light = {
  'ambient': [1, 1, 1, 1.0], // Reduce ambient light for a more dramatic effect
  'diffuse': [1.0, 1.0, 1.0, 1.0],
  'specular': [1.0, 1.0, 1.0, 1.0],
  'location': [0.0, 0.0, 0.0, 1.0], // The sun will be at the origin
}

// Material properties for the objects in the scene
material = {
  'ambient': [1, 0.2, 0.2, 1.0],
  'diffuse': [1.0, 1.0, 0.0, 1.0], // Modify the diffuse color for the spheres
  'specular': [1.0, 1.0, 1.0, 1.0],
  'shininess': 40.0,
}

// Variables to store the 3D objects in the scene
let sun, bluePlanet, greenPlanet, brownPlanet;

// Camera angles and distance from the scene
let cameraTheta = 45;
let cameraPhi = 35.264;
let cameraDistance = 5;

// Perspective parameters for the camera
let fovy = 75;
let aspect = 1;
let near = 0.1;
let far = 100;

// Function that runs after the page is loaded
onload = () => {
  // Get the canvas element and set up the WebGL context
  let canvas = document.getElementById("webgl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("No webgl for you");
    return;
  }

  // Initialize shaders and program
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Enable depth testing for 3D rendering
  gl.enable(gl.DEPTH_TEST);

  // Set the clear color for the canvas (black with transparency)
  gl.clearColor(0, 0, 0, 0.9);

  // Set up ambient light for the scene
  ambient = getSpecular();

  // Create the 3D objects and set up the scene
  sun = drawSphere(sun, 0, 0.7, [1.0, 0.5, 0.0, 1.0]);
  bluePlanet = drawSphere(bluePlanet, 1.2, 0.2, [0.0, 0.0, 1.0, 1.0]);
  brownPlanet = drawSphere(brownPlanet, 2, 0.3, [0.2, 0.2, 0.0, 1.0]);

  greenPlanet = sphere();
  greenPlanet.scale(0.1, 0.1, 0.1);
  greenPlanet.rotate(0, [1, 1, 1]);
  greenPlanet.translate(-1.5, 1, 0.5);
  bluePlanet.translate(-1.5, 1, 1)
  brownPlanet.translate(-1.5, -1, -2)

  // Concatenate the vertices, normals, and colors of the 3D objects
  points = points.concat(greenPlanet.TriangleVertices);
  normals = normals.concat(greenPlanet.TriangleNormals);
  colors = colors.concat(greenPlanet.TriangleVertexColors);

  // Create and bind the buffer for the vertices
  let vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // Create and bind the buffer for the colors
  let cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  let vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  // Get the uniform locations for lighting and matrices
  ambientProduct = gl.getUniformLocation(program, "ambientProduct");
  diffuseProduct = gl.getUniformLocation(program, "diffuseProduct");
  specularProduct = gl.getUniformLocation(program, "specularProduct");
  modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
  projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
  
  // Add an event listener for keyboard input
  document.addEventListener("keydown", handleKeyDown);

  // Start rendering the scene
  render();
};

// Function to handle keyboard input for camera movement
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      eye[0] += 0.05;
      at[0] += 0.05;
      break;
    case "ArrowRight":
      eye[0] -= 0.05;
      at[0] -= 0.05;
      break;
    case "ArrowUp":
      eye[1] -= 0.05;
      at[1] -= 0.05;
      break;
    case "ArrowDown":
      eye[1] += 0.05;
      at[1] += 0.05;
      break;
    case "d":
    case "D":
      cameraTheta -= 5;
      break;
    case "a":
    case "A":
      cameraTheta += 5;
      break;
    case "w":
    case "W":
      cameraDistance -= 0.1;
      break;
    case "s":
    case "S":
      cameraDistance += 0.1;
      break;
    default:
      return;
  }
  render();
};

// Function to render the scene
function render() {
  // Clear the color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Calculate the camera position and matrix
  let eye = [
    cameraDistance * Math.cos(radians(cameraTheta)) * Math.cos(radians(cameraPhi)),
    cameraDistance * Math.sin(radians(cameraPhi)),
    cameraDistance * Math.sin(radians(cameraTheta)) * Math.cos(radians(cameraPhi)),
  ];

  // Calculate the projection and model-view matrices
  pm = perspective(radians(fovy), aspect, near, far);
  mvm = lookAt(eye, at, up);

  // Set the uniform matrices in the shader program
  gl.uniformMatrix4fv(modelViewMatrix, false, flatten(mvm));
  gl.uniformMatrix4fv(projectionMatrix, false, flatten(pm));

  // Calculate lighting and set the uniform values in the shader program
  gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), getProd('ambient'));
  gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), getProd('diffuse'));
  gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), getProd('specular'));
  gl.uniform1f(gl.getUniformLocation(program, "shininess"), material.shininess);

  // Draw the scene with WebGL
  gl.drawArrays(gl.TRIANGLES, 0, points.length);

  // Request the next animation frame for continuous rendering
  requestAnimationFrame(render);
}

// Function to create a perspective projection matrix
function perspective(fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2);
  let nf = 1 / (near - far);
  let projectionMatrix = [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, (2 * far * near) * nf, 0,
  ];
  return projectionMatrix;
}

// Function to create a sphere and store its data in the global arrays
function drawSphere(planetName, center, radius, color) {
  planetName = sphere(5);
  planetName.scale(radius, radius, radius);
  planetName.translate(center, 0, 0); // Update translation to (center, 0, 0)
  let sphereVertices = planetName.TriangleVertices;

  let sphereColors = [];
  let sphereNormals = [];
  for (let i = 0; i < sphereVertices.length; i++) {
    sphereColors.push(color);
  }
  points = points.concat(sphereVertices);
  colors = colors.concat(sphereColors);
  normals = normals.concat(sphereNormals)
  return planetName;
}

// Function to get the specular values for the scene
function getSpecular() {
  return getProd('specular');
}

// Function to calculate the product of two vectors (used for lighting calculations)
function getProd(component) {
  return mult(light[component], material[component]);
}