Build a beautiful marble solitaire game (peg solitaire) as a single-file web application with exceptional aesthetics and animations.
Game Mechanics:

Classic cross-shaped board with 33 positions (standard English board layout)
Start with all positions filled except the center
Click a marble, then click an empty space to jump over an adjacent marble (horizontally or vertically)
Jumped marbles are removed
Goal: end with only one marble remaining in the center
Include win/loss detection and restart functionality

Visual Design (Critical - this is the priority):

Board: Rich, realistic wooden texture with subtle grain, shadows, and depth
Marbles: Glass-like spheres with:

Glossy, reflective surface
Deep blue-green/teal color with slight transparency
Realistic lighting and highlights
Subtle specular reflections


Holes: Carved circular indentations in the wood with inner shadows
Overall aesthetic: Warm, tactile, game-piece quality - should feel like a real physical game

Animations & Effects (Must-haves):

Smooth marble selection (glow/lift effect when selected)
Fluid jump animation with arc trajectory (parabolic motion)
Satisfying removal animation (fade + shrink + particle burst)
Gentle board entrance animation on load
Valid move highlighting with subtle pulsing
Hover effects on interactive marbles
Victory celebration animation with confetti/sparkles
Sound effects (enable/disable toggle) for jumps and removals

Polish:

Responsive design that works on mobile and desktop
Smooth 60fps animations using CSS transforms and requestAnimationFrame
Undo move functionality
Move counter
Best score tracking (localStorage)
Beautiful gradient background
Subtle parallax or depth effects

Technical:

Single HTML file with inline CSS and vanilla JavaScript
Use Canvas or CSS-based rendering (choose what gives best visual results)

Focus on making it feel premium and polished - every interaction should be delightful.