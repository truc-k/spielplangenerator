//Hier wird zwischen der Eingabe der Spielernamen und Spieleranzahl gewählt und entsprechend werden die Test- bzw. Zahlfelder angepasst.
function spielernamenWahl() {

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

//Hier werden die Turniereinstellungen gespeichert, um später wieder abgerufen werden zu können.
function initialisierungTurnier() {

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
    let namenSpielerArray = []; //Array aller "normalen" Spieler (keine Leistungsspieler)
    let namenLeistungsspielerArray = []; //Array aller Leistungsspieler
    let spieleranzahl; //Anzahl der Spieler des Turniers (inklusive Leistungsspieler)
    let leistungsspieleranzahl; //Anzahl der Leistungsspieler des Turniers
    let pausenspieleranzahl; //Anzahl der Pausenspieler des Turniers
    let turniereinstellungenArray = []; //Array für die Einstellungen des Turniers

    //Speichern für Turnier mit Namen
    //Überprüfen, ob alle erforderlichen Angaben getätigt wurden
    if (auswahlMitName.checked == true && textfeldNamenSpieler.value !== "" && teamgroeße > 0 && teamanzahl > 0) {
        //Eintrag aller Spielernamen in ein Array
        //leere Zeilen werden herausgefilert
        namenSpielerArray = textfeldNamenSpieler.value.replace(/\r\n/g, "\n").split("\n").filter(line => line);

        //Leistungsspielerbestimmung, wenn vorhanden
        if (textfeldNamenLeistungsspieler.value !== "") {
            //wenn vorhanden, Eintrag aller Leistungsspielernamen in ein Array
            //leere Zeilen werden herausgefilert
            namenLeistungsspielerArray = textfeldNamenLeistungsspieler.value.replace(/\r\n/g, "\n").split("\n").filter(line => line);

            //Leistungsspieleranzahl
            leistungsspieleranzahl = namenLeistungsspielerArray.length;

        } else {
            leistungsspieleranzahl = 0;
        }

        //Spieleranzahl ist die Anzahl der Spieler
        spieleranzahl = namenSpielerArray.length + namenLeistungsspielerArray.length;

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

        //Eintrag aller Namen der Leistungsspieler, wenn vorhanden
        if (textfeldNamenLeistungsspieler.value !== "") {
            for (let i = 0; i <= leistungsspieleranzahl - 1; i++) { //-1 bei leistungsspieleranzahl notwendig, da Array mit Zählung bei 0 beginnt
                turniereinstellungenArray.push(namenLeistungsspielerArray[i]);
            }
        }

        //Eintrag aller Namen der anderen Spieler
        for (let i = 0; i <= spieleranzahl - leistungsspieleranzahl - 1; i++) {
            turniereinstellungenArray.push(namenSpielerArray[i]);
        }

        //Übergabe des Arrays in den lokalen Speicher
        localStorage.setItem("turniereinstellungen", JSON.stringify(turniereinstellungenArray));

        //Speichern für Turnier ohne Namen
        //Überprüfen, ob alle erforderlichen Angaben getätigt wurden
    } else if (auswahlOhneName.checked == true && zahlfeldAnzahlSpieler.value !== "" && teamgroeße > 0 && teamanzahl > 0) {

        spieleranzahl = zahlfeldAnzahlSpieler.value;

        if (zahlfeldAnzahlLeistungsspieler.value == "") {
            leistungsspieleranzahl = 0;
        } else {
            leistungsspieleranzahl = zahlfeldAnzahlLeistungsspieler.value;
        }

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

        //Eintrag aller Zahlen der Spieler
        for (let i = 1; i <= spieleranzahl; i++) {
            turniereinstellungenArray.push(i);
        }

        //Übergabe des Arrays in den lokalen Speicher
        localStorage.setItem("turniereinstellungen", JSON.stringify(turniereinstellungenArray));

    } else {
        alert("Nicht alle notwendigen Angaben wurden getätigt");
        return;
    }

}

//Hier werden die Spielrunden generiert und auf der Seite dargestellt.
//Zunächst wird die Knopfaktion ausgewertet (addEventListener).
document.getElementById("button-neue-runde").addEventListener("click", neueRundeGenerieren);

//Hier wird eine neue Spielrunde generiert.
function neueRundeGenerieren() {
    //Variablen
    let runde; //Zahl der zu erstellende Runde
    let turniereinstellungenArray; //Array der Turniereinstellungen aus local storage
    let spieleranzahl; //Anzahl der SPieler des Turniers (inklusive Leistungsspieler)
    let teamgroeße; //Teamgröße / Spieler pro Team
    let teamanzahl; //Teamanzahl / Teams pro Spielfeld
    let leistungsspieleranzahl; //Anzahl der Leistungsspieler
    let pausenspieleranzahl; //Anzahl der Pausenspieler
    let spielfeldAnzahl; //Anzahl der möglichen (maximalen) Spielfelder
    let namenAlleSpielerArray; //Namen aller Spieler (inklusive Leistungsspieler)
    let namenSpielerArray; //Namen aller Spieler (ohne Leistungsspieler)
    let namenLeistungsspielerArray; //Namen aller Leistungsspieler
    let pausenspielerArray; //Namen aller Pausenspieler

    let vorherigeSpielrundeArray; //Array der vorherigen Spielrunde

    //Es wird überprüft, ob der local Storage bereits einen Rundenzähler hat, wenn nicht wird dieser erstellt und die zu erstellende Runde wird definiert ("runde").
    if (!localStorage.getItem("rundenzähler")) {
        //Wenn der "rundenzähler" nicht vorhanden ist, wird dieser mit Runde erstellt und "runde" wird definiert.
        localStorage.setItem("rundenzähler", 1);
        runde = 1;
    } else {
        //Wenn der "rundenzähler" vorhanden ist, wird die aktuelle Rundenzahl abgerufen und mit eins addiert.
        runde = Number(localStorage.getItem("rundenzähler")) + 1;
    }

    //Speichern der Turnierdaten aus dem Turniereinstellungsarray.
    turniereinstellungenArray = JSON.parse(localStorage.getItem("turniereinstellungen"));

    spieleranzahl = turniereinstellungenArray[0];
    teamgroeße = turniereinstellungenArray[1];
    teamanzahl = turniereinstellungenArray[2];
    leistungsspieleranzahl = turniereinstellungenArray[3];
    pausenspieleranzahl = turniereinstellungenArray[4];
    spielfeldAnzahl = turniereinstellungenArray[5];
    namenAlleSpielerArray = turniereinstellungenArray.slice(6, turniereinstellungenArray.length);
    namenSpielerArray = turniereinstellungenArray.slice(6 + pausenspieleranzahl, turniereinstellungenArray.length);
    namenLeistungsspielerArray = turniereinstellungenArray.slice(6, 6 + leistungsspieleranzahl);

    //Bestimmung der Pausenspieler
    //Es werden der Reihe nach alle Spieler des Turniers als Pausenspieler deklariert.
    if (runde = 1) {
        //Für Runde 1
        pausenspielerArray = namenAlleSpielerArray.slice(0, pausenspieleranzahl - 1);
    } else {
        //Für jede beliebige Runde wird erst der letzte Pausenspieler der vergangenen Runde bestimmt, dann im aktuellen Gesamtspielerarray gesucht und ab diesem bis zur Zahl der Pausenspieleranzahl als Pausenspieler deklariert. Wenn das Gesamtspielerarray am Ende ist, beginnt die Pausendeklarierung wieder mit dem ersten Spieler.
    }
}