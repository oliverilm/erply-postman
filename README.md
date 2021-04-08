# Erply Postman UI


## Description
This is an UI solution for Erply API endpoints, which also includes different predefined microservices.


* User profiles and responses are stored in the localstorage

## Tech
* UI 
    * React 
    * Typescript 
    * Styled components 
    * Material ui
* API - axios.


## Usability

1. Add a new user

![adding a user image](https://i.imgur.com/mgtIKnO.png)
* the added users will group together under the generic tab under the Profiles section.
* the user gets automatically selected as "Selected user" and will be indicated with a green background.
* Group will also be indicated (with a blue badge) that the selected user is in that group.

![user group image](https://i.imgur.com/Q8RXBry.png) 
---
2. User actions

![user actions image][https://i.imgur.com/EQEGblp.png]
* pressing the right mouse button on a profile will present a custom menu with user specific actions.
    * Authenticate: will perform verifyUser and getServiceEndpoints request to erply API and will store the result inside the user object.
    * Select user: will select the current profile further requests.
    * User Details: shows the profile details ( also edit profile )
    * Postman Profile: will perform postmain profile export.

---
![user profile modal](https://i.imgur.com/in1Kvv5.png)
* Profile details dialog will give you an overview of the current profiles data.
* and the bottom of the dialog you can also see the profiles authentication data and service endpoints that will be saved after authentication process.
* you can assign profile a company and it will be grouped together with other profiles from the same company.
    * existing companies will be suggested to you for reference.
 
---
![user profile edit modal](https://i.imgur.com/4PWLUbf.png)
* edit dialog will let you update user data.
  
---
3. General usage
![general usage](https://i.imgur.com/I9DRRvJ.png)
* in order to use the rest of the application, a profile must be selected and authenticated. 
* to verify the profiles authentication status, there is a timer to the rignt of any given profile, to indicate time remaining til the end of its session.

![profle timer](https://i.imgur.com/MBtCu5D.png)

* you can swich between different services on the top of the page
* if a service is not available profile, it will render as disabled.

---
* just choose a request, fill in the required fields and press send request.
* the response will be available on the right side of the page.

## 4 Simple Steps

1. Git clone this repo
`git clone https://github.com/wapenshaw/react-typescript-eslint-prettier-vscode-boilerplate.git myProject`

2. `npm install` or `yarn install` <- preffered

3. `npm start` or `yarn start`

4. `code .` from inside the project folder or `Open Folder` in VSCode


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
