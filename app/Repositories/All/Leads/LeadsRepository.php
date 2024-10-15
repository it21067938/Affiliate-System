<?php

namespace App\Repositories\All\Leads;

use App\Models\Lead;
use App\Repositories\Base\BaseRepository;

class LeadsRepository extends BaseRepository implements LeadsInterface
{
    /**
     * @var Lead
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Lead  $model
     */

    public function __construct(Lead $model)
    {
        $this->model = $model;
    }
}