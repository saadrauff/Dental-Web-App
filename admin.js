document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentList = document.getElementById("appointmentList");

    // Load appointments from localStorage
    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointmentList.innerHTML = "";

        appointments.forEach((appointment, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.email}</td>
                <td>${appointment.phone}</td>
                <td>${appointment.date}</td>
                <td>${appointment.reason}</td>
                <td>${appointment.status}</td>
                <td>
                    ${appointment.status === "Pending" ? `
                        <button class="approve-btn" data-index="${index}">Approve</button>
                        <button class="reject-btn" data-index="${index}">Reject</button>
                    ` : appointment.status === "Approved" ? `
                        <input type="time" class="set-time" data-index="${index}" value="${appointment.time || ''}">
                        <button class="set-time-btn" data-index="${index}">Set Time</button>
                    ` : appointment.status === "Completed" || appointment.status === "Rejected" ? `
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    ` : ''}
                </td>
            `;

            appointmentList.appendChild(row);
        });

        // Add event listeners
        document.querySelectorAll(".approve-btn").forEach(button => {
            button.addEventListener("click", function () {
                changeStatus(this.getAttribute("data-index"), "Approved");
            });
        });

        document.querySelectorAll(".reject-btn").forEach(button => {
            button.addEventListener("click", function () {
                changeStatus(this.getAttribute("data-index"), "Rejected");
            });
        });

        document.querySelectorAll(".set-time-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const timeInput = document.querySelector(`.set-time[data-index="${index}"]`).value;

                if (timeInput) {
                    setAppointmentTime(index, timeInput);
                } else {
                    alert("Please select a time.");
                }
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                deleteAppointment(this.getAttribute("data-index"));
            });
        });
    }

    // Function to book a new appointment
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const date = document.getElementById("date").value;
            const reason = document.getElementById("reason").value;

            if (!name || !email || !phone || !date || !reason) {
                alert("Please fill in all fields.");
                return;
            }

            const newAppointment = { name, email, phone, date, reason, status: "Pending", time: "" };
            const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

            appointments.push(newAppointment);
            localStorage.setItem("appointments", JSON.stringify(appointments));

            alert("Appointment request sent!");
            appointmentForm.reset();
        });
    }

    // Function to change appointment status
    function changeStatus(index, status) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments[index].status = status;

        if (status === "Rejected") {
            appointments[index].time = "";
        }

        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    }

    // Function to set appointment time
    function setAppointmentTime(index, time) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments[index].time = time;
        appointments[index].status = "Completed";
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    }

    // Function to delete an appointment
    function deleteAppointment(index) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    }

    // Load appointments if on admin page
    if (appointmentList) {
        loadAppointments();
    }
});