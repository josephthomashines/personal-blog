SHELL=/bin/bash

.PHONY=clean

clean:
	rm -rfv venv __pycache__

venv: install.sh
	bash install.sh

%: %.py venv
	-@source ./venv/bin/activate && \
		python $*.py

run: venv
	-@source ./venv/bin/activate && \
		python main.py

