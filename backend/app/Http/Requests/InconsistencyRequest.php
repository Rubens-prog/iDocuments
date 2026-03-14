<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class InconsistencyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email'],
            'description' => ['required'],
            'file' =>  ['required','mimes:pdf,rtf','max:10240'],
            'category_id' =>  ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório',
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O email inserio não é válido',
            'description.required' => 'O campo descrição é obrigatório',
            'file.required' => 'O campo arquivo é obrigatório',
            'file.mimes' => 'O arquivo deve ser .pdf ou .rtf',
            'file.max' => 'O arquivo não pode exceder 10MB',
            'category_id.required' => 'O campo categoria é obrigatório',
        ];
    }
}
