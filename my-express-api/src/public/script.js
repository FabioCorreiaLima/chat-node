const token = localStorage.getItem('token');


if (!token) {
    window.location.href = '/index.html';
}

// Obter parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('room');
const roomName = decodeURIComponent(urlParams.get('roomName'));
const username = decodeURIComponent(urlParams.get('name'));

document.getElementById('roomTitle').innerText = `Sala: ${roomName}`;
document.getElementById('username').innerText = `Bem-vindo, ${username}`;

// Inicializar Socket.IO
const socket = io('https://4ab3-45-169-174-145.ngrok-free.app', {
    query: { username, token }
});

// Emitir evento de entrada na sala
socket.emit('joinRoom', { roomId, userName: username });

// Adicionar ouvinte para o botão de enviar mensagem
document.getElementById('sendMessage').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        socket.emit('sendMessage', { roomId, userName: username, message });
        messageInput.value = ''; 
    }
});

// Receber mensagens
socket.on('receiveMessage', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerText = `${data.name}: ${data.message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
});


document.getElementById('leaveRoom').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://4ab3-45-169-174-145.ngrok-free.app/api/rooms/leave/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            socket.emit('leaveRoom', { roomId, userName: username }); 
            window.location.href = '/dashboard.html';
        } else {
            const errorResponse = await response.json();
            console.error('Erro ao sair da sala:', errorResponse.message);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
    }
});


let mediaRecorder;
let audioChunks = [];

// Iniciar gravação de áudio
document.getElementById('startAudioRecording').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();
        document.getElementById('audioRecordingIndicator').style.display = 'block';
        document.getElementById('startAudioRecording').style.display = 'none';
        document.getElementById('stopAudioRecording').style.display = 'block';
        console.log('Gravação de áudio iniciada');

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
    } catch (error) {
        console.error('Erro ao capturar áudio:', error);
    }
});


document.getElementById('stopAudioRecording').addEventListener('click', () => {
    if (mediaRecorder) {
        mediaRecorder.stop();
        document.getElementById('audioRecordingIndicator').style.display = 'none';
        document.getElementById('startAudioRecording').style.display = 'block';
        document.getElementById('stopAudioRecording').style.display = 'none';
        console.log('Gravação de áudio parada');

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            // Enviar áudio via socket
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64AudioMessage = reader.result.split(',')[1]; 
                socket.emit('sendAudio', { roomId, userName: username, audio: base64AudioMessage });
            };

            // Limpar chunks
            audioChunks = [];
        };
    }
});

// Receber áudio
socket.on('receiveAudio', (data) => {
    const messagesDiv = document.getElementById('messages');

    const nameElement = document.createElement('div');
    nameElement.innerText = `${data.name} enviou um áudio:`;
    messagesDiv.appendChild(nameElement);

    // Criar um elemento de áudio
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = `data:audio/webm;base64,${data.audio}`; 
    messagesDiv.appendChild(audioElement);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
