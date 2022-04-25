const dragArea = document.querySelector('.appBody'),
    dragText = dragArea.querySelector(' h3'),
    browseBtn = dragArea.querySelector('button'),
    inputBtn = dragArea.querySelector('input');

let myFile;

browseBtn.onclick = () => {
    inputBtn.click()
}

inputBtn.addEventListener('change', function () {
    myFile = this.files[0];
    dragArea.classList.add('active');

    ShowMe()
})

dragArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragArea.classList.add('active');
    dragText.textContent = 'Release to Upload File';
})

dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop';
})

dragArea.addEventListener('drop', (e) => {
    e.preventDefault();
    myFile = e.dataTransfer.files[0];

    ShowMe()
})

function ShowMe() {
    let fileType = myFile.type;
    let vaildEx = ['image/jpeg', 'image/jpg', 'image/png'];

    if (vaildEx.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let imgUrl = fileReader.result;
            let img = `<img src="${imgUrl}" alt=""> `;

            dragArea.innerHTML = img;
        }
        fileReader.readAsDataURL(myFile);
    } else{
        alert('This file is not valid')
        dragArea.classList.remove('active');
        dragText.textContent = 'Drag & Drop';
    }
}