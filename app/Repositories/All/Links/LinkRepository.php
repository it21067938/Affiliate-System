<?php

namespace App\Repositories\All\Links;

use App\Models\Link;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class LinkRepository extends BaseRepository implements LinkInterface
{
    /**
     * @var Link
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Link  $model
     */

    public function __construct(Link $model)
    {
        $this->model = $model;
    }

    // Get total count of links
    public function getTotalLinksCount(): int
    {
        return $this->model->count();
    }

    // Get recent links (default: 5)
    public function getRecentLinks(int $limit = 5): Collection
    {
        return $this->model->with('user')
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
    }

    // Get daily link creation data
    public function getDailyLinkData(): Collection
    {
        return $this->model->select(\DB::raw('DATE(created_at) as date'), \DB::raw('count(*) as count'))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();
    }
    
}
