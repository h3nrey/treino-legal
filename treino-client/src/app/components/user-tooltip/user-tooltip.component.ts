import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service.ts.service';

@Component({
  selector: 'UserTooltip',
  imports: [RouterLink],
  templateUrl: './user-tooltip.component.html',
  styleUrl: './user-tooltip.component.scss',
})
export class UserTooltipComponent {
  @Input() user: any = null;
  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    console.log(this.user);
  }

  logout() {
    this.userService.logoutUser();
  }
}
