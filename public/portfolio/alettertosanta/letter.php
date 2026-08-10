<?php
//    print_r($_POST);

    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $data = $_POST;
        if(htmlspecialchars(trim($data["gender"])) == "girl"){
            $res = "<p>Дякую що написала мені! Я з нетерпінням буду чекати на твого листа і прочитаю його як тільки зможу!</p><p>Надіюсь ти була гарною дівчинкою цього року.</p><p>І пам'ятай, в казкову новорічну ніч, всі мрії здійсьнюються!</p><p>Щасливого Різдва! Я відпишу тобі найближчим часом! Будь хорошою!</p><p>Любий, <br/> Дідусь Мороз</p>";
            $gender = "дівчинка";
            $was = "була";

            if(htmlspecialchars(trim($data["nice_level"])) == "very nice"){
                $nice = "Дуже хороша";
            }elseif(htmlspecialchars(trim($data["nice_level"])) == "nice"){
                $nice = "Хороша";
            }elseif(htmlspecialchars(trim($data["nice_level"])) == "naughty"){
                $nice = "Неслухняна";
            }else {
                $nice = "Дуже вредна";
            }

        }else {
            $res = "<p>Дякую що написав мені! Я з нетерпінням буду чекати на твого листа і прочитаю його як тільки зможу!</p><p>Надіюсь ти був гарним хлопчиком цього року.</p><p>І пам'ятай, в казкову новорічну ніч, всі мрії здійсьнюються!</p><p>Щасливого Різдва! Я відпишу тобі найближчим часом! Будь хорошим!</p><p>Любий, <br/> Дідусь Мороз</p>";
            $gender = "хлопчик";
            $was = "був";

            if(htmlspecialchars(trim($data["nice_level"])) == "very nice"){
                $nice = "Дуже хороший";
            }elseif(htmlspecialchars(trim($data["nice_level"])) == "nice"){
                $nice = "Хороший";
            }elseif(htmlspecialchars(trim($data["nice_level"])) == "naughty"){
                $nice = "Неслухняний";
            }else {
                $nice = "Дуже вредний";
            }
        }
        if((isset($data['child_name'])&&$data['child_name']!="")&&(isset($data['from_city_and_state'])&&$data['from_city_and_state']!="")&&(isset($data['note_to_santa'])&&$data['note_to_santa']!="")&&(isset($data['sender_email'])&&$data['sender_email']!="")&&(isset($data['signature'])&&$data['signature']!="")){
                $to = 'frost.777@ua.fm';
                $subject = 'Лист до Діда Мороза';
                $message = 'Дорогий Дідусь Мороз, </br> мене звуть '.htmlspecialchars(trim($data['child_name'])).', і мені '.htmlspecialchars(trim($data['age'])).' років.</br>Я '.$gender.' з міста '.htmlspecialchars(trim($data['from_city_and_state'])).'</br>І я '.$was.'&nbsp;'.$nice.' цьго року.</br>Список моїх новорічних бажань:</br>'.htmlspecialchars(trim($data['wish_1'])).'</br>'.htmlspecialchars(trim($data['wish_2'])).'</br>'.htmlspecialchars(trim($data['note_to_santa'])).'</br>Від '.htmlspecialchars(trim($data['signature'])).'</br>Email '.htmlspecialchars(trim($data['sender_email']));
                $headers = "Content-type: text/html; charset=utf-8 \r\n";
                $headers .= "From: aletterfromsanta \r\n";
                if(mail($to, $subject, $message, $headers)){
                    echo $res;
                }
        }else{
            echo "Заповніть будь ласка всі поля";
        }

    }


?>