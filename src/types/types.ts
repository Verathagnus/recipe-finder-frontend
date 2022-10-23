export interface IUpdateTypeValue{
    category: string ;  
    type : string ; 
    oldvalue : string ; 
    newvalue : string ; 
}

export interface IDeleteType{
    category: string; 
    type : string;
}

export interface IDeleteTypeValue {
    category: string ; 
    type : string ; 
    value: string ; 
}

export interface IUpdateTypeName {
    category: string; 
    type: string;
    newType : string;
}

export interface INewType {
    category : string; 
    type : string ; 
    newvalue : string; 
}

export interface IPostBookignDimension {
    type : string ; 
    public_url : string; 
}

export interface IGetBookingDimension{
    type : string;
}