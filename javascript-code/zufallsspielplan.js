//Hier wird zwischen der Eingabe der Spielernamen und Spieleranzahl gewählt und entsprechend werden die Test- bzw. Zahlfelder angepasst.
window.onload = function () {

    //wenn ein Turnier gespeichert ist, wird dieses im Einstellungsfenster hinterlegt
    if (localStorage.getItem("turniereinstellungen")) {
        //Abruf des Turnierarrays aus local storage
        let turniereinstellungenArray = JSON.parse(localStorage.getItem("turniereinstellungen"));

        //Abruf der Einstellungen
        let spieleranzahl = turniereinstellungenArray[0];
        let teamgroeße = turniereinstellungenArray[1];
        let teamanzahl = turniereinstellungenArray[2];
        let leistungsspieleranzahl = turniereinstellungenArray[3];
        let pausenspieleranzahl = turniereinstellungenArray[4];
        let spielfeldAnzahl = turniereinstellungenArray[5];

        //Eintrag der Einstellungen aus Turnierarray
        let teamgroeßeZahlfeld = document.getElementById("teamgroeße");
        teamgroeßeZahlfeld.value = teamgroeße; //Eintrag der Spieler pro Team
        teamgroeßeZahlfeld.readOnly = true;

        let teamanzahlZahlfeld = document.getElementById("teamanzahl");
        teamanzahlZahlfeld.value = teamanzahl; //Eintrag der Teams pro Spielfeld
        teamanzahlZahlfeld.readOnly = true;

        let spielfeldAnzahlZahlfeld = document.getElementById("spielfeld-anzahl");
        spielfeldAnzahlZahlfeld.value = spielfeldAnzahl; //Eintrag der (für die Spielerzahl) maximalen Spieleranzahl
        spielfeldAnzahlZahlfeld.readOnly = true;

        //Überprüfen, ob es ein Turnier mit Spielernamen oder ohne ist (= Zahlen für alle Spieler)
        let auswahlMitNamen = document.getElementById("mit-namen");
        let auswahlOhneName = document.getElementById("ohne-namen");

        if (isNaN(turniereinstellungenArray[6])) {
            //es sind Spielernamen eingetragen
            //Auswahl des Feldes für Nameneintrag und Deaktivierung beider Auswahlknöpfe
            auswahlMitNamen.click();
            auswahlMitNamen.disabled = true;
            auswahlOhneName.disabled = true;

            //Eintrag der Namen der Spieler und Leistungsspieler
            let namenSpielerArray;

            if (leistungsspieleranzahl > 0) {
                let namenLeistungsspielerArray = turniereinstellungenArray.slice(6, 6 + leistungsspieleranzahl);
                namenSpielerArray = turniereinstellungenArray.slice(6 + leistungsspieleranzahl, turniereinstellungenArray.length);

                let namenLeistungsspielerTextfeld = document.getElementById("namen-leistungsspieler");
                namenLeistungsspielerTextfeld.value = namenLeistungsspielerArray.toString().replace(/,/g, "\n");
                namenLeistungsspielerTextfeld.innerHTML.readOnly = true;
            } else {
                namenSpielerArray = turniereinstellungenArray.slice(6, turniereinstellungenArray.length);
            }

            let namenSpielerTextfeld = document.getElementById("namen-spieler");
            namenSpielerTextfeld.innerHTML = namenSpielerArray.toString().replace(/,/g, "\n");
            namenSpielerTextfeld.readOnly = true;

        } else {
            //es sind Spielerzahlen eingetragen
            //Auswahl des Feldes für Spieleranzahleintrag und Deaktivierung beider Auswahlknöpfe
            auswahlOhneName.click();
            auswahlOhneName.disabled = true;
            auswahlMitNamen.disabled = true;

            //Eintrag der Spieler- und Leistungsspieleranzahl
            let spieleranzahlZahlfeld = document.getElementById("anzahl-spieler-ohne-namen");
            spieleranzahlZahlfeld.value = spieleranzahl;
            spieleranzahlZahlfeld.readOnly = true;

            let leistungsspieleranzahlZahlfeld = document.getElementById("anzahl-leistungsspieler");
            leistungsspieleranzahlZahlfeld.value = leistungsspieleranzahl;
            leistungsspieleranzahlZahlfeld.readOnly = true;
        }

        //einblenden des Buttons für eine Turnieränderung (ausblenden des Speicher-Buttons)
        document.getElementById("button-initialisierung-speichern").style.display = "none";
        document.getElementById("button-initialisierung-aendern").style.display = "block";

        //Einblenden des Buttons für ein neues Turnier
        document.getElementById("button-neues-turnier").style.display = "block";

        //Einblenden des Buttons für den Turnierexport (ausblenden Importbutton)
        document.getElementById("button-turnier-export").style.display = "block";
        document.getElementById("button-turnier-import").style.display = "none";
    }

    //wenn die Seite neu geladen werden sollte, werden hier zunächst alle bereits vorhanden Runden wieder durch einfügen des zugehörigen Buttons dargestellt
    if (localStorage.getItem("rundenzaehler")) {
        let rundenanzahl = localStorage.getItem("rundenzaehler");
        for (let i = 1; i <= rundenanzahl; i++) {

            //Hier werden die Buttons für jede einzelne Runde auf der HTML-Seite hinzugefügt.
            let container = document.getElementById("spielrunden");
            let newElement = document.createElement("button");
            newElement.innerText = "Runde " + i;
            newElement.id = "button-runde-" + i;
            container.appendChild(newElement);
        }
    }

    //wenn Spielfelder bereits eingetragen wurden, werden diese wieder mit eingefügt
    if (localStorage.getItem("anzeige-spielfelder")) {
        document.getElementById("anzeige-spielfelder").value = JSON.parse(localStorage.getItem("anzeige-spielfelder")).join(" ");
    }
}

