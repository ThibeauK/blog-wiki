document.getElementById('comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const alias = document.getElementById('alias').value;
    const comment = document.getElementById('comment').value;

    if (!alias || !comment) {
        alert("Please fill in both fields.");
        return;
    }

    // Send comment to the server
    const response = await fetch(window.location.pathname + '/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alias, comment }),
    });

    if (response.ok) {
        location.reload(); // Reload page to see the new comment
    } else {
        alert('Failed to post comment.');
    }
});
