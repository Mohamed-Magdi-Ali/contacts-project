var contactImage = document.getElementById("contact-image")
var contactName = document.getElementById("contact-name")
var contactNumber = document.getElementById("contact-number")
var contactEmail = document.getElementById("contact-email")
var contactAddress = document.getElementById("contact-address")
var contactGroup = document.getElementById("contact-group")
var contactNotes = document.getElementById("contact-notes")
var favoriteCheckBox = document.getElementById("is-favorite")
var emergencyCheckBox = document.getElementById("is-emergency")
// var searchInput = document.getElementById("search")

var modalElement = document.getElementById('exampleModal');
var caseNoContacts = document.getElementById("case-no-contacts")
var caseContacts = document.getElementById("case-contacts")
var buttonSubmit = document.getElementById("buttonSubmit")
var buttonUpdate = document.getElementById("buttonUpdate")
var search = document.getElementById("search")
var currentIndex

var contacts = []
var favorites;
var emergencies;
var thereAreContacts
if (localStorage.getItem("contacts") != null) {
    contacts = JSON.parse(localStorage.getItem("contacts"))
    displayContact(contacts)
}

contactsDisplay()


function contactsDisplay() {
    if (contacts.length > 0) {
        caseNoContacts.classList.add("d-none")
        caseContacts.classList.remove("d-none")
    }
    else {
        caseNoContacts.classList.remove("d-none")
        caseContacts.classList.add("d-none")
    }
}
function convertToChar(name) {
    var character = name.split(" ").slice(0, 1).join().charAt(0).toUpperCase();
    character += name.split(" ").slice(1, 2).join().charAt(0).toUpperCase()
    return character
}


function addContact() {

    var contact = {
        id: Date.now(),
        image: contactImage.files[0] ? contactImage.files[0].name : "",
        name: contactName.value,
        number: contactNumber.value,
        email: contactEmail.value,
        address: contactAddress.value,
        group: contactGroup.value,
        notes: contactNotes.value,
        isFavorite: favoriteCheckBox.checked,
        isEmergency: emergencyCheckBox.checked,
    }
    var nameInput = contactName.value.trim()
    var numberInput = contactNumber.value.trim()
    if (nameInput === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!",
            confirmButtonColor: "#7927ff",
            confirmButtonText: "Ok"
        });

        return;
    }
    else if (numberInput === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Number",
            text: "Please enter a number for the contact!",
            confirmButtonColor: "#7927ff",
            confirmButtonText: "Ok"
        });

        return;
    }
    contacts.push(contact)
    localStorage.setItem("contacts", JSON.stringify(contacts))

    var modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide();

    Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Contact has been added successfully.",
        timer: 2000,
        showConfirmButton: false
    });


    contactsDisplay()
    displayContact(contacts)
    clearForm()
}

