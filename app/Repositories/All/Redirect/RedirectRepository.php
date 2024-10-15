<?php

namespace App\Repositories\All\Redirect;


use App\Models\Redirect;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class RedirectRepository extends BaseRepository implements RedirectInterface
{
    /**
     * @var Redirect
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Redirect  $model
     */

    public function __construct(Redirect $model)
    {
        $this->model = $model;
    }

    // Get total site visitors count
    public function getTotalSiteVisitorsCount(): int
    {
        return $this->model->count();
    }

    // Get recent redirects (default: 5)
    public function getRecentRedirects(int $limit = 5): Collection
    {
        return $this->model->with('link.user')
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
    }
}
