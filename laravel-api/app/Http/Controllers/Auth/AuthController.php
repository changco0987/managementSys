<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    private $user;

    function __construct()
    {
        $this->user = new User;
    }



    public function login(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        // Find user by email
        $user = $this->user->retrieve_user($request);

        $userData = clone $user;//Create a user object clone

        // Check if user exists and verify password
        if (!$user || !Hash::check($request->password, $user->password)) 
        {

            return $this->errorResponse('Invalid email or password.');// Unauthorized
            // return response()->json([
            //     'message' => 'Invalid email or password.',
            // ], 401); 
        }

        // Generate access token (using Passport)
        $token = $user->createToken('authToken')->accessToken;

        // Retrieve user roles & permissions
        $roles = $user->getRoleNames(); // e.g., ['admin']
        $permissions = $user->getAllPermissions()->pluck('name'); // e.g., ['edit articles', 'delete articles']


        return $this->successResponse(
          [
                    'user' => collect($userData)
                              ->merge(['roles' => $roles])
                              ->merge(['permissions' =>$permissions])
                              ->all(), 
                    'token' => $token,
                    
                ], 
                'Login successfully', 201
            );

        // return response()->json([
        //     'message' => 'Login successful.',
        //     'user' => $user,
        //     'token' => $token,
        // ]);
    }
}
