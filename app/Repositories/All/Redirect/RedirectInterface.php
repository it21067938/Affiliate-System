<?php

namespace App\Repositories\All\Redirect;

use App\Repositories\Base\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface RedirectInterface extends BaseRepositoryInterface {
    public function getTotalSiteVisitorsCount(): int;
    public function getRecentRedirects(int $limit = 5): Collection;

}
