<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\{FormList, User};
use Faker\Generator as Faker;

$factory->define(FormList::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(),
        'user_id' => User::first()->id ?? 1
    ];
});
