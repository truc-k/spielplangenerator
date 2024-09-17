window.onload = function () {

    //Einstellung für die Anzeige der Teams
    //mit jedem neu laden wird im local storage die anzuzeigende Runde abgerufen
    if (localStorage.getItem("anzeige")) {
        let runde = localStorage.getItem("anzeige");

        let container = document.getElementById("anzeige");

        if (!localStorage.getItem("runde-" + runde)) {
            let abschnittInfotext = document.createElement("p");
            abschnittInfotext.innerText = "Runde " + runde + " wurde noch nicht erstellt."
            abschnittInfotext.id = "anzeige-info";
            container.appendChild(abschnittInfotext);
        }

        let anzuzeigendeSpielrunde = JSON.parse(localStorage.getItem("runde-" + runde));

        let spieleranzahl = anzuzeigendeSpielrunde[0];
        let teamgroeße = Number(anzuzeigendeSpielrunde[1]);
        let teamanzahl = anzuzeigendeSpielrunde[2];
        let pausenspieleranzahl = anzuzeigendeSpielrunde[4];
        let spielfeldAnzahl = anzuzeigendeSpielrunde[5];

        //Abruf der Spielfeldnamen
        let spielfelder = JSON.parse(localStorage.getItem("anzeige-spielfelder"));

        //Array mit allen aktiven Spielern (also ohne Pausenspieler)
        let teamzuordnung = anzuzeigendeSpielrunde.slice(6 + pausenspieleranzahl, anzuzeigendeSpielrunde.length);

        //Abruf der Teams und Eintrag auf Anzeige zugeordnet auf die Spielfelder in Abhängigkeit der Teams pro Spielfeld
        for (let s = 0; s < spielfeldAnzahl; s++) {

            let spielfeldAbschnitt = document.createElement("div");
            spielfeldAbschnitt.id = "spielfeld-" + (s + 1);
            let spielfeldName = document.createElement("p");
            spielfeldName.innerText = spielfelder[s];
            spielfeldAbschnitt.appendChild(spielfeldName);

            for (let i = 0; i < teamanzahl; i++) {

                let abschnittTeam = document.createElement("div");
                abschnittTeam.innerText = "Team " + (s * teamanzahl + i + 1);
                abschnittTeam.id = "anzeige-team-" + (i + 1);

                //eintragen der Teammitglieder
                for (let t = s * teamanzahl + i; t < spieleranzahl - pausenspieleranzahl; t += teamgroeße) {
                    let teammitglied = document.createElement("p");
                    teammitglied.innerText = teamzuordnung[t];
                    teammitglied.id = "teammitglied-" + (t) + "team-" + (i + 1);
                    abschnittTeam.appendChild(teammitglied);
                }

                spielfeldAbschnitt.appendChild(abschnittTeam);
            }

            container.appendChild(spielfeldAbschnitt);
        }

        //Pausenspieler, wenn vorhanden
        if (pausenspieleranzahl != 0) {
            //Array mit allen Pausenspielern
            let allePausenspieler = anzuzeigendeSpielrunde.slice(6, 6 + pausenspieleranzahl);

            let abschnittPausenspieler = document.createElement("div");
            abschnittPausenspieler.innerText = "Pausenspieler";
            abschnittPausenspieler.id = "anzeige-pausenspieler";

            //Eintrag der Pausenspieler
            for (let p = 0; p < pausenspieleranzahl; p++) {
                let pausenspieler = document.createElement("p");
                pausenspieler.innerText = allePausenspieler[p];
                pausenspieler.id = "pausenspieler-" + (p + 1);
                abschnittPausenspieler.appendChild(pausenspieler);
            }

            container.appendChild(abschnittPausenspieler);

        }
    }


}