AOS.init();
const menuWrapper = document.querySelector('.nav__hamburger');
const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.nav__menu');
const socialMedia = document.querySelector('.nav__socialMedia');
const firstSection = document.querySelector('.first');
const animatable = document.querySelector('.animatable');

// nav bar toggle
menuWrapper.addEventListener('click', () => {
    menu.classList.toggle('active');
    socialMedia.classList.toggle('active');
    hamburger.classList.toggle('animate');
});

// Firebase magic
document.getElementById("form").addEventListener("submit", (e) => {
    let localisation = document.getElementById("localisation").value;
    let stade = document.getElementById("stade").value;
    let date = document.getElementById("date").value;
    e.preventDefault();
    createTour(localisation, stade, date);
    form.reset();
});


// Get input from Tour Form
function createTour(localisation, stade, date) {
    let tour = {
        localisation: localisation,
        stade: stade,
        date: date
    }
    let db = firebase.firestore().collection("tour/");
    db.add(tour).then(() => {
        Swal.fire(
            'Good Job !',
            'Tour added',
            'success'
        )
        document.getElementById("cardSection").innerHTML='';
        readTour();
    })
}

function readTour() {
    firebase.firestore().collection("tour").onSnapshot(function(snapshot) {
        document.getElementById("cardSection").innerHTML='';
        snapshot.forEach(function(tourValue) {
            document.getElementById("cardSection").innerHTML+=`
            <div class="card mb-3">
                <div class="card-body>
                    <h5 class="card-text">${tourValue.data().localisation}</h5>
                    <p>${tourValue.data().stade}</p>
                    <p>${tourValue.data().date}</p>
                    <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTour('${tourValue.id}', 
                    '${tourValue.data().localisation}', '${tourValue.data().stade}', '${tourValue.data().date}')"><i class="fas fa-edit"></i> Edit Tour
                    </button>
                    <button type="submit" class="btn btn-danger" onclick="deleteTour('${tourValue.id}')"><i class="fas fa-trash-alt"></i> Delete Tour
                    </button>
                </div>
            </div>
            `
        });
    });
}

function reset() {
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form">

        <div class="form-group"
            <label>Localisation</label>
            <input type="text" class="form-control" id="localisation" placeholder="Enter localisation">
        </div>

        <div class="form-group">
            <label>Stade</label>
            <input type="text" class="form-control" id="stade" placeholder="Stade">
        </div>

        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control" id="date" placeholder="Date">
        </div>

        <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> Add Tour
        </button>
        <button style="display: none" id="button2" class="btn btn-success">Update Tour </button>
        <button style="display: none" id="button3" class="btn btn-danger">Cancel </button>

    </form>
    `;

    document.getElementById("form").addEventListener("submit", (e) => {
        let localisation = document.getElementById('localisation').value;
        let stade = document.getElementById('stade').value;
        let date = document.getElementById('date').value;
        e.preventDefault();
        createTour(localisation, stade, date);
        form.reset();
    });
}

function updateTour(id, localisation, stade, date) {
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form2>

        <div class="form-group">
            <label>Localisation</label>
            <input type="text" class="form-control" id="localisation" placeholder="Enter localisation">
        </div>

        <div class="form-group">
            <label>Stade</label>
            <input type="text" class="form-control" id="stade" placeholder="Stade">
        </div>

        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control" id="date" placeholder="Date">
        </div>

        <button style="display: none" id="button1" class="btn btn-primary"> Add Tour </button>
        <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i> Update Tour </button>
        <button style="display: inline-block" id="button3" class="btn btn-danger><i class="fas fa-ban"></i> Cancel </button> 

    </form>
    `;
    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("button2").addEventListener("click", (e) => {
        updateTour(id, document.getElementById("localisation").value, document.getElementById("stade").value, document.getElementById("date").value);
    });
    document.getElementById("localisation").value=localisation;
    document.getElementById("stade").value=stade;
    document.getElementById("date").value=date;
}

function updateTour2(id, localisationNew, stadeNew, dateNew) {
    let tourUpdated = {
        localisation: localisationNew,
        stade: stadeNew,
        date: dateNew
    }
    let db = firebase.firestore().collection("tour").doc(id);
    db.set(tourUpdated).then(() => {
        Swal.fire(
            'Good job !',
            'Tour updated !',
            'success'
        )
    })
    document.getElementById("cardSection").innerHTML='';
    readTour();
    reset();
}

function deleteTour(id) {
    firebase.firestore().collection('tour').doc(id).delete().then(() => {
        Swal.fire(
            'Good job !',
            'Tour removed !',
            'success'
        )
    })
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTour();
}