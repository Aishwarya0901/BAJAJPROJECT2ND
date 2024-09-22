document.getElementById('jsonForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';
    document.getElementById('response').classList.add('hidden');
    
    try {
        const jsonData = JSON.parse(input);
        if (!jsonData.data) throw new Error('Invalid input');

        const res = await fetch('YOUR_BACKEND_API_URL/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
        });

        const data = await res.json();
        document.getElementById('options').classList.remove('hidden');

        document.getElementById('selectOptions').addEventListener('change', function() {
            const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
            renderResponse(data, selectedOptions);
        });
    } catch (err) {
        errorElement.textContent = 'Invalid JSON input';
    }
});

function renderResponse(data, selectedOptions) {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    const responseData = {};
    selectedOptions.forEach(option => {
        if (option === 'alphabets') responseData.alphabets = data.alphabets;
        if (option === 'numbers') responseData.numbers = data.numbers;
        if (option === 'highestLowercase') responseData.highestLowercase = data.highest_lowercase_alphabet;
    });

    responseDiv.textContent = JSON.stringify(responseData, null, 2);
    responseDiv.classList.remove('hidden');
}
