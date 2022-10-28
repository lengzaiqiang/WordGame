# WordGame
Repository for our word guess game, let's have fun

# Original game address
https://www.nytimes.com/games/wordle/index.html

# word list address
https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt

# front-end
## graphql client side (already included in package.json, you needn't do anything except "npm install")
install graphql client package.  
npm install --save apollo-boost graphql react  
npm i --save-dev @types/react  


## build
cd Wordle-ide  
npm i  
npm run build  

## Run the Application
npm run start  

## Debug the Application
Currently, the debug envrionment is set up in VsCode.  Choose profile "FrontEnd(4200) Debug" to do the debugging.

## Run Unittests (No unittests written yet)
npm run test

# Back-end
Back end is done with node express plus graphql.   It will have a database to hold the words.
## create the project (FYI only)
npm init  
npm install graphql express express-graphql dotenv --save   
### install typescript and nodeMon (FYI only)
npm install typescript nodemon ts-node --save-dev  
### install type-graphql thus we could reflect metadata. (FYI only)
npm install --save class-validator type-graphql reflect-metadata  

### initialize typescript settings (FYI only)
tsc --init  
### install type library (FYI only)
npm install @types/node @types/express @types/express-graphql @types/dotenv @types/graphql --save-dev  

### solve the cors problem (FYI only)
npm install cores --save  
npm i --save-dev @types/cors  

## build back-end
cd wordle-svr  
npm i  
npm run build  

## run back-end
cd wordle-svr  
npm run start  
## debug back-end
The debug environment is set up in vscode, goto vscode debug tab, choose "Backend Debug" to debug the code.

# TODOs
## how to pass enumeration using graphql between server side and client side.
## how to auto generate types in client side?  Currently the _client.query() method supposed to be type-safe, but it is not now.
## add short-cut key to use keyboard input.
## add a subscript to have a summary page about how many tries and how many times it succeeds.
## refactor 2 anugular component display-box and keyboard-button, they are largely the same except one has background color while another has input.
## The click event on keyboard-button is done by hook clicked to DIV, better to refine it to use button directly.
## put the backend dictionary into a database like mysql/mangodb
## put backend into kubernetes container.
## refactor front end to use Apollo-angular component.
## others?
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
