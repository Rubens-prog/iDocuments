<?php
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;

test('it validates required fields', function () {

    $response = $this->postJson('/api/inconsistencies', []);

    $response->assertStatus(422);

    $response->assertJsonValidationErrors([
        'name',
        'email',
        'description',
        'file',
        'category_id',
    ]);

});

test('it creates an inconsistency', function () {

    Storage::fake();

    $file = UploadedFile::fake()->create('document.pdf', 100);

    $category = Category::create([
        'name' => 'Teste'
    ]);

    $data = [
        'name' => 'Rubens Rocha',
        'email' => 'rubens@email.com',
        'description' => 'Teste de inconsistência',
        'category_id' => $category->id,
        'file' => $file,
    ];

    $response = $this->postJson('/api/inconsistencies', $data);

    $response->assertStatus(201);

    $this->assertDatabaseHas('inconsistencies', [
        'email' => 'rubens@email.com',
        'name' => 'Rubens Rocha',
    ]);

});

test('it validates email format', function () {

    Storage::fake();

    $file = UploadedFile::fake()->create('document.pdf', 100);

    $data = [
        'name' => 'Rubens Rocha',
        'email' => 'email-invalido',
        'description' => 'Teste',
        'category_id' => 1,
        'file' => $file,
    ];

    $response = $this->postJson('/api/inconsistencies', $data);

    $response->assertStatus(422);

    $response->assertJsonValidationErrors([
        'email',
    ]);
});


