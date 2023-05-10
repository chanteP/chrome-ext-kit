export function evalScript(script?: string, varObj: Record<string, unknown> = {}) {
    const varNames: string[] = [];
    const varData: unknown[] = [];

    Object.entries(varObj).forEach(([name, data]) => {
        varNames.push(name);
        varData.push(data);
    });

    return new Function(...varNames, `"use strict";${script}`)(...varData);
}

export function $<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector) as T;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 300) {
    let timer: number | undefined = undefined;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay) as unknown as number;
    };
}

export function sleep(n = 0) {
    return new Promise<void>((res) => {
        setTimeout(res, n);
    });
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image();
        img.onload = () => {
            res(img);
        };
        img.onerror = rej;
        img.src = src;
    });
}

export function arrayGroupBy<T>(array: T[], condition: (item: T) => unknown): T[][] {
    const map = new Map();
    array.forEach((item) => {
        const value = condition(item);
        if (!map.has(value)) {
            map.set(value, []);
        }
        map.get(value).push(item);
    });
    return [...map.values()];
}

export function insertTemplate(template: string) {
    return $('#main')!.insertAdjacentHTML('beforeend', template);
}

// export async function loadScript(src: string) {
//     return new Promise((res, rej) => {
//         const s = document.createElement('script');
//         s.src = src;
//         s.onload = res;
//         s.onerror = rej;
//         document.body.appendChild(s);
//     });
// }

export function download(fileName: string, url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}

export async function readFile(file: File): Promise<string> {
    return new Promise<string>((res, rej) => {
        const fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = function () {
            const fileContent = fileReader.result;
            res(fileContent as string);
        };

        fileReader.onerror = rej;
    });
}
