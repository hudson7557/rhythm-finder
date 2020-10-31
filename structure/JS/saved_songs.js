function displaySongTable(){

  var req = new XMLHttpRequest();

  req.open('GET', serverUrl+'/saved_songs', true);
  
  req.withCredentials = false;
	req.onload = function (e) {
	  	if (req.readyState === 4) {
	    	if (req.status === 200) {

	    	// SQL Data returned from server
            var data = JSON.parse(req.responseText);
            var musicBody = document.getElementById("musicBody")

        // This loop goes through each of the exercises and displays them
		for (var i = 0; i < data.length; i++) {

			// Creates the rows and cells
		  	var row = document.createElement("tr");
	    	var cell1 = document.createElement("td");
	    	var cell2 = document.createElement("td");
	    	var cell3 = document.createElement("td");
	    	var cell4 = document.createElement("td");
	    	var cell5 = document.createElement("td");
	    	var cell6 = document.createElement("td");

	    	// These are the variables created from the DB
	    	var songTitle = document.createTextNode(data[i].song);
	    	var artistName = document.createTextNode(data[i].artist);
	    	var albumName = document.createTextNode(data[i].album);
	    	var genre = document.createTextNode(data[i].genre);
	    	

		    // Appending the variables to the cells
		    cell1.appendChild(songTitle);
		    cell2.appendChild(artistName);
		    cell3.appendChild(albumName);
		    cell4.appendChild(genre);
		    cell5.appendChild(creatUpdateButton());
		    cell6.appendChild(createDeleteButton());

	    	row.appendChild(cell1);
	    	row.appendChild(cell2);
	    	row.appendChild(cell3);
	    	row.appendChild(cell4);
	    	row.appendChild(cell5);
	    	row.appendChild(cell6);
	    	
		    // Appends row to the table
		  	musicTable.appendChild(row);
		}
	    	} else {
	      		console.error(req.statusText);
	    	}
	  	}
	};
	req.onerror = function (e) {
	  console.error(req.statusText);
	};
	req.send(null);
};

function creatUpdateButton () {
  //Create the HTML button and set it's attributes
  updateButton = document.createElement("button");
  updateButton.value = 1; 
  updateButton.innerText = "Update";
  updateButton.className = "update-btn";
  
  //Create the event listener which makes sure the workout can't be both skipped or completed again.
  skipButton.addEventListener('click', function() {
      alert("Updating")
    }
  );
  return updateButton
};

function creatDeleteButton (id, mins, num) {
  //Create the HTML button and set it's attributes
  deleteButton = document.createElement("button");
  deleteButton.value = 1; 
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete-btn";

  //Create the event listener which makes sure the workout can't be both skipped or completed again.
  deleteButton.addEventListener('click', function() {
      alert("Deleting")
    }
  );
  return deleteButton
};