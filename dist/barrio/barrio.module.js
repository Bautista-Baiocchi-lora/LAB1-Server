"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const barrio_service_1 = require("./barrio.service");
const barrio_entity_1 = require("./barrio.entity");
const typeorm_1 = require("@nestjs/typeorm");
const invite_module_1 = require("../invite/invite.module");
const authentication_module_1 = require("../authentication/authentication.module");
const barrio_controller_1 = require("./barrio.controller");
const authentication_service_1 = require("../authentication/authentication.service");
const invite_service_1 = require("../invite/invite.service");
let BarrioModule = class BarrioModule {
};
BarrioModule = __decorate([
    common_1.Module({
        providers: [barrio_service_1.BarrioService],
        controllers: [barrio_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([barrio_entity_1.Barrio]), authentication_module_1.AuthenticationModule, invite_module_1.InviteModule],
    })
], BarrioModule);
exports.BarrioModule = BarrioModule;
//# sourceMappingURL=barrio.module.js.map