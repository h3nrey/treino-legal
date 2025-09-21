import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Exercise, User } from '../../../utils/interfaces';
import { UserService } from '../../../services/users.service.ts.service';
import { UserTooltipComponent } from '../../user-tooltip/user-tooltip.component';
import { HeaderSearchbarComponent } from '../../header-searchbar/header-searchbar.component';

@Component({
  selector: 'home-header',
  imports: [FormsModule, RouterLink, UserTooltipComponent, HeaderSearchbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HomeHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {}
  user: any = null;
  searchTerm: string = '';
  searchedResults: Exercise[] = [];
  showResults = false;
  searchIcon = 'assets/icons/search.svg';

  ngOnInit() {
    const storedUser = this.userService.getUser();
    if (storedUser) {
      this.user = storedUser;
    }

    this.userService.currentUser.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  navigateToLogin(routeName: string) {
    this.router.navigate([{ outlets: { modal: [routeName] } }]);
  }
}
