export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
}
export function formatTime(ms: number){
    let minutes = Math.floor(ms / 1000 / 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60);

    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString();
}