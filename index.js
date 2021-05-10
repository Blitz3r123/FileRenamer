const fs = require('fs');
const path = require('path');

let files = [];

const folderInput = document.getElementById('folder-input');
const fileOutput = document.getElementById('file-output');

folderInput.onchange = () => {
    // Collect files
    files = [...folderInput.files];
    let folderName = path.dirname(folderInput.files[0].path);

    // Populate page with files and their names in the input
    files.forEach((file, index) => {
        let input = document.createElement('input');
        let br = document.createElement('br');
        input.type = "text";
        input.value = file.name;
        input.style.width = "90vw";
        input.style.height = "10vh";
        input.style.marginTop = "2vh";
        input.id = "file-" + (index + 1);
        input.setAttribute('name', path.join(folderName, file.name));

        // Add event listener for input change
        if(fileOutput.addEventListener){
            fileOutput.addEventListener('keyup', handleChange);
        }else if(fileOutput.attachEvent){
            fileOutput.attachEvent('keyup', handleChange);
        }
        
        fileOutput.appendChild(input);
        fileOutput.appendChild(br);
    });
}

handleChange = (e) => {
    if(e.key === 'Enter'){
        let id = e.target.id;
        let value = e.target.value;
        let filename = e.target.name;
    
        let dirname = path.dirname(filename);
    
        value = path.join(dirname, value);
    
        fs.rename(filename, value, err => {
            if(err){
                console.log(err);
            }else{
                e.target.value = path.basename(value);
                e.target.setAttribute('name', value);
                console.log('renamed');
            }
        });
    }
    
}