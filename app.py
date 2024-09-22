from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the API!"})

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/bfhl', methods=['POST'])
def handle_post():
    data = request.json.get('data', [])
    numbers = [x for x in data if x.isdigit()]
    alphabets = [x for x in data if x.isalpha()]
    lowercase = sorted([x for x in alphabets if x.islower()])[-1] if alphabets else None
    return jsonify({
        "is_success": True,
        "user_id": "john_doe_17091999",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [lowercase] if lowercase else [],
    })

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
