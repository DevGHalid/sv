<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       User::create([
            'name' => 'Halid',
            'email' => 'halid@mail.ru',
            'password' => Hash::make('12345'),
            'api_token' => Str::random(60),
        ]); 

        User::create([
            'name' => 'Gamzat',
            'email' => 'gamzat@mail.ru',
            'password' => Hash::make('12345'),
            'api_token' => Str::random(60),
        ]); 
    }
}
