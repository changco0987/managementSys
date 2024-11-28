<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
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
        try {
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

            $response = $this->user->create_user($data);

            DB::commit();

            // return response()->json([
            //     'success' => true,
            //     'message' => 'User created successfully',
            //     'id' => $response,
            // ], 201);


            return $this->successResponse(['id'=>$response], 'User created successfully', 201);
        } catch (Exception $e) {
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

    public function update(StoreUserRequest $request, $id)
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
