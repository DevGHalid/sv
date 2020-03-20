<?php

use Illuminate\Support\Facades\Auth;

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Sheet;
use Faker\Generator as Faker;

$factory->define(Sheet::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(),
        'user_id' => Auth::id() ?? 1
    ];
});
