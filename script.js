

// CLASSES

class Projects {
  constructor(name, description, imageUrl, projectUrl) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.projectUrl = projectUrl ?? '';
  }
}


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
        const res = await fetch("https://portfolio-backend-jjgf.onrender.com/experience");

        if (!res.ok) throw new Error(res.statusText);

        const experience = await res.json(); // ya parsea JSON

        writeExperience(experience);
    } catch (err) {
        console.error("Error cargando experiencia:", err);
    }
}

function writeExperience(experience) {
    const container = document.getElementById("expContainer");

    experience.forEach(exp => {
        const descriptionHTML = exp.description?.map(d => `<li>${d}</li>`).join("") || "";

        const cardHTML = `
            <div class="card" id="experienceCard" data-aos="fade-up">
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
        const res = await fetch("https://portfolio-backend-jjgf.onrender.com/projects");

        if (!res.ok) throw new Error(res.statusText);

        const projects = await res.json();

        writeProjects(projects);
    } catch (err) {
        console.error("Error cargando experiencia:", err);
    }
}

function writeProjects(projects){
    const container = document.getElementById("projectContainer");

    projects.forEach(project => {

        var cardHTML = `
            <div class="card" id="projectCard">
                <div class="d-flex align-items-start gap-4 card-body">

                    <img src="${project.imageUrl || ""}" alt="aa" class="card-img-top w-25" style="max-width: 10rem;">
                        
                    <div class="card-text d-flex flex-column">
                        <h5 class="card-title">${project.name || ""}</h5>

                        <p class="card-text">${project.description || ""}"</p>

                        <div style="align-self: self-end;">
                                <span class="badge langBg">not-implemented</span>
                                <span class="badge fwBg">not-implemented</span>
                                <span class="badge platBg">not-implemented</span>
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
        const res = await fetch("https://portfolio-backend-jjgf.onrender.com/contact");

        if (!res.ok) throw new Error(res.statusText);

        const contacts = await res.json(); 

        console.log(contacts);

        writeContacts(contacts);
    } catch (err) {
        console.error("Error cargando contactos:", err);
    }
}

function writeContacts(contacts){
    const container = document.getElementById("contactContainer");
    var aosDuration = 2000;

    contacts.forEach(contact => {
        

        if(contact.contactName == "Tlfn number") {
            //continue;
        }

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
    });
}

// ABOUT
async function loadAbout() {
    try {
        const res = await fetch("https://portfolio-backend-jjgf.onrender.com/about");

        if (!res.ok) throw new Error(res.statusText);

        const about = await res.json(); 

        console.log(about);

        const skills = [about.languages, about.frameworks, about.other];

        writeSkills(skills);
        //writeAbout(about);
    } catch (err) {
        console.error("Error cargando about:", err);
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
        if (index == 0){
            base = `
            <div class="tab-pane fade show active" id="lang" role="tabpanel">
                            <div class="miniCardContainer" id="elements${index}">
                                
                            </div>
                        </div>`;
        }
        else{
            base = `
            <div class="tab-pane fade show" id="lang" role="tabpanel">
                            <div class="miniCardContainer" id="elements${index}">
                                
                            </div>
                        </div>`;
        }
        
        content.insertAdjacentHTML("beforeend", base);

        skill.forEach(e =>{
            const content = document.getElementById(`elements${index}`);

            var row = 
            `
                <div class="miniCard" data-aos="fade-right">${e || ""}</div>

            `
            content.insertAdjacentHTML("beforeend", row);
        });
        
        index++;
    });
}

function writeAbout(contacts){
    const container = document.getElementById("contactContainer");
    var aosDuration = 2000;

    contacts.forEach(contact => {
        

        if(contact.contactName == "Tlfn number") {
            //continue;
        }

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
    });
}

document.addEventListener("DOMContentLoaded", loadEverything);