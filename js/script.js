 let nomineeCount = 2;

    function previewImage(input, previewId) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.getElementById(previewId);
                const span = input.parentElement.querySelector('span');
                img.src = e.target.result;
                img.style.display = 'block';
                if(span) span.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    }

    function addNomineeRow() {
        nomineeCount++;
        const index = nomineeCount - 1;
        
        const tbody = document.getElementById('nomineeTableBody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nomineeCount}</td>
            <td><input type="text" placeholder="নাম"></td>
            <td><input type="text" placeholder="পিতার নাম"></td>
            <td><input type="text" placeholder="মাতার নাম"></td>
            <td><input type="text" placeholder="দিন/মাস/বছর"></td>
            <td><input type="text" placeholder="সম্পর্ক"></td>
            <td><input type="number" class="share-input" value="0" min="1" max="100"></td>
            <td class="actions-panel-cell"><button type="button" class="btn btn-danger" onclick="deleteRow(this, ${index})">মুছুন</button></td>
        `;
        tbody.appendChild(tr);

        const photoContainer = document.getElementById('nomineePhotoContainer');
        const pBox = document.createElement('div');
        pBox.className = 'photo-box-wrapper';
        pBox.id = `p-box-${index}`;
        pBox.innerHTML = `
            <span>নমিনী ${nomineeCount} ফটো</span>
            <img id="nomImg-${index}">
            <input type="file" accept="image/*" onchange="previewImage(this, 'nomImg-${index}')">
        `;
        photoContainer.appendChild(pBox);
        reindexRows();
    }

    function deleteRow(btn, index) {
        const row = btn.closest('tr');
        row.remove();
        
        const pBox = document.getElementById(`p-box-${index}`);
        if(pBox) pBox.remove();
        
        reindexRows();
    }

    function reindexRows() {
        const rows = document.querySelectorAll('#nomineeTableBody tr');
        nomineeCount = rows.length;
        
        rows.forEach((row, i) => {
            row.cells[0].innerText = (i + 1);
            const existingPBox = document.querySelectorAll('#nomineePhotoContainer .photo-box-wrapper')[i];
            if(existingPBox && existingPBox.querySelector('span')) {
                const imgVisible = existingPBox.querySelector('img').style.display === 'block';
                if(!imgVisible) {
                    existingPBox.querySelector('span').innerText = `নমিনী ${i + 1} ফটো`;
                }
            }
        });
    }

    function validateForm(e) {
        e.preventDefault();
        const shareInputs = document.querySelectorAll('.share-input');
        let totalShare = 0;
        
        shareInputs.forEach(input => {
            totalShare += parseFloat(input.value || 0);
        });

        if (totalShare !== 100) {
            alert(`ভুল হিসাব! নমিনীদের মোট অংশের পরিমাণ ১০০% হতে হবে। আপনার বর্তমান ইনপুট মোট: ${totalShare}%`);
            return false;
        }

        alert("সফলভাবে ফর্ম যাচাই করা হয়েছে! আপনার ডাটাবেজ প্রসেসিং এর জন্য প্রস্তুত।");
        return true;
    }
		
    document.getElementById("myButton").onclick = function () {
        location.href = "index.html";
    };


    // Auto-sync dynamic binding between Applicant Name inputs and declaration target lines
    document.querySelectorAll('.form-row input[type="text"]')[0].addEventListener('input', function() {
        document.getElementById('declarantName').value = this.value;
    });