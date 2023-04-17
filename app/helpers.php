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
        return self::dot_product($a, $b) / (self::magnitude($a) * self::magnitude($b));
    }
}

function computeDistance($a, $b)
{
    if (isset($dot)) {
        for ($i = 0; $i < sizeof($a); $i++) {
            foreach ($a[$i] as $key => $value) {
                $dot[$key] = array(Similarity::dot($value));
            }
        }
        foreach ($a as $keyA => $valueA) {
            foreach ($b as $keyB => $valueB) {
                for ($i = 0; $i < sizeof($dot); $i++) {
                    $distance = Similarity::cosine($valueA[$keyA], $valueB[$keyB], $dot[$i][0]);
                }
            }
        }
        return $distance;
    }
}

function getNeighbors($movieUserID, $movieUsers, $k)
{
    $distances = [];
    foreach ($movieUsers as $movie) {
        $dist = computeDistance($movieUserID, $movie);
        $distances[] = [$movie, $dist];
    }
    $neighbors = [];
    for ($i = 0; $i < $k; $i++) {
        $neighbors[] = $distances[$i][0];
    }
    return $neighbors;
}