function displayContact(list) {
    var contact = ""
    var favoriteContacts = ""
    var emergencyContacts = ""
    favorites = 0
    emergencies = 0
    for (var i = 0; i < list.length; i++) {
        contact += `<div
                            class="card-contact card-contact-hover w-49 d-flex flex-column gap-2 justify-content-start bg-body rounded-4 shadow-sm px-3 pt-3">
                            <div class="conact-name-number d-flex justify-content-start align-items-center gap-2">
                                <div
                                    class="contact-image color-purple d-flex justify-content-center align-items-center overflow-hidden text-white fw-bold">
                                    ${list[i].image ? `<img class="conact-image w-100" src="./images/${list[i].image}" alt="">`
                : `${convertToChar(list[i].name)}`
            }
                                </div>
                                <div class="d-flex flex-column gap-1">
                                    <h4 id="conact-name" class="mb-0 fw-bold fs-6">${list[i].name}</h4>
                                    <div class="d-flex gap-1">
                                        <div
                                            class="phone bg-primary-subtle rounded-2 d-flex justify-content-center align-items-center">
                                            <i class="fa-solid fa-phone icon-contact"
                                                style="color: rgb(116, 192, 252);"></i>
                                        </div>
                                        <p id="conact-number" class="text-muted mb-0 fs-6">${list[i].number}</p>
                                    </div>

                                </div>
                            </div>
                            <div class="conact-email d-flex gap-2">
                                <div
                                    class="phone color-purple-100 rounded-2 d-flex justify-content-center align-items-center">
                                    <i class="fa-solid fa-envelope icon-contact" style="color: rgb(177, 151, 252);"></i>
                                </div>
                                <p id="conact-email" class="text-muted mb-0 fs-6">${list[i].email}</p>
                            </div>
                            <div class="conact-address d-flex gap-2">
                                <div
                                    class="phone color-green rounded-2 d-flex justify-content-center align-items-center">
                                    <i class="fa-solid fa-location-dot icon-contact"
                                        style="color: rgb(141, 204, 100);"></i>
                                </div>
                                <p id="conact-address" class="text-muted mb-0 fs-6">${list[i].address}</p>
                            </div>
                            <div class="isEmergency d-inline-flex gap-1 align-items-center px-1 py-1 rounded-1">

                                <i class="fa-solid fa-heart-pulse icon-contact text-center"
                                    style="color: rgb(242, 9, 28);"></i>
                                <p class="text-danger icon-contact fw-bold mb-0">Emergency</p>
                            </div>
                            <hr class="w-100 ">
                            <div class="primary d-flex w-100 justify-content-between mb-4 mt-0 pt-0 ">
                                <div class="d-flex gap-2">
                                    <button id="make-call" class="btn color-green">
                                        <i class="fa-solid fa-phone " style="color: rgb(116, 192, 252);"></i>
                                    </button>
                                    <button id="make-message" class="btn color-purple-100"><i
                                            class="fa-solid fa-envelope" style="color: rgb(177, 151, 252);"></i>
                                    </button>
                                </div>
                                <div class="d-flex gap-2">
                                    <button id="make-favorite" class="btn color-yellow">
                                        <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
                                    </button>
                                    <button id="make-emergency" class="btn color-rose">
                                        <i class="fa-solid fa-heart-pulse text-center"
                                            style="color: rgb(242, 9, 28);"></i>
                                    </button>
                                    <button id="edite" class="btn color-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateContact(${i})">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                    <button id="delete" class="btn color-primary" onclick="deleteContact(${list[i].id})">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`
    }
    for (var i = 0; i < list.length; i++) {

        if (list[i].isFavorite) {
            favorites++;
            favoriteContacts += `
            <a
                                    class="favorite-contact col-xl-12 col-6 d-flex justify-content-between align-items-center border rounded-4 p-1 bg-white cursor-pointer">
                                    <div
                                        class="conact-name-number d-flex justify-content-center align-items-center  gap-2">
                                        <div
                                class="contact-image  color-purple d-flex justify-content-center align-items-center overflow-hidden ">
                                ${list[i].image ? `<img class="conact-image img-fluid w-100 h-100 object-fit-cover" src="./images/${list[i].image}"
                                    alt="">`
                    : `${convertToChar(list[i].name)}`
                }
                            </div>
                                        <div class="d-flex flex-column gap-1 ">
                                            <div class="d-flex justify-content-start">
                                                <h4 id="conact-name" class=" mb-0 fw-bold fs-6">${list[i].name}</h4>
                                            </div>

                                            <div class="d-flex gap-1">
                                                <div
                                                    class="phone bg-primary-subtle rounded-2 d-flex justify-content-center align-items-center">
                                                    <i class="fa-solid fa-phone icon-contact"
                                                        style="color: rgb(116, 192, 252);"></i>
                                                </div>
                                                <p id="conact-number" class="text-muted mb-0 fs-6">${list[i].number}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <button id="make-call" class="btn color-green card-contact d-flex ">
                                            <i class="fa-solid fa-phone " style="color: rgb(116, 192, 252);"></i>
                                        </button>
                                    </div>

                                </a>
            `
        }
    }
    for (var i = 0; i < list.length; i++) {

        if (list[i].isEmergency) {
            emergencies++;
            emergencyContacts += `
            <a
                                    class="emergency-contact col-xl-12 col-6 d-flex justify-content-between align-items-center border rounded-4 p-1 bg-white cursor-pointer">
                                    <div
                                        class="conact-name-number d-flex justify-content-center align-items-center  gap-2">
                                        <div
                                            class="contact-image  color-purple d-flex justify-content-center align-items-center overflow-hidden ">
                                            <div
                                class="contact-image  color-purple d-flex justify-content-center align-items-center overflow-hidden ">
                                ${list[i].image ? `<img class="conact-image img-fluid w-100 h-100 object-fit-cover" src="./images/${list[i].image}"
                                    alt="">`
                                : `${convertToChar(list[i].name)}`
                                }
                            </div>
                                        </div>
                                        <div class="d-flex flex-column gap-1 ">
                                            <div class="d-flex justify-content-start">
                                                <h4 id="conact-name" class=" mb-0 fw-bold fs-6">${list[i].name}</h4>
                                            </div>

                                            <div class="d-flex gap-1">
                                                <div
                                                    class="phone bg-primary-subtle rounded-2 d-flex justify-content-center align-items-center">
                                                    <i class="fa-solid fa-phone icon-contact"
                                                        style="color: rgb(116, 192, 252);"></i>
                                                </div>
                                                <p id="conact-number" class="text-muted mb-0 fs-6">${list[i].number}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <button id="make-call" class="btn color-green card-contact d-flex ">
                                            <i class="fa-solid fa-phone " style="color: rgb(116, 192, 252);"></i>
                                        </button>
                                    </div>

                                </a>
            `
        }
    }



    document.getElementById("case-contacts").innerHTML = contact
    document.getElementById("total-contacts").innerHTML = contacts.length

    if (favorites === 0) {
        document.getElementById("favorites").innerHTML = `<p id="favorit-contacts" class="d-flex m-auto favorit-contacts">No favorites yet</p>`;
    } else {
        document.getElementById("favorites").innerHTML = favoriteContacts;
    }
    document.getElementById("total-favorites").innerHTML = favorites

    if (emergencies === 0) {
        document.getElementById("emergencies").innerHTML = `<p id="emergency-contacts" class="d-flex m-auto emergency-contacts">No emergency contacts</p>`;
    } else {
        document.getElementById("emergencies").innerHTML = emergencyContacts;
    }
    document.getElementById("total-emergencies").innerHTML = emergencies
}
function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);

    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContact(contacts);
    contactsDisplay();
}
function clearForm() {
    contactImage.value = ""
    contactName.value = ""
    contactNumber.value = ""
    contactEmail.value = ""
    contactAddress.value = ""
    contactGroup.value = "Select a group"
    contactNotes.value = ""
    favoriteCheckBox.checked = false
    emergencyCheckBox.checked = false
    search.value = ""
}

