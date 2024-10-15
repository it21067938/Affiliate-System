<?php

namespace App\Repositories\All\Links;

use App\Repositories\Base\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface LinkInterface extends BaseRepositoryInterface {
    public function getDailyLinkData(): Collection;
    public function getTotalLinksCount(): int;
    public function getRecentLinks(int $limit = 5): Collection;
    
}
