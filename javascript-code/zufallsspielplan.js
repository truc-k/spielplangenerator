function spielernamenWahl() {
    //Hier wird zwischen der Eingabe der Spielernamen und Spieleranzahl gewählt und entsprechend werden die Test- bzw. Zahlfelder angepasst.

    //Deklaration der Variablen
    //Variablen Turnier mit Spielernamen
    let auswahlMitName = document.getElementById("mit-namen"); //Auswahlpunkt für Turnier mit Spielernamen
    let textfeldNamenSpieler = document.getElementById("namen-spieler"); //Abfragefeld für Spielernamen
    let textfeldNamenLeistungsspieler = document.getElementById("namen-leistungspieler"); //Abfragefeld für Leistungsspielernamen

    //Variablen Turnier ohne Spielernamen
    let auswahlOhneName = document.getElementById("ohne-namen"); //Auswahlpunkt für Turnier ohne Spielernamen
    let zahlfeldAnzahlSpieler = document.getElementById("anzahl-spieler-ohne-namen"); //Abfragefeld für Spieleranzahl
    let zahlfeldAnzahlLeistungsspieler = document.getElementById("anzahl-leistungsspieler"); //Abfragefeld für Leistungsspieleranzahl

    //if-Bedingung prüft, ob Auswahlfeld ausgewählt wird und ob die Felder für die Anzahl der Spieler und Leistungsspieler beschrieben sind
    if (auswahlMitName.checked == true && zahlfeldAnzahlSpieler.value == "" && zahlfeldAnzahlLeistungsspieler.value == "") { //Einstellung für Turnier mit Namen
        //Spieler- und Leistungsspielernamen können eingetragen werden, Zahlfelder sind nicht sichtbar
        textfeldNamenSpieler.style.display = "block";
        textfeldNamenLeistungsspieler.style.display = "block";
        zahlfeldAnzahlSpieler.style.display = "none";
        zahlfeldAnzahlLeistungsspieler.style.display = "none";

        //else-if-Bedingung prüft, ob Auswahlfeld ausgewählt wird und ob die Felder für die Spieler- und Leistungsspielernamen beschrieben sind
    } else if (auswahlOhneName.checked == true && textfeldNamenSpieler.value == "" && textfeldNamenLeistungsspieler.value == "") { //Einstellungen für ein Turnier ohne Namen
        //Zahlfelder für Spieler- und Leistungsspieleranzahl können eingetragen werden, Namensfelder sind nicht sichtbar
        textfeldNamenSpieler.style.display = "none";
        textfeldNamenLeistungsspieler.style.display = "none";
        zahlfeldAnzahlSpieler.style.display = "block";
        zahlfeldAnzahlLeistungsspieler.style.display = "block";
    }
}

