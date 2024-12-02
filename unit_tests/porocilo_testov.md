# Testi
## Unit testi za recept

- <b>Naredil: Patrik Bevc</b>

### 1. Test `getAllRecipes`
Ta test preizkuša, ali metoda `getAllRecipes()` vrne vse recepte,
ki so bili shranjeni v bazo. Doda dva recepta in preveri,
ali metoda vrne oba recepta, ter preveri,
ali je število shranjenih receptov enako pričakovani vrednosti.

### 2. Test `postRecipe`
Ta test preizkuša, ali je mogoče uspešno ustvariti recept z
veljavnimi podatki (naslov, opis, sestavine, navodila).
Preverja, ali je nov ustvarjen recept v skladu z vnosnimi podatki.

### 3. Test `postRecipeWithInvalidData`
Ta test preizkuša, kaj se zgodi,
če se poskusi ustvariti recept z nepopolnimi podatki (v tem primeru manjka naslov).
Preverja, ali se vrne napaka z ustreznim sporočilom, ki jasno pove,
da je naslov obvezen podatek.

### 4. Test `postRecipeWithInvalidUser`
Ta test preizkuša, kaj se zgodi,
če se poskusi ustvariti recept z neveljavnim uporabnikom (npr. z ID-jem, ki ne obstaja).
Preverja, ali aplikacija ustrezno vrne napako z informacijo,
da uporabnik ni najden.

### Uspesnost testov
Testi so bili vsi uspešno opravljeni.
Test, ki je povzročal napako je bil `postRecipeWithInvalidData`,
saj sem moral v razred `RecipeController` dodat `IllegalArgumentException`.
Nato je pa test bil uspešno opravljen.

## Unit testi za user

- <b>Naredil: Vid Bezget</b>

### 1. Test: `Ustvari uporabnika`
**Namen:** Ta test preverja, ali je mogoče uspešno ustvariti novega uporabnika z veljavnimi podatki (ime, e-pošta, geslo).
**Pomembnost:** Potrjuje, da aplikacija omogoča dodajanje uporabnikov in da se ustvarjeni uporabnik pravilno shrani v bazo ter dodeli unikatni ID.

### 2. Test: `Posodobi uporabnika`
**Namen:** Ta test preverja, ali je mogoče uspešno posodobiti podatke obstoječega uporabnika. Preverja, da se posodobijo le navedeni podatki (npr. ime), medtem ko ostali ostanejo nespremenjeni.
**Pomembnost:** Zagotavlja, da aplikacija omogoča delno posodabljanje podatkov uporabnika brez spreminjanja neciljanih atributov.

### 3. Test: `Izbriši uporabnika`
**Namen:** Preverja, ali aplikacija omogoča uspešno brisanje uporabnika. Test preveri, ali uporabnik obstaja v bazi pred brisanjem in ali po brisanju ne obstaja več.
**Pomembnost:** Potrjuje funkcionalnost brisanja uporabnikov in zagotavlja, da se podatki iz baze pravilno odstranijo.

### 4. Test: `Pridobi vse uporabnike`
**Namen:** Ta test preverja, ali metoda za pridobivanje vseh uporabnikov pravilno vrne seznam uporabnikov, ki so trenutno v bazi. Dodana sta dva uporabnika, nato pa se preveri, ali se metoda odzove s pravilnim številom rezultatov.
**Pomembnost:** Zagotavlja, da funkcionalnost za pregled vseh uporabnikov deluje pravilno in vrača ustrezne podatke.

### 5. Test: `Ponovljen test števila uporabnikov`
**Namn:** Ta test ponavlja preverjanje števila uporabnikov v bazi, da zagotovi, da je baza v pričakovanem stanju tudi po večkratnih testnih klicih.
**Pomembnost:** Potrjuje konsistentnost aplikacije in zagotavlja, da število uporabnikov ostane pravilno po vsakem testu.

## Unit testi za za Komentarje

- <b>Naredil: Jure Nadrah</b>

### 1. Test: `Dodaj komentar - Pozitivni primer`
**Namen:** Ta test preverja, ali je mogoče uspešno dodati komentar z veljavnimi podatki (veljaven uporabnik in recept).
**Pomembnost:** Potrjuje osnovno funkcionalnost dodajanja komentarjev in preverja, ali se komentar pravilno shrani v bazo ter poveže z ustreznim uporabnikom in receptom.

### 2. Test: `Dodaj komentar - Neveljaven uporabnik`
**Namen:** Ta test preverja vedenje sistema, kadar poskušamo dodati komentar z neobstoječim ID-jem uporabnika.
**Pomembnost:** Zagotavlja, da aplikacija ustrezno ravna z napakami in ne omogoča dodajanja komentarjev z neveljavnimi podatki.

### 3. Test: `Izbriši komentar - Pozitivni primer`
**Namen:** Preverja, ali je mogoče uspešno izbrisati obstoječ komentar.
**Pomembnost:** Potrjuje, da brisanje komentarjev deluje pravilno in da se komentar po brisanju ne nahaja več v zbirki podatkov.

### 4. Test: `Izbriši komentar - Neobstoječ komentar`
**Namen:** Testira vedenje sistema, kadar poskušamo izbrisati komentar, ki ne obstaja.
**Pomembnost:** Zagotavlja, da aplikacija pravilno obravnava napake in vrne ustrezno sporočilo za neobstoječe komentarje.

### 5. Test: `Pridobi vse komentarje za recept`
**Namen:** Preverja, ali aplikacija pravilno vrne vse komentarje, povezane z določenim receptom.
**Pomembnost:** Potrjuje, da funkcionalnost za pregled komentarjev za recept deluje pravilno in vrne natančno število komentarjev.

### 6. Test: `Pridobi komentarje za neobstoječ recept`
**Namen:** Preverja, ali aplikacija ustrezno ravna, kadar poskušamo pridobiti komentarje za recept, ki ne obstaja.
**Pomembnost:** Zagotavlja, da aplikacija ne vrača napačnih podatkov za neveljavne zahteve.

### Uspešnost testov
Vsi testi so bili uspešno opravljeni.
**Odpravljene težave:** Edina težava je bila pri pridobivanju komentarjev za neobstoječi recept, ki sem jo odpravil z dodajanjem if-stavka v CommentController, ki bo pridobivanju komentarjev vrne prazen seznam, če recept ne obstaja.
