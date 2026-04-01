export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './eventController.service';
import { EventControllerService } from './eventController.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthControllerService, EventControllerService, UsersService];
