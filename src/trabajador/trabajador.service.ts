import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
import { AuthenticationService } from "src/authentication/authentication.service";
import { InjectRepository } from "@nestjs/typeorm";
import Trabajador from "./trabajador.entity";
import TrabajadorRegistrationDTO from "./trabajador.registration.dto";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class TrabajadorService{

    constructor(
        @InjectRepository(Trabajador) private readonly trabajadorRepo:Repository<Trabajador>,
        private readonly authService:AuthenticationService
    ){}

    async register(registerDTO:TrabajadorRegistrationDTO): Promise<boolean>{
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
        return await this.trabajadorRepo.query(create_insert_propietario_query(registerDTO)).then(parse_insert_propietario_query)
    }

    async getPropietario(email:string):Promise<Trabajador>{
        return await this.trabajadorRepo.query(select_propietario_query(email)).then(parse_select_propietario_query)
    }

    async authenticate(logInDto:LogInDTO): Promise<Cookie>{
        const propietario:Trabajador = await this.getPropietario(logInDto.email)
        const jwt:string = await this.authService.authenticate(logInDto, propietario);

        delete propietario.doc_id
        delete propietario.doc_type
        delete propietario.device_id
        delete propietario.creation_date
        delete propietario.password

        return {
            jwt,
            account: propietario
        }
    }

}

function parse_select_propietario_query(response):Trabajador{
    response = response[0].select_propietario //extract from list
    response = response.replace('(','').replace(')', '') //remove paranthesis
    response = response.split(',') //split into array
    const propietario:Trabajador = {
        id:+response[0],
        email:response[1],
        password: response[2],
        creation_date: response[3],
        first_name: response[5].replace('\"', '').replace('\"', ''), //remove slashes and quotes
        last_name: response[6].replace('\"', '').replace('\"', ''), //remove slashes and quotes
        doc_id: response[7],
        doc_type: +response[8],
        device_id: response[9]
    }
    return propietario
}

function select_propietario_query(email:string):string{
    return `SELECT select_propietario('${email}');`
}

function create_insert_propietario_query(registerDTO:TrabajadorRegistrationDTO): string{
    const {
        email,
        password, 
        first_name,
        last_name,
        doc_id,
        doc_type,
        device_id
            } = registerDTO
    return `SELECT insert_propietario('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}', '${device_id}');`
}

async function parse_insert_propietario_query(response): Promise<boolean>{
    return !!response[0]
}