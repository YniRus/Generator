<?php
require_once '../MySQL_Connect.php';

$id = $_GET['id'];

$questionsStat = $_POST['data'];

$ids = [];

foreach ($questionsStat as $questionStat) {
    $ids[] = $questionStat['id'];
}

$ids = implode(',',$ids);

$query = "SELECT * FROM `question` WHERE `ID_Question` in ($ids)";

$questions = $db->query($query);
while($question = mysqli_fetch_assoc($questions)) {
    $key = array_search($question['ID_Question'], array_column($questionsStat, 'id'));
    $questionStat = $questionsStat[$key];
    $difficult = $question['Difficult'];
    $stats = $question['Stats'];
    $stats = json_decode($stats,true);
    if(json_last_error() !== JSON_ERROR_NONE) {
        $stats = [];
    }

    $use = isset($stats['use']) ? $stats['use'] : 0;
    $success = isset($stats['success']) ? $stats['success'] : 0;
    $time = isset($stats['time']) ? $stats['time'] : 0;

    $use++;
    $success += $questionStat['points'];
    $time += $questionStat['time'];

    $difficultCoef = 1.5 - $success / $use;  // Когда всегда правильно то коэф 0,5, чем меньше успехов, тем больше коэф

    $timeCoef = $time/$use/40;
    if($timeCoef > 1.1) {
        $timeCoef = 1.1;
    } elseif ($timeCoef < 0.9) {
        $timeCoef = 0.9;
    }

    echo "{$question['ID_Question']} $difficultCoef $timeCoef";

    $difficult = $difficultCoef * $timeCoef;

    $Stats = json_encode([
        'use' => $use,
        'success' => $success,
        'time' => $time
    ],JSON_UNESCAPED_UNICODE);

    $query = "UPDATE `question` SET `Stats` = '$Stats', `Difficult` = '$difficult' WHERE `ID_Question` = '{$question['ID_Question']}'";
    $db->query($query);
}
