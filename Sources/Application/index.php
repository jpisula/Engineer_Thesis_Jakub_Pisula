<?php 
/*
    require - wymaga plik, jak nie będzie to wyrzuci błąd
    include - nie wymaga, wyrzuca zwykły błąd
    require_once - wyrzuca błąd krytyczny
    include_once - wyrzuca błąd krytyczny
*/
    require_once('app/core/class/router.php');

    $ROUTER = new Router();

    // wywołaniue funkcji Get z routera - trzeba przygotowac plik,
    // który będzie sczytywał te wszytskie dane i patrzył czy takie rzeczy mogą być
    if(!$ROUTER->Get("query"))
    {
        echo 'false';
    }
    else
    {
        //PDO zawsze w try catchu, bo zwraca wyjątki
        try
        {
            // łączenie z baza danych
            $pdo = new PDO('mysql:host=localhost;dbname=app_db', 'root', '');
            $query = "SELECT * FROM artists";

            $result = $pdo->query($query);
            // tablica do json'a
            $jsonData = array();

            // ->query przygotowuje, a fetch() wyciąga i przetwarza tak, aby php widział te dane
            while($row = $result->fetch())

            //przygotowanie tablicy do jsona, do wyświetlenia
                $jsonData[] = array(
                    'artist_id' => $row['artist_id'],
                    'name' => $row['name'],
                    'born_date' => $row['born_date']
                );

            echo json_encode($jsonData);

        }
        catch(PDOException $e)
        {
            echo 'pdo error';
        }

    }

?>