//Event-Listener für Wahl mit oder ohne Namen
document.getElementById("mit-namen").addEventListener("click", spielernamenWahl);
document.getElementById("ohne-namen").addEventListener("click", spielernamenWahl);

function spielernamenWahl() {

    //Deklaration der Variablen
    //Variablen Turnier mit Spielernamen
    let auswahlMitName = document.getElementById("mit-namen"); //Auswahlpunkt für Turnier mit Spielernamen
    let textfeldNamenSpieler = document.getElementById("namen-spieler"); //Abfragefeld für Spielernamen
    let textfeldNamenLeistungsspieler = document.getElementById("namen-leistungsspieler"); //Abfragefeld für Leistungsspielernamen

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

    } else if (zahlfeldAnzahlSpieler.value != "" || zahlfeldAnzahlLeistungsspieler.value != "") {
        //wenn eteas in einem Feld steht, wird die Auswahl nicht geändert
        auswahlOhneName.checked = true;
    } else if (textfeldNamenSpieler.value != "" || textfeldNamenLeistungsspieler.value != "") {
        //wenn eteas in einem Feld steht, wird die Auswahl nicht geändert
        auswahlMitName.checked = true;
    }
}

//Event-Listener für Erstellung eines neues Turniers
document.getElementById("button-neues-turnier").addEventListener("click", neuesTurnier);

//Hier wird ein eventuell bereits vorhandenes Turnier gelöscht und es kann ein neues erstellt werden
function neuesTurnier() {
    if (confirm("Das bisherige Turnier wird gelöscht. \nFortfahren?") == true) {
        localStorage.clear();
    } else {
        return;
    }
    location.reload();
}

//Event-Listener für Turnieränderung
document.getElementById("button-initialisierung-aendern").addEventListener("click", turnierAendern);

function turnierAendern() {

    //es werden alle Einstellungsfenster für das Turnier "freigeschaltet"
    document.getElementById("teamgroeße").readOnly = false;
    document.getElementById("teamanzahl").readOnly = false;
    document.getElementById("spielfeld-anzahl").readOnly = false;
    document.getElementById("mit-namen").disabled = false;
    document.getElementById("ohne-namen").disabled = false;

    //Turnier mit Spielernamen
    document.getElementById("namen-spieler").readOnly = false;
    document.getElementById("namen-leistungsspieler").readOnly = false;

    //Turnier ohne Spielernamen
    document.getElementById("anzahl-spieler-ohne-namen").readOnly = false;
    document.getElementById("anzahl-leistungsspieler").readOnly = false;

    //einfügen des Speicher-Buttons und Ändern-Button verschwindet
    document.getElementById("button-initialisierung-speichern").style.display = "block";
    document.getElementById("button-initialisierung-aendern").style.display = "none";
    document.getElementById("button-neues-turnier").style.display = "block";
}

//Event-Listener für die Turnierspeicherung
document.getElementById("button-initialisierung-speichern").addEventListener("click", turnierSpeichern);

