import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/case.createDto';
import { UpdateCaseDto } from './dto/case.updateDto';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';
import { Request } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Casos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cases')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  @Role('ADMIN', 'PERITO')
  @ApiOperation({ summary: 'Criar um novo caso' })
  async create(@Body() dto: CreateCaseDto, @Req() req: Request) {
    const user = req.user as any;
    return this.caseService.create(dto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um caso pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do caso', type: String })
  async update(@Param('id') id: string, @Body() dto: UpdateCaseDto, @Req() req: Request) {
    const user = req.user as any;
    return this.caseService.update(id, dto, user);
  }

  @Delete(':id')
  @Role('ADMIN', 'PERITO')
  @ApiOperation({ summary: 'Excluir um caso (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do caso', type: String })
  async delete(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.caseService.delete(id, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar casos com filtros opcionais' })
  @ApiQuery({ name: 'startOpeningDate', required: false, type: String, description: 'Data inicial para filtro de abertura (ISO string)' })
  @ApiQuery({ name: 'endOpeningDate', required: false, type: String, description: 'Data final para filtro de abertura (ISO string)' })
  @ApiQuery({ name: 'statusCase', required: false, type: String, description: 'Status do caso: ANDAMENTO, FINALIZADO, ARQUIVADO' })
  @ApiQuery({ name: 'managerId', required: false, type: String, description: 'ID do gerente responsável pelo caso' })
  async getAll(@Req() req: Request, @Query() query: Record<string, any>) {
    const user = req.user as any;

    return this.caseService.getAll(user, {
      startOpeningDate: query.startOpeningDate,
      endOpeningDate: query.endOpeningDate,
      statusCase: query.statusCase,
      managerId: query.managerId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar caso pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do caso', type: String })
  async getById(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.caseService.getById(id, user);
  }
}