# Recepti
Naša spletna rešitev z recepti je zasnovana z namenom, da ljubiteljem kuhanja in kulinarike poenostavi proces iskanja, priprave ter raziskovanja jedi.
Spletna rešitev je razdeljena na:
* Backend(Spring Boot): za povezavo z podatkovno bazo
* Frontend(React): uporabniški vmesnik

## Člani ekipe
* Vid Bezget
* Patrik Bevc
* Jure Nadrah

## Dokumentacij za razvijalce
Projekt je razdeljen na:
### Backend
Narejen s Spring Boot.
* **/src/main/java**: kjer so java paketi dao, rest, vao, kateri vsebujejo:
    * ReceptiRepository
    * ReceptiController
    * Recepti

* **src/main/resources**: kjer je je datoteka z aplikacijskimi konfiguracijami
    * application.properties

### Frontedn
Narejen z React strukturnim ogrodjem.
* **frontend/src/**: vsa logika frontend dela aplikacije
* **frontend/public**: staticna spletna strna, slike

## Standardi kodiranja
* **Java**: V Javi standardi kodiranja vključujejo CamelCase za poimenovanje razredov, metode in spremenljivke.Prav tako je priporočljivo, da se uporabljajo komentarji za dokumentiranje in da so vrstice kode kratke ter pregledne.
* **JavaScript**: V JavaScriptu standardi kodiranja vključujejo uporabo camelCase za spremenljivke in funkcije. Poleg tega je priporočljiva uporaba dveh presledkov za zamik, dosledna uporaba zaklepajev ```{ }``` in minimalno globalno področje za spremenljivke.

## Navodila za namescanje
1. Potrebna programska oprema:
    * Java(18 ali poznejša)
    * Node.js
    
    Priporoceni IDE:
    * IntelliJ IDEA(latest)
    * Visual Studio Code(latest)

2. Prenesen oz. kloniran repozitorij za prispevanje k projektu:<br>
    ```git clone https://github.com/pbevc03/RIS_project01.git```

3. Namescanje potrebne programsek opreme:
    * Za **backend**: ob kloniranju repositorija bo spring boot že od začetka namešen.
    * Za **frontend**: pa greste v direktorij ```/frontend/src/``` in tam namestite ```npm init -y``` in nato ```npm install express```

4. Porti za pregled aplikacija:
    * **Backend**: ```localhost:8080```
    * **Frontend**: ```localhost:3000```


## Navodila za razvijalce
Nove funkcionalnosti pred objavo stestirajte.<br> 
Nove funkcionalnosti prav tako objavite na nov branch tako da lahko admin tega projekta pregleda te funkcionalnosti. 

### Orodja
#### Backend
* Spring Boot(2.5.4 ali novejša)
* Maven(17 ali novejša)
* MySQL(latest)

#### Frontend
* React


## Vizija projekta
Naša spletna stran z recepti je ustvarjena za vse ljubitelje kuhanja, saj omogoča hiter dostop do preizkušenih receptov z jasnimi navodili in izpisom sestavin. Namen aplikacije je poenostaviti pripravo obrokov in uporabnikom omogočiti, da odkrijejo nove jedi in nadgradijo svoje kulinarično znanje.


### Namen aplikacije
 Spletna stran združuje različne kuharske ravni, od začetnikov do izkušenih kuharjev, in ponuja raznolike recepte, prilagojene različnim prehranskim potrebam. Uporabnikom omogoča, da raziskujejo nove jedi, shranjujejo priljubljene recepte in delijo svoje nasvete.


### Ciljna publika
 Aplikacija je namenjena širokemu krogu uporabnikov, vključno s tistimi, ki imajo specifične prehranske zahteve, ter zaposlenim, ki iščejo hitre rešitve za pripravo obrokov. Primerna je za vsakogar, ki želi izboljšati svoje kuharske veščine in razširiti jedilnik.

### Kako aplikacija rešuje uporabniški problem
Aplikacija poenostavi iskanje receptov glede na čas, sestavine in prehranske zahteve, s čimer uporabnikom prihrani čas pri načrtovanju obrokov. 

## Besednjak
Recepti - Navodila in sestavine za pripravo jedi.
* **Jed** – Končan produkt po izvedenih navodilih recepta
* **Sestavine** – Specifični izdelki, potrebni za pripravo recepta.
* **Navodila** - Koraki, ki jih uporabnik sledi za pripravo obroka.
* **Uporabnik** – Obiskovalec spletne strani, ki lahko išče in shranjuje recepte.
* **Prehranske zahteve** - Specifične prehranske potrebe (brez glutena, vegansko, brez laktoze ipd.).
* **Kuharske ravni** -Različne stopnje kuharskega znanja, npr. začetniki, srednje napredni, izkušeni.
* **Shranjevanje receptov** - Funkcija, ki omogoča uporabnikom, da shranijo priljubljene recepte za poznejšo uporabo.
* **Priljubljeni recepti** - Recepti, ki jih uporabnik označi kot priljubljene.
* **Nasveti za kuhanje** - Nasveti in triki za izboljšanje kuharskih veščin ali poenostavitev procesov.
* **Kategorije jedi** - Različne vrste receptov, kot so predjedi, glavne jedi, sladice, prigrizki ipd.
* **Čas priprave** - Ocenjen čas, ki je potreben za pripravo jedi.
* **Iskalnik** receptov - Orodje za iskanje receptov glede na določene parametre (čas priprave, sestavine, vrsta jedi ipd.).


## Diagram primerov uporabe
![DPU-Recepti_v3 drawio](https://github.com/user-attachments/assets/80bb3fe3-0281-4cb8-98fc-27dd65c7cbf3)

1. Pregled receptov<br>
Uporabnik lahko pregleduje recepte v aplikacije, ter razširi pregled receptov z uporabo iskalnika za določene besede (npr. vrsta jedi, imena sestavin) ali dodatno zoži prikazane recepte glede na različne filtre, kot so čas priprave, sestavine ali prehranske zahteve.

2. Ogled podrobnosti recepta<br>
Uporabnik lahko ogleda podrobnosti izbranega recepta, kot so seznam sestavin, navodila za pripravo, predviden čas in zahtevnost. S tem je omogočen bolj poglobljen vpogled v recept, preden se uporabnik odloči za pripravo ali shranjevanje.

3. Dodajanje receptov<br>
Uporabnik lahko doda svoj recept v aplikacijo, vključno s sestavinami, postopkom priprave in dodatnimi informacijami. Ta funkcionalnost omogoča širjenje baze receptov in prispevek k skupnosti.

4. Urejanje/Brisanje svojih receptov<br>
Uporabnik ima možnost urejanja ali brisanja receptov, ki jih je sam dodal. S tem zagotavlja, da so njegovi recepti točni in posodobljeni, ali pa odstrani recepte, ki jih več ne želi deliti.

5. Shranjevanje receptov med priljubljene<br>
Uporabnik lahko shranjuje sebi najljubše recepte v seznam priljubljenih za lažji dostop in kasnejšo uporabo. Ta funkcionalnost omogoča hiter dostop do receptov, ki so uporabniku najbolj všeč ali jih pogosto uporablja.

6. Pisanje komentarjev/ocen<br>
Uporabnik lahko oceni recept in pusti komentar, s čimer prispeva svoje mnenje ali nasvete za izboljšave. Komentarji in ocene so v pomoč drugim uporabnikom pri izbiri receptov ter izboljšajo interaktivnost in zanesljivost vsebine na platformi.



## Razredni diagram

<img width="620" alt="Picture 1" src="https://github.com/user-attachments/assets/ccc5cb64-e074-4628-841b-866fcac684a7">
<br>

### Ključne metode in njihove naloge

#### Recepti
**getIme()**:<br>
•	Ta metoda vrne ime recepta. Namenjena je za pridobivanje imena recepta.
 <br>
**getSestavine()**:<br>
•	Vrne sestavine, ki so potrebne za pripravo recepta. Omogoča dostop do teh sestavin za prikaz ali nadaljnjo obdelavo.
 <br>
**getNavodila()**:<br>
•	Vrne navodila za pripravo recepta. Ta metoda omogoča pridobitev informacij o tem, kako pripraviti jed.
 <br>
**setIme()**:<br>
•	Nastavi ime recepta. Omogoča uporabniku ali aplikaciji, da spremeni ime obstoječega recepta.
 <br>
**setSestavine()**:<br>
•	Dodajanje sestavin. To omogoča spreminjanje ali dodajanje novih sestavin receptu.
<br>

#### Dostopnost in manipulacija s podatki
 Metode:<br>
-	getIme()<br>
-	getSestavine()<br>
-	getNavodila() <br>
omogočajo enostaven dostop do informacij o receptu. <br>
  <br>
Metode:<br>
-	setIme()<br>
-	setSestavina()  <br>
-	setSestavine() <br>
zagotavljajo fleksibilnost pri spremembah teh podatkov.<br>
 <br>

#### Uporabnik
•	**dodajRecept(Recept recept): Uporabniku omogoča ustvarjanje novega recepta z dodajanjem podrobnosti, kot so naslov, sestavine in navodila.<br>
•	**urediRecept(Recept recept)**: Uporabniku omogoča urejanje obstoječega recepta, ki ga je ustvaril.<br>
•	**izbrišiRecept(Recept recept)**: Uporabniku omogoča brisanje recepta, ki ga ne želi več hraniti.<br>
•	**shraniReceptMedPriljubljene(Recept recept)**: Doda recept na seznam uporabnikovih priljubljenih.<br>
•	**napišiKomentar(String komentar)**: Uporabniku omogoča, da doda komentar ali oceno k določenemu receptu.<br>
•	**izberiKategorijo()**: Uporabniku omogoča izbiro kategorije za brskanje ali filtriranje receptov.<br>
 <br>

#### Priljubljeni
•	**dodajReceptMedPriljubljene(Recept recept)**: Doda recept na seznam uporabnikovih priljubljenih receptov.<br>
•	**odstraniReceptIzPriljubljenih(Recept recept)**: Odstrani recept s seznama uporabnikovih priljubljenih receptov.<br>
 <br>

#### Iskanje
•	**iščiRecept(String input)**: Išče recepte na podlagi ključnih besed, ki jih vnese uporabnik.<br>
•	**uporabiFiltre(String filter)**: Uporablja dodatne filtre (npr. kategorija, ocena) za zožitev rezultatov iskanja.<br>



