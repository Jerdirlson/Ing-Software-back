export interface User {
    id?: number;
    numId? : string,
    nameUser : string,
    lastNameUser : string,
    adressUser : number,
    emailUser : string,
    pwdUser : string,
    siteUser? : number,
    idRol : number,
    statusUser : boolean,
    idHistoryClient: number,
    eps: number
}

export interface UserUpdate{
    nameUser : string,
    lastNameUser : string,
    adressUser : number,
    emailUser : string,
    pwdUser : string,
    siteUser? : number,
    idRol : number,
    statusUser : boolean
}