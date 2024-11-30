# Testi
## Unit testi za recept
* <b>Naredil: Patrik Bevc</b>

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
* <b>Naredil: Vid Bezget</b>

### Test
...

## Unit testi za ...
* <b>Naredil: Jure Nadrah</b>

### Test
...