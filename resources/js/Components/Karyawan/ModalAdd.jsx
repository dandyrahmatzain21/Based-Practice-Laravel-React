import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ModalAdd() {
    const [dataDivisi, setDataDivisi] = useState([]);
    const [validationError, setValidationError] = useState([]);

    // const default form
    const { data, setData } = useForm({
        nama: '',
        id_divisi: '',
        foto: '',
    });

    // get api divisi
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/divisi')
            .then(response => {
                setDataDivisi(response.data.data);
            }).catch(error => {
                console.error('Error API : ', error);
            });
    }, []);


    //const data to form input / data send to api
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('id_divisi', data.id_divisi);
    formData.append('foto', data.foto);

    // cons submit data
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/karyawan', formData)
            .then(response => {
                console.log('Data berhasil terkirim dengan baik:', response.data);
                document.getElementById('modalClose').click();
                resetField();
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setValidationError(error.response.data.errors);
                } else {
                    console.log("Terjadi kesalahan lain: ", error.message);
                }
            });
    };

    // const reset field
    const resetField = () => {
        setData({
            nama: '',
            id_divisi: '',
            foto: '',
        });
    };

    return (
        <dialog id="ModalAdd" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button id="modalClose" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Add Data</h3>
                <form onSubmit={submit}>

                    {/* nama */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Nama</span>
                            {validationError && <span className="label-text-alt text-error">{validationError.nama}</span>}
                        </label>
                        <input id="nama" name="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} type="text" placeholder="Type here" className={validationError.nama ? 'input input-error w-full' : 'input input-bordered w-full'} />
                    </div>

                    {/* divisi */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Divisi</span>
                            {validationError && <span className="label-text-alt text-error">{validationError.id_divisi}</span>}
                        </label>
                        <select id="id_divisi" name="id_divisi" value={data.id_divisi} onChange={(e) => setData('id_divisi', e.target.value)} className={validationError.id_divisi ? 'select select-error w-full' : 'select select-bordered w-full'}>
                            <option value={null}>Pilih Divisi</option>
                            {dataDivisi.map((item) => (
                                <option key={item.id} value={item.id}>{item.divisi}</option>
                            ))}
                        </select>
                    </div>

                    {/* foto */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Foto</span>
                            <span className="label-text-alt text-error">{validationError.foto}</span>
                        </label>
                        <input id="foto" name="foto" onChange={(e) => setData('foto', e.target.files[0])} type="file" accept='image/*' className={validationError.foto ? 'file-input file-input-error w-full max-w-xs' : 'file-input file-input-bordered w-full max-w-xs'} />
                    </div>

                    {/* button save */}
                    <div className="modal-action">
                        <button className="btn btn-primary">Save</button>
                    </div>

                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </form>
            </div>
        </dialog>
    );
}
