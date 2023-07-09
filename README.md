# Square Calculator App

The Square Calculator app is a simple web application that allows users to input the coordinates of a square (ABCD) and a point O, and calculates whether the input forms a valid square. It also determines if the point O is the center of the square.

![image](https://github.com/olehkavetskyi/Square-Calculator-App/assets/110283090/1c06b8fb-8b07-4f71-924e-cdd5ef6e0938)

## Features

- Input fields for coordinates: The app provides input fields to enter the x and y coordinates of the square vertices (A, B, C, D) and the point O.
- Calculation: Upon submitting the form, the app calculates whether the input coordinates form a valid square and determines if the point O is the center of the square.
- Visual representation: The app displays a canvas where it draws the square and point O based on the input coordinates. The square is filled with light blue color, and the vertices are marked with red dots. If the point O is the center, it is marked with a green dot; otherwise, it is marked with a yellow dot.

## Usage

1. Enter the x and y coordinates of points A, B, C, D, and O in the input fields.
2. Click the "Calculate" button to perform the calculations.
3. The app will display the result and additional information below the form.
4. The canvas will show a visual representation of the square and point O.

## Technologies Used

- Angular: The app is built using the Angular framework.
- HTML5 Canvas: The canvas element is utilized to draw the square and point O.

## Development

To run the Square Calculator app locally and make modifications:

1. Clone the repository: `git clone https://github.com/olehkavetskyi/Square-Calculator-App)`
2. Install the dependencies: `npm install`
3. Start the development server: `ng serve`
4. Open the app in your browser: `http://localhost:4200`

Feel free to explore the code and make any necessary changes to suit your requirements.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Executed tests:

![image](https://github.com/olehkavetskyi/Square-Calculator-App/assets/110283090/e2742253-eb9b-4403-ad4a-829956fd21a0)
