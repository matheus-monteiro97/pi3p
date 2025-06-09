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
import { ComparisonResultService } from './comparison.service';
import { CreateComparisonResultDto } from './dto/comparison.createDto';
import { UpdateComparisonResultDto } from './dto/comparison.updateDto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Resultados de Comparação')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comparison-result')
export class ComparisonResultController {
  constructor(private readonly comparisonResultService: ComparisonResultService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo resultado de comparação' })
  async create(@Body() dto: CreateComparisonResultDto, @Req() req: any) {
    const user = req.user;
    return this.comparisonResultService.create(dto, user.id, user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um resultado de comparação' })
  @ApiParam({ name: 'id', description: 'ID do resultado', type: String })
  async update(@Param('id') id: string, @Body() dto: UpdateComparisonResultDto, @Req() req: any) {
    const user = req.user;
    return this.comparisonResultService.update(id, dto, user.id, user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os resultados de comparação' })
  async getAll(@Req() req: any) {
    const user = req.user;
    return this.comparisonResultService.findAll(user.id, user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar resultado de comparação por ID' })
  @ApiParam({ name: 'id', description: 'ID do resultado', type: String })
  async getById(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.comparisonResultService.findOne(id, user.id, user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um resultado de comparação (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do resultado', type: String })
  async delete(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.comparisonResultService.remove(id, user.id, user.role);
  }
}