<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    //Model config
    protected $table = 'permissions';//To prevent laravel from adding 's' in table name
    protected $primaryKey = 'id';
    public $timestamps = false; 
    protected $guarded = [];

    

    public function create_permission($data)
    {
        return Permission::insertGetId($data);
    }


    public function retrieve_permission($id)
    {
        return Permission::where('id', $id)->get();
    }


    public function update_permission($id, $data)
    {
        return Permission::where('id', $id)->update($data);
    }


    public function delete_permission($id)
    {
        return Permission::where('id', $id)->delete();
    }
}
