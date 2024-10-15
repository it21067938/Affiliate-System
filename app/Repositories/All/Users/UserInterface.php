<?php 

namespace App\Repositories\All\Users;

use App\Repositories\Base\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface UserInterface extends BaseRepositoryInterface
{
    public function getAffiliatesWithLinksAndRedirects(): Collection;
    public function getAffiliateCount(): int;
    public function getRecentAffiliates(int $limit = 5): Collection;
}