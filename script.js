 // JavaScript Code
      let input = document.querySelector(".InputValue");
      let addButton = document.querySelector(".Add");
      let list = document.querySelector(".ItemList");

      // Load existing data from local storage or initialize empty array
      let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

      // Function to render the list
      function displayList() {
        list.innerHTML = ""; // Clear the current list
        itemsArray.forEach((item, index) => {
          list.innerHTML += `
            <li>
              <div>
                <input type="checkbox" class="checkbox"
                ${item.completed ? "checked" : ""}
                onclick="toggleChecked(${index})" />
                <p class="${item.completed ? "line-through" : ""}">${
            item.text
          }</p>
              </div>
              <i class="ri-close-line" onclick="removeItem(${index})"></i>
            </li>
          `;
        });
      }

      // Add button click event
      addButton.addEventListener("click", function () {
        let inputValue = input.value; // Fetch current input value
        if (inputValue.trim() !== "") {
          // Only add non-empty input values
          itemsArray.push({ text: inputValue, completed: false }); // Add to the array with completed set to false
          saveToLocalStorage(); // Save updated array to local storage
          displayList(); // Update the list
          input.value = "";
          // Clear input field
        } else {
          alert("Empty Task cannot be added!");
        }
      });

      // Function to save data to local storage
      function saveToLocalStorage() {
        localStorage.setItem("items", JSON.stringify(itemsArray));
      }

      // Function to remove an item
      function removeItem(index) {
        itemsArray.splice(index, 1); // Remove the item from the array
        saveToLocalStorage(); // Save updated array to local storage
        displayList(); // Re-render the list
      }

      // Function to toggle the checked state of a task
      function toggleChecked(index) {
        itemsArray[index].completed = !itemsArray[index].completed; // Toggle the completed state
        saveToLocalStorage(); // Save updated array to local storage
        displayList(); // Re-render the list
      }

      // Display the list on page load
      displayList();
