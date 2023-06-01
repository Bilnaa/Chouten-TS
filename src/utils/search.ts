import { ChoutenResponse, Episode } from "../interface";

export function search(url : string): void {
    const elements = document.querySelectorAll<HTMLAnchorElement>('.film_list-wrap .film-detail > h3 > a');
    const images = document.querySelectorAll<HTMLImageElement>('.film_list-wrap .film-poster > img');
    const subDub = document.querySelectorAll<HTMLDivElement>('.film_list-wrap > div > .film-poster > div.tick.ltr');
    const epCounts = document.querySelectorAll<HTMLDivElement>('.film_list-wrap > div > .film-poster > .tick.ltr > div');
    const titles: ChoutenResponse[] = [];

    for (let i = 0; i < elements.length; i++) {
    const hasSub = subDub[i].innerText.includes('SUB');
    const hasDub = subDub[i].innerText.includes('DUB');
    const counts = epCounts[i].innerText.replace('Ep ', '').split('/');

    titles.push({
        link: `https://zoro.to${elements[i].getAttribute('href')}`,
        image: images[i].dataset.src as string,
        description: '',
        title: elements[i].innerText,
        additionalFields: [`${hasSub ? 'Sub' : ''}${hasSub && hasDub ? '|' : ''}${hasDub ? 'Dub' : ''}`],
        genres : [],
        body : {
            episodeName: elements[i].innerText,
            link: `https://zoro.to${elements[i].getAttribute('href')}`,
            quality: Number(counts[0]),
            openInWebview: true
        } as Episode
    });
    }
    const choutenDiv = document.getElementById('chouten');
    const resultElement = document.createElement('p');
    resultElement.innerText = JSON.stringify(titles);
    choutenDiv?.appendChild(resultElement);
}