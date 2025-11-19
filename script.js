
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-functions.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC58lJR7WHOeGak4UmZi8tfmOx_k_4ECbo",
  authDomain: "portfolioapp-d88c6.firebaseapp.com",
  projectId: "portfolioapp-d88c6",
  storageBucket: "portfolioapp-d88c6.firebasestorage.app",
  messagingSenderId: "354849908983",
  appId: "1:354849908983:web:0f60b9d277bc2ed4da0bf2",
  measurementId: "G-KZT56Y5630"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// METHODS

function loadEverything(){
    loadExperience()
    loadProjects()
    loadContact()
    loadAbout()
}


// EXPERIENCE
async function loadExperience() {
    try {
        const docRef = doc(db, "experience", "en");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            const data = snap.data(); 
            const experience = data.items;
            writeExperience(experience);
        } else {
            console.log("No existe el documento EN");
        }
    } catch (err) {
        console.error("Error cargando experiencia:", err);
    }
}

function writeExperience(experience) {
    const container = document.getElementById("expContainer");

    experience.forEach(exp => {
        const descriptionHTML = exp.description?.map(d => `<li>${d}</li>`).join("") || "";

        const cardHTML = `
            <div class="card infoCard" data-aos="fade-up">
                <div class="card-body">
                    <div class="d-flex align-items-start gap-4">
                        <img src="${exp.companyLogo || ''}" alt="${exp.companyName || ''}" style="width: 100px;">
                        <div>
                            <h4 class="card-title">${exp.role || ''}</h4>
                            <h6 class="card-text">${exp.companyName || ''}</h6>
                            <div class="d-flex align-items-center gap-3 color-5">
                                <i class="bi bi-calendar-week"></i>
                                <span>${exp.date || ''}</span>
                                <i class="bi bi-geo-alt"></i>
                                <span>${exp.location || ''}</span>
                            </div>
                        </div>
                    </div>

                    <div style="padding-top: 1rem;">
                        <ul>
                            ${descriptionHTML}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);
    });
}


// PROJECTS
async function loadProjects() {
    try {
        const docRef = doc(db, "projects", "en");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            const data = snap.data(); 
            const projects = data.items;
            writeProjects(projects);
        } else {
            console.log("document does not exists");
        }
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}

function writeProjects(projects){
    const container = document.getElementById("projectContainer");

    projects.forEach(project => {

        var cardHTML = `
            <div class="card infoCard" data-aos="fade-up">
                <div class="d-flex align-items-start gap-4 card-body">

                    <img src="${project.imageUrl || ""}" alt="aa" class="card-img-top w-25" style="max-width: 10rem;">
                        
                    <div class="card-text d-flex flex-column">
                        <h5 class="card-title">${project.name || ""}</h5>

                        <p class="card-text">${project.description || ""}"</p>

                        <div style="align-self: self-end;">
                                ${
                                    project.language ? `<span class="badge langBg">${project.language}</span>` : ''
                                }
                                ${
                                    project.framework ? `<span class="badge fwBg">${project.framework}</span>` : ''
                                }
                                ${
                                    project.platform ? `<span class="badge platBg">${project.platform}</span>` : ''
                                }
                        </div>
                    </div>
                </div>
                ${
                    project.projectUrl 
                    ? 
                    `
                        <div class="card-footer text-center">
                            <a href="${project.projectUrl}" class="btn btn-outline-light btn-sm" target="_blank">GitHub</a>
                        </div>
                    `
                    : ""
                }
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);
    });
}


// CONTACT
async function loadContact() {
    try {
        const docRef = doc(db, "contact", "en");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            const data = snap.data(); 
            const contact = data.items;
            writeContacts(contact);
        } else {
            console.log("document does not exists");
        }
    } catch (err) {
        console.error("Error loading contact:", err);
    }
}

