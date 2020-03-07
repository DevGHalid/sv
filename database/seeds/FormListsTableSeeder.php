<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class FormListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $form_list = User::first()->formLists()->create([
        'title' => 'form 1'
      ]);
      
      $sheet = $form_list->sheets()->create([
        'user_id' => $form_list->id
      ]);
    }
}
