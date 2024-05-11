import { Directive, ViewContainerRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLimitToFourNode]',
})
export class LimitToFourNodeDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const observer = new MutationObserver(() => {
      if (
        this.viewContainerRef.element.nativeElement.childNodes.length > 4 &&
        this.viewContainerRef.element.nativeElement.firstChild
      ) {
        this.renderer.addClass(
          this.viewContainerRef.element.nativeElement.firstChild,
          'removed'
        );
        setTimeout(() => {
          this.renderer.removeChild(
            this.viewContainerRef.element.nativeElement,
            this.viewContainerRef.element.nativeElement.firstChild
          );
        }, 300);
      }
    });

    const config = { childList: true };

    observer.observe(this.viewContainerRef.element.nativeElement, config);
  }
}
