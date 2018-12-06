import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTodoComponent } from './multi-todo.component';

describe('MultiTodoComponent', () => {
  let component: MultiTodoComponent;
  let fixture: ComponentFixture<MultiTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