function writeContacts(contacts){
    const container = document.getElementById("contactContainer");
    var aosDuration = 2000;

    contacts.forEach(contact => {
        

        if(contact.contactName != "Tlfn number") {
            var card = `
                <a href="${contact.targetUrl}" target="_blank" style="text-decoration: none; color: inherit;" data-aos="fade-right" data-aos-duration="${aosDuration}">
                    <div class="card" id="contactCard" style="padding: 0.5rem;">
                        <div class="d-flex align-items-center gap-4">
                            <img src="${contact.imageUrl}" alt="l" style="max-width: 2rem;">
                            <div>
                                <h6 class="card-title">
                                    ${contact.contactName}
                                </h6>
                                <p class="card-text">
                                    ${contact.contactDesc}
                                </p>
                            </div>
                            <i class="bi bi-box-arrow-up-right color-5"></i>
                        </div>
                    </div>
                </a>
            `;
            aosDuration -= 500;
            container.insertAdjacentHTML("beforeend", card);
        }

        
    });
}

// ABOUT
async function loadAbout() {
    try {
        const docRef = doc(db, "about", "en");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            const data = snap.data(); 
            const about = data.items;
            console.log(about);
            const skills = [{'languages': about.languages}, {'frameworks': about.frameworks}, {'other': about.other}]
            writeSkills(skills);
            writeAbout(about);
        } else {
            console.log("document does not exists");
        }
    } catch (err) {
        console.error("Error loading about:", err);
    }
}

function writeSkills(skills){
    var index = 0;
    const header = document.getElementById("myTab");

    skills.forEach(skill => {
       /* var tab = `
            <li class="nav-item">
                <button class="nav-link active" id="exp-tab" data-bs-toggle="tab" data-bs-target="#lang" type="button" role="tab">
                    ${skill || ""}
                </button>
            </li>
        `;
        header.insertAdjacentHTML("beforeend", tab);*/

        const content = document.getElementById("tab-content");
        var base = ``;
        const key = Object.keys(skill)[0];
        const isActive = index === 0 ? "show active" : "";

        base = `
            <div class="tab-pane fade ${isActive}" id="${key}" role="tabpanel">
                            <div class="miniCardContainer" id="elements${key}">
                                
                            </div>
                        </div>`;

        
        content.insertAdjacentHTML("beforeend", base);

        skill[key].forEach(e =>{
            const content = document.getElementById(`elements${key}`);

            var row = 
            `
                <div class="miniCard" data-aos="fade-right">${e || ""}</div>

            `
            content.insertAdjacentHTML("beforeend", row);
        });
        
        index++;
    });
}

function writeAbout(about){
    const aboutLarge = document.getElementById('aboutLarge');
    aboutLarge.insertAdjacentHTML(
        "beforeend",
        `
            <img src="${about.profilePicture}" 
            alt="Mi imagen" 
            class="rounded-circle w-25"
            data-aos="fade-right" 
            data-aos-anchor-placement="start-end" 
            data-aos-duration="1500" 
            style="margin-right: 10rem;">

            <div style="text-align: start;">
                <p class="aboutText">
                </p>
            </div>
        `
    );

    const aboutSmall = document.getElementById('aboutSmall');
    aboutSmall.insertAdjacentHTML(
        "beforeend",
        `
            <img src="${about.profilePicture}" 
            alt="Mi imagen" 
            class="rounded-circle w-50"
            data-aos="fade-bottom" 
            data-aos-anchor-placement="top-bottom" 
            data-aos-duration="1500" 
            style="margin-bottom: 5rem;">

            <div style="text-align: center;">
                <p class="aboutText">
                </p>
            </div>
        `
    );

    const container = document.getElementsByClassName('aboutText');
    Array.from(container).forEach(e =>{
        e.append(about.longDescription);
    });
}

document.addEventListener("DOMContentLoaded", loadEverything, refreshNavbar);

function refreshNavbar () {
    const scrollSpyEl = document.body;
    bootstrap.ScrollSpy.getInstance(scrollSpyEl)?.dispose(); // eliminar instancia anterior

    new bootstrap.ScrollSpy(scrollSpyEl, {
        target: "#navbarNav",
        offset: 80
    });
}