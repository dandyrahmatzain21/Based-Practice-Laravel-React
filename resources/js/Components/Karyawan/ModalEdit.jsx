import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalEdit({ item }) {
    const [dataDivisi, setDataDivisi] = useState([]);
    const [showKaryawan, setShowKaryawan] = useState([]);
    const [validationError, setValidationError] = useState([]);
    const [imageURL, setImageURL] = useState('');

    // const default data
    const { data, setData } = useForm({
        nama: item.nama,
        id_divisi: item.id_divisi.id,
        foto: item.foto,
        fotoBaru: '',
    });

    // const data to api
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('id_divisi', data.id_divisi);
    formData.append('foto', data.foto);
    formData.append('fotoBaru', data.fotoBaru);

    // const get data api divisi
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/divisi')
            .then(response => {
                setDataDivisi(response.data.data);
            }).catch(error => {
                console.error('Error API : ', error);
            });
    }, []);

    // const get data api karyawan
    useEffect(() => {
        async function getShowKaryawan() {
            try {
                await axios.get('http://127.0.0.1:8000/api/karyawan/' + item.id)
                    .then((response = 200) => {
                        setShowKaryawan(response.data.data);
                        setImageURL(response.data.data.foto);
                    })
            } catch (error) {
                console.log('Error', error);
            }
        }
        getShowKaryawan();
    }, []);

    // const submit
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/karyawan/' + item.id, formData)
            .then(response => {
                console.log('Data berhasil terkirim:', response.data);
                document.getElementById('modalCloseEdit' + item.id).click();
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setValidationError(error.response.data.errors);
                } else {
                    console.log("Terjadi kesalahan lain: ", error.message);
                }
            });
    };

    return (
        <dialog id={'ModalEdit' + item.id} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button id={'modalCloseEdit' + item.id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {showKaryawan ?
                    (
                        <>
                            <h3 className="font-bold text-lg">Edit Data</h3>
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
                                    <input id="fotoBaru" name="fotoBaru" onChange={(e) => setData('fotoBaru', e.target.files[0])} type="file" accept='image/*' className={validationError.foto ? 'file-input file-input-error w-full max-w-xs' : 'file-input file-input-bordered w-full max-w-xs'} />
                                </div>

                                {/* image review */}
                                {imageURL && <img src={imageURL} alt="API Image" />}

                                {/* button save */}
                                <div className="modal-action">
                                    <button className="btn btn-primary">Save</button>
                                </div>

                                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                            </form>
                        </>
                    )
                    :
                    (<p>Data Tidak Ada</p>)
                }
            </div>
        </dialog>
    );
}
