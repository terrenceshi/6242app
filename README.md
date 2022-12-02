# 6242app

Step 0.
	Test out deployed web app on books2nooks.ml!

Step 1.
	Pull or fork from main branch of github
		https://github.com/terrenceshi/6242app

Step 2: Setting up the frontend
	Cd b2nfrontend

	Be sure to have nodejs installed.

	Npm install

	Npm start

Technically, you can just run the app from here, as the frontend makes requests to the deployed backend. However, you can take step 3 and 4 to run the backend locally and make post requests to there.

(OPTIONAL) Step 3: Setting up the backend
	Install requirements. You can choose to do so in a virtual environment.
		Pip install -r requirements.txt

	Go back to the root directory and cd flask-server

	Edit playlist.py
Go to line 41 and 42 and add values for the spotify keys

		SPOTIFY_CLIENT_ID ="8960c84e74964817bfb927e83f6e2b59"
        		SPOTIFY_SECRET ="3917b5e7cc3342189238c7290f99be3c"


	Python playlist.py
		The backend server should be running now.

(OPTIONAL) Step 4: Connecting the local backend to the frontend
	Get out of the backend and cd b2nfrontend/src

	Modify home.js
		Go to line 112: axios.post('https://b2nbackend.ml', axiosInput)

Replace 'https://b2nbackend.ml' with whatever localhost the backend is running in. Typically, it should be http://127.0.0.1:5000
