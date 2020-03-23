<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Orders;
use App\Detail_orders;
use App\User;
use App\Address;
use App\Product;
use Auth;

class OrdersController extends Controller
{

  function __construct()
  {

  }

  public function getById($id_user)
  {
    $order = [];
    foreach (Orders::where("id_user", $id_user) as $o) {
      $detail = [];
    }
    foreach ($o->detail_order as $d) {
      $itemDetail = [
        "id_order" => $d->id_order,
        "id_product" => $d->id_product,
        "quantity" => $d->quantity
      ];
      array_push($detail, $itemDetail);
    }
  $item = [
    "id_order" => $o->id,
    "id_user" => $o->id_user
    "id_address" => $o->id_address,
    "total" => $o->total,
    "bukti_bayar" => $o->bukti_bayar,
    "status" => $o->status
  ];
  array_push($order,$item);
}
return response(["order" => $order, "detail_order" => $detail]);
  public function find(Request $request)
  {
    $find = $request->find;
    $product = Product::where("name","like","%$find%")->orWhere("available_quantity","like","%$find%")
    ->orWhere("price","like","%$find%")->orWhere("description","like","%$find%")->get();
    return response([
      "product" => $product
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {

        $orders = new Orders();
        $orders->id_user = $request->id_user;
        $orders->id_address = $request->id_address;
        $orders->total = $request->total;
        $orders->status = "dipesan";
        $orders->save();


        $o = Orders::where("id_user", $request->id_user)->first();
        $detail_orders = new Detail_orders();
        $detail_orders->id_order = $o->id;
        $detail_orders->id_product = $request->id_product;
        $detail_orders->quantity = $request->quantity;
        $detail_orders->save();


        return response(["message" => "Data Orders berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }


    }else if($action == "update"){
      try {
        $tujuan_upload = 'public/image';
        $file = $request->file('image');

        $product = Product::where("id", $request->id)->first();
        $product->name = $request->name;
        $product->available_quantity = $request->available_quantity;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->image = $file->getClientOriginalName();
        $product->save();


        return response(["message" => "Data Produk berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id)
  {
    try {
      Product::where("id", $id)->delete();
      return response(["message" => "Data Produk berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
 }
 ?>
