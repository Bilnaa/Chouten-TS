export interface GenericModuleFunction {
    request: ChoutenRequest,
    output: ChoutenResponse
  }
  
export interface Chapter {
    chapterName: string,
    link: string,
    openInWebview: Boolean
}
  
 export interface Episode {
    episodeName: string,
    link: string,
    quality?: Number,
    openInWebview: Boolean
  }
  
export interface ChoutenRequest {
    url: string,
    type: "POST" | "GET" | "PUT" | "DELETE",
    headers: { key: string, value: string }[]
    body: string | null
  }
  
 export  interface ChoutenResponse {
    image: ChoutenRequest | string,
    title: string,
    link: string,
    description: string,
    genres: string[],
    additionalFields: readonly [string?, string?, string?, string?],
    body: Episode | Chapter
  }