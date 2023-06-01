import { ChoutenResponse, Episode } from "./interface";
import { VideoModule } from "./source";

export * from "./document"
export * from "./source"
export * from "./interface"
export * from "./types"




export default class ModuleName extends VideoModule {
    name = "Zoro.to";
    version = "0.1.0";
    author = "Inumaki";
    description = "A module to get the data from Zoro.to";
    icon = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/qe7kzhh0bo1qt9ohrxwb";
    lang = ["en-US"];
    baseURL = "https://mymodule.com";
    bgColor = "#ffcb3d";
    fgColor = "#000000";
    updateUrl = "https://raw.githubusercontent.com/adolar0042/MyModule/main/module.json";
    id = "1";
    type = "source";
    subtypes = ["anime"];
    getMetadata(): any {
        return {
            "id": this.id,
            "type": this.type,
            "subtypes": this.subtypes,
            "name": this.name,
            "version": this.version,
            "updateUrl": this.updateUrl,
            "metadata": {
                "author": this.author,
                "description": this.description,
                "icon": this.icon,
                "lang": this.lang,
                "baseURL": this.baseURL,
                "bgColor": this.bgColor,
                "fgColor": this.fgColor
            }
        }
    }
    
    getInfo(url: string): void{
        throw new Error("Method not implemented.");
    }

    getChapter(url: string): void {
        throw new Error("Method not implemented.");
    }

    search(url : string): void {
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

}