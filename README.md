# WordGame
Repository for our word guess game, let's have fun

# Original game address
https://www.nytimes.com/games/wordle/index.html

# word list address
https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt

# build

cd Wordle-ide
npm i
npm run build

# Run the Application
npm run start

# Debug the Application
Currently, the debug envrionment is set up in VsCode.  Choose profile "FrontEnd(4200) Debug" to do the debugging.

# Run Unittests
npm run test

# Other information
## Angular
### using angular material
refer to angular commands section.
It is not decided to use @angular/material/grid-list or 3rd party ag-grid component.
### 3rd party component
#### angural grid
https://blog.ag-grid.com/get-started-with-angular-grid-in-5-minutes/ 
### Angular commands
#### create a new angular component
ng generate component <component_name> or
ng g c <component_name>
#### create a service 
ng g service <service_name>

#### using Angular material package.
ng add @angular/material

## html
### html list
"<ul> <li> /<li> <li> </li> /<ul>"
"<ul> <li *ngFor='let course of Courses'> /<li>  /<ul>"
