<?php

namespace App\Services\Leads;

use App\Repositories\All\Leads\LeadsInterface;
use App\Repositories\All\Links\LinkInterface;

class LeadService
{
    public function __construct(
        protected LinkInterface $linkInterface,
        protected LeadsInterface $leadsInterface
    ) {}

    public function saveLead($data)
    {
        $formdata = $this->getValues($data);
        if (array_key_exists('a', $formdata)) {
            if ($link = $this->linkInterface->findByColumn(['slug' => $formdata['a']])) {
                $formdata['link_id'] = $link->id;
            }
            $this->leadsInterface->createWithMeta($formdata);
        }
    }

    protected function getValues($data)
    {
        $fdata = [];
        // if (count($data) > 0) {
            if (array_key_exists('form', $data)) {
                //  Get the form
                if (array_key_exists('form', $data)) {
                    $form = $data['form'];
                    $fdata['form_id'] = $form['id'];
                    $fdata['form_name'] = $form['name'];
                }
                //  Get the form fields
                if (array_key_exists('fields', $data)) {
                    $fields = $data['fields'];
                    foreach ($fields as $item) {
                        if (is_array($item) && isset($item['value']) && isset($item['title'])) {
                            $fdata[$item['title']] = $item['value'];
                        }
                    }
                }
                //  Get the form meta
                if (array_key_exists('meta', $data)) {
                    $formMeta = $data['meta'];
                    foreach ($formMeta as $item) {
                        if (is_array($item) && isset($item['value']) && isset($item['title'])) {
                            $fdata[$item['title']] = $item['value'];
                        }
                    }
                }
            }
        // }
        return $fdata;
    }
}
