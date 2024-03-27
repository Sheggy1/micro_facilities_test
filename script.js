function createFacility() {
    const facilityCode = document.getElementById('facilityCode').value;
    const equipmentTypeCode = document.getElementById('equipmentTypeCode').value;
    const equipmentCount = document.getElementById('equipmentCount').value;

    const formData = new FormData();
    formData.append('facilityCode', facilityCode);
    formData.append('equipmentTypeCode', equipmentTypeCode);
    formData.append('equipmentCount', equipmentCount);

    fetch('http://localhost:3000/createFacility', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error.message);
    });
}

function createTech() {
    const techCode = document.getElementById('techCode').value;
    const techCodeType = document.getElementById('techCodeType').value;
    const quantityTech = document.getElementById('quantityTech').value;

    const formData = new FormData();
    formData.append('techCode', techCode);
    formData.append('techCodeType', techCodeType);
    formData.append('quantityTech', quantityTech);

    fetch('http://localhost:3000/createTech', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error.message);
    });
}

function createContract() {
    const contractNumber = document.getElementById('contractNumber').value;
    const contractFacilityCode = document.getElementById('contractFacilityCode').value;
    const contractEquipmentTypeCode = document.getElementById('contractEquipmentTypeCode').value;
    const contractEquipmentCount = document.getElementById('contractEquipmentCount').value;

    const formData = new FormData();
    formData.append('contractNumber', contractNumber);
    formData.append('contractFacilityCode', contractFacilityCode);
    formData.append('contractEquipmentTypeCode', contractEquipmentTypeCode);
    formData.append('contractEquipmentCount', contractEquipmentCount);

    fetch('http://localhost:3000/createContract', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error.message);
    });
}

function getContracts() {
    fetch('http://localhost:3000/getContracts')
    .then(response => response.json())
    .then(data => {
        showContracts(data);
    })
    .catch(error => console.error('Error:', error));
}

function showContracts(contracts) {
    const contractsWindow = window.open('', '_blank');
    contractsWindow.document.write('<h1>Список контрактів</h1>');
    contractsWindow.document.write('<table border="1">');
    contractsWindow.document.write('<tr><th>Номер</th><th>Код виробничого приміщення</th><th>Код типу технологічного обладнання</th><th>Кількість</th></tr>');
    
    contracts.forEach(contract => {
        contractsWindow.document.write(`<tr><td>${contract.number}</td><td>${contract.production}</td><td>${contract.equip_type}</td><td>${contract.quantity}</td></tr>`);
    });

    contractsWindow.document.write('</table>');
}
