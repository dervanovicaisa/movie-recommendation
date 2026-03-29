<?php

// https://github.com/mlwmlw/php-cosine-similarity
class Similarity
{
    static public function dot($tags)
    {
        $tags = array_unique($tags);
        $tags = array_fill_keys($tags, 0);
        ksort($tags);
        return $tags;
    }
    static public function dot_product($a, $b)
    {
        $products = array_map(function ($a, $b) {
            return $a * $b;
        }, $a, $b);
        return array_reduce($products, function ($a, $b) {
            return $a + $b;
        });
    }
    static public function magnitude($point)
    {

        $squares = array_map(function ($x) {
            return pow($x, 2);
        }, $point);
        return sqrt(array_reduce($squares, function ($a, $b) {
            return $a + $b;
        }));
    }
    static public function cosine($a, $b, $base)
    {
        $a = array_fill_keys($a, 1);
        $b = array_fill_keys($b, 1) + $base;
        ksort($a);
        ksort($b);
        // dd(self::dot_product($a, $b), self::magnitude($a), self::magnitude($b));
        $magA = self::magnitude($a);
        $magB = self::magnitude($b);
        if ($magA == 0 || $magB == 0) {
            return 0.0;
        }
        return self::dot_product($a, $b) / ($magA * $magB);
    }
}

function computeDistance($a, $b)
{
    // Expect $a and $b to be arrays of movie tag arrays. Compute cosine similarity
    if (empty($a) || empty($b)) {
        return null;
    }

    $distances = [];
    // Normalize inputs: ensure each side is an array of arrays
    foreach ($a as $vA) {
        foreach ($b as $vB) {
            // Similarity::cosine expects arrays of tags and an optional base array
            // We will compute cosine similarity of tag lists
            try {
                $sim = Similarity::cosine((array)$vA, (array)$vB, []);
            } catch (\Throwable $e) {
                // On any failure return null for this pair
                $sim = null;
            }
            $distances[] = $sim;
        }
    }

    // Return the maximum similarity found (neighbors use highest similarity)
    if (empty($distances)) {
        return null;
    }
    return max($distances);
}

function getNeighbors($movieUserID, $movieUsers, $k)
{
    // Build list of [movie, similarity] and sort by similarity desc
    $results = [];
    foreach ($movieUsers as $movie) {
        $sim = computeDistance($movieUserID, $movie);
        if ($sim === null) {
            continue;
        }
        $results[] = ['movie' => $movie, 'sim' => $sim];
    }

    usort($results, function ($a, $b) {
        return $b['sim'] <=> $a['sim'];
    });

    $neighbors = [];
    $count = min($k, count($results));
    for ($i = 0; $i < $count; $i++) {
        $neighbors[] = $results[$i]['movie'];
    }
    return $neighbors;
}
