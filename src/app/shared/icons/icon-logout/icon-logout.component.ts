import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsSize } from '@shared/interfaces/icons-size.interface';
import { ColorIconDirective } from '@shared/directives/color-icon-directive.directive';
import { ColorIcon } from '@shared/interfaces/icons-color.emun';

@Component({
  selector: 'shared-icon-logout',
  standalone: true,
  imports: [CommonModule, ColorIconDirective],
  templateUrl: './icon-logout.component.html',
  styleUrls: ['./icon-logout.component.css'],
})
export class IconLogoutComponent implements OnInit {

  public color = signal < ColorIcon >( ColorIcon.black );

  @Output()
  public clickSvg = new EventEmitter();

  @Input()
  public strokeColor:string = ColorIcon.black;


  @Input()
  public className: string = 'icon icon-tabler icon-tabler-logout-2';

  @Input()
  public sizeIcon: IconsSize = { width: 44, height: 44 };

  ngOnInit(): void {

    if (this.strokeColor in ColorIcon) {
      // Obtener el valor correspondiente del enum ColorIcon
      this.color.set( ColorIcon[this.strokeColor as keyof typeof ColorIcon] );
    } else {
      // Defecto negro.
      this.color.set(ColorIcon.black);
    }
  }

  emiterSvg():void{
    this.clickSvg.emit( true );
  }

}
