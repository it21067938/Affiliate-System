<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\URL;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'target',
        'user_id',
    ];
    protected $appends = ['created_at_human'];
    /**
     * boot
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->slug = strtolower(str()->random(6));
            while (self::where('slug', $model->slug)->exists()) {
                $model->slug = strtolower(str()->random(6));
            }

            // Parse the current URL
            $parsedUrl = parse_url($model->target);

            // Initialize query parameters
            $query = [];

            // If query string exists, parse it
            if (isset($parsedUrl['query'])) {
                parse_str($parsedUrl['query'], $query);
            }

            // Update or add the 'a' parameter
            $query['a'] = $model->slug;

            // Build the new URL
            $scheme = $parsedUrl['scheme'] ?? 'http';
            $host = $parsedUrl['host'] ?? '';
            $path = $parsedUrl['path'] ?? '';

            $model->target = $scheme . '://' . $host . $path . '?' . http_build_query($query);
        });
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * redirects
     *
     * @return HasMany
     */
    public function redirects(): HasMany
    {
        return $this->hasMany(Redirect::class);
    }
    /**
     * getCreatedAtHumanAttribute
     *
     * @return string
     */
    public function getCreatedAtHumanAttribute(): string
    {
        return $this->created_at?->format('M d, Y - h:i A')??"";
    }
    /**
     * leads
     *
     * @return HasMany
     */
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}