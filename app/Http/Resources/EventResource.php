<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'banner_url' => $this->banner_url,
            'icon_url' => $this->icon_url,
            'description' => $this->description,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
        ];
    }
}