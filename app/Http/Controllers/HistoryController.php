<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\HistoryService;
use App\Models\Invoice;
use App\Http\Resources\HistoryCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\HistoryResource;
use Illuminate\Support\Facades\Auth;
class HistoryController extends Controller
{

    protected $historyService;

    public function __construct(HistoryService $historyService)
    {
        $this->historyService = $historyService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $histories = $this->historyService->getAll();
        return (new HistoryCollection($histories))->response();
    }

    public function historyOfUser()
    {
        $histories = $this->historyService->getAllOfUser();
        return (new HistoryCollection($histories))->response();
    }

    public function bestSaleCategory()
    {
        $best_sale_category = $this->historyService->getBestSaleCategory();
        return (new ProductCollection($best_sale_category))->response();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $history = new Invoice();
        $history->user_id = $user_id;
        $history->product_id = $request->input('product_id');
        $history->category_id = $request->input('category_id');
        $history->quantity = $request->input('quantity');
        $history->price_at_purchase_time = $request->input('price_at_purchase_time');
        $history->save();
        return (new HistoryResource($history))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->historyService->delete($id);
    }
}
