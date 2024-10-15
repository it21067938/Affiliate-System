<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kodeine\Metable\Metable;

class Lead extends Model
{
    use HasFactory, Metable;

    protected $metaTable = 'leads_meta';
    protected $metaKeyName = 'lead_id';
    protected $fillable = [
        'name',
        'slug',
        'target',
        'user_id',
    ];
    protected $appends = ['created_at_human'];

    /**
     * getCreatedAtHumanAttribute
     *
     * @return string
     */
    public function getCreatedAtHumanAttribute(): string
    {
        return $this->created_at->format('M d, Y - h:i A');
    }
}
