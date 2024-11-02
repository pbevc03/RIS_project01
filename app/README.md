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

