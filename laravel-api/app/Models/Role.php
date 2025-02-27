<?php

namespace App\Models;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Model;

class Role extends SpatieRole
{
    //Model config
    protected $table = 'roles';//To prevent laravel from adding 's' in table name
    protected $primaryKey = 'id';
    public $timestamps = false; 
    protected $guarded = [];


    public function create_role($data)
    {
        return Role::insertGetId($data);
    }


    public function retrieve_role($id)
    {
        return Role::where('id', $id)->get();
    }


    public function update_role($id, $data)
    {
        return Role::where('id', $id)->update($data);
    }


    public function delete_role($id)
    {
        return Role::where('id', $id)->delete();
    }
}
