import { IsUUID } from "class-validator";

export default interface Session{

    session_id: string;

    account_id: number;

    creation_date:string;

    exp:number;

} 