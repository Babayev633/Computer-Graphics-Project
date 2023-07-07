# CSCI 2408: Computer Graphics - Team Project

- CRN: 30019
- Summer 2023
- Team Project
- **Deadline:** Jul 15, 23:00
- **Student Name Surname ID:** NEEDS TO BE UPDATED
- **Student Name Surname ID:** NEEDS TO BE UPDATED
- **Student Name Surname ID:** NEEDS TO BE UPDATED
- **Student Name Surname ID:** NEEDS TO BE UPDATED
- **Youtube Video Link:** NEEDS TO BE UPDATED

---

Your goal is to work in teams, code a project in WebGL by applying all the knowledge you have learned throughout the semester and assignments 1 and 2, while implementing lighting/reflection model.

---

## Instructions. POINTS WILL BE DEDUCTED FOR NOT FOLLOWING THESE RULES.
- See blackboard course content/recordings for tutorials.
- The base of your code should be built upon the code you have written in your assignments. Not having similarity with assignments and our coding sessions (what we have discussed during the class) may reduce or even nullify your grade.
- Your code should be **READABLE**. Your variable and function names should be clear. You should comment if necessary. You should write functions to simplify repeated code. For example:
```js 
function drawSphere(center, radius, color) {
    // Function Logic
}
```
may take center coordinates and the length of a sphere and return needed object with the given color. Your sphere should be approximated from a tetrahedron which we had discussed in the lesson.

Alternatively, you can can have a following or any other similar function: 
```js 
function drawSphere(a, b, c, d, color) {
    // Function Logic
}
```
Where a, b, c, d are coordinates of the tetrahedron within a sphere.
- You SHOULD use a version-control system called `git` and make reasonable commits after each important milestone. Again: you MUST **make git commits**. A single person can make commits if you can't work as a team through github. But if a single person commits for everyone, then the commit message should tell 1) who contributed, 2) to which part of the code. For example:
```console
$ git commit -m "Tofita Tofitayev Tofita oglu added drawSphere function"
 ```
- In addition to commits, you MUST **submit a writeup** telling the contribution of each team member (Tofita did this or that, Tofit wrote this function, Tofitagulu shellendi, etc).
- You MUST **record a video** as a team presenting your project, mainly explaining the important parts of the code and functionality. It should be similar to a group presentation that you'd do during a class time. You should **upload the video to youtube and share via link**. You can limit the visibility of the video to be seen only via shareable link in the settings of video on youtube.
- The only libraries you can use are provided in the common folder (it is the same for assignments). Do NOT use `vec` functions of the `MV.js` library.
- You can copy small code snippets (~%10 of you code) from internet or textbook website but you should put the URL of the snippet and explain which modifications have been made (if any).
- Grading will be based on whether the code achieves the purpose, is readable, whether all conditions mentioned in this file are followed. Untidy code may or may not affect grading.
- You should submit your code to the blackboard in a compressed `.zip` format with the title **TEAM_NAME_CG_PROJECT_SUMMER_2023.zip**. Not all team members should submit, a single submission is fine. submission Late submissions won't be accepted. _Change your folder name BEFORE zipping._
- Check List:
    - [ ] Project folder/code
    - [ ] Write-up (which team member did what)
    - [ ] Correct git commits (which team member did what)
    - [ ] Youtube video presentation
    - [ ] Updated README.md with team member names and youtube link.

## Project details

Your goal is to imitate atom/solar system. You should have two types of spheres in the scene:

1. Nucleus (sun)
2. Electrons (planets)

Nucleus is in the middle. It is the light source. It is in uniform orange(ish) color. 

Electrons circle around the nucleus in different orbits. There are three of them, colored in blue, green, and brown. They should have different sizes, orbit lengths, and speeds. They should be smaller than the sun obviously. In addition to circling around the sun, they rotate around their own axes as well.

Keyboard events:

- arrow keys: move camera left, right, up, down
- w: zooms in
- s: zooms out
- a: rotates the camera clockwise [AROUND THE SCENE](https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html)
- d: rotates the camera counter-clockwise

Lighting:

- blue sphere: is mostly specular (shiny)
- green sphere: is mostly diffuse
- brown sphere: is mostly translucent
