const form = document.querySelector("#createCodeCooler-form");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = `codeCoolerName=${this.codeCoolerName.value}
    &codeCoolerSurname=${this.codeCoolerSurname.value}
    &codeCoolerAdress=${this.codeCoolerAdress.value}
    &codeCoolerPhone=${this.codeCoolerPhone.value}
    &codeCoolerEmail=${this.codeCoolerEmail.value}`;

    console.log(data);
    login(data);
});

function login(data) {
    fetch("http://localhost:8000/login",
        {
            credentials: 'same-origin',
            method: "POST",
            body: data
        })
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function (user) {
            // user is authenticated, and cookie send by server is set in browser
            console.log(user);
            switch (user.role_ID) {
                case 3:
                    window.location.href = "CreepPages/creepStartingPage.html";
                    break;
                case 2:
                    window.location.href = "MentorPages/mentorStartingPage.html";
                    break;
                case 1:
                    window.location.href = "CodecoolerPages/codecoolerStartingPage.html"
                    break;
            }
            // if(user.role_ID ===3) {
            //     window.location.href = "CreepPages/creepStartingPage.html";
            // }

        }).catch(function (error) {
        // user NOT authenticated, server return different status than 200-299
        const message = document.querySelector(".message");
        message.innerHTML = error;
    });
}
