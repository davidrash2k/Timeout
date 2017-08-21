# Timeout
NXTTECH Project
How to setup project to run in your own Firebase account
1. Forking
	1. Go to https://github.com/hankyungju/Timeout
	2. Select "Fork" found in the top right corner of the page
2. Configuring the project with firebase credentials
	1. Create new project in your firebase account
	2. Select add "firebase to your webapp"
	3. Copy the code snippet 
	"
		var config = {
		apiKey: "your apiKey",
		authDomain: "your authDomain",
		databaseURL: "your databaseURL",
		projectId: "your projectId",
		storageBucket: "your storageBucket",
		messagingSenderId: "your messagingSenderId"
		}
	"
	and paste it in index.js replacing 
	"   
		var config = {
		apiKey: "",
		authDomain: "",
		databaseURL: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: ""
		};
	"
	4. Save file
3. Deploying to firebase for hosting 
	1. Go to a folder where you want to use for deploying the project to firebase
	2. Open a command line
	3. Go to the folder you create by entering "cd <path to folder>"
	3. Install firebase. Enter "npm install -g firebase-tools"
	4. Initialize project folder for firebase. Enter "firebase init"
	5. Put Timeout files in "public" folder 
	6. Deploy files in firebase. Enter "firebase deploy"
	7. App is now online!
