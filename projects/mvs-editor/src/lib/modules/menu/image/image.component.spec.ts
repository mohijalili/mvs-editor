import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ImageComponent,
        SanitizeHtmlPipe,
      ],
      providers: [
        MenuService,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;

    menuService = fixture.debugElement.injector.get(MenuService);
    editor = new Editor();
    menuService.editor = editor;

    fixture.detectChanges();
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
