import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { useRef } from "react";
import { read, writeFileXLSX } from "xlsx";
import { utils } from 'xlsx';
import * as XLSX from 'xlsx';

export default function Table({ currentItems }) {
    const tbl = useRef(null);
    return (
        <>
            {currentItems.length > 0 ?
                <table ref={tbl} className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Foto</th>
                            <th>Nama</th>
                            <th>Divisi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.foto}</td>
                                <td>{item.nama}</td>
                                <td>{item.id_divisi.divisi}</td>
                                <td>
                                    <button className="m-1 btn btn-success btn-sm" onClick={() => document.getElementById('ModalEdit' + item.id).showModal()}>Edit</button>
                                    <ModalEdit item={item} />
                                    <button className="m-1 btn btn-error btn-sm" onClick={() => document.getElementById('ModalDelete' + item.id).showModal()}>Delete</button>
                                    <ModalDelete item={item} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <p>Data Kosong</p>}

            {/* button export to excel */}
            <button id="export" className="btn btn-success btn-sm item-end" onClick={() => {
                const wb = utils.table_to_book(tbl.current);
                writeFileXLSX(wb, "SheetJSReactExport.xlsx");
            }}>Export To Excel (Current Table)</button>
        </>
    );
}
