import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ColorPickerComponent,
        SanitizeHtmlPipe,
      ],
      providers: [MenuService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
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
