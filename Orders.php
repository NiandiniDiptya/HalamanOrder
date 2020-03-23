<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $table = "orders";
    protected $primaryKey = "id";
    protected $fillable = ["id_user","id_alamat","total","bukti_bayar","status",];

    public function user()
    {
      return $this->belongsTo("App\User","id", "id_user");
    }


    public function address()
    {
      return $this->belongsTo("App\Alamat","id", "id_alamat");
    }


    public function detail_order()
    {
      return $this->hasMany("App\Detail_orders", "id_order");
    }
}
