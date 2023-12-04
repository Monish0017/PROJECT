document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.form');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('.input-field[type="text"]').value;
    const password = document.querySelector('.input-field[type="password"]').value;

    console.log('Sending login request:', { username, password }); // Add this line

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          console.log('Login successful'); // Add this line
          alert('Login successful');
        } else if (response.status === 401) {
          console.log('Invalid credentials'); // Add this line
          alert('Invalid credentials');
        } else {
          console.error('Server error:', data); // Add this line
          alert('Server error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    loginForm.reset();
  });
});