//Hier werden die Turniereinstellungen gespeichert, um später wieder abgerufen werden zu können.
function turnierSpeichern() {

    //Deklaration der Variablen
    //allgemeine Variablen
    let teamgroeße = document.getElementById("teamgroeße").value; //Abfragefeld für Spieler pro Team
    let teamanzahl = document.getElementById("teamanzahl").value; //Abfragefeld für Teams pro Spielfeld
    let spielfeldAnzahl = document.getElementById("spielfeld-anzahl").value; //Abfragefeld für optionale Beschränkung der Spielfeldanzahl

    //Variablen für Auswahl mit / ohne Namen
    let auswahlMitName = document.getElementById("mit-namen"); //Auswahlpunkt für Turnier mit Spielernamen
    let auswahlOhneName = document.getElementById("ohne-namen"); //Auswahlpunkt für Turnier ohne Spielernamen

    //Codevariablen
    let spieleranzahl; //Anzahl der Spieler des Turniers (inklusive Leistungsspieler)
    let leistungsspieleranzahl; //Anzahl der Leistungsspieler des Turniers
    let pausenspieleranzahl; //Anzahl der Pausenspieler des Turniers
    let turniereinstellungenArray = []; //Array für die Einstellungen des Turniers

    //Variablen Turnier mit Spielernamen
    let textfeldNamenSpieler = document.getElementById("namen-spieler"); //Abfragefeld für Spielernamen
    let textfeldNamenLeistungsspieler = document.getElementById("namen-leistungsspieler"); //Abfragefeld für Leistungsspielernamen
    let namenSpielerArray = []; //Array aller "normalen" Spieler (keine Leistungsspieler)
    let namenLeistungsspielerArray = []; //Array aller Leistungsspieler

    //Variablen Turnier ohne Spielernamen
    let zahlfeldAnzahlSpieler = document.getElementById("anzahl-spieler-ohne-namen"); //Abfragefeld für Spieleranzahl
    let zahlfeldAnzahlLeistungsspieler = document.getElementById("anzahl-leistungsspieler"); //Abfragefeld für Leistungsspieleranzahl

    //wenn bereits ein Turnier im local storage ist, wird dieses abgeändert, sonst wird ein neues Turnier erstellt
    if (localStorage.getItem("turniereinstellungen")) {
        alert("Es ist bereits ein Turnier vorhanden. \n Überarbeitung in Gange - solange keine Änderung möglich.");
    } else { //da kein Turnier gespeichert ist, kann ein neues Turnier angelegt werden

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

            //erstellen einer Map zur Speicherung aller Spielerergebnisse
            let spielerergebnisseMap = new Map();

            //Eintrag aller Namen der Leistungsspieler, wenn vorhanden
            //zusätzlich werden die Arrays für Ergebnisspeicherung der Spieler erstellt
            if (textfeldNamenLeistungsspieler.value !== "") {
                for (let i = 0; i <= leistungsspieleranzahl - 1; i++) { //-1 bei leistungsspieleranzahl notwendig, da Array mit Zählung bei 0 beginnt
                    turniereinstellungenArray.push(namenLeistungsspielerArray[i]);
                    spielerergebnisseMap.set(namenLeistungsspielerArray[i], JSON.stringify([0, 0, 0, 0, 0]));
                }
            }

            //Eintrag aller Namen der anderen Spieler
            //zusätzlich werden die Arrays für Ergebnisspeicherung der Spieler erstellt
            for (let i = 0; i <= spieleranzahl - leistungsspieleranzahl - 1; i++) {
                turniereinstellungenArray.push(namenSpielerArray[i]);
                spielerergebnisseMap.set(namenSpielerArray[i], JSON.stringify([0, 0, 0, 0, 0]));
            }

            //Speichern der Spielerergebnis-Map im local Storage
            localStorage.spielerergebnisse = JSON.stringify(Array.from(spielerergebnisseMap.entries()));

            //Übergabe des Arrays in den lokalen Speicher
            localStorage.setItem("turniereinstellungen", JSON.stringify(turniereinstellungenArray));

            //einfügen des Speicher-Buttons und Ändern-Button verschwindet
            document.getElementById("button-initialisierung-speichern").style.display = "none";
            document.getElementById("button-initialisierung-aendern").style.display = "block";
            document.getElementById("button-neues-turnier").style.display = "block";

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

            //einfügen des Speicher-Buttons und Ändern-Button verschwindet
            document.getElementById("button-initialisierung-speichern").style.display = "none";
            document.getElementById("button-initialisierung-aendern").style.display = "block";
            document.getElementById("button-neues-turnier").style.display = "block";

        } else {
            alert("Nicht alle notwendigen Angaben wurden getätigt");
            return;
        }
    }

}

