import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/patient.createDto';
import { UpdatePatientDto } from './dto/patient.updateDto';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Pacientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo paciente' })
  create(@Body() createPatientDto: CreatePatientDto, @Request() req: any) {
    return this.patientService.create(createPatientDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pacientes' })
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID do paciente', type: String })
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um paciente' })
  @ApiParam({ name: 'id', description: 'ID do paciente', type: String })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req: any,
  ) {
    return this.patientService.update(id, updatePatientDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover (soft delete) um paciente' })
  @ApiParam({ name: 'id', description: 'ID do paciente', type: String })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.patientService.remove(id, req.user);
  }
}