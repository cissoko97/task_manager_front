import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidebar', { static: true }) sidebar: ElementRef<HTMLElement>;
  isToggleSidebar = false;
  // : ElementRef;

  constructor(private rendr: Renderer2) { }

  ngOnInit() {
    console.dir(this.sidebar);
  }

  toggleSideBar() {
    if (this.isToggleSidebar) {
      this.rendr.setStyle(this.sidebar.nativeElement, 'width', '200px');
    } else {
      this.rendr.setStyle(this.sidebar.nativeElement, 'width', '40px');
    }
    this.isToggleSidebar = !this.isToggleSidebar;
    console.dir(this.sidebar.nativeElement);
  }
}
