const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

if (!token) {
    window.location.href = '/index.html';
}

// Função para buscar as salas
const fetchRooms = async () => {
    const res = await fetch('/api/rooms', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
        if (res.status === 401) {
            
            window.location.href = '/index.html';
            return; 
        }
        console.error('Erro ao buscar salas:', res.statusText);
        document.getElementById('errorMessage').innerText = 'Erro ao buscar salas, tente novamente.';
        return;
    }

    const data = await res.json();
    const roomsList = document.getElementById('roomsList');
    roomsList.innerHTML = '';

    if (Array.isArray(data.rooms)) {
        data.rooms.forEach(room => {
            const roomItem = document.createElement('li');
            roomItem.classList.add('list-group-item');
            roomItem.innerHTML = `${room.name} - ${room.description} (Capacidade: ${room.capacity}) 
                <button class="btn btn-secondary btn-sm float-end" onclick="joinRoom('${room._id}', '${encodeURIComponent(room.name)}')">Entrar</button>`;
            roomsList.appendChild(roomItem);
        });
    } else {
        console.error('Rooms não é um array:', data.rooms);
        document.getElementById('errorMessage').innerText = 'Erro ao listar salas, tente novamente.';
    }
};

// Adiciona um listener ao formulário de criação de sala
document.getElementById('roomForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    const roomDescription = document.getElementById('roomDescription').value;
    const roomCapacity = document.getElementById('roomCapacity').value;

    const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: roomName, description: roomDescription, capacity: roomCapacity })
    });

    if (res.ok) {
        fetchRooms();
        document.getElementById('roomForm').reset();
        document.getElementById('roomName').focus();
        document.getElementById('errorMessage').innerText = '';
    } else {
        if (res.status === 401) {

            window.location.href = '/index.html';
            return; 
        }
        console.error('Erro ao criar sala:', await res.text());
        document.getElementById('errorMessage').innerText = 'Erro ao criar sala, tente novamente.';
    }
});

// Função para entrar na sala
const joinRoom = async (roomId, roomName) => {
    const res = await fetch(`/api/rooms/join/${roomId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        window.location.href = `/chat.html?room=${roomId}&name=${encodeURIComponent(username)}&roomName=${encodeURIComponent(roomName)}&token=${token}`;
    } else {
        if (res.status === 401) {
            
            window.location.href = '/index.html';
            return; 
        }
        console.error('Erro ao entrar na sala:', await res.text());
        document.getElementById('errorMessage').innerText = 'Erro ao entrar na sala, tente novamente.';
    }
};

// Chama a função para buscar salas ao carregar a página
fetchRooms();
