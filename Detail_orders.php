<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $table = "detail_orders";
    protected $primaryKey = "id";
    protected $fillable = ["id_order","id_product","quantity"];

    public function order()
    {
      return $this->belongsTo("App\Orders","id", "id_order");
    }


    public function product()
    {
      return $this->belongsTo("App\Product","id", "id_product");
    }

}
