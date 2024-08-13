function spielernamenWahl() {
    var auswahlMitName = document.getElementById("mit-namen");
    var auswahlOhneName = document.getElementById("ohne-namen");
    var listeNamen = document.getElementById("namen-spieler");
    var zahlSpieler = document.getElementById("anzahl-spieler-ohne-namen");

    if (auswahlMitName.checked == true) {
        listeNamen.style.display = "block";
        zahlSpieler.style.display = "none";
    } else if (auswahlOhneName.checked == true) {
        zahlSpieler.style.display = "block";
        listeNamen.style.display = "none";
    }
}