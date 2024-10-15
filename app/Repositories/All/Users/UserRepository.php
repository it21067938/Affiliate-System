<?php

namespace App\Repositories\All\Users;

use App\Models\User;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class UserRepository extends BaseRepository implements UserInterface
{
      /**
     * @var User
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  User  $model
     */

     public function __construct(User $model)
     {
         $this->model = $model;
     }

     // Count affiliates
    public function getAffiliateCount(): int
    {
        return $this->model->where('role', 'affiliate')->count();
    }

    // Get recent affiliates (default: 5)
    public function getRecentAffiliates(int $limit = 5): Collection
    {
        return $this->model->where('role', 'affiliate')
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
    }

     public function getAffiliatesWithLinksAndRedirects(): Collection
     {
         return $this->model
             ->where('role', 'affiliate') 
             ->withCount('links') 
             ->with(['links' => function ($query) {
                 $query->withCount('redirects'); 
             }])
             ->get();
     }
}
