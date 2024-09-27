<?php

$filename = $argv[1];
$categorieKey = $argv[2];
$filecontent = file_get_contents($filename);

$contents = explode("B-2.2: Individual action outlines", $filecontent);

/**
 * @param string $content
 * @param string $search
 * @param bool $end true if the length of the search should be added to the returned position
 * @param string $errorElementName
 * @return int
 * @throws Exception
 */
$searchForKey = function (string $content, string $search, bool $end, string $errorElementName) {
    $position = strpos(strtolower($content), strtolower($search)) + ($end ? strlen($search) : 0);
    if ($position === false) {
        throw new Exception($search . " konnte nicht als $errorElementName gefunden werden.");
    }
    return $position;
};

$parseActionItem = function($content) use ($searchForKey){
    $items = [
        "Action outline" => [
            'Action name',
            'Action type',
            'Action description',
        ],
        'Reference to impact pathway' => [
            "Field of action",
            "Systemic lever",
            ["Outcome (according to module B-1.1)"]
        ],
        "Implementation" => [
            "Responsible bodies/person for implementation",
            "Action scale & addressed entities",
            "Involved stakeholders",
            "Comments on implementation"
        ],
        "Impact & cost" => [
            ["Generated renewable energy (if applicable)", "Generated renewable energy"],
            "Removed/substituted energy",
            "GHG emissions reduction estimate (total)",
            "Total costs and costs by \nCO2e unit",
        ],
        "end" => []
    ];
    $result = [];
    for ($i = 0; $i < count($items); $i++) {
        $headline = array_keys($items)[$i];
        if ($headline === "end") {
            break;
        }
        $subitems = $items[$headline];
        for ($j = 0; $j < count($subitems); $j++) {
            $item = $subitems[$j];

            $itemKey = null;
            if (is_array($item)) {
                foreach ($item as $variant) {
                    try {
                        $position = $searchForKey($content, $variant, true, 'item');
                        $itemKey = $variant;
                    } catch (Exception $e) {
                        continue;
                    }
                    break;
                }
            } else {
                $position = $searchForKey($content, $item, true, 'item');
                $itemKey = $item;
            }
            if (empty($position)) {
                echo $content;
                throw new Exception(var_dump($item) . ' konnte nicht als item gefunden werden.');
            }

            if ($j + 1 < count($subitems)) {
                $nextitem = $subitems[$j + 1];
            } else {
                $nextitem = array_keys($items)[$i + 1];
            }

            $nextposition = null;
            if ($nextitem === "end") {
                $nextposition = strlen($content);
            } else {
                if (is_array($nextitem)) {
                    foreach ($nextitem as $variant) {
                        try {
                            $nextposition = $searchForKey($content, $variant, false, 'nextitem');
                        } catch (Exception $e) {
                            continue;
                        }
                        break;
                    }
                } else {
                    $nextposition = $searchForKey($content, $nextitem, false, 'nextitem');
                }
            }
            if (null === $nextposition) {
                echo $content;
                throw new Exception(var_dump($nextitem) . ' konnte nicht als nextitem gefunden werden.');
            }
            $result[$headline][str_replace("\n", '', $itemKey)] = trim(substr($content, $position, $nextposition - $position));
        }
    }
    return $result;
};

$results = [];
$i = 1;
foreach($contents as $content) {
    $result['id'] = str_replace(' ', '_', strtolower($categorieKey)) . $i++;
    $result['category'] = $categorieKey;
    $result = array_merge($result, $parseActionItem($content));
    $results [] = $result;
}

echo json_encode($results);
