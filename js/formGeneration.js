
export function formGeneration (createdElement) {
    return new Promise((resolve) => {
        const theForm = document.createElement('form');
            theForm.classList.add('mainForm');
        const firstLocationLabel = document.createElement('label');
            firstLocationLabel.htmlFor = 'location1';
            firstLocationLabel.innerText = 'Enter First Location: ';
        const firstLocation = document.createElement('input');
            firstLocation.type = 'text';
            firstLocation.name = 'location1';
            firstLocation.id = 'location1';
            firstLocation.placeholder = 'e.g. London, Tokyo, etc...';
        const secondLocationLabel = document.createElement('label');
            secondLocationLabel.htmlFor = 'location2';
            secondLocationLabel.innerText = 'Enter Second Location: ';
        const secondLocation = document.createElement('input');
            secondLocation.type = 'text';
            secondLocation.name = 'location2';
            secondLocation.id = 'location2';
            secondLocation.placeholder = 'e.g. London, Tokyo, etc...';
        const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.innerText = 'Get Weather';

        theForm.appendChild(firstLocationLabel);
        theForm.appendChild(firstLocation);
        theForm.appendChild(secondLocationLabel);
        theForm.appendChild(secondLocation);
        theForm.appendChild(submitButton);

        theForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(theForm);
            createdElement.innerHTML = '';
            console.log(Object.fromEntries(formData.entries()));
            resolve(Object.fromEntries(formData.entries()));
            theForm.reset();
        });

        createdElement.appendChild(theForm);
    });
}