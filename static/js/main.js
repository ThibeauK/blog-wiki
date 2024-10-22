// Replace with your actual PythonAnywhere URL
const BACKEND_URL = "https://thibeauk.pythonanywhere.com";

// Get the post slug dynamically (e.g., from the URL or from a hidden field)
const postSlug = document.getElementById('post-slug').value;

document.getElementById('comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const alias = document.getElementById('alias').value;
    const comment = document.getElementById('comment').value;

    if (!alias || !comment) {
        alert("Please fill in both fields.");
        return;
    }

    // Send the comment to the backend on PythonAnywhere
    const response = await fetch(`${BACKEND_URL}/post/${postSlug}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alias, comment }),
    });

    if (response.ok) {
        const newComment = await response.json();

        // Instead of reloading the page, dynamically append the new comment
        const commentSection = document.getElementById('comment-section');
        const commentElement = document.createElement('p');
        commentElement.innerHTML = `<strong>${newComment.alias}</strong>: ${newComment.text}`;
        commentSection.appendChild(commentElement);

        // Clear the form
        document.getElementById('alias').value = '';
        document.getElementById('comment').value = '';
    } else {
        alert('Failed to post comment.');
    }
});
