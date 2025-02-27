<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = new User;
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();
        
        $data = [
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'gender' => $validatedData['gender'],
            'birthday' => $validatedData['birthday'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ];
    
        DB::beginTransaction();
    
        try 
        {
            $response = $this->user->create_user($data);
            $response->assignRole('user');//Assign initial role

            DB::commit();
    
            return $this->successResponse(['id' => $response->id], 'User created successfully', 201);
        } 
        catch (Exception $e)
        {
            // Rollback transaction
            DB::rollBack();

            // Log the error    
            Log::error('User creation failed', ['error' => $e->getMessage()]);
            
            // Respond with a generic error message
            return $this->errorResponse('An error occurred while creating the user.');
        }
    }
    
    public function show($id)
    {
        $user = User::findOrFail($id);
        return $this->successResponse($user, 'User retrieved successfully');
    }

    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->validated());
        return $this->successResponse($user, 'User updated successfully');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $this->successResponse(null, 'User deleted successfully');
    }
}
