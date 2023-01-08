import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe, UsePipes, UnauthorizedException, Request } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles("Admin", "ProjectManager", "Employee")
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin", "ProjectManager", "Employee")
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin", "ProjectManager", "Employee")
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/validate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UsePipes(ValidationPipe)
  @Roles("Admin", "ProjectManager", "Employee")
  validate(@Request() req) {
    if (req.user.role === "Employee") {
      throw new UnauthorizedException();
    }
    // return this.eventsService.create();
  }

  @Post(':id/decline')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UsePipes(ValidationPipe)
  @Roles("Admin", "ProjectManager", "Employee")
  decline(@Request() req) {
    if (req.user.role === "Employee") {
      throw new UnauthorizedException();
    }
    // return this.eventsService.create();
  }
}