//Hier werden die Spielrunden generiert und auf der Seite dargestellt.
//Zunächst wird die Knopfaktion ausgewertet (addEventListener).
document.getElementById("button-neue-runde").addEventListener("click", neueRundeGenerieren);

//Hier wird eine neue Spielrunde generiert.
function neueRundeGenerieren() {
    //Es wird überprüft, ob ein Turnierarray vorliegt.
    if (!localStorage.getItem("turniereinstellungen")) {
        alert("Kein Turnier angelegt");
        return;
    }
    //Es wird überprüft, ob der local Storage bereits einen Rundenzähler hat, wenn nicht wird dieser erstellt und die zu erstellende Runde wird definiert ("runde").
    let runde; //Zahl der zu erstellende Runde
    let spielrundenMap; //Map für Spielrundenspeicherung

    //Abfrage, ob bereits ein Spielrundenspeicher vorhanden ist
    if (localStorage.spielrunden) {
        //Spielrundenspeicher vorhanden - Abruf der vorhandenen Map
        spielrundenMap = new Map(JSON.parse(localStorage.spielrunden));
    } else {
        //erstellen einer neuen Map
        spielrundenMap = new Map();
    }

    runde = Number(spielrundenMap.size) + 1;

    //Speichern der Turnierdaten aus dem Turniereinstellungsarray.
    let turniereinstellungenArray = JSON.parse(localStorage.getItem("turniereinstellungen")); //Array der Turniereinstellungen aus local storage

    let spieleranzahl = turniereinstellungenArray[0]; //Anzahl der Spieler des Turniers (inklusive Leistungsspieler)
    let teamgroeße = turniereinstellungenArray[1]; //Teamgröße / Spieler pro Team
    let teamanzahl = turniereinstellungenArray[2]; //Teamanzahl / Teams pro Spielfeld
    let leistungsspieleranzahl = turniereinstellungenArray[3]; //Anzahl der Leistungsspieler
    let pausenspieleranzahl = turniereinstellungenArray[4]; //Anzahl der Pausenspieler
    let spielfeldAnzahl = turniereinstellungenArray[5]; //Anzahl der möglichen (maximalen) Spielfelder

    let namenAlleSpielerArray = turniereinstellungenArray.slice(6, turniereinstellungenArray.length); //Namen aller Spieler (inklusive Leistungsspieler)
    let namenSpielerArray = turniereinstellungenArray.slice(6 + leistungsspieleranzahl, turniereinstellungenArray.length); //Namen aller Spieler (ohne Leistungsspieler)
    let namenLeistungsspielerArray = turniereinstellungenArray.slice(6, 6 + leistungsspieleranzahl); //Namen aller Leistungsspieler

    //Die Zuordnung der Pausenspieler ist noch fehlerhaft, da ein Problem entsteht, wenn der letzte Pausenspieler der letzten Runde nicht mehr mitgespielt.
    //der folgenden Abschnitt kann vereinfacht geschrieben werden und das wird in Zukunft noch passieren

    //Bestimmung der Pausenspieler, wenn nötig
    let pausenspielerArray; //Namen aller Pausenspieler
    if (pausenspieleranzahl > 0) {
        //Es werden der Reihe nach alle Spieler des Turniers als Pausenspieler deklariert.
        if (runde <= 1) {
            //Für Runde 1
            pausenspielerArray = namenAlleSpielerArray.splice(0, pausenspieleranzahl);
        } else {
            //Für jede beliebige Runde wird erst der letzte Pausenspieler der vergangenen Runde bestimmt, dann im aktuellen Gesamtspielerarray gesucht und ab diesem bis zur Zahl der Pausenspieleranzahl als Pausenspieler deklariert. Wenn das Gesamtspielerarray am Ende ist, beginnt die Pausendeklarierung wieder mit dem ersten Spieler.
            let vorherigeSpielrundeArray = JSON.parse(spielrundenMap.get("runde-" + (runde - 1))); //Array der vorherigen Spielrunde

            if (vorherigeSpielrundeArray[4] > 0) { //wenn in der vorherigen Runde Pausenspieler benannt waren, werden diese bei der Benennung der neuen Pausenspieler berücksichtigt
                let nameLetzterPausenspieler = vorherigeSpielrundeArray[5 + vorherigeSpielrundeArray[4]]; //es wird der Name des letzten Pausenspielers aus dem Array herausgenommen
                let naechsterPausenspielerZahl = namenAlleSpielerArray.indexOf(nameLetzterPausenspieler) + 1; //es wird der Pausenspieler im Gesamtspielerarray gesucht und die Nummer der Stelle im Array gespeichert

                //Nun gibt es drei Möglichkeiten, wie die Pausenspieler bestimmt werden, abhängig von der Position des ersten Pausenspielers im Array.
                if (naechsterPausenspielerZahl > namenAlleSpielerArray.length) {
                    //Wenn die Zahl des ersten Pausenspielers größer ist, als die Länge des Arrays (bedeutet, der letzte Pausenspieler der vorherigen Runde war der letzte im Array), wird der erste Spieler im Gesamtarray als erster Pausenspieler festgesetzt.
                    naechsterPausenspielerZahl = 0;

                } else if (naechsterPausenspielerZahl + pausenspieleranzahl > namenAlleSpielerArray.length) {
                    //hier wird der Fall behandelt, dass am Ende das Array kürzer ist als die benötigte Anzahl der Pausenspieler - für diesen Fall werden die letzten Spieler aus dem Array genommen und die Zählung beginnt wieder am Beginn des Arrays
                    //die Zahl "namenAlleSpielerArray.length" muss als Konstante definiert werden, da zwei splice durchgeführt werden und beide den gleichen Wert für "namenAlleSpielerArray.length" brauchen
                    let namenAlleSpielerArrayLength = namenAlleSpielerArray.length;
                    pausenspielerArray = namenAlleSpielerArray.splice(naechsterPausenspielerZahl, namenAlleSpielerArrayLength - naechsterPausenspielerZahl).concat(namenAlleSpielerArray.splice(0, pausenspieleranzahl - namenAlleSpielerArrayLength + naechsterPausenspielerZahl));
                } else {
                    //hier werden einfach die Pausenspieler aus dem Array bestimmt, da das Array / der Rest des Arrays länger ist, als die Anzahl der Pausenspieler
                    pausenspielerArray = namenAlleSpielerArray.splice(naechsterPausenspielerZahl, pausenspieleranzahl); //neue Pausenspieler werden aus Gesamtspielerarray herausgeholt
                }
            } else { //für den Fall, dass keine Pausenspieler in der vorherigen Runde benannt waren, fängt die Benennung nun in der Liste ganz vorne an
                pausenspielerArray = namenAlleSpielerArray.splice(0, pausenspieleranzahl);
            }
        }
    }

    //Nun werden aus den Einzelarrays, die für die Teamzuordnung nötig sind, die Pausenspieler entfernt.
    for (let i = 0; i <= pausenspieleranzahl - 1; i++) {
        if (namenSpielerArray.indexOf(pausenspielerArray[i]) > -1) {
            namenSpielerArray.splice(namenSpielerArray.indexOf(pausenspielerArray[i]), 1);
        } else if (namenLeistungsspielerArray.indexOf(pausenspielerArray[i]) > -1) {
            namenLeistungsspielerArray.splice(namenLeistungsspielerArray.indexOf(pausenspielerArray[i]), 1);
        }
    }
    //jetzt werden beide Spielernamenarrays gemischt
    for (var i = namenLeistungsspielerArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [namenLeistungsspielerArray[i], namenLeistungsspielerArray[j]] = [namenLeistungsspielerArray[j], namenLeistungsspielerArray[i]];
    }

    for (var i = namenSpielerArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [namenSpielerArray[i], namenSpielerArray[j]] = [namenSpielerArray[j], namenSpielerArray[i]];
    }

    //Speichern der Spielrunde in einem Array
    /*Aufbau Spielrundenarray:  [0] - Spieleranzahl
                                [1] - Teamgröße / Spieler pro Team
                                [2] - Teamanzahl / Teams pro Spielfeld
                                [3] - Leistungsspieleranzahl
                                [4] - Pausenspieleranzahl
                                [5] - Spielfeldanzahl
                                [*] - Namen aller Pausenspieler
                                [*] - Namen der restlichen Spieler (zuerst Leistungs-, dann alle anderen Spieler)
    */

    //Nun wird das Spielrundenarray mit den Initialeinstellungen, den Pausenspielern und der Spielermischung erstellt.
    let spielrunde;
    if (pausenspieleranzahl < 1) {
        //wenn es keine Pausenspieler gibt, wird das Pausenspielerarray nicht mit eingefügt
        spielrunde = [spieleranzahl, teamgroeße, teamanzahl, leistungsspieleranzahl, pausenspieleranzahl, spielfeldAnzahl].concat(namenLeistungsspielerArray.concat(namenSpielerArray));
    } else {
        spielrunde = [spieleranzahl, teamgroeße, teamanzahl, leistungsspieleranzahl, pausenspieleranzahl, spielfeldAnzahl].concat(pausenspielerArray.concat(namenLeistungsspielerArray.concat(namenSpielerArray)));
    }

    //Speichern der erstellen Spielrunde in der Map
    spielrundenMap.set("runde-" + runde, JSON.stringify(spielrunde));

    //Speichern der Map im local storage
    localStorage.spielrunden = JSON.stringify(Array.from(spielrundenMap.entries()));

    //Hier werden die Buttons für jede einzelne Runde auf der HTML-Seite hinzugefügt.
    let container = document.getElementById("spielrunden");
    let newElement = document.createElement("button");
    newElement.innerText = "Runde " + runde;
    newElement.id = "button-runde-" + runde;
    container.appendChild(newElement);
}

