<?php

use Illuminate\Database\Seeder;
use App\Models\FormListElement;

class FormListElementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $elements = [
        [
          'title' => 'Короткий текст',
          'slug' => 'answer_short_text',
          'icon' => 'fe fe-file-text',
          'attributes' => [
            'value' => '',
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => '',
            'min' => 0,
            'max' => null
                      
          ]
                  
        ],
        [
          'title' => 'Длинный текст',
          'slug' => 'answer_long_text',
          'icon' => 'fe fe-book-open',
          'attributes' => [
            'value' => '',
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => '',
            'min' => 0,
            'max' => null
                      
          ]
                  
        ],
        [
          'title' => 'Выпадающий список',
          'slug' => 'drop_down_list',
          'icon' => 'fe fe-list',
          'attributes' => [
            'value' => '',
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => '',
            'options' => []
                      
          ]
                  
        ],
        [
          'title' => 'Один вариант',
          'slug' => 'one_option',
          'icon' => 'fe fe-toggle-left',
          'attributes' => [
            'value' => '',
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => ''
                      
          ]
                  
        ],
        [
          'title' => 'Несколько вариантов',
          'slug' => 'several_variants',
          'icon' => 'fe fe-check-square',
          'attributes' => [
            'value' => [],
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => ''
                      
          ]
                  
        ],
        [
          'title' => 'Почта',
          'slug' => 'email',
          'icon' => 'fe fe-mail',
          'attributes' => [
            'value' => [],
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => ''
                      
          ]
                  
        ],
        [
          'title' => 'Файл',
          'slug' => 'file',
          'icon' => 'fe fe-file',
          'attributes' => [
            'extensions' => [],
            'value' => [],
            'required' => false,
            'comment' => '',
            'label' => '',
            'placeholder' => ''
                      
          ]
                  
        ]
      ];

      foreach ($elements as $element) {
        FormListElement::create([
          'title' => $element['title'],
          'slug' => $element['slug'],
          'icon' => $element['icon'],
          'attributes' => $element['attributes']
        ]);
      }
    }
}