function updateContact(index) {
    currentIndex = index;

    contactName.value = contacts[index].name;
    contactNumber.value = contacts[index].number;
    contactEmail.value = contacts[index].email;
    contactAddress.value = contacts[index].address;
    contactGroup.value = contacts[index].group;
    contactNotes.value = contacts[index].notes;
    favoriteCheckBox.checked = contacts[index].isFavorite;
    emergencyCheckBox.checked = contacts[index].isEmergency;

    document.querySelector('.modal-title').innerHTML = "Update Contact";
    var saveButton = document.querySelector('.modal-footer .btn-primary');
    saveButton.innerHTML = "Update Contact";
    saveButton.setAttribute("onclick", "updateNewData()");
}

function updateNewData() {
    var nameInput = contactName.value.trim();
    var numberInput = contactNumber.value.trim();

    if (nameInput === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!",
            confirmButtonColor: "#7927ff",
            confirmButtonText: "Ok"
        });
        return;
    }
    else if (numberInput === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Number",
            text: "Please enter a number for the contact!",
            confirmButtonColor: "#7927ff",
            confirmButtonText: "Ok"
        });
        return;
    }

    contacts[currentIndex].name = contactName.value;
    contacts[currentIndex].number = contactNumber.value;
    contacts[currentIndex].email = contactEmail.value;
    contacts[currentIndex].address = contactAddress.value;
    contacts[currentIndex].group = contactGroup.value;
    contacts[currentIndex].notes = contactNotes.value;
    contacts[currentIndex].isFavorite = favoriteCheckBox.checked;
    contacts[currentIndex].isEmergency = emergencyCheckBox.checked;

    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContact(contacts);

    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Contact has been updated successfully.",
        timer: 2000,
        showConfirmButton: false
    });

    clearForm();
    document.querySelector('.modal-title').innerHTML = "Add New Contact";
    var saveButton = document.querySelector('.modal-footer .btn-primary');
    saveButton.innerHTML = "Save Contact";
    saveButton.setAttribute("onclick", "addContact()");
}


function searchContact(element) {
    if (element == "") {
        displayContact(contacts)
        return
    }
    var filtered = []
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].name.toLowerCase().includes(element.toLowerCase())) {
            filtered.push(contacts[i])
        }
    }
    displayContact(filtered)
}

