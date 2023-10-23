import { router } from "@inertiajs/react";

export default function ModalDelete({ item }) {

    const submit = (e) => {
        e.preventDefault();
        axios.delete('http://127.0.0.1:8000/api/karyawan/' + item.id)
            .then(response => {
                console.log('Data berhasil terkirim:', response.data);
                document.getElementById('modalCloseDelete' + item.id).click();
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
        <dialog id={'ModalDelete' + item.id} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button id={'modalCloseDelete' + item.id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Hapus Data</h3>
                <form onSubmit={submit}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Apakah Anda Yakin Ingin Menghapus Data Dengan Nama <strong>{item.nama}</strong></span>
                        </label>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-error">Delete</button>
                    </div>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </form>
            </div>
        </dialog>
    );
}
