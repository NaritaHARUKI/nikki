<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Nikki;
use App\Models\User;
use App\Models\Users;
use Laravel\Ui\Presets\React;

class CreateController extends Controller
{
    //
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    public function create(Request $request)
    {
        $post = new Post;
        $post->groupName = $request->groupName;
        $post->password = $request->password;
        $post->confirmPassword = $request->confirmPassword;
        $post->save();
        return response()->json($post, 200);
    }

    public function addUser(Request $request)
    {
        $serch = Post::where('groupName', '=', $request->addGroupName)->where('password', '=', $request->addGroupPassword)->first();
        if ($serch) {
            $users = new Users;
            $users->name = $request->userName;
            $users->password = $request->userPassword;
            $users->belongs_to = $serch->id;
            $users->save();
            return response()->json($users, 200);
        } else {
            return response()->json('ユーザーが見つかりませんでした', 400);
        }
    }

    public function checkin(Request $request)
    {
        $name = $request->groupName;
        $password = $request->password;
        $login = Users::where([
            ['name', '=', $name],
            ['password', '=', $password]
        ])->first();
        if ($login) {
            session([
                'name' => $name,
                'password' => $password
            ]);
            return response()->json($login, 200);
        } else {
            return response()->json('ユーザーが見つかりませんでした', 400);
        }
    }

    public function home(Request $request)
    {
        $id = $request->id;
        $userId = $request->userId;
        $groupInfomation = Post::where('id', '=', $id)->first();
        $userInfomation = Users::where('id', '=', $userId)->first();
        $value = session()->all();
        //$request->session()->flush();
        return response()->json([$groupInfomation, $userInfomation, $value], 200);
    }

    public function getWeek(Request $request)
    {
        $getWeekNikki = Nikki::where('belongs_to', '=', $request->id)->get();
        return response()->json($getWeekNikki, 200);
    }

    public function getDetail(Request $request)
    {
        $getDetailNikki = Nikki::where('id', '=', $request->id)->get();
        $value = session()->all();
        return response()->json([$getDetailNikki, $value], 200);
    }

    public function fillOut(Request $request)
    {
        $nikki = new Nikki();
        $nikki->belongs_to = $request->belongs_to;
        $nikki->userName = $request->userName;
        $nikki->contents = $request->contents;
        $nikki->save();
        return response()->json($nikki, 200);
    }
}
