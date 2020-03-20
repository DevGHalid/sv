<?php

use Illuminate\Database\Seeder;
use App\Models\Sheet;

class SheetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Sheet::class, 15)->create();
    }
}
