window.onload = function () {

    //Einstellung für die Anzeige der Teams
    //mit jedem neu laden wird im local storage die anzuzeigende Runde abgerufen
    if (localStorage.getItem("anzeige")) {
        let runde = localStorage.getItem("anzeige");

        let anzuzeigendeSpielrunde = JSON.parse(localStorage.getItem("runde-" + runde));

        let spieleranzahl = anzuzeigendeSpielrunde[0];
        let teamgroeße = anzuzeigendeSpielrunde[1];
        let pausenspieleranzahl = anzuzeigendeSpielrunde[4];

        //Anzahl der Teams für die Spielrunde
        let teamanzahl = (spieleranzahl - pausenspieleranzahl) / teamgroeße;

        //Array mit allen aktiven Spielern (also ohne Pausenspieler)
        let teamzuordnung = anzuzeigendeSpielrunde.slice(6 + pausenspieleranzahl, anzuzeigendeSpielrunde.length);

        let container = document.getElementById("anzeige");

        //Abruf der Teams und Eintrag auf Anzeige
        for (let i = 0; i < teamanzahl; i++) {

            let abschnittTeam = document.createElement("div");
            abschnittTeam.innerText = "Team " + (i + 1);
            abschnittTeam.id = "anzeige-team-" + (i + 1);
            container.appendChild(abschnittTeam);

            //eintragen der Teammitglieder
            for (let t = 0; t < spieleranzahl - pausenspieleranzahl; t += teamanzahl) {
                let teammitglied = document.createElement("p");
                teammitglied.innerText = teamzuordnung[i + t];
                teammitglied.id = "teammitglied-" + (t + 1) + "team-" + (i + 1);
                container.appendChild(teammitglied);
            }
        }

    }

}