//Hier wird geprüft, ob ein Klick im div für die Rundenknöpfe erfolgt.
document.getElementById("spielrunden").addEventListener("click", rundeOeffnen);

function rundeOeffnen(event) {
    //da der eventlistener nur nach einem Klick im div sucht, müssen nur die Klicks beachtet werden, bei denen die ID nicht "spielrunden" (also alle IDs mit "runde X")
    if (event.target.id === "spielrunden") { return };

    //Variablen für beide Buttons, die für das Ergebnis speichern oder abbrechen benötigt werden
    let ergebnisSpeichernButton = document.getElementById("button-ergebnisse-speichern");
    let ergebnisAbbrechenButton = document.getElementById("button-ergebnisse-abbrechen");

    //definieren der Sichtbarkeit des Ergebnisspeichern-Buttons 
    let ergebnisbuttonSichtbarkeit = window.getComputedStyle(ergebnisSpeichernButton);

    //wenn die Buttons für die Ergebnisverarbeitung bereits sichtbar sind, wird bereits eine Runde angezeigt, dann wird erst die alte Runde gelöscht
    if (ergebnisbuttonSichtbarkeit.display === "block") {
        document.getElementById("ergebnisfenster").innerHTML = "";
    }

    //Schrift des geklickten Buttons fett machen
    // document.getElementById(event.target.id).style.fontWeight = "bold";
    // leider keine Möglichkeit gefunden, den bold Tag wieder zurück zu nehmen, wenn andere Button gedrückt wird

    //abrufen der aktuellen Runde
    let runde = event.target.id.toString().slice(13);

    //abrufen der benötigten Spielrunde aus local storage
    let spielrundenMap = new Map(JSON.parse(localStorage.spielrunden));
    let aufgerufeneSpielrunde = JSON.parse(spielrundenMap.get("runde-" + runde));

    //Turniereinstellungen aus Rundenarray abrufen
    let spieleranzahl = aufgerufeneSpielrunde[0];
    let teamgroeße = aufgerufeneSpielrunde[1];
    let pausenspieleranzahl = aufgerufeneSpielrunde[4];

    let teamanzahl = (spieleranzahl - pausenspieleranzahl) / teamgroeße; //Anzahl der Teams für die Spielrunde
    let teamzuordnung = aufgerufeneSpielrunde.slice(6 + pausenspieleranzahl, aufgerufeneSpielrunde.length); //Array mit allen aktiven Spielern (also ohne Pausenspieler)

    //Bereich, in den Teams und Ergebnisfenster eingefügt werden
    let container = document.getElementById("ergebnisfenster");

    //einfügen der aktuellen Runde
    let rundeZahlErgebnisfenster = document.createElement("p");
    rundeZahlErgebnisfenster.innerText = "Runde " + runde;
    rundeZahlErgebnisfenster.id = "ergebnis-runde-" + runde;
    container.appendChild(rundeZahlErgebnisfenster);

    //zusammenfügen der Spieler zu Teams aus Rundenarray
    for (let i = 0; i < teamanzahl; i++) { //Durchführen für Teamanzahl

        let team; //String, der Spielernamen eines Teams beinhaltet
        //zusammenfügen aller Spieler, die in ein Team gehören
        for (let t = 0; t < spieleranzahl - pausenspieleranzahl; t += teamanzahl) {
            if (t < 1) {
                team = teamzuordnung[i + t];
            } else {
                team += ", " + teamzuordnung[i + t];
            }
        }

        //einfügen des Labels für die Inputbox mit dem team-String
        let spielernamenAbschnitt = document.createElement("label");
        spielernamenAbschnitt.innerText = team;
        spielernamenAbschnitt.htmlFor = "ergebnis-team-" + (i + 1);
        spielernamenAbschnitt.id = "label-ergebnis-team-" + (i + 1);
        container.appendChild(spielernamenAbschnitt);

        //einfügen der Inputbox für das Ergebnis für das Team
        let ergebnisbox = document.createElement("input");
        ergebnisbox.id = "ergebnis-team-" + (i + 1);
        ergebnisbox.type = "number";

        //falls bereits Ergebnisse für diese Runde eingetragen wurden, werden diese jetzt angezeigt (statt des placeholders)
        if (aufgerufeneSpielrunde[6 + spieleranzahl + i] === undefined) {
            ergebnisbox.placeholder = "Ergebnis Team " + (i + 1);
        } else {
            ergebnisbox.value = aufgerufeneSpielrunde[6 + spieleranzahl + i];
            ergebnisbox.readOnly = true;
        }

        container.appendChild(ergebnisbox);
    }

    //anzeigen der Buttons, die für Ergebnisverarbeitung notwendig sind
    ergebnisSpeichernButton.style.display = "block";
    ergebnisAbbrechenButton.style.display = "block";

}

