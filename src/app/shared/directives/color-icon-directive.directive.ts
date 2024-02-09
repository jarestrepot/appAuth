import { Directive, ElementRef, HostListener, Input, OnInit, signal } from '@angular/core';
import { ColorIcon, LightColorIcons } from '@shared/interfaces/icons-color.emun';

@Directive({
  selector: '[customColorIcon]',
  standalone: true,
})
export class ColorIconDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color = signal<ColorIcon>( ColorIcon.black );
  private lightColor = signal<LightColorIcons>( LightColorIcons['#000000'] )

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  @Input() set color( value: ColorIcon ) {
    this._color.set( value );
  }

  ngOnInit(): void {
    if( !this._color ) return;
    this.setStyleElement();
  }

  setStyleElement():void{
    if( !this.htmlElement ){
      this.htmlElement!.nativeElement.setAttribute('stroke', this._color() );
    }
  }

  @HostListener('mouseenter') onMouseEnter() {

    if( this._color() in LightColorIcons ){
      this.lightColor.set( LightColorIcons[ this._color() ] );
    }

    this.htmlElement!.nativeElement.setAttribute('stroke', this.lightColor() );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.htmlElement!.nativeElement.setAttribute('stroke', this._color());
  }

}
