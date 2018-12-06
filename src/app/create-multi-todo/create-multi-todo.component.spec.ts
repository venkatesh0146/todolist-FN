import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiTodoComponent } from './create-multi-todo.component';

describe('CreateMultiTodoComponent', () => {
  let component: CreateMultiTodoComponent;
  let fixture: ComponentFixture<CreateMultiTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMultiTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMultiTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