//Hier wird geprüft, ob ein Klick für den Speicher-Button im Ergebnisfenster erfolgt
document.getElementById("button-ergebnisse-speichern").addEventListener("click", rundeErgebnisSpeichern);

function rundeErgebnisSpeichern() {

    //abrufen der aktuellen Runde
    let runde = document.querySelector('[id^="ergebnis-runde-"]').id.slice(15);

    //abrufen des Rundenarrays aus local Storage
    let spielrundenMap = new Map(JSON.parse(localStorage.spielrunden));
    let aktuelleSpielrunde = JSON.parse(spielrundenMap.get("runde-" + runde));

    //Turniereinstellungen aus Rundenarray abrufen
    let spieleranzahl = aktuelleSpielrunde[0];
    let teamgroeße = aktuelleSpielrunde[1];
    let pausenspieleranzahl = aktuelleSpielrunde[4];

    //keine Speicherung, wenn Ergebnis bereits eingetragen wurde
    if (aktuelleSpielrunde.length == 8 + spieleranzahl) {
        alert("Diese Runde wurde bereits gespeichert.")
        return;
    }

    //Anzahl der Teams für die Spielrunde
    let teamanzahl = (spieleranzahl - pausenspieleranzahl) / teamgroeße;

    for (let teamzahl = 1; teamzahl <= teamanzahl; teamzahl++) {
        let ergebnis = document.getElementById("ergebnis-team-" + teamzahl).value;
        aktuelleSpielrunde[5 + spieleranzahl + teamzahl] = ergebnis;
    }

    //speichern der Ergebnisse im Rundenarray
    spielrundenMap.set("runde-" + runde, JSON.stringify(aktuelleSpielrunde));
    localStorage.spielrunden = JSON.stringify(Array.from(spielrundenMap.entries()));

    //Array mit allen aktiven Spielern (also ohne Pausenspieler)
    let teamzuordnung = aktuelleSpielrunde.slice(6 + pausenspieleranzahl, aktuelleSpielrunde.length);

    //Map für Speicher der Spielerergebnisse
    let spielerergebnisseMap = new Map(JSON.parse(localStorage.spielerergebnisse));

    //Speichern der Ergebnisse für jeden Spieler
    for (let i = 0; i < teamanzahl; i++) { //Durchführung für Anzahl der Teams

        //bestimmen der Teammitglieder
        let team = [];
        for (let t = 0; t < spieleranzahl - pausenspieleranzahl; t += teamanzahl) {
            team.push(teamzuordnung[i + t]);
        }

        //bestimmen des Ergebnisses des Teams und des gegnerischen Ergebnisses
        let ergebnis;
        let ergebnisGegner;
        if (i % 2 == 0) {
            ergebnis = Number(aktuelleSpielrunde[6 + spieleranzahl + i]);
            ergebnisGegner = Number(aktuelleSpielrunde[7 + spieleranzahl + i]);
        } else {
            ergebnis = Number(aktuelleSpielrunde[6 + spieleranzahl + i]);
            ergebnisGegner = Number(aktuelleSpielrunde[5 + spieleranzahl + i]);
        }

        //Berechnung der Punktedifferenz
        let punktedifferenz = ergebnis - ergebnisGegner;

        //Eintrag der individuellen Ergebnisse
        /*Aufbau des individuellen Ergebnisarrays:  [0] - Anzahl gespielte Spiele / Spielrunden
                                                    [1] - Anzahl Siege
                                                    [2] - Punkte (aus gespielten Spielen des eigenen Teams)
                                                    [3] - Punktedifferenz (aus gespielten Spielen)
                                                    [4] - Punkte aus Ergebnisbewertung (TBC)*/


        for (let spielerzahl = 0; spielerzahl < teamgroeße; spielerzahl++) {
            //Abruf des Ergebnisarrays des Spielers
            let spielerergebnis = JSON.parse(spielerergebnisseMap.get(team[spielerzahl]));
            //Eintrag der gespielten Runde
            spielerergebnis[0] += 1;
            //Eintrag des Sieges, wenn Spiel gewonnen
            if (ergebnis > ergebnisGegner) { spielerergebnis[1] += 1; }
            //Eintrag der Punkte des Teams
            spielerergebnis[2] += ergebnis;
            //Eintrag der Punktedifferenz
            spielerergebnis[3] += punktedifferenz;

            //Speichern des Spielerergebnisses in der Gesamtmap
            spielerergebnisseMap.set(team[spielerzahl], JSON.stringify(spielerergebnis));
        }

    }

    //Speichern der Spielergebnis-Map im local storage
    localStorage.spielerergebnisse = JSON.stringify(Array.from(spielerergebnisseMap.entries()));

    //schließen des Ergebnisfensters
    //Variablen für beide Buttons, die für das Ergebnis speichern oder abbrechen benötigt werden
    let ergebnisSpeichernButton = document.getElementById("button-ergebnisse-speichern");
    let ergebnisAbbrechenButton = document.getElementById("button-ergebnisse-abbrechen");

    //aktuell sichtbare Ergebnisfenster (Teams + Ergebnisinput) werden "gelöscht" / überschrieben
    document.getElementById("ergebnisfenster").innerHTML = "";

    //Buttons für Ergebnisverarbeitung werden nicht mehr angezeigt
    ergebnisSpeichernButton.style.display = "none";
    ergebnisAbbrechenButton.style.display = "none";
}

