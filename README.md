# Recepti
Naša spletna rešitev z recepti je zasnovana z namenom, da ljubiteljem kuhanja in kulinarike poenostavi proces iskanja, priprave ter raziskovanja jedi.
Spletna rešitev je razdeljena na:
* Backend(Spring Boot): za povezavo z podatkovno bazo
* Frontend(React): uporabniški vmesnik

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
...


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

## Diagram primerov uporabe
![DPU-Recepti](https://github.com/user-attachments/assets/2f77de36-c915-44fa-8b45-b414bc73529a)
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
