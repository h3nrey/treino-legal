import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'UserTooltip',
  imports: [RouterLink],
  templateUrl: './user-tooltip.component.html',
  styleUrl: './user-tooltip.component.scss'
})
export class UserTooltipComponent {
  constructor(private readonly userService: UserService) {}

  logout() {
    this.userService.logoutUser();
  }
}
