swipeThreshold = 50;
holdThreshold = 500;

mouseDownTime = 0;
mousePressed = false;
moved = false;

window.addEventListener('keydown',KeyDown,true);
window.addEventListener('mousedown',MouseDown,true);
window.addEventListener('mousemove',MouseMove,true);
window.addEventListener('mouseup',MouseUp,true);

function KeyDown(key){
    if (key.key == 'ArrowRight')
        Move(1);
    if (key.key == 'ArrowLeft')
        Move(-1);
    if (key.key == 'ArrowUp')
        Rotate();
    if (key.key == 'ArrowDown'){
        DropBlock();
        DrawToScreen();
    }
}

function MouseDown() {
    tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
    tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
    mouseDownTime = performance.now();
    mousePressed = true;
    console.log(tapStartXPos,tapStartYPos);
}

function MouseMove() {
    if (!mousePressed)
        return;
    deltaX = event.clientX - canvas.getBoundingClientRect().left - tapStartXPos;
    deltaY = event.clientY - canvas.getBoundingClientRect().top - tapStartYPos;
    mouseTapTime = performance.now() - mouseDownTime;
    if (Math.abs(deltaX) > swipeThreshold){
        moved = true;
        if (deltaX > 0)
            Move(1);
        else
            Move(-1);

        tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
        tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
    } else if(deltaY > swipeThreshold){
        moved = true;
        DropBlock();
        DrawToScreen();

        tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
        tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
    }
    console.log(deltaY);
}

function MouseUp() {
    deltaX = event.clientX - canvas.getBoundingClientRect().left - tapStartXPos;
    deltaY = event.clientY - canvas.getBoundingClientRect().left - tapStartYPos;
    mouseTapTime = performance.now() - mouseDownTime;
    mousePressed = false;
    if (!moved && mouseTapTime < holdThreshold)
        Rotate();
    moved = false;
}