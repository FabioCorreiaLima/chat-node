document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = 'As senhas não coincidem!';
        return;
    }

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = '/';
        } else {
            document.getElementById('errorMessage').textContent = data.error;
        }
    } catch (err) {
        document.getElementById('errorMessage').textContent = 'Erro ao registrar!';
    }
});
