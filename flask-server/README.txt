HERE IS WHAT YOU NEED TO SET THIS UP:

-go to google drive and download backend data and model
	-you can also get this from yenho and my previous zips

-put data and model folders into flask-server

-create a virtual environment
	-make sure you are cd'd into flask server

	python -m venv venv
		-you can replace the last venv with any name you like

	activate your environment (assuming the name is venv)
		-source venv/bin/activate for mac

		-venv\scripts\activate

-download everything you need while in the activated virutal environment
	-pip install -r requirements.txt

-run the python file to start the flask server
	-python playlist.py