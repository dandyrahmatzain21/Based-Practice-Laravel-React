import ModalAdd from '@/Components/Karyawan/ModalAdd';
import Pagination from '@/Components/Karyawan/Pagination';
import Table from '@/Components/Karyawan/Table';
import MyLayout from '@/Layouts/MyLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { read, writeFileXLSX } from "xlsx";
import { utils } from 'xlsx';
import * as XLSX from 'xlsx';

export default function VKaryawan(props) {

    // const data from api
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const getKaryawan = async () => {
        try {
            await axios.get('http://127.0.0.1:8000/api/karyawan').then((response = 200) => { setDataKaryawan(response.data.data); })
        }
        catch (error) {
            console.log('Error API : ', error);
        }
    }

    // polling data from api / auto reload
    useEffect(() => {
        getKaryawan();
        const interval = setInterval(getKaryawan, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // const filter data
    const [filteredData, setFilteredData] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const filterData = () => {
        const filtered = dataKaryawan.filter((item) => {
            return item.id_divisi.divisi === filterCriteria;
        });
        setFilteredData(filtered);
    };

    // const search
    const [searchTerm, setSearchTerm] = useState('');
    const searchData = dataKaryawan.filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    // const pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.length > 0 ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : dataKaryawan.slice(indexOfFirstItem, indexOfLastItem) && searchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length > 0 ? filteredData.length / itemsPerPage : dataKaryawan.length / itemsPerPage);

    // export excel
    const fetchDataFromAPI = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/karyawan');
            return response.data.data;
        } catch (error) {
            console.error('Gagal mengambil data dari API:', error);
        }
    };

    const exportToExcel = (data, fileName) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const handleExport = async () => {
        const data = await fetchDataFromAPI();
        exportToExcel(data, 'data_api');
    };

    const tbl = useRef(null);

    return (
        <MyLayout user={props.auth.user} >
            <Head title="NextZen App" />
            <div className="container overflow-hidden bg-base-100 shadow-sm rounded-lg">
                <div className="p-5">
                    {/* button add */}
                    <button className="m-1 btn btn-primary" onClick={() => document.getElementById('ModalAdd').showModal()}>Add Data</button>

                    {/* select filter divisi */}
                    <select className='m-1 select select-bordered' onClick={filterData} value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}>
                        <option value=''>Semua</option>
                        <option value='Full-Stack Developer'>Full-Stack Developer</option>
                        <option value='Back-End Developer'>Back-End Developer</option>
                    </select>

                    {/* search */}
                    <input className='m-1 input input-bordered' type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} disabled={filteredData.length > 0 && true} />

                    {/* export excel */}
                    <button className="m-1 btn btn-success" onClick={handleExport}>Export To Excel (API)</button>

                    {/* table */}
                    <div className="py-2 overflow-x-auto">
                        <Table currentItems={currentItems} filteredData={filteredData} />
                    </div>

                    {/* pagination */}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

                </div>
            </div>

            {/* modal add */}
            <ModalAdd />

        </MyLayout>
    );
}
