<?php

namespace App\Http\Controllers;

use App\Http\Resources\KaryawanResources;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $karyawan = Karyawan::all();
        return KaryawanResources::collection($karyawan->loadMissing(['divisi:id,divisi']));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'      => 'required',
            'id_divisi' => 'required',
            'foto'      => 'required'
        ]);

        if ($request->foto) {
            $fileName = $request->nama;
            $extension = $request->foto->extension();

            Storage::putFileAs('foto', $request->foto, $fileName . '.' . $extension);
        }
        Karyawan::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $karyawan = Karyawan::findOrFail($id);
        return new KaryawanResources($karyawan->loadMissing(['divisi:id,divisi']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Karyawan $karyawan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama'      => 'required',
            'id_divisi' => 'required',
            'foto'      => 'required'
        ]);

        $karyawan = Karyawan::findOrFail($id);

        if ($request->fotoBaru != null) {
            $fileName = $request->nama;
            $extension = $request->fotoBaru->extension();

            Storage::putFileAs('foto', $request->fotoBaru, $fileName . '.' . $extension);

            $karyawan->update([
                'nama' => $request->nama,
                'id_divisi' => $request->id_divisi,
                'foto' => $request->fotoBaru
            ]);
        }
        $karyawan->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $karyawan = Karyawan::findOrFail($id);
        $karyawan->delete();
    }
}
