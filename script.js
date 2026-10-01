const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


// DATE
document.querySelector("#date").textContent =
    new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


// MODAL
const modal = $("#modal");

const fields = $("#modalFields");

let mode = "";


// MODAL CONFIGURATION
const configs = {

    emergency: [
        "Emergency assistance",

        "Choose a contact to reach campus support.",

        `
        <select>
            <option>Campus Security — 24/7</option>
            <option>College Office</option>
            <option>Medical Centre</option>
        </select>
        `
    ],


    report: [
        "Report an issue",

        "Tell us what happened so the campus team can review it.",

        `
        <input
            placeholder="Issue title"
            required
        >

        <select>
            <option>Safety concern</option>
            <option>Infrastructure</option>
            <option>Harassment / misconduct</option>
        </select>

        <textarea
            rows="4"
            placeholder="Describe the issue..."
        ></textarea>
        `
    ],


    found: [
        "Add a lost or found item",

        "Help another student find their belongings.",

        `
        <input
            placeholder="Item name"
            required
        >

        <input
            placeholder="Where was it found/lost?"
            required
        >
        `
    ]

};


// OPEN MODAL
$$("[data-modal]").forEach(button => {

    button.onclick = () => {

        mode = button.dataset.modal;

        $("#modalTitle").textContent =
            configs[mode][0];

        $("#modalDesc").textContent =
            configs[mode][1];

        fields.innerHTML =
            configs[mode][2];

        modal.classList.add("show");

    };

});


// CLOSE MODAL
$("#close").onclick = () => {

    modal.classList.remove("show");

};


modal.onclick = (event) => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

};


// SUBMIT
$("#submit").onclick = () => {

    if (mode === "report") {

        let count =
            Number(
                localStorage.getItem(
                    "campusReports"
                )
            ) || 2;

        count++;

        localStorage.setItem(
            "campusReports",
            count
        );

        $("#reportCount").textContent =
            count;

    }


    modal.classList.remove("show");

    alert(
        "Submitted successfully! Your entry has been saved locally."
    );

};


// DARK MODE
const storedTheme =
    localStorage.getItem("campusTheme");


if (storedTheme === "dark") {

    document.body.classList.add("dark");

}


// THEME BUTTON
$("#themeBtn").onclick = () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "campusTheme",
        isDark ? "dark" : "light"
    );

};


// LOST & FOUND SEARCH
$("#search").oninput = (event) => {

    const query =
        event.target.value.toLowerCase();


    $$("#items .lost-item").forEach(item => {

        const text =
            item.textContent.toLowerCase();


        item.style.display =
            text.includes(query)
                ? "flex"
                : "none";

    });

};


// CLEAR SEARCH
$("#clear").onclick = () => {

    $("#search").value = "";

    $("#search").dispatchEvent(
        new Event("input")
    );

};


// CHECKLIST
$$(".check input").forEach(checkbox => {

    checkbox.onchange = () => {

        const total =
            $$(".check input").length;

        const completed =
            $$(".check input:checked").length;


        $("#checkCount").textContent =
            completed + "/" + total;


        $("#checkLabel").textContent =
            completed +
            " of " +
            total +
            " done";


        $("#progress").style.width =
            (completed / total * 100) + "%";

    };

});