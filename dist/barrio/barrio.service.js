"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const barrio_entity_1 = require("./barrio.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invite_service_1 = require("../invite/invite.service");
const session_entity_1 = require("../session/session.entity");
const jwt_service_1 = require("../session/jwt.service");
const bcrypt = require('bcrypt');
const saltRounds = 8;
let BarrioService = class BarrioService {
    constructor(barrioRepo, inviteService) {
        this.barrioRepo = barrioRepo;
        this.inviteService = inviteService;
    }
    async register(registerDTO) {
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
        return await this.barrioRepo.query(insert_barrio_query(registerDTO)).then(parse_insert_barrio_query);
    }
    async delete(email) {
        return await this.barrioRepo.query(delete_barrio_query(email));
    }
    async getNewInvite(session) {
        return this.inviteService.createBarrioInvite(session.acc_id);
    }
    async getBarrio(email) {
        return await this.barrioRepo.query(select_barrio_query(email)).then(parse_get_barrio_query);
    }
};
BarrioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(barrio_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        invite_service_1.default])
], BarrioService);
exports.BarrioService = BarrioService;
function parse_get_barrio_query(response) {
    response = response[0].select_barrio;
    response = response.replace('(', '').replace(')', '');
    response = response.split(',');
    const barrio = {
        id: +response[0],
        email: response[1],
        password: response[2],
        creation_date: response[3],
        name: response[5].replace('\"', '').replace('\"', '')
    };
    return barrio;
}
function select_barrio_query(email) {
    return `SELECT select_barrio('${email}');`;
}
function parse_insert_barrio_query(response) {
    return !!response[0];
}
function delete_barrio_query(email) {
    return `DELETE from account WHERE email = '${email}';`;
}
function insert_barrio_query(registerDTO) {
    const { email, password, name } = registerDTO;
    return `SELECT insert_barrio('${email}', '${password}', '${name}');`;
}
//# sourceMappingURL=barrio.service.js.map