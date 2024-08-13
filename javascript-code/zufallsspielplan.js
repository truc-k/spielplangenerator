function spielernamenWahl() {
    var auswahlMitName = document.getElementById("mit-namen");
    var auswahlOhneName = document.getElementById("ohne-namen");
    var listeSpieler = document.getElementById("namen-spieler");
    var zahlSpieler = document.getElementById("anzahl-spieler-ohne-namen");
    var listeLeistungsspieler = document.getElementById("namen-leistungspieler");
    var anzahlLeistungsspieler = document.getElementById("leistungsspieler-anzahl");

    if (auswahlMitName.checked == true) { //Einstellung für Turnier mit Namen
        listeSpieler.style.display = "block";
        zahlSpieler.style.display = "none";
        listeLeistungsspieler.style.display = "block";
        anzahlLeistungsspieler.style.display = "none";
    } else if (auswahlOhneName.checked == true) { //Einstellungen für ein Turnier ohne Namen
        listeSpieler.style.display = "none";
        zahlSpieler.style.display = "block";
        listeLeistungsspieler.style.display = "none";
        anzahlLeistungsspieler.style.display = "block";
    }
}