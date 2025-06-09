import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/report.createDto';
import { UpdateReportDto } from './dto/report.updateDto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Relatórios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo relatório' })
  async create(@Body() dto: CreateReportDto, @Req() req: any) {
    const user = req.user;
    return this.reportService.create(dto, user.id, user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um relatório existente' })
  @ApiParam({ name: 'id', description: 'ID do relatório', type: String })
  async update(@Param('id') id: string, @Body() dto: UpdateReportDto, @Req() req: any) {
    const user = req.user;
    return this.reportService.update(id, dto, user.id, user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um relatório' })
  @ApiParam({ name: 'id', description: 'ID do relatório', type: String })
  async delete(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.reportService.delete(id, user.id, user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os relatórios acessíveis ao usuário' })
  async getAll(@Req() req: any) {
    const user = req.user;
    return this.reportService.getAll(user.id, user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar relatório por ID' })
  @ApiParam({ name: 'id', description: 'ID do relatório', type: String })
  async getById(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.reportService.getById(id, user.id, user.role);
  }
}