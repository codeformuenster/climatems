# Parser der Daten aus der Climate City Contract PDF

Die Daten, für welche dieser Parser vorgesehen ist, stammen aus folgender Quelle:
https://www.stadt-muenster.de/fileadmin/user_upload/stadt-muenster/klimastadt/pdf/20240326_Muenster_CCC_Actionplan_final.pdf

Um diese Daten zu extrahieren, wurde die pdf in Word geöffnet, im Weblayout dargestellt und die Tabellen pro Kategorie in notepad++ kopiert.

Die so ermittelten Daten wurden in Textdateien gespeichert und sind im Ordner data/raw als *.txt Dateien abgespeichert.

## Generierung der JSON-Daten pro Kategorie:

Um die JSON-Daten aus den Rohdateien zu generieren, können folgende Aufrufe verwendet werden:

- Der erste Parameter referenziert die Textdatei mit den Rohdaten.
- Der zweite gibt die ID der Kategorie an. Diese muss für URLs geeignet sein.
- Der dritte Parameter gibt den Namen der Kategorie an.

```bash
php parser.php ../data/raw/energieerzeugung.txt energieerzeugung "Energieerzeugung"
php parser.php ../data/raw/bauen.txt bauen "Bauen und Sanieren"
php parser.php ../data/raw/mobilitaet.txt mobilitaet "Mobilität"
php parser.php ../data/raw/klimahaushalt.txt klimahaushalt "Klimahaushalt"
php parser.php ../data/raw/bildung.txt bildung_und_ernaehrung "Bildung und Ernährung"
php parser.php ../data/raw/wirtschaft.txt wirtschaft_und_wissenschaft  "Wirtschaft und Wissenschaft"