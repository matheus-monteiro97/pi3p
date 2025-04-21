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
  
  @Controller('patients')
  @UseGuards(JwtAuthGuard)
  export class PatientController {
    constructor(private readonly patientService: PatientService) {}
  
    @Post()
    create(@Body() createPatientDto: CreatePatientDto, @Request() req: any) {
      return this.patientService.create(createPatientDto, req.user);
    }
  
    @Get()
    findAll() {
      return this.patientService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.patientService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updatePatientDto: UpdatePatientDto,
      @Request() req: any,
    ) {
      return this.patientService.update(id, updatePatientDto, req.user);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req: any) {
      return this.patientService.remove(id, req.user);
    }
  }  