function initialisierungTurnier() {
    //Hier werden die Turniereinstellungen gespeichert, um später wieder abgerufen werden zu können.

    //Deklaration der Variablen
    //allgemeine Variablen
    let teamgroeße = document.getElementById("teamgroeße").value; //Abfragefeld für Spieler pro Team
    let teamanzahl = document.getElementById("teamanzahl").value; //Abfragefeld für Teams pro Spielfeld
    let spielfeldAnzahl = document.getElementById("spielfeld-anzahl").value; //Abfragefeld für optionale Beschränkung der Spielfeldanzahl

    //Variablen Turnier mit Spielernamen
    let auswahlMitName = document.getElementById("mit-namen"); //Auswahlpunkt für Turnier mit Spielernamen
    let textfeldNamenSpieler = document.getElementById("namen-spieler"); //Abfragefeld für Spielernamen
    let textfeldNamenLeistungsspieler = document.getElementById("namen-leistungspieler"); //Abfragefeld für Leistungsspielernamen

    //Variablen Turnier ohne Spielernamen
    let auswahlOhneName = document.getElementById("ohne-namen"); //Auswahlpunkt für Turnier ohne Spielernamen
    let zahlfeldAnzahlSpieler = document.getElementById("anzahl-spieler-ohne-namen"); //Abfragefeld für Spieleranzahl
    let zahlfeldAnzahlLeistungsspieler = document.getElementById("anzahl-leistungsspieler"); //Abfragefeld für Leistungsspieleranzahl

    //Codevariablen
    let namenSpielerArray //Array aller "normalen" Spieler (keine Leistungsspieler)
    let namenLeistungsspielerArray //Array aller Leistungsspieler
    let spieleranzahl //Anzahl der Spieler des Turniers (inklusive Leistungsspieler)
    let leistungsspieleranzahl //Anzahl der Leistungsspieler des Turniers
    let pausenspieleranzahl //Anzahl der Pausenspieler des Turniers
    let turniereinstellungenArray //Array für die Einstellungen des Turniers

    //Speichern für Turnier mit Namen
    //Überprüfen, ob alle erforderlichen Angaben getätigt wurden
    if (auswahlMitName.checked == true && textfeldNamenSpieler.value !== "" && teamgroeße > 0 && teamanzahl > 0) {
        //Eintrag aller Spielernamen in ein Array
        //leere Zeilen werden herausgefilert
        namenSpielerArray = textfeldNamenSpieler.value.replace(/\r\n/g, "\n").split("\n").filter(line => line);

        if (textfeldNamenLeistungsspieler !== "") {
            //wenn vorhanden, Eintrag aller Leistungsspielernamen in ein Array
            //leere Zeilen werden herausgefilert
            namenLeistungsspielerArray = textfeldNamenLeistungsspieler.value.replace(/\r\n/g, "\n").split("\n").filter(line => line);
        }

        //Spieleranzahl ist die Anzahl der Spieler und Leistungsspieler
        spieleranzahl = namenSpielerArray.length + namenLeistungsspielerArray.length;

        leistungsspieleranzahl = namenLeistungsspielerArray.length;

        //Pausenspieleranzahl ist die Anzahl der Spieler, die in einer Spielrunde aufgrund der Teamgröße und -anzahl pausieren müssen
        pausenspieleranzahl = spieleranzahl % (teamgroeße * teamanzahl);

        //wenn die Spielfeldanzahl nicht festgelegt (=begrenzt) wurde, bestimmt sich diese aus der Division von Spieleranzahl abzüglich der Pausenspieler und Teamgröße und -anzahl
        if (spielfeldAnzahl < 1) {
            spielfeldAnzahl = (spieleranzahl - pausenspieleranzahl) / (teamgroeße * teamanzahl);
        }

        //Speichern der Turniereinstellungen in einem Array
        /*Aufbau Einstellungsarray: [0] - Spieleranzahl
                                    [1] - Teamgröße / Spieler pro Team
                                    [2] - Teamanzahl / Teams pro Spielfeld
                                    [3] - Leistungsspieleranzahl
                                    [4] - Pausenspieleranzahl
                                    [5] - Spielfeldanzahl
                                    [*] - Namen aller Leistungsspieler
                                    [*] - Namen aller (restlichen) Spieler
        */

        turniereinstellungenArray = [spieleranzahl, teamgroeße, teamanzahl, leistungsspieleranzahl, pausenspieleranzahl, spielfeldAnzahl];

        //Eintrag aller Namen der Leistungsspieler
        for (let i = 0; i = leistungsspieleranzahl; i++) {
            turniereinstellungenArray.push(namenLeistungsspielerArray[i]);
        }

        //Eintrag aller Namen der anderen Spieler
        for (let i = 0; i = spieleranzahl - leistungsspieleranzahl; i++) {
            turniereinstellungenArray.push(namenSpielerArray[i]);
        }

        //Übergabe des Arrays in den lokalen Speicher
        localStorage.setItem("Turniereinstellungen", turniereinstellungenArray);

    } else {
        alert("Nicht alle notwendigen Angaben wurden getätigt");
        return;
    }

}