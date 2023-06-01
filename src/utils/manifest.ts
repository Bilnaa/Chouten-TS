
let name = "Zoro.to";
let version = "0.1.0";
let author = "Inumaki";
let description = "A module to get the data from Zoro.to";
let icon = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/qe7kzhh0bo1qt9ohrxwb";
let lang = ["en-US"];
let baseURL = "https://mymodule.com";
let bgColor = "#ffcb3d";
let fgColor = "#000000";
let updateUrl = "https://raw.githubusercontent.com/adolar0042/MyModule/main/module.json";
let id = "1";
let type = "source";
let subtypes = ["anime"];

const MANIFEST = {
    "id": id,
    "type": type,
    "subtypes": subtypes,
    "name": name,
    "version": version,
    "updateUrl": updateUrl,
    "metadata": {
        "author": author,
        "description": description,
        "icon": icon,
        "lang": lang,
        "baseURL": baseURL,
        "bgColor": bgColor,
        "fgColor": fgColor
    }
}

export default MANIFEST;