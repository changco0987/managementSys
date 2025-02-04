<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CreatePermissionController extends Controller
{
    //

    private $permission;


    function __construct()
    {
        $this->permission = new Permission;
    }


    public function CreateNewPermission(Request $request)
    {

        try
        {
            // Validate the request data
            $request->validate([
                'name' => 'required|string|unique:permissions,name', // Ensure the role name is unique
            ]);
    
    
            $data = [
                'name'=>$request->name,
                'guard_name'=>'api',
            ];
            $response = $this->permission->create_permission($data);
    
    
            return response()->json([
                'success' => true,
                'message' => 'Permission created successfully',
                'id' => $response,
            ], 201);
        }
        catch(ValidationException $e)
        {
            \Log::error('Error creating permission: ' . $e->getMessage());

            // Handle validation errors
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(), // Returns the validation errors
            ], 422); // 422 status code for validation errors

        }
        catch(Exception $e)
        {
            \Log::error('Error creating permission: ' . $e->getMessage());

            // Handle validation errors
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage(), // For debugging, optionally remove in production
            ], 500); // 500 status code for server errors

        }
    }
}
