import Card from '@/Components/Card';
import MyLayout from '@/Layouts/MyLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Welcome(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/karyawan')
            .then((response = 200) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log('Error API : ', error);
            });
    }, []);

    return (
        <MyLayout user={props.auth.user}>
            <Head title="NextZen App" />
            <Card data={data} />
        </MyLayout>
    );
}
