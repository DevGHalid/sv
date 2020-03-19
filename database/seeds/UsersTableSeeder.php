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
            'email' => 'halid@gmail.com',
            'password' => Hash::make('123456'),
            'api_token' => Str::random(60),
        ]); 

        factory(User::class, 15)->create();
    }
}
