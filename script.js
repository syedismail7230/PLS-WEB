// Define the list of companies and their support status (case-insensitive)
const companySupport = {
    'nike': 'Supports Palestine 🍉',
    'adidas': 'Supports Israel',
    'apple': 'Neutral',
    'microsoft': 'Supports Israel',
    'google': 'Supports Israel',
    'amazon': 'Supports Israel',
    'nestle': 'Supports Israel',
    'cocacola': 'Supports Isreal',
    'pepsico': 'Supports Israel',
    'unilever': 'Supports Palestine 🍉',
    'kelloggs': 'Supports Israel',
    'kraft heinz': 'Supports Israel',
    'p&g': 'Supports Israel',
    'procter & gamble': 'Supports Israel',
    'johnson & johnson': 'Supports Israel',
    'j&j': 'Supports Israel',
    'colgate-palmolive': 'Supports Israel',
    'loreal': 'Supports Israel',
    'walmart': 'Supports Israel',
    'itc': 'Supports Palestine 🍉',
    'marico': 'Neutral',
    'amul': 'Neutral',
    

    // Add more companies and their support statuses here
};

// Function to check support status of a company (case-insensitive)
function checkSupport() {
    const userInput = document.getElementById('searchInput').value.trim().toLowerCase(); // Convert user input to lowercase

    // Check if the entered company name (in lowercase) exists in the companySupport object
    if (companySupport.hasOwnProperty(userInput)) {
        const supportStatus = companySupport[userInput];
        document.getElementById('result').textContent = supportStatus;
    } else {
        document.getElementById('result').textContent = 'Company not found or support status unknown';
    }
}


function displayPublicStatement(companyName) {
    fetch(`/getPublicStatement?company=${encodeURIComponent(companyName)}`)
    .then(response => response.json())
    .then(data => {
        const publicStatementSection = document.getElementById('publicStatementSection');
        const publicStatementElement = document.getElementById('publicStatement');

        if (data && data.publicStatement) {
            publicStatementElement.innerHTML = `<a href="${data.publicStatement}" target="_blank">Public Statement</a>`;
            publicStatementSection.style.display = 'block'; // Show the section
        } else {
            publicStatementElement.innerHTML = 'No public statement available.';
            publicStatementSection.style.display = 'none'; // Hide the section if no statement
        }
    })
    .catch(error => {
        console.error('Error fetching public statement:', error);
        const publicStatementSection = document.getElementById('publicStatementSection');
        publicStatementSection.style.display = 'none'; // Hide the section on error
    });
}



function submitDetails(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const companyName = document.getElementById('companyName').value.trim();
    const countrySupport = document.getElementById('countrySupport').value.trim();

    // Perform validation (e.g., check if values are not empty)

    // Example: Store the data (you can modify this to save data to a database)
    const contributedDetails = {
        companyName: companyName,
        countrySupport: countrySupport
    };

    // Reset form after submission
    document.getElementById('contributeForm').reset();

    // Alert user or perform other actions (e.g., show confirmation message)
    alert('Thank you for contributing details about ' + companyName + ' supporting ' + countrySupport);
}

// Save data to local storage
localStorage.setItem('contributedData', JSON.stringify(contributedData));
// Set a cookie with contributed data
document.cookie = `contributedData=${JSON.stringify(contributedData)}`;

fetch('/save-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(contributedData),
})
.then(response => {
    if (response.ok) {
        // Data saved successfully
        console.log('Data saved successfully');
    } else {
        // Handle error
        console.error('Failed to save data');
    }
})
.catch(error => {
    console.error('Error:', error);
});


// Function to handle reporting issues (sending email)
function reportIssue() {
    const userInput = document.getElementById('searchInput').value.trim().toLowerCase(); // Convert user input to lowercase
    const currentResult = document.getElementById('result').textContent.trim();

    // Check if the result is not empty or unknown
    if (currentResult !== '' && currentResult !== 'Company not found or support status unknown') {
        const requestData = {
            companyName: userInput,
            currentSupportStatus: currentResult
        };

        // Send an HTTP POST request to the server
        fetch('/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                alert('Report sent successfully!');
            } else {
                throw new Error('Failed to send report');
            }
        })
        .catch(error => {
            console.error('Error sending report:', error);
            alert('Failed to send report. Please try again later.');
        });
    } else {
        alert('No valid result to report. Please perform a company check first.');
    }
}

// Function to handle reporting issues (open email client)
function reportIssue() {
    const userInput = document.getElementById('searchInput').value.trim();
    const currentResult = document.getElementById('result').textContent.trim();

    // Check if the result is not empty or unknown
    if (currentResult !== '' && currentResult !== 'Company not found or support status unknown') {
        const emailAddress = 'syedismailart@gmail.com'; // Enter your email address
        const subject = 'Brand Support Checker - Report Issue';
        const body = `
            Company Name: ${userInput}
            Current Support Status: ${currentResult}
            Please review and update if necessary.
        `;

        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the default email client with the pre-filled email
        window.location.href = mailtoLink;
    } else {
        alert('No valid result to report. Please perform a company check first.');
    }
}
document.getElementById('contributeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const countrySupport = document.getElementById('countrySupport').value.trim();

    const formData = { companyName, countrySupport };

    fetch('http://localhost:3000/contribute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            alert('Data saved successfully');
            document.getElementById('contributeForm').reset();
        } else {
            alert('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving data');
    });
});



document.getElementById('contributeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const countrySupport = document.getElementById('countrySupport').value;

    if (!companyName || !countrySupport) {
        alert('Please fill out all fields.');
        return;
    }

    const formData = { companyName, countrySupport };

    fetch('http://localhost:3000/contribute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            alert('Data saved successfully');
            document.getElementById('contributeForm').reset();
        } else {
            alert('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving data');
    });
});