//Hier wird geprüft, ob ein Klick für den Abbruch-Button im Ergebnisfenster erfolgt
document.getElementById("button-ergebnisse-abbrechen").addEventListener("click", rundeErgebnisAbbrechen);

function rundeErgebnisAbbrechen() {

    //Variablen für beide Buttons, die für das Ergebnis speichern oder abbrechen benötigt werden
    let ergebnisSpeichernButton = document.getElementById("button-ergebnisse-speichern");
    let ergebnisAbbrechenButton = document.getElementById("button-ergebnisse-abbrechen");

    //aktuell sichtbare Ergebnsifenster (Teams + Ergebnisinput) werden "gelöscht" / überschrieben
    document.getElementById("ergebnisfenster").innerHTML = "";

    //Buttons für Ergebnisverarbeitung werden nicht mehr angezeigt
    ergebnisSpeichernButton.style.display = "none";
    ergebnisAbbrechenButton.style.display = "none";

}

//Prüfen, ob Wert für angezeigte Runde geändert wurde
document.getElementById("anzeige-runde").addEventListener("change", anzeigefensterOeffnen);

function anzeigefensterOeffnen() {

    let spielfelder = document.getElementById("anzeige-spielfelder").value.split(" ");
    if (spielfelder.length <= 1) {
        alert("Bitte Spielfelder angeben.");
        document.getElementById("anzeige-runde").value -= 1;
        return;
    }

    localStorage.setItem("anzeige-spielfelder", JSON.stringify(spielfelder));

    let runde = document.getElementById("anzeige-runde").value;

    localStorage.setItem("anzeige", runde);

    let anzeigefenster = window.open("./../html-seiten/anzeige_zufallsspielplan.html", "anzeigefenster", "popup");
}

//prüfen, ob Knopf zur anzeigen der nächsten Runde gedrückt wurde
document.getElementById("anzeige-naechste-runde").addEventListener("click", anzeigeNaechsteRunde);

function anzeigeNaechsteRunde() {

    let alteRunde = Number(document.getElementById("anzeige-runde").value);
    document.getElementById("anzeige-runde").value = alteRunde + 1;
    anzeigefensterOeffnen();

}

//prüfen, ob Knopf für Turnierexport gedrückt wurde
document.getElementById("button-turnier-export").addEventListener("click", turnierExport);

function turnierExport() {
    alert("Noch nicht implementiert.")
}

//prüfen, ob Knopf für Turnierimport gedrückt wurde
document.getElementById("button-turnier-import").addEventListener("click", turnierImport);

function turnierImport() {
    alert("Noch nicht implementiert.")
}