window.addEventListener('keydown',KeyDown,true);

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