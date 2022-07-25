import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EditorView } from 'prosemirror-view';

@Component({
  selector: 'ngx-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent implements AfterViewInit {
  @Input() src: string;
  @Input() alt = '';
  @Input() title = '';
  @Input() outerWidth = '';
  @Input() outerHeight = '';

  @Input() selected = false;
  @Input() view: EditorView;

  @Output() imageResize = new EventEmitter();

  @ViewChild('imgEl', { static: true }) imgEl: ElementRef;

  startResizing(e: MouseEvent, direction: string): void {
    e.preventDefault();
    this.resizeImage(e, direction);
  }

  resizeImage(evt: MouseEvent, direction: string): void {
    const startX = evt.pageX;
    const startY = evt.pageY;
    const startWidth = this.imgEl.nativeElement.clientWidth;
    const startHeight = this.imgEl.nativeElement.clientHeight;

    const isLeftResize = direction === 'left';

    const { width } = window.getComputedStyle(this.view.dom);
    const editorWidth = parseInt(width, 10);

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.pageX;
      const diffInPx = currentX - startX;
      const computedWidth = isLeftResize
        ? startWidth - diffInPx
        : startWidth + diffInPx;

      const currentY = e.pageY;

      const diffInPxY = startY - currentY;
      const computedHeight = isLeftResize
        ? startHeight - diffInPxY
        : startHeight + diffInPxY;

      // prevent image overflow the editor
      // prevent resizng below 20px
      if (computedWidth > editorWidth || computedWidth < 20) {
        return;
      }

      this.outerWidth = `${computedWidth}px`;
      this.outerHeight = `${computedHeight}px`;
    };

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      this.imageResize.emit();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  ngAfterViewInit(): void {
    if (this.imgEl) {
      setTimeout(() => {
        this.outerWidth = this.imgEl.nativeElement.offsetWidth;
        this.outerHeight = this.imgEl.nativeElement.offsetHeight;
      }, 100);
    }
  }
}
