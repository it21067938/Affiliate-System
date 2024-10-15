<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Repositories\All\Users\UserRepository;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRepository = App()->make(UserRepository::class);
        $array = [
            [
                'name' => 'admin',
                'email' => 'admin@axcertro.com',
                'role' => UserRoleEnum::Admin->value,
                'password' => Hash::make('Axcertro#Our1st'),
            ],
            // [
            //     'name' => 'thisara',
            //     'email' => 'thisara.dilshan@axcertro.com',
            //     'role' => UserRoleEnum::Admin->value,
            //     'password' => Hash::make('thisara@123'),
            // ],
            // [
            //     'name' => 'imesh',
            //     'email' => 'imesh.hirushan@axcertro.com',
            //     'role' => UserRoleEnum::Admin->value,
            //     'password' => Hash::make('imesh1234@'),
            // ],
        ];

        foreach ($array as $key => $item) {
            if (!$userRepository->existsByColumn(['email' => $item['email']])) {
                $userRepository->create($item);
            }
        }
    }
}
