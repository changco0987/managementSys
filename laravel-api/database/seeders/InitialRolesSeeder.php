<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InitialRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $adminRole = Role::create(['name'=>'admin','guard_name' => 'web']);
        $userRole = Role::create(['name'=>'user','guard_name' => 'web']);


        Permission::create(['name'=> 'edit task','guard_name' => 'web']);
        Permission::create(['name'=> 'delete task','guard_name' => 'web']);

        $adminRole->givePermissionTo(['edit task','delete task']);

        $user = User::find(2);
        $user->assignRole('admin');
    }
}
