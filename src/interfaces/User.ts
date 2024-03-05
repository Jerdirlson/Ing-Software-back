export interface User {
    idUser?: number;
    numId? : string,
    nameUser : string,
    lastNameUser : string,
    adressUser : number,
    emailUser : string,
    pwdUser : string,
    siteUser? : number,
    idRol : number,
    status : boolean,
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
    status : number
}