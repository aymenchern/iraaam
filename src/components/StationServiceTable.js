import React, { useState, useEffect } from 'react';
import './StationServiceTable.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const brandsList = ['OLA Energy', 'TotalEnergies', 'SNDP', 'Shell', 'Star oil']; // Add all the brands here

const stationTypesList = [// Add all the station types here
    'Stations-Service',
    'terminaux depot DHC',
    'depot de CPL',
];

const governorateList = [ // Add other governorate names here
    'Ariana',
    'Beja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Medenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
];

const StationServiceTable = () => {
    const [stationServiceData, setStationServiceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterByStationType, setFilterByStationType] = useState({});
    const [filterByBrand, setFilterByBrand] = useState({});
    const [filterByGovernorate, setFilterByGovernorate] = useState({});

    useEffect(() => {
        const fetchStationServiceData = async () => {
            try {
                const firestore = firebase.firestore();
                const snapshot = await firestore.collection('all').get();
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setStationServiceData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStationServiceData();
    }, []);

    const filterByGovernorateHandler = (selectedGovernorate) => {
        if (selectedGovernorate === 'All') {
            // If "All" is selected, reset all governorate filters
            setFilterByGovernorate({});
        } else {
            // If a specific governorate is selected, toggle its filter
            setFilterByGovernorate((prevState) => ({
                ...prevState,
                [selectedGovernorate]: !prevState[selectedGovernorate],
            }));
        }
    };

    const filterByStationTypeHandler = (stationType) => {
        setFilterByStationType((prevState) => ({
            ...prevState,
            [stationType]: !prevState[stationType],
        }));
    };

    const filterByBrandHandler = (brand) => {
        setFilterByBrand((prevState) => ({
            ...prevState,
            [brand]: !prevState[brand],
        }));
    };

    useEffect(() => {
        let filteredByGovernorate = stationServiceData;
        for (const governorate in filterByGovernorate) {
            if (filterByGovernorate[governorate]) {
                filteredByGovernorate = filteredByGovernorate.filter(
                    (station) => station.governorate === governorate
                );
            }
        }

        let filteredByStationType = filteredByGovernorate;
        for (const stationType in filterByStationType) {
            if (filterByStationType[stationType]) {
                filteredByStationType = filteredByStationType.filter(
                    (station) => station.station_type === stationType
                );
            }
        }

        let filteredData = filteredByStationType;
        for (const brand in filterByBrand) {
            if (filterByBrand[brand]) {
                filteredData = filteredData.filter((station) => station.brand === brand);
            }
        }

        setFilteredData(filteredData);
    }, [filterByGovernorate, filterByStationType, filterByBrand, stationServiceData]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStationData, setNewStationData] = useState({
        station_type: '',
        brand: '',
        governorate: '',
        address: '',
        autorisation: false,
        certificat_epreuve_reservoir: false,
        controle_technique: false,
        ES: false,
        CC: false,
        EDD: false,
    });

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewStationData({
            station_type: '',
            brand: '',
            governorate: '',
            address: '',
            autorisation: false,
            certificat_epreuve_reservoir: false,
            controle_technique: false,
            ES: false,
            CC: false,
            EDD: false,
        });
    };

    const handleAdd = async () => {
        closeAddModal();
        try {
            if (
                !newStationData.station_type ||
                !newStationData.brand ||
                !newStationData.governorate ||
                !newStationData.address
            ) {
                throw new Error('Please fill in all the required fields.');
            }

            const firestore = firebase.firestore();
            await firestore.collection('all').add(newStationData);

            setStationServiceData((prevData) => [...prevData, newStationData]);
            setFilteredData((prevData) => [...prevData, newStationData]);
        } catch (error) {
            console.error('Error adding new station:', error.message);
        }
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStationData, setEditStationData] = useState(null);

    const openEditModal = (station) => {
        setEditStationData(station);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditStationData(null);
        setIsEditModalOpen(false);
    };

    const handleUpdate = async () => {
        closeEditModal();
        try {
            if (
                !editStationData.station_type ||
                !editStationData.brand ||
                !editStationData.governorate ||
                !editStationData.address
            ) {
                throw new Error('Please fill in all the required fields.');
            }

            const firestore = firebase.firestore();
            await firestore.collection('all').doc(editStationData.id).update(editStationData);

            setStationServiceData((prevData) =>
                prevData.map((station) => (station.id === editStationData.id ? editStationData : station))
            );
            setFilteredData((prevData) =>
                prevData.map((station) => (station.id === editStationData.id ? editStationData : station))
            );
        } catch (error) {
            console.error('Error updating station:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const firestore = firebase.firestore();
            await firestore.collection('all').doc(id).delete();

            setStationServiceData((prevData) => prevData.filter((station) => station.id !== id));
            setFilteredData((prevData) => prevData.filter((station) => station.id !== id));
        } catch (error) {
            console.error('Error deleting station:', error);
        }
    };

    return (
        <div className="station-service-table">
            <h2>Iram Database</h2>
            <div className="filter-container">
                <label htmlFor="governorate-filter">Filter by Governorate:</label>
                <select id="governorate-filter" onChange={(e) => filterByGovernorateHandler(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Beja">Beja</option>
                    <option value="Ben Arous">Ben Arous</option>
                    <option value="Bizerte">Bizerte</option>
                    <option value="Gabes">Gabes</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Jendouba">Jendouba</option>
                    <option value="Kairouan">Kairouan</option>
                    <option value="Kasserine">Kasserine</option>
                    <option value="Kebili">Kebili</option>
                    <option value="Kef">Kef</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Manouba">Manouba</option>
                    <option value="Medenine">Medenine</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                    <option value="Siliana">Siliana</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Tataouine">Tataouine</option>
                    <option value="Tozeur">Tozeur</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Zaghouan">Zaghouan</option>
                </select>
            </div>
            <div className="filter-container">
                <span>Filter by Station Type:</span>
                {stationTypesList.map((stationType) => (
                    <button key={stationType} onClick={() => filterByStationTypeHandler(stationType)}>
                        {stationType}
                    </button>
                ))}
            </div>
            <div className="filter-container">
                <span>Filter by Brand:</span>
                {brandsList.map((brand) => (
                    <button key={brand} onClick={() => filterByBrandHandler(brand)}>
                        {brand}
                    </button>
                ))}
            </div>
            <button onClick={openAddModal}>Add</button>
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Station</h3>
                        <label htmlFor="station-type">Station Type:</label>
                        <select
                            id="station-type"
                            value={newStationData.station_type}
                            onChange={(e) => setNewStationData({ ...newStationData, station_type: e.target.value })}
                        >
                            <option value="">Select Station Type</option>
                            {stationTypesList.map((stationType) => (
                                <option key={stationType} value={stationType}>
                                    {stationType}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="brand">Brand:</label>
                        <select
                            id="brand"
                            value={newStationData.brand}
                            onChange={(e) => setNewStationData({ ...newStationData, brand: e.target.value })}
                        >
                            <option value="">Select Brand</option>
                            {brandsList.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="governorate">Governorate:</label>
                        <select
                            id="governorate"
                            value={newStationData.governorate}
                            onChange={(e) => setNewStationData({ ...newStationData, governorate: e.target.value })}
                        >
                            <option value="">Select Governorate</option>
                            {governorateList.map((governorate) => (
                                <option key={governorate} value={governorate}>
                                    {governorate}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={newStationData.address}
                            onChange={(e) => setNewStationData({ ...newStationData, address: e.target.value })}
                        />
                        <label htmlFor="autorisation">Autorisation:</label>
                        <input
                            type="checkbox"
                            id="autorisation"
                            checked={newStationData.autorisation}
                            onChange={(e) => setNewStationData({ ...newStationData, autorisation: e.target.checked })}
                        />
                        <label htmlFor="certificat-epreuve-reservoir">Certificat Epreuve Reservoir:</label>
                        <input
                            type="checkbox"
                            id="certificat-epreuve-reservoir"
                            checked={newStationData.certificat_epreuve_reservoir}
                            onChange={(e) => setNewStationData({ ...newStationData, certificat_epreuve_reservoir: e.target.checked })}
                        />
                        <label htmlFor="controle-technique">Controle Technique:</label>
                        <input
                            type="checkbox"
                            id="controle-technique"
                            checked={newStationData.controle_technique}
                            onChange={(e) => setNewStationData({ ...newStationData, controle_technique: e.target.checked })}
                        />
                        <label htmlFor="es">ES:</label>
                        <input
                            type="checkbox"
                            id="es"
                            checked={newStationData.ES}
                            onChange={(e) => setNewStationData({ ...newStationData, ES: e.target.checked })}
                        />
                        <label htmlFor="cc">CC:</label>
                        <input
                            type="checkbox"
                            id="cc"
                            checked={newStationData.CC}
                            onChange={(e) => setNewStationData({ ...newStationData, CC: e.target.checked })}
                        />
                        <label htmlFor="edd">EDD:</label>
                        <input
                            type="checkbox"
                            id="edd"
                            checked={newStationData.EDD}
                            onChange={(e) => setNewStationData({ ...newStationData, EDD: e.target.checked })}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleAdd}>Add</button>
                            <button onClick={closeAddModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {isEditModalOpen && editStationData && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Station</h3>
                        <label htmlFor="edit-station-type">Station Type:</label>
                        <select
                            id="edit-station-type"
                            value={editStationData.station_type}
                            onChange={(e) => setEditStationData({ ...editStationData, station_type: e.target.value })}
                        >
                            <option value="">Select Station Type</option>
                            {stationTypesList.map((stationType) => (
                                <option key={stationType} value={stationType}>
                                    {stationType}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="edit-brand">Brand:</label>
                        <select
                            id="edit-brand"
                            value={editStationData.brand}
                            onChange={(e) => setEditStationData({ ...editStationData, brand: e.target.value })}
                        >
                            <option value="">Select Brand</option>
                            {brandsList.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="edit-governorate">Governorate:</label>
                        <select
                            id="edit-governorate"
                            value={editStationData.governorate}
                            onChange={(e) => setEditStationData({ ...editStationData, governorate: e.target.value })}
                        >
                            <option value="">Select Governorate</option>
                            {governorateList.map((governorate) => (
                                <option key={governorate} value={governorate}>
                                    {governorate}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="edit-address">Address:</label>
                        <input
                            type="text"
                            id="edit-address"
                            value={editStationData.address}
                            onChange={(e) => setEditStationData({ ...editStationData, address: e.target.value })}
                        />
                        <label htmlFor="edit-autorisation">Autorisation:</label>
                        <input
                            type="checkbox"
                            id="edit-autorisation"
                            checked={editStationData.autorisation}
                            onChange={(e) => setEditStationData({ ...editStationData, autorisation: e.target.checked })}
                        />
                        <label htmlFor="edit-certificat-epreuve-reservoir">Certificat Epreuve Reservoir:</label>
                        <input
                            type="checkbox"
                            id="edit-certificat-epreuve-reservoir"
                            checked={editStationData.certificat_epreuve_reservoir}
                            onChange={(e) => setEditStationData({ ...editStationData, certificat_epreuve_reservoir: e.target.checked })}
                        />
                        <label htmlFor="edit-controle-technique">Controle Technique:</label>
                        <input
                            type="checkbox"
                            id="edit-controle-technique"
                            checked={editStationData.controle_technique}
                            onChange={(e) => setEditStationData({ ...editStationData, controle_technique: e.target.checked })}
                        />
                        <label htmlFor="edit-es">ES:</label>
                        <input
                            type="checkbox"
                            id="edit-es"
                            checked={editStationData.ES}
                            onChange={(e) => setEditStationData({ ...editStationData, ES: e.target.checked })}
                        />
                        <label htmlFor="edit-cc">CC:</label>
                        <input
                            type="checkbox"
                            id="edit-cc"
                            checked={editStationData.CC}
                            onChange={(e) => setEditStationData({ ...editStationData, CC: e.target.checked })}
                        />
                        <label htmlFor="edit-edd">EDD:</label>
                        <input
                            type="checkbox"
                            id="edit-edd"
                            checked={editStationData.EDD}
                            onChange={(e) => setEditStationData({ ...editStationData, EDD: e.target.checked })}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={closeEditModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Station Type</th>
                        <th>Brand</th>
                        <th>Governorate</th>
                        <th>Address</th>
                        <th>Autorisation</th>
                        <th>Certificat Epreuve Reservoir</th>
                        <th>Controle Technique</th>
                        <th>ES</th>
                        <th>CC</th>
                        <th>EDD</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((station) => (
                        <tr key={station.id}>
                            <td>{station.station_type}</td>
                            <td>{station.brand}</td>
                            <td>{station.governorate}</td>
                            <td>{station.address}</td>
                            <td>{station.autorisation ? 'Yes' : 'No'}</td>
                            <td>{station.certificat_epreuve_reservoir ? 'Yes' : 'No'}</td>
                            <td>{station.controle_technique ? 'Yes' : 'No'}</td>
                            <td>{station.ES ? 'Yes' : 'No'}</td>
                            <td>{station.CC ? 'Yes' : 'No'}</td>
                            <td>{station.EDD ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => openEditModal(station)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(station.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StationServiceTable;
