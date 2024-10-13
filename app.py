from flask import Flask, render_template, request, jsonify
import os
import markdown
import json

app = Flask(__name__)

# Load posts from the 'posts' directory
def load_post(post_filename):
    with open(os.path.join('posts', post_filename), 'r') as file:
        return file.read()

# Load comments from JSON file
def load_comments(post_filename):
    comments_file = os.path.join('comments', post_filename + '.json')
    if os.path.exists(comments_file):
        with open(comments_file, 'r') as file:
            return json.load(file)
    return []

# Save comments to JSON file
def save_comment(post_filename, alias, comment):
    comments_file = os.path.join('comments', post_filename + '.json')
    comments = load_comments(post_filename)
    comments.append({'alias': alias, 'text': comment})
    with open(comments_file, 'w') as file:
        json.dump(comments, file)

@app.route('/')
def index():
    # List all posts (in the future, we can add pagination)
    posts = [f for f in os.listdir('posts') if f.endswith('.md')]
    return render_template('index.html', posts=posts)

@app.route('/post/<filename>', methods=['GET'])
def view_post(filename):
    post_content = load_post(filename + '.md')
    post_html = markdown.markdown(post_content)
    comments = load_comments(filename)
    return render_template('post.html', post_title=filename.replace('_', ' '), post_content=post_html, comments=comments)

@app.route('/post/<filename>/comment', methods=['POST'])
def post_comment(filename):
    data = request.get_json()
    alias = data.get('alias')
    comment = data.get('comment')
    save_comment(filename, alias, comment)
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    if not os.path.exists('comments'):
        os.mkdir('comments')  # Create a directory for comments if it doesn't exist
    app.run(debug=True)
