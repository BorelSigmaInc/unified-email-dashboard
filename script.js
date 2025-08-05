document.addEventListener('DOMContentLoaded', function() {
    const accountItems = document.querySelectorAll('.account-item');
    const emailList = document.getElementById('email-list');
    const currentInboxTitle = document.getElementById('current-inbox-title');

    // --- MOCK DATA ---
    // In a real app, this data would come from the email APIs.
    const mockEmails = {
        gmail: [
            { from: 'Google Team', subject: 'New sign-in to your account', body: 'A new device has signed in...', date: '11:30 AM' },
            { from: 'Vercel', subject: 'Deployment Successful', body: 'Your project has been deployed.', date: '11:15 AM' },
            { from: 'GitHub', subject: 'Your weekly digest', body: 'Here are your repository updates...', date: 'Yesterday' }
        ],
        outlook: [
            { from: 'Microsoft 365', subject: 'Your subscription is renewing', body: 'No action is needed. Your subscription...', date: '10:55 AM' },
            { from: 'LinkedIn', subject: 'John Doe viewed your profile', body: 'See who else is looking at your profile.', date: 'Yesterday' }
        ],
        yahoo: [
            { from: 'Yahoo Finance', subject: 'Your daily market report', body: 'Here is your personalized market summary.', date: '9:00 AM' },
            { from: 'Flickr', subject: '10 amazing photos you missed', body: 'Check out these popular photos from your groups.', date: 'Yesterday' }
        ]
    };

    function displayEmails(service) {
        // Clear the current list
        emailList.innerHTML = '';

        // Get the mock data for the selected service
        const emails = mockEmails[service] || [];

        // Update the inbox title
        const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
        currentInboxTitle.textContent = `${serviceName} Inbox`;

        // Create and append email items
        emails.forEach(email => {
            const item = document.createElement('li');
            item.className = 'email-item';
            item.innerHTML = `
                <div class="email-item-header">
                    <div class="email-from">${email.from}</div>
                    <div class="email-date">${email.date}</div>
                </div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-body-preview">${email.body}</div>
            `;
            emailList.appendChild(item);
        });
    }

    accountItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all items
            accountItems.forEach(i => i.classList.remove('active'));
            
            // Add 'active' class to the clicked item
            item.classList.add('active');

            // Display the emails for the selected service
            const service = item.getAttribute('data-service');
            displayEmails(service);
        });
    });

    // Display the default inbox on page load
    displayEmails('gmail');
});
