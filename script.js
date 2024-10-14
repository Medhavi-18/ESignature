// Drawing Sign (index.html)
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;  //visible width on the screen -> offsetWidth
canvas.height = 300;

let drawing = false;  //not drawing
let currentColor = '#000000'; //defalut black colour

document.querySelectorAll('input[name="color"]').forEach(input => {
  //This is an anonymous function (also known as a callback function) that is executed whenever the change event occurs on the input element.
  input.addEventListener('change', function () {
    currentColor = this.value;
  });
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

document.getElementById('clearBtn').addEventListener('click', clearCanvas);
document.getElementById('saveBtn').addEventListener('click', saveSignature);

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing() {
  drawing = false;
}

function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('signatureImage').style.display = 'none';
}


function saveSignature() {
    const dataURL = canvas.toDataURL('image/png'); 
    const link = document.createElement('a'); 
    link.href = dataURL; 
    link.download = 'signature.png'; 
    link.click(); 
  }
  