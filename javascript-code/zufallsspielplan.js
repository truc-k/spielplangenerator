function spielernamenWahl() {
    var auswahlMitName = document.getElementById("mit-namen");
    var auswahlOhneName = document.getElementById("ohne-namen");
    var listeNamen = document.getElementById("namen-spieler");
    var zahlSpieler = document.getElementById("anzahl-spieler-ohne-namen");
    var leistungsspielerAuswahl = document.getElementById("leistungsspieler-auswahl");

    if (auswahlMitName.checked == true) {
        listeNamen.style.display = "block";
        zahlSpieler.style.display = "none";
        leistungsspielerAuswahl.style.display = "block";
    } else if (auswahlOhneName.checked == true) {
        listeNamen.style.display = "none";
        zahlSpieler.style.display = "block";
        leistungsspielerAuswahl.style.display = "none";
    }
}