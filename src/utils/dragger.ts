export function bindDragger(
    node: HTMLElement,
    startXGetter: () => number,
    startYGetter: () => number,
    onUpdate: (left: number, top: number) => void,
) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    node.draggable = false;

    node.addEventListener('mousedown', (e) => {
        if (!node) {
            return;
        }
        dragging = true;
        startX = startXGetter();
        startY = startYGetter();
        offsetX = e.pageX;
        offsetY = e.pageY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!node) {
            return;
        }
        if (!dragging) {
            return;
        }
        onUpdate(e.pageX - offsetX + startX, e.pageY - offsetY + startY);
    });

    window.addEventListener('mouseup', (e) => {
        if (!node) {
            return;
        }
        if (!dragging) {
            return;
        }
        dragging = false;
    });
}
