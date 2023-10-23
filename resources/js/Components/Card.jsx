export default function Card({ data }) {
    return data.map((data, i) => {
        return (
            <div key={i} className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{data.nama}</h2>
                    <p>{data.id_divisi.divisi}</p>
                </div>
            </div>
        )
    });